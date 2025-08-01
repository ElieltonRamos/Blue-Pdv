import { Op } from 'sequelize';
import ProductModel from '../database/models/product.model';
import Product from '../interfaces/product';
import { PaginatedResponse, ServiceResponse } from '../interfaces/services';

const productNotFound = 'Produto não encontrado';

async function register(product: Product): Promise<ServiceResponse<Product>> {
  const { name, code, price, costPrice } = product;
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
  const productRegistered = await ProductModel.create({ name, code, price, costPrice });
  if (!productRegistered) {
    return {
      status: 'SERVER_ERROR',
      data: { message: 'Erro ao cadastrar produto' },
    };
  }
  return { status: 'CREATED', data: productRegistered.dataValues };
}

async function getAllProducts(page: number, pageLimit: number)
  : Promise<ServiceResponse<PaginatedResponse<Product>>> {
  if (page < 1 || pageLimit < 1 || isNaN(page) || isNaN(pageLimit)) {
    const message = 'A pagina ou a quantidade de itens por pagina esta incorreto';
    return { status: 'BAD_REQUEST', data: { message } };
  }
  const offset = (page - 1) * pageLimit;

  const { count, rows } = await ProductModel.findAndCountAll({
    limit: pageLimit,
    offset,
  });

  const allProducts = rows.map((client) => client.dataValues);
  const totalPages = Math.ceil(count / pageLimit);

  return {
    status: 'OK',
    data: {
      data: allProducts,
      total: count,
      page,
      limit: pageLimit,
      totalPages,
    },
  };
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

  if (verifyCode && verifyCode.dataValues.id !== id) {
    return {
      status: 'CONFLICT',
      data: { message: 'Código informado já cadastrado' },
    };
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

async function sugestionCode(): Promise<ServiceResponse<{ code: number }>> {
  const lastProduct = await ProductModel.findOne({
    order: [['id', 'DESC']],
  });
  const lastCode = Number(lastProduct?.dataValues.code);
  if (!lastProduct || isNaN(lastCode)) return { status: 'OK', data: {code: 1234} };

  const code =  lastCode + 1;
  return { status: 'OK', data: { code } };
}

export default {
  register,
  getAllProducts,
  getProductById,
  getProductByCode,
  getProductByName,
  updateProduct,
  deleteProduct,
  sugestionCode,
};
