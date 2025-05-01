import { DataTypes, Model, ModelDefined } from 'sequelize';
import db from './index';

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

export default SalesProductsModel;
