const Sequelize = require('sequelize');
const { db } = require('../config/config');

const CollectionModel = require('./collection');
const cardDetailsModel = require('./cardDetails');


const NODE_ENV = process.env.NODE_ENV || 'development';
const databaseOptions = db[NODE_ENV];

const sequelize = new Sequelize({ ...databaseOptions, dialect: 'mysql',database: 'bnwlpkikvy8nbjhvs8m7' });

const collection = CollectionModel(sequelize, Sequelize);
const cardDetails = cardDetailsModel(sequelize, Sequelize);


module.exports = {
    collection,
    cardDetails,
    sequelize
    // Blog,
    // Tag
}
