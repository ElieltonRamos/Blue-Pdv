import { DataTypes, Model, QueryInterface } from 'sequelize';
import Product from '../../interfaces/product';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Product>>('products', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
        type: DataTypes.DECIMAL(10, 2), // até 10 dígitos no total, 2 após a vírgula
        allowNull: false,
      },
      costPrice: {
        field: 'cost_price',
        type: DataTypes.DECIMAL(10, 2), // até 10 dígitos no total, 2 após a vírgula
        allowNull: false,
      },
      isMeatBovine: {
        field: 'is_meat_bovine',
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, // Valor padrão para isMeatBovine
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('products');
  }
};
