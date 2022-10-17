const Bluebird = require('bluebird').getNewLibraryCopy();
const LoopBench = require('loopbench');

const loopBench = LoopBench();

const defaultConfig = {
	bluebirdScheduler: process.nextTick,
	libs: {
		Bluebird,
		loopBench,
	},
	serverTimeout: 300000,
	dbschemas: {
		discordevent: 'discordevent',
	},
	features: {},
	defaultTz: 'Europe/Paris',
	validationRules: {
		id: {
			field: 'id',
			required: true,
			type: 'string',
			isUUID: true,
		},
	},
};

defaultConfig.libs.Bluebird.setScheduler(defaultConfig.bluebirdScheduler);

module.exports = defaultConfig;
