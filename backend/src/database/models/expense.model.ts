import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import Expense from '../../interfaces/Expense';

type ExpenseInputtableTypes = Optional<Expense, 'id'>;
type ExpenseSequelizeModelCreator = ModelDefined<Expense, ExpenseInputtableTypes>;
export type ExpenseSequelizeModel = Model<Expense, ExpenseInputtableTypes>;

const ExpenseModel: ExpenseSequelizeModelCreator = db.define('Expense', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  supplier: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Pago', 'Pendente', 'Atrasado'),
    allowNull: false,
  },
  datePayment: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'expenses',
  timestamps: false,
  underscored: true,
});

export default ExpenseModel;
