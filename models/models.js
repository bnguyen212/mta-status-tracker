const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: 'postgres',
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false
		}
	},
	logging: false
});

const Record = sequelize.define('record', {
	routeName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	datetime: {
		type: DataTypes.DATE,
		allowNull: false
	},
	delay: {
		type: DataTypes.BOOLEAN,
		allowNull: false
	}
});

async function auth() {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
		sequelize.sync();
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

auth();

module.exports = { Record };
