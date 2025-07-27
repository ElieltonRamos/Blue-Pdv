import { DataTypes, Model, QueryInterface } from 'sequelize';
import { Sale } from '../../interfaces/sale';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Sale>>('sales', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      clientId: {
        field: 'client_id',
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'clients',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      userOperator: {
        field: 'user_operator',
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      discount: {
        type: DataTypes.DECIMAL(10, 2),
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
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('sales');
  },
};
