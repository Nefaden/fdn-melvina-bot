/* eslint-disable no-use-before-define */
const Sequelize = require('sequelize');
const conf = require('../../../../config/appconfig');

const { Bluebird } = conf.libs;

const DB_NAME = process.env.DB_MASTER_NAME || process.env.DB_NAME;

async function filterSchemas(sourceSchemas, sequelize, transaction) {
	return Bluebird.map(sourceSchemas.filter(dedupFilter), (schema) => {
		const query = 'select count(*) as count from information_schema.schemata WHERE catalog_name = $dbname AND schema_name = $schemaname';
		return sequelize
			.query(query, {
				type: Sequelize.QueryTypes.SELECT,
				bind: {
					dbname: DB_NAME,
					schemaname: schema,
				},
				transaction,
			})
			.then((response) => ({
				schema,
				exists: response[0].count === '1',
			}));
	})
		.filter((schemaObj) => schemaObj.exists)
		.map((schemaObj) => schemaObj.schema);
}

module.exports = filterSchemas;

function dedupFilter(currentItem, itemIndex, allItems) {
	return allItems.indexOf(currentItem) === itemIndex;
}
