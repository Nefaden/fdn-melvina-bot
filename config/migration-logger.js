const fs = require('fs');
const path = require('path');

function createrLogger() {
  if (process.env.MIGRATION_LOG_FILE) {
    const sqlFile = `${process.env.MIGRATION_LOG_FILE}`;
    const sqlStream = fs.createWriteStream(sqlFile, { flags: 'a' });
    return function (item) {
      sqlStream.write(`${item}\n`);
    };
  }
  if (process.env.MIGRATION_LOG_CONSOLE) {
    return function (item) {
      console.log(item);
    };
  }
  return false;
}

function extractSQL(str) {
  const matcher = /Executing \([a-zA-Z0-9-]+\): /;
  return str.replace(matcher, '');
}

function commentTimestamp() {
  const now = new Date();
  return `${now.toLocaleString('fr-FR')}.${now.getMilliseconds()}`;
}

const logger = createrLogger();
module.exports = {
  logSQL: (item) => {
    if (logger) logger(extractSQL(item));
  },
  comment: {
    up: (fileName) => {
      if (logger) { logger(`\n-- ${commentTimestamp()}\n-- UP ${path.basename(fileName)}`); }
    },
    down: (fileName) => {
      if (logger) {
        logger(
          `\n-- ${commentTimestamp()}\n-- DOWN ${path.basename(fileName)}`,
        );
      }
    },
  },
};
