import { SlashCommandBuilder, Interaction, CommandInteraction } from 'discord.js';
import { ACommand } from './command';

export class HelpCommand extends ACommand {
	public static NAME = 'help';
	public static DESCRIPTION = 'Toute l\'aide dont tu as besoin pour utiliser le bot !';

	public name = HelpCommand.NAME;

	constructor() {
		super();
		this.data = new SlashCommandBuilder()
			.setName(HelpCommand.NAME)
			.setDescription(HelpCommand.DESCRIPTION)
	}

	public execute(interaction: Interaction) {
		const commandInteraction = interaction as CommandInteraction;
		try {
			commandInteraction.reply(
				`Tu as ici la liste des différentes commandes (commençant par " / ") disponible : 
				- **ping** : je te répondrai par mon plus beau Pong!
				- **server** : je te fournirai le nom du serveur où on est ainsi que le nombre des utilisateurs présents (bots inclus)
				- **user** :  je répondrai avec ton tag et ton id discord
				- **dispo** : tu sauras comme ça si je suis dispo pour toi ou pas ....
				- **bonjour** : parce que je suis polie, je te réponds quand tu me dis bonjour ..
				- **faq** : je répondrai avec la liste des différentes questions que l'ont me pose souvent`,
			);
		}
		catch (error) {
			console.error(error);
		}
	}
}
