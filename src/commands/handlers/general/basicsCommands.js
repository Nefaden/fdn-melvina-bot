const faq = require('./faq');
const help = require('./help');

module.exports = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  switch (commandName) {
    case 'ping':
      try {
        await interaction.reply('Pong!');
      } catch (error) {
        console.error(error);
      }
      break;
    case 'server':
      try {
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
      } catch (error) {
        console.error(error);
      }
      break;
    case 'user':
      try {
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
      } catch (error) {
        console.error(error);
      }
      break;
    case 'dispo':
      try {
        await interaction.reply('Oui bien sûr, quand tu veux BG :point_right::point_left:');
      } catch (error) {
        console.error(error);
      }
      break;
    case 'bonjour':
      try {
        await interaction.reply('Hey .... <:fdnBEBOU:986362070415048765>');
      } catch (error) {
        console.error(error);
      }
      break;
    case 'faq':
      try {
        faq(interaction);
      } catch (error) {
        console.error(error);
      }
      break;
    case 'help':
      try {
        help(interaction);
      } catch (error) {
        console.error(error);
      }
      break;

    default:
      console.log('no command sent');
  }
};
