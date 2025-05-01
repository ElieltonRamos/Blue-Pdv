import SaleModel from './sale.model';
import UserModel from './user.model';
import ClientModel from './client.model';
import ProductModel from './product.model';
import SalesProductsModel from './sales.products.model';

// Sale -> Client (N:1)
SaleModel.belongsTo(ClientModel, {
  foreignKey: 'clientId',
  as: 'client',
});

// Sale -> User (N:1)
SaleModel.belongsTo(UserModel, {
  foreignKey: 'userOperator',
  as: 'operator',
});

// Sale <-> Product (N:N) via SalesProducts
SaleModel.belongsToMany(ProductModel, {
  through: SalesProductsModel,
  foreignKey: 'saleId',
  otherKey: 'productId',
  as: 'products',
});

ProductModel.belongsToMany(SaleModel, {
  through: SalesProductsModel,
  foreignKey: 'productId',
  otherKey: 'saleId',
  as: 'sales',
});
