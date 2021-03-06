const { db: { name, username, password, hostname } } = require("../auth");
const Sequelize = require("sequelize");
const { Op } = Sequelize;
const { prefix } = require("./strings");
const sequelize = new Sequelize(name, username, password, {
	host: hostname,
	dialect: "mysql",
	logging: false,
	operatorsAliases: false,

	define: {
		charset: "utf32",
		dialectOptions: {
			collate: "utf32_unicode_ci"
		}
	}
});
Sequelize.SNOWFLAKE = Sequelize.CHAR(18);

exports.sequelize = sequelize;
exports.Sequelize = sequelize;
exports.models = {
	guildinfo: sequelize.define("guildinfos", {
		id: {
			type: Sequelize.SNOWFLAKE,
			allowNull: false,
			primaryKey: true
		},
		prefix: {
			type: Sequelize.TEXT,
			defaultValue: prefix
		},
	}),
	blacklist: sequelize.define("blacklists", {
		id: {
			type: Sequelize.SNOWFLAKE,
			allowNull: false,
			primaryKey: true
		},
	}),
	orders: sequelize.define("orders", {
		id: {
			type: Sequelize.CHAR(255),
			allowNull: false,
			primaryKey: true
		},
		user: {
			type: Sequelize.SNOWFLAKE,
			allowNull: false
		},
		description: {
			type: Sequelize.TEXT,
			validate: {
				not: /^\s*$/
			}
		},
		url: {
			type: Sequelize.TEXT
		},
		claimer: {
			type: Sequelize.SNOWFLAKE,
		},
		deliverer: {
			type: Sequelize.SNOWFLAKE,
		},
		status: {
			type: Sequelize.SNOWFLAKE,
			allowNull: false
		},
		tipped: {
			type: Sequelize.BOOLEAN,
			defaultValue: false
		},
		rated: {
			type: Sequelize.BOOLEAN,
			defaultValue: false
		},
		cookFinish: {
			type: Sequelize.DATE,
			defaultValue: new Date(3000, 12, 31)
		},
		deliverFinish: {
			type: Sequelize.DATE,
			defaultValue: new Date(3000, 12, 31)
		},
		expireFinish: {
			type: Sequelize.DATE,
			defaultValue: new Date(3000, 12, 31)
		},
		message: {
			type: Sequelize.SNOWFLAKE
		},
		channel: {
			type: Sequelize.SNOWFLAKE,
			allowNull: false
		}
	}),
};
exports.Op = Op;
