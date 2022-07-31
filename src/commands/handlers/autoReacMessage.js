require('dotenv').config();

module.exports = (message) => {
  if (message.author.id === process.env.ESPRIT_ID) {
    message.react('<:fdnPEEPODRINK:997142971185115277>');
  }
  if (message.author.id === process.env.MINIBABYMEL_ID) {
    message.react('<:fdnPEEPOPENSIVE:997142974074986546>');
  }
  if (message.author.id === process.env.PATON_ID) {
    message.react('<:fdnLUL:986340657780121680>');
    message.react('<:fdnCHAUVE:986340646111559740>');
  }

  if (message.author.id === process.env.PUMPKIN_ID) {
    message.react('🎃');
  }
  if (message.author.id === process.env.GOUPIL_ID) {
    message.react('🦊');
  }
  if (message.author.id === process.env.MONO_ID) {
    message.react('<:fdnBEBOU:986362070415048765>');
  }
};
