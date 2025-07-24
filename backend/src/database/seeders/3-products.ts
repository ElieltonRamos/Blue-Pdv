import { QueryInterface } from 'sequelize';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.bulkInsert(
      'products',
      [
        {
          id: 1,
          name: 'Paulista',
          code: '1',
          cost_price: 36.99,
          price: 36.99,
        },
        {
          id: 2,
          name: 'Alcatra',
          code: '2',
          cost_price: 39.99,
          price: 39.99,
        },
        {
          id: 3,
          name: 'Picanha',
          code: '3',
          cost_price: 54.99,
          price: 54.99,
        },
        {
          id: 4,
          name: 'Capa do Filé',
          code: '4',
          cost_price: 32.99,
          price: 32.99,
        },
        {
          id: 5,
          name: 'File',
          code: '5',
          cost_price: 33.99,
          price: 33.99,
        },
        {
          id: 6,
          name: 'Contra File',
          code: '6',
          cost_price: 39.99,
          price: 39.99,
        },
        {
          id: 7,
          name: 'Maminha',
          code: '7',
          cost_price: 37.99,
          price: 37.99,
        },
        {
          id: 8,
          name: 'Coxao Mole',
          code: '8',
          cost_price: 36.99,
          price: 36.99,
        },
        {
          id: 9,
          name: 'Coxao Duro',
          code: '9',
          cost_price: 36.99,
          price: 36.99,
        },
        {
          id: 10,
          name: 'Carne Moida',
          code: '10',
          cost_price: 24.99,
          price: 24.99,
        },
        {
          id: 11,
          name: 'Fraldinha',
          code: '11',
          cost_price: 31.99,
          price: 31.99,
        },
        {
          id: 12,
          name: 'Acem Bovino',
          code: '12',
          cost_price: 24.99,
          price: 24.99,
        },
        {
          id: 13,
          name: 'Miolo da Acem',
          code: '13',
          cost_price: 29.99,
          price: 29.99,
        },
        {
          id: 14,
          name: 'Carne Peixinho Bovino',
          code: '14',
          cost_price: 29.99,
          price: 29.99,
        },
        {
          id: 15,
          name: 'Carne Lombo Bovino',
          code: '15',
          cost_price: 29.99,
          price: 29.99,
        },
        {
          id: 16,
          name: 'Paleta Bovina',
          code: '16',
          cost_price: 31.99,
          price: 31.99,
        },
        {
          id: 17,
          name: 'Costela Bovina',
          code: '17',
          cost_price: 14.99,
          price: 14.99,
        },
        {
          id: 18,
          name: 'Figado Bovino',
          code: '18',
          cost_price: 21.99,
          price: 21.99,
        },
        {
          id: 19,
          name: 'Musculo',
          code: '19',
          cost_price: 23.99,
          price: 23.99,
        },
        {
          id: 20,
          name: 'Linguica Caseira',
          code: '20',
          cost_price: 24.99,
          price: 24.99,
        },
        {
          id: 21,
          name: 'Carne de Panela',
          code: '21',
          cost_price: 24.99,
          price: 24.99,
        },
        {
          id: 22,
          name: 'Carne de Feijoada',
          code: '22',
          cost_price: 23.99,
          price: 23.99,
        },
        {
          id: 23,
          name: 'Produto nao cadastrado',
          code: '23',
          cost_price: 0.99,
          price: 0.99,
        },
        {
          id: 24,
          name: 'Osso de Patin',
          code: '24',
          cost_price: 9.99, 
          price: 9.99,
        }
      ],
      {}
    );
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete('products', {});
  },
};
