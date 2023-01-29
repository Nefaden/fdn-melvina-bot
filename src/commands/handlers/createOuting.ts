import {
	ActionRowBuilder, CommandInteraction, Interaction, ModalBuilder, SlashCommandBuilder, TextInputBuilder,
	TextInputStyle, ModalSubmitInteraction
} from 'discord.js';
import { ACommand } from './command';

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

	public execute(interaction: Interaction) {
		const commandInteraction = interaction as CommandInteraction;
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

			const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput) as any;
			const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

			modal.addComponents(firstActionRow, secondActionRow);

			commandInteraction.showModal(modal).then(() => {
				const modalSubmitInteraction = interaction as ModalSubmitInteraction;
				if (modalSubmitInteraction.customId === 'myModal') {
					const favoriteColor = modalSubmitInteraction.fields.getTextInputValue('favoriteColorInput');
					const hobbies = modalSubmitInteraction.fields.getTextInputValue('hobbiesInput');
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
