module.exports = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    try {
      await interaction.reply('Pong!');
    } catch (error) {
      console.error(error);
    }
  } else if (commandName === 'server') {
    try {
      await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    } catch (error) {
      console.error(error);
    }
  } else if (commandName === 'user') {
    try {
      await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    } catch (error) {
      console.error(error);
    }
  } else if (commandName === 'dispo') {
    try {
      await interaction.reply('Oui bien sûr, quand tu veux BG :point_right::point_left:');
    } catch (error) {
      console.error(error);
    }
  } else if (commandName === 'bonjour') {
    try {
      await interaction.reply('Hey .... <:fdnBEBOU:986362070415048765>');
    } catch (error) {
      console.error(error);
    }
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
};
