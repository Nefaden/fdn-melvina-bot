const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { Sequelize } = require('sequelize');
const { token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const client = new Client(
	{
		intents:
		[
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMessages,
			GatewayIntentBits.GuildMessageReactions,
			GatewayIntentBits.GuildMembers,
			GatewayIntentBits.GuildScheduledEvents,
		],
	},
);

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
}

client.once('ready', async () => {
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

client.on('interactionCreate', async (interaction) => {
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
});

client.on('messageCreate', (message) => {
	if (message.author.id === process.env.PUMPKIN_ID) {
		message.react('🎃');
	}
	if (message.author.id === process.env.GOUPIL_ID) {
		message.react('🦊');
	}
});

client.login(token);
