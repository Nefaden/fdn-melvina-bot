require('dotenv').config();
const logger = require('./migration-logger');

const defaultValues = {
	seederStorage: 'sequelize',
	seederStorageTableName: 'SequelizeData',
};

const DEFAULT_POSTGRES_PORT = 5432;

const commonConfig = {
	logging: logger.logSQL,
	...defaultValues,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PSWD,
	database: process.env.DB_NAME,
	host: process.env.IP_DATABASE,
	dialect: 'postgres',
	port: Number(
		process.env.PORT_DATABASE || DEFAULT_POSTGRES_PORT,
	),
};

const config = {
	development: commonConfig,
	test: commonConfig,
	production: commonConfig,
};

module.exports = config;
