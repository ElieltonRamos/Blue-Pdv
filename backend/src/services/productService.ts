import { Op } from 'sequelize';
import ProductModel from '../database/models/product.model';
import Product from '../interfaces/product';
import { ServiceResponse } from '../interfaces/services';

const productNotFound = 'Produto não encontrado';

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

async function getAllProducts(): Promise<ServiceResponse<Product[]>> {
  const products = await ProductModel.findAll();
  if (!products) {
    return {
      status: 'SERVER_ERROR',
      data: { message: 'Erro ao buscar produtos' },
    };
  }
  const allProducts = products.map((product) => product.dataValues);
  return { status: 'OK', data: allProducts };
}

async function getProductById(id: number): Promise<ServiceResponse<Product>> {
  const product = await ProductModel.findByPk(id);
  if (!product) {
    return {
      status: 'NOT_FOUND',
      data: { message: productNotFound },
    };
  }
  return { status: 'OK', data: product.dataValues };
}

async function getProductByCode(
  code: string
): Promise<ServiceResponse<Product>> {
  const product = await ProductModel.findOne({ where: { code } });
  if (!product) {
    return {
      status: 'NOT_FOUND',
      data: { message: productNotFound },
    };
  }
  return { status: 'OK', data: product.dataValues };
}

async function getProductByName(
  name: string
): Promise<ServiceResponse<Product[]>> {
  const products = await ProductModel.findAll({
    where: {
      name: {
        [Op.like]: `%${name}%`,
      },
    },
  });
  if (!products || products.length === 0) {
    return { status: 'NOT_FOUND', data: { message: productNotFound } };
  }
  const foundProducts = products.map((product) => product.dataValues);
  return { status: 'OK', data: foundProducts };
}

async function updateProduct( id: number, product: Product ): Promise<ServiceResponse<Product>> {

  const { name, code, price } = product;
  if (!name || !code || !price) {
    return {
      status: 'BAD_REQUEST',
      data: { message: 'E necessario informar nome, codico e preço para atualizar um produto' },
    };
  }

  const verifyCode = await ProductModel.findOne({ where: { code } });
  const codeOK = verifyCode && verifyCode.dataValues.id !== id;
  if (codeOK && verifyCode.dataValues.code === code) {
    return { status: 'CONFLICT', data: { message: 'Codico informado já cadastrado' } };
  }

  await ProductModel.update({ name, code, price }, { where: { id } });
  const updatedProduct = await ProductModel.findByPk(id);
  if (!updatedProduct) {
    return { status: 'SERVER_ERROR', data: { message: 'Erro ao atualizar produto' } };
  }

  return { status: 'OK', data: updatedProduct.dataValues };
}

async function deleteProduct(id: number): Promise<ServiceResponse<null>> {
  const productToDelete = await ProductModel.findByPk(id);
  if (!productToDelete) {
    return {
      status: 'NOT_FOUND',
      data: { message: productNotFound },
    };
  }
  await ProductModel.destroy({ where: { id } });
  return { status: 'NO_CONTENT', data: null };
}

export default {
  register,
  getAllProducts,
  getProductById,
  getProductByCode,
  getProductByName,
  updateProduct,
  deleteProduct,
};
