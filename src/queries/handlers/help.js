module.exports = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'help') {
    try {
      await interaction.reply(
        `
        Tu as ici la liste des différentes commandes (commençant par " / ") disponible : 
        - **ping** : je te répondrai par mon plus beau Pong!
        - **server** : je te fournirai le nom du serveur où on est ainsi que le nombre des utilisateurs présents (bots inclus)
        - **user** :  je répondrai avec ton tag et ton id discord
        - **dispo** : tu sauras comme ça si je suis dispo pour toi ou pas ....
        - **bonjour** : parce que je suis polie, je te réponds quand tu me dis bonjour ..
        - **faq** : je répondrai avec la liste des différentes questions que l'ont me pose souvent ;)
        `,
      );
    } catch (error) {
      console.error(error);
    }
  }
};
