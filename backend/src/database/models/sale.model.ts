import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import { Sale } from '../../interfaces/sale';

type SaleInputtableTypes = Optional<Sale, 'id'>;
type SaleSequelizeModelCreator = ModelDefined<Sale, SaleInputtableTypes>;
export type SaleSequelizeModel = Model<Sale, SaleInputtableTypes>;

const SaleModel: SaleSequelizeModelCreator = db.define('sales', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  clientId: {
    field: 'client_id',
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  userOperator: {
    field: 'user_operator',
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  paymentMethod: {
    field: 'payment_method',
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalProducts: {
    field: 'total_products',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'sales',
  timestamps: false,
  underscored: true,
});

export default SaleModel;
