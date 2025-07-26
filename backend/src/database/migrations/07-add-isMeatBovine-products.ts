import { DataTypes, QueryInterface } from 'sequelize';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.addColumn('products', 'isMeatBovine', {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.removeColumn('products', 'isMeatBovine');
  }
};
