import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.addColumn('sales', 'profit_sale', {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true, // Altere para false se quiser que seja obrigatório
      defaultValue: 0, // Valor padrão pode ser ajustado conforme necessário
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.removeColumn('sales', 'profit_sale');
  },
};
