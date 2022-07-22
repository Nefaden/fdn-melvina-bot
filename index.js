// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
require('dotenv').config()

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
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
        console.log("ici")
		const message = await interaction.reply({ content: 'Reacting with fruits!', fetchReply: true });

        console.log("interaction : ", interaction)
		try {
			await message.react('🍎');
			await message.react('🍊');
			await message.react('🍇');
		} catch (error) {
			console.error('One of the emojis failed to react:', error);
		}
	}
});

client.on('messageCreate', message => {
    if(message.author.id === process.env.NEFA_ID) {
        message.react("<:fdnPEEPODRINK:997142971185115277>")
    }
})

// Login to Discord with your client's token
client.login(token);