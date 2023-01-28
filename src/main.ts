import { Client, GatewayIntentBits, Collection, Events, Message } from 'discord.js';
import { Sequelize } from 'sequelize';
import { token } from './config.json';
import { CommandsDeployer } from './commandsDeployer';

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
});

/**
 * TODO interaction type
 */
client.on(Events.InteractionCreate, async (interaction: any) => {
	// interaction = interaction as MessageInteraction;
	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
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
