const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
  new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
  new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
  new SlashCommandBuilder().setName('fruits').setDescription('React with fruits!'),
  new SlashCommandBuilder().setName('dispo').setDescription('Dispo bebou'),
  new SlashCommandBuilder().setName('bonjour').setDescription('Bonjour'),
  new SlashCommandBuilder().setName('faq').setDescription('Liste des questions fréquemment posées !'),
  new SlashCommandBuilder().setName('helper').setDescription('Toute l\'aide dont tu as besoin pour utiliser le bot !'),
]
  .map((command) => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
