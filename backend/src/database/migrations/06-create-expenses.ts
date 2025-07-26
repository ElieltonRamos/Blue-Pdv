import { DataTypes, Model, QueryInterface } from 'sequelize';
import Expense from '../../interfaces/Expense';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Expense>>('expenses', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      supplier: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      datePayment: {
        field: 'date_payment',
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('expenses');
  },
};
