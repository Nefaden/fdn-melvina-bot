import { Client, GatewayIntentBits, Collection, Events, Message, Interaction, CommandInteraction } from 'discord.js';
import { Sequelize } from 'sequelize-typescript';
import { token } from './config.json';
import { CommandsDeployer } from './commands/deployer/commandsDeployer';
// import { Outing } from './infrastructure/database/models/outing'; // Sequelize test

require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.commands = new Collection();
const commandsDeployer = new CommandsDeployer();

client.once(Events.ClientReady, async () => {
	const sequelize = new Sequelize(`postgres://${process.env.DB_USERNAME}:${process.env.DB_PSWD}@${process.env.IP_DATABASE}:${process.env.PORT_DATABASE}/${process.env.DB_NAME}`);

	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	}
	catch (error) {
		console.error('Unable to connect to the database:', error);
	}

	commandsDeployer.commands.forEach(
		command => client.commands.set(command.name, command)
	);

	console.log('Ready!');

	/**
	 * Sequelize test
	 */
	//sequelize.addModels([Outing]);

	// insertOuting('Sortie fleurie');
	/*getOuting('Sortie fleurie').then(
		outing => {
			console.log(outing);
		}
	);*/
});

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
	const commandInteraction = interaction as CommandInteraction;
	const command = interaction.client.commands.get(commandInteraction.commandName);
	if (!command) {
		console.error(`No command matching ${commandInteraction.commandName} was found.`);
		return;
	}

	try {
		command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await commandInteraction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on(Events.MessageCreate, (message: Message) => {
	if (message.author.id === process.env.PUMPKIN_ID) {
		message.react('🎃');
	}
	if (message.author.id === process.env.GOUPIL_ID) {
		message.react('🦊');
	}
	if (message.author.id === process.env.KIMIDA_ID) {
		message.react('🐱');
	}
})

client.login(token);

/**
 * Sequelize test
 */
/*
function insertOuting(label: string): void {
	const outing = new Outing({
		label: label,
		description: 'Venez ça va être cool',
		period: '2022-01-29',
		creatorId: process.env.KIMIDA_ID,
		creator: null,
		place: 'Nantes',
		attendeeMax: 10
	});
	outing.save();
}*/
/*
/*
function getOuting(label: string): Promise<any> {
	return Outing.findAll({
		where: { label }
	});
}*/