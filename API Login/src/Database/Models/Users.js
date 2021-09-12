const { DataTypes, Model } = require('sequelize');

module.exports = class Usuarios extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nome: {
                type: DataTypes.STRING
            },
            email: { 
                type: DataTypes.STRING
            },
            senha: {
                type: DataTypes.STRING
            },
            admin: {
                type: DataTypes.BOOLEAN
            },
        }, {
            tableName: 'Usuarios',
            timestamps: true,
            sequelize
        });
    }
}