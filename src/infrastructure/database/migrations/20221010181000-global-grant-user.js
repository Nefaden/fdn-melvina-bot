const { get } = require('lodash');
const conf = require('../../../../config/appconfig');

const { Bluebird } = conf.libs;
const { comment } = require('../../../../config/migration-logger');
const filterSchemas = require('../migration_tools/filterSchemas');

const SCHEMAS = conf.dbschemas;

const DB_APP_USER = get(process.env, 'DB_USERNAME', 'postgres');

module.exports = {
	up: async (queryInterface) => {
		comment.up(__filename);

		const schemas = await filterSchemas(
			[...Object.values(SCHEMAS), 'public'],
			queryInterface.sequelize,
		);
		const grantQueries = schemas.map((schema) => `GRANT USAGE ON SCHEMA "${schema}" TO "${DB_APP_USER}";
              GRANT SELECT, INSERT, DELETE, UPDATE ON ALL TABLES IN SCHEMA "${schema}" TO "${DB_APP_USER}";
              GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA "${schema}" TO "${DB_APP_USER}";`);
		if (schemas.includes(SCHEMAS.referentiel)) {
			grantQueries.push(
				`GRANT TRUNCATE ON ALL TABLES IN SCHEMA "${SCHEMAS.referentiel}" TO "${DB_APP_USER}";`,
			);
		}
		return Bluebird.mapSeries(grantQueries, (grantQuery) => queryInterface.sequelize.query(grantQuery));
	},
	down: () => {
		comment.down(__filename);
		return Promise.resolve();
	},
};
