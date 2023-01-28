import { SlashCommandBuilder } from 'discord.js';
import { ACommand } from './command';

/**
 * TODO interaction type
 */

export class FAQCommand extends ACommand {
	public static NAME = 'faq';
	public static DESCRIPTION = 'Toutes les réponses aux questions que l\' on peut souvent me poser !';

	public name = FAQCommand.NAME;

	constructor() {
		super();
		this.data = new SlashCommandBuilder()
			.setName(FAQCommand.NAME)
			.setDescription(FAQCommand.DESCRIPTION)
	}

	public execute(interaction: any) {
		try {
			interaction.reply(
				`Voici la liste des questions posées fréquemment :
				\n**Qui es-tu ?**
				Je suis Melvina, la secrétaire en quelque sorte de ce serveur discord !
				\n**Quel est ton rôle exactement ?**
				Pour le moment pas grand chose, j'ai des commandes rigolotes et je mets des réactions sous les messages de quelques élu(e)s !
				A terme je serai capable de gérer les événements que vous souhaiteriez créer ici !
				\n**Comment est-ce qu'on peut faire appel à toi ?**
				Il suffit simplement de taper le slash " / " dans la barre de texte, tu verras ma tête à côté de mes instructions !
				Essaie avec "/help" pour commencer !`,
			);
		}
		catch (error) {
			console.error(error);
		}
	}
}
