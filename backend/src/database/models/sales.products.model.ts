import { DataTypes, Model, ModelDefined } from 'sequelize';
import db from './index';
import SaleModel from './sale.model';
import UserModel from './user.model';
import ProductModel from './product.model';

interface SalesProductsAttributes {
  saleId: number;
  productId: number;
  quantity: number;
}

type SalesProductsModelDefined = ModelDefined<SalesProductsAttributes, SalesProductsAttributes>;

const SalesProductsModel: SalesProductsModelDefined = db.define('sales_products', {
  saleId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'sales',
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'products',
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'sales_products',
  timestamps: false,
  underscored: true,
});

SaleModel.belongsToMany(ProductModel, {
  through: SalesProductsModel,
  foreignKey: 'saleId',
  otherKey: 'productId',
  as: 'products',
});

ProductModel.belongsToMany(SaleModel, {
  through: SalesProductsModel,
  foreignKey: 'productId',
  otherKey: 'saleId',
  as: 'sales',
});

UserModel.hasMany(SaleModel, { foreignKey: 'userOperator'});

SaleModel.belongsTo(UserModel, { foreignKey: 'userOperator', as: 'operator' });

export default SalesProductsModel;
