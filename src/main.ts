import { Client, GatewayIntentBits, /*Collection,*/ Events, Message } from 'discord.js';
import { Sequelize } from 'sequelize';
import { token } from './config.json';
/*import fs from 'node:fs';
import path from 'node:path';*/

require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
/*
client.commands = new Collection();
const commandsPath = path.join(__dirname, './src/commands/handlers/');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	}
	else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}*/

client.once(Events.ClientReady, async () => {
	const sequelize = new Sequelize(`postgres://${process.env.DB_USERNAME}:${process.env.DB_PSWD}@${process.env.IP_DATABASE}:${process.env.PORT_DATABASE}/${process.env.DB_NAME}`);

	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	}
	catch (error) {
		console.error('Unable to connect to the database:', error);
	}

	console.log('Ready!');
});

/**
 * TODO interaction type
 *//*
client.on(Events.InteractionCreate, async (interaction: any) => {
	// interaction = interaction as MessageInteraction;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});*/

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
