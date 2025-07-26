import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import Client from '../../interfaces/client';

type UserInputtableTypes = Optional<Client, 'id'>;
type UserSequelizeModelCreator = ModelDefined<Client, UserInputtableTypes>;
export type UserSequelizeModel = Model<Client, UserInputtableTypes>;

const ClientModel: UserSequelizeModelCreator = db.define('Client', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'clients',
  timestamps: false,
  underscored: true,
});

export default ClientModel;
