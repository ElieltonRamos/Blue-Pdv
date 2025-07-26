import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import Product from '../../interfaces/product';

type UserInputtableTypes = Optional<Product, 'id'>;
type UserSequelizeModelCreator = ModelDefined<Product, UserInputtableTypes>;
export type UserSequelizeModel = Model<Product, UserInputtableTypes>;

const ProductModel: UserSequelizeModelCreator = db.define('Product', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  costPrice: {
    field: 'cost_price',
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'products',
  timestamps: false,
  underscored: true,
});

export default ProductModel;
