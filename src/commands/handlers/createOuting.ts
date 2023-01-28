import { ActionRowBuilder, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
import { ACommand } from './command';

/**
 * TODO interaction type
 */
export class CreateOutingCommand extends ACommand {
	public static NAME = 'create-outing';
	public static DESCRIPTION = 'Ouverture d\'une fenêtre pour créer un événement';

	public name = CreateOutingCommand.NAME;

	constructor() {
		super();
		this.data = new SlashCommandBuilder()
			.setName(CreateOutingCommand.NAME)
			.setDescription(CreateOutingCommand.DESCRIPTION)
	}

	public execute(interaction: any) {
		try {
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

			/**
			 * TODO as any
			 */
			const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput) as any;
			const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

			modal.addComponents(firstActionRow, secondActionRow);

			interaction.showModal(modal).then(() => {
				if (interaction.customId === 'myModal') {
					const favoriteColor = interaction.fields.getTextInputValue('favoriteColorInput');
					const hobbies = interaction.fields.getTextInputValue('hobbiesInput');
					console.log({ favoriteColor, hobbies });
				}
				// A mettre en choice (toggle button ? Checkbox ?)
				// le fait de si oui ou non y a une file d'attente, si c'est le cas, le champ de saisie pour le nombre de personne max s'ajoute
			});
		}
		catch (error) {
			console.error(error);
		}
	}
}
