import { DataTypes, Model } from 'sequelize';
import dbInstance from '../utils/DBConnection.js';


export default class Event extends Model {}

Event.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    datetime: {
        type: DataTypes.DATE,
        allowNull: false
    },   
    lat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    long: {
        type: DataTypes.STRING,
        allowNull: false
    },
    depth: {
        type: DataTypes.STRING,
        allowNull: false
    },
    magnitude: {
        type: DataTypes.STRING,
        allowNull: false
    },
    intensity: {
        type: DataTypes.STRING
    },
    place: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: dbInstance.sequelize,
    timestamps: false
});

