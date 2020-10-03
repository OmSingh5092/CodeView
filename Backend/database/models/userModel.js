const Sequelize = require('sequelize');
const database = require('../database');

const userModel = database.define('doctor',{
    user_id:{
        type:Sequelize.BIGINT,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    },

    //Contact Details
    phone_number:{
        type:Sequelize.TEXT,
    },
    email:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    name:Sequelize.TEXT,


    created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: Sequelize.DATE,
    deleted_at: Sequelize.DATE

})

module.exports = userModel;