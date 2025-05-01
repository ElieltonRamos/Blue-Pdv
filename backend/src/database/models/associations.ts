import SaleModel from './sale.model';
import UserModel from './user.model';
import ClientModel from './client.model';
import ProductModel from './product.model';
import SalesProductsModel from './sales.products.model';

// Sale -> Client (N:1)
SaleModel.belongsTo(ClientModel, {
  foreignKey: 'client_id',
  as: 'client',
});

// Sale -> User (N:1)
SaleModel.belongsTo(UserModel, {
  foreignKey: 'user_operator',
  as: 'operator',
});

// Sale <-> Product (N:N) via SalesProducts
SaleModel.belongsToMany(ProductModel, {
  through: SalesProductsModel,
  foreignKey: 'sale_id',
  otherKey: 'product_id',
  as: 'products',
});

ProductModel.belongsToMany(SaleModel, {
  through: SalesProductsModel,
  foreignKey: 'product_id',
  otherKey: 'sale_id',
  as: 'sales',
});
