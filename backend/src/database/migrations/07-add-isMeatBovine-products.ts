import { DataTypes, QueryInterface } from 'sequelize';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.addColumn('products', 'is_meat_bovine', {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.removeColumn('products', 'is_meat_bovine');
  }
};
