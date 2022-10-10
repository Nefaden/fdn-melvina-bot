const { Client, GatewayIntentBits } = require('discord.js');
const { Sequelize } = require('sequelize');
const autoReacMessage = require('./src/commands/handlers/general/autoReacMessage');
const basicsCommands = require('./src/commands/handlers/general/basicsCommands');
const { token } = require('./config.json');
require('dotenv').config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// When the client is ready, run this code (only once)
client.once('ready', async () => {
  // Create Sequelize instance
  const sequelize = new Sequelize(`postgres://${process.env.DB_USERNAME}:${process.env.DB_PSWD}@${process.env.IP_DATABASE}:${process.env.PORT_DATABASE}/${process.env.DB_NAME}`);

  // Passing connection string to DB
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

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
