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
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalProductsWithoutDiscount: {
    field: 'total_products_without_discount',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  discount: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  isPaid: {
    field: 'is_paid',
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  profitSale: {
    field: 'profit_sale',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'sales',
  timestamps: false,
  underscored: true,
});

export default SaleModel;
