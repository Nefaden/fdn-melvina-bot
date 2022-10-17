/* eslint-disable no-use-before-define */
const { isEmpty } = require('lodash');
const conf = require('../../../../config/appconfig');

const { Bluebird } = conf.libs;

const readUsersDefault = (process.env.DB_READ_ROLES || '')
	.split(',')
	.map((el) => el.trim())
	.filter(isNotEmpty);
const siduUsersDefault = (process.env.DB_SIDU_ROLES || '')
	.split(',')
	.map((el) => el.trim())
	.filter(isNotEmpty);
const filterSchemas = require('./filterSchemas');

module.exports = async function({
	sequelize,
	schemas = [],
	readUsers = readUsersDefault,
	siduUsers = siduUsersDefault,
	truncateSchemas = ['referentiel'],
	comptesExternes = {},
}) {
	const grantQueries = [];

	// eslint-disable-next-line no-unused-vars
	function executeGrant(queries) {
		return Bluebird.mapSeries(grantQueries, (grantQuery) => sequelize.query(grantQuery));
	}
	const existingSchemas = await filterSchemas(schemas, sequelize);
	existingSchemas.forEach((schema) => {
		readUsers.forEach((readUser) => {
			grantQueries.push(
				`GRANT USAGE ON SCHEMA "${schema}" TO "${readUser}";
GRANT SELECT ON ALL TABLES IN SCHEMA "${schema}" TO "${readUser}";`,
			);
		});
		siduUsers.forEach((siduUser) => {
			grantQueries.push(`GRANT USAGE ON SCHEMA "${schema}" TO "${siduUser}";
GRANT SELECT, INSERT, DELETE, UPDATE ON ALL TABLES IN SCHEMA "${schema}" TO "${siduUser}";
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA "${schema}" TO "${siduUser}";`);
			if (truncateSchemas.includes(schema)) {
				grantQueries.push(
					`GRANT TRUNCATE ON ALL TABLES IN SCHEMA "${schema}" TO "${siduUser}";`,
				);
			}
		});
		if (comptesExternes[schema]) {
			const comptes = comptesExternes[schema];
			comptes.forEach((compte) => {
				grantQueries.push(`GRANT USAGE ON SCHEMA "${schema}" TO "${compte}";
GRANT SELECT, INSERT, DELETE, UPDATE ON ALL TABLES IN SCHEMA "${schema}" TO "${compte}";
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA "${schema}" TO "${compte}";`);
			});
		}
	});

	return sequelize.transaction(async () => executeGrant(grantQueries));
};

function isNotEmpty(el) {
	return !isEmpty(el);
}
