const { SlashCommandBuilder } = require('discord.js');
const {
	ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create-outing')
		.setDescription('Ouverture d\'une fenêtre pour créer un événement'),
	async execute(interaction) {
		const modal = new ModalBuilder()
			.setCustomId('createOuting')
			.setTitle('Créer un événement');

		const nameInput = new TextInputBuilder()
			.setCustomId('nameInput')
			.setLabel('Nom de l\'événement :')
			.setStyle(TextInputStyle.Short);

		const descriptionInput = new TextInputBuilder()
			.setCustomId('descriptionInput')
			.setLabel('Une description pour cet événement :')
			.setStyle(TextInputStyle.Paragraph);

		const startDate = new TextInputBuilder()
			.setCustomId('startDate')
			.setLabel('Date du début de l\'événement : ')
			.setStyle(TextInputStyle.Short);

		const endDate = new TextInputBuilder()
			.setCustomId('endDate')
			.setLabel('Date de fin de l\'événement : ')
			.setStyle(TextInputStyle.Short);

		const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
		const secondActionRow = new ActionRowBuilder().addComponents(descriptionInput);
		const thirdActionRow = new ActionRowBuilder().addComponents(startDate);
		const fourthActionRow = new ActionRowBuilder().addComponents(endDate);

		modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);

		await interaction.showModal(modal);
		console.log('test');
		if (interaction.customId === 'createOuting') {
			console.log('test2');
			const name = interaction.fields.getTextInputValue('nameInput');
			const desc = interaction.fields.getTextInputValue('descriptionInpiut');
			const date = interaction.fields.getTextInputValue('startDate');
			console.log({ name, desc, date });
		}
		// A mettre en choice (toggle button ? Checkbox ?)
		// le fait de si oui ou non y a une file d'attente, si c'est le cas, le champ de saisie pour le nombre de personne max s'ajoute
	},
};
