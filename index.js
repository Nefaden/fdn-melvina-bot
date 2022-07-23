const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
require('dotenv').config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  } else if (commandName === 'server') {
    await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
  } else if (commandName === 'user') {
    await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
  }

  if (commandName === 'fruis') {
    const message = await interaction.reply({ content: 'Reacting with fruits!', fetchReply: true });

    try {
      await message.react('🍎');
      await message.react('🍊');
      await message.react('🍇');
    } catch (error) {
      console.error('One of the emojis failed to react:', error);
    }
  }
});

client.on('messageCreate', (message) => {
  if (message.author.id === process.env.ESPRIT_ID) {
    message.react('<:fdnPEEPODRINK:997142971185115277>');
  }
  if (message.author.id === process.env.MINIBABYMEL_ID) {
    message.react('<:fdnPEEPOPENSIVE:997142974074986546>');
  }
  if (message.author.id === process.env.PATON_ID) {
    message.react('<:fdnLUL:986340657780121680>');
    message.react('<:fdnCHAUVE:986340646111559740>');
  }

  if (message.author.id === process.env.PUMPKIN_ID) {
    message.react('🎃');
  }
  if (message.author.id === process.env.GOUPIL_ID) {
    message.react('🦊');
  }
  if (message.author.id === process.env.MONO_ID) {
    message.react('<:ponceDOG:825776345391824896>');
  }
});

// Login to Discord with your client's token
client.login(token);
