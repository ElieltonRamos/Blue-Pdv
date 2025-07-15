import { DataTypes, Model, QueryInterface } from 'sequelize';

interface SalesProduct {
  saleId: number;
  productId: number;
  quantity: number;
}

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<SalesProduct>>('sales_products', {
      saleId: {
        field: 'sale_id',
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'sales',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      productId: {
        field: 'product_id',
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'products',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      quantity: {
        type: DataTypes.DECIMAL(10, 3),
        allowNull: false,
      },
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('sales_products');
  },
};
