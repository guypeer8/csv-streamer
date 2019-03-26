const { getCsvFiles, getCsvHeader } = require('./csv');
const { DB_STORAGE } = require('../bin/config');
const Sequelize = require('sequelize');

let AppModel;

const sequelize = new Sequelize({
    dialect: 'sqlite',
    logging: false,
    storage: DB_STORAGE,
});

function defineAppModel(header) {
    const model = {};
    header
        .split(',')
        .map(h => h.trim())
        .forEach(col => {
            model[col] = {
                type: Sequelize.STRING,
                allowNull: false,
            };
        });

    return model;
}

function validateAppModel() {
    if (!AppModel)
        throw new Error('Please run "start" to run the db');
}

function start(header, name = 'app') {
    !AppModel && (AppModel = sequelize.define(name, defineAppModel(header)));
}

async function create(records) {
    validateAppModel();
    let _records = records;
    if (!Array.isArray(records))
        _records = [records];

    await AppModel.sync();
    await AppModel.bulkCreate(_records);
}

function find(recordAttributes) {
    validateAppModel();
    if (!recordAttributes)
        return AppModel.findAll();

    return AppModel.findAll({ where: recordAttributes });
}

async function read() {
    const files = await getCsvFiles();
    const header = await getCsvHeader(files[0]);
    start(header);
    const apps = await find();
    return JSON.stringify(apps, null, 2);
}

module.exports = {
    start,
    create,
    find,
    read,
};
