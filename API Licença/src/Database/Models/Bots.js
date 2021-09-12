const { DataTypes, Model } = require('sequelize');

module.exports = class Usuarios extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            license: {
                type: DataTypes.STRING
            },
            botId: { 
                type: DataTypes.STRING
            },
        }, {
            tableName: 'Bots',
            timestamps: true,
            sequelize
        });
    }
}