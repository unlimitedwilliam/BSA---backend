import { Sequelize } from "sequelize";
import { initModels } from "../db-export-default/init-models"

const sequelize = new Sequelize('store', 'root', '123456', {
    host: '127.0.0.1',
    dialect: 'mysql',
})

const db = {
    sequelize: sequelize, 
    Sequelize: Sequelize, 
    initModels: initModels(sequelize)
}

export default db;