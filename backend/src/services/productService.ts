import ProductModel from '../database/models/product.model';
import Product from '../interfaces/product';
import { ServiceResponse } from '../interfaces/services';

async function register(product: Product): Promise<ServiceResponse<Product>> {
  const { name, code, price } = product;
  if (!name || !code || !price) {
    return {
      status: 'BAD_REQUEST',
      data: {
        message:
          'E necessario informar nome, codico e preço para cadastrar um produto',
      },
    };
  }
  const coderegistered = await ProductModel.findOne({ where: { code } });
  if (coderegistered) {
    return {
      status: 'CONFLICT',
      data: { message: 'Codico informado já cadastrado' },
    };
  }
  const productRegistered = await ProductModel.create({ name, code, price });
  if (!productRegistered) {
    return {
      status: 'SERVER_ERROR',
      data: { message: 'Erro ao cadastrar produto' },
    };
  }
  return { status: 'CREATED', data: productRegistered.dataValues };
}

export default {
  register,
};
