const { Client, GatewayIntentBits } = require('discord.js');
const autoReacMessage = require('./src/commands/handlers/autoReacMessage');
const basicsCommands = require('./src/queries/handlers/basicsCommands');
const { token } = require('./config.json');
require('dotenv').config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
  await basicsCommands(interaction);
});

client.on('messageCreate', (message) => {
  autoReacMessage(message);
});

// Login to Discord with your client's token
client.login(token);
