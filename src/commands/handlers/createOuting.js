const { SlashCommandBuilder } = require('discord.js');
const {
	ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create-outing')
		.setDescription('Ouverture d\' une fenêtre pour créer un événement'),
	async execute(interaction) {
		const modal = new ModalBuilder()
			.setCustomId('myModal')
			.setTitle('My Modal');

		const favoriteColorInput = new TextInputBuilder()
			.setCustomId('favoriteColorInput')
			.setLabel('What\'s your favorite color?')
			.setStyle(TextInputStyle.Short);

		const hobbiesInput = new TextInputBuilder()
			.setCustomId('hobbiesInput')
			.setLabel('What\'s some of your favorite hobbies?')
			.setStyle(TextInputStyle.Paragraph);

		const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
		const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

		modal.addComponents(firstActionRow, secondActionRow);

		await interaction.showModal(modal);
		if (interaction.customId === 'myModal') {
			const favoriteColor = interaction.fields.getTextInputValue('favoriteColorInput');
			const hobbies = interaction.fields.getTextInputValue('hobbiesInput');
			console.log({ favoriteColor, hobbies });
		}
		// A mettre en choice (toggle button ? Checkbox ?)
		// le fait de si oui ou non y a une file d'attente, si c'est le cas, le champ de saisie pour le nombre de personne max s'ajoute
	},
};
