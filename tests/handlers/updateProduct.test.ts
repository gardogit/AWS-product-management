import { handler } from '@/handlers/updateProduct';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import Product from '@/domain/productModel';

describe('updateProduct handler', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    process.env.MONGO_URI = uri;
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  let productId: string;

  beforeEach(async () => {
    const product = await Product.create({
      name: 'Producto original',
      category: 'Categoría original',
      price: 100,
    });
    productId = product._id.toString();
  });

  afterEach(async () => {
    await Product.deleteMany({});
  });

  it('debería actualizar un producto existente', async () => {
    const event = {
      pathParameters: { id: productId },
      body: JSON.stringify({ name: 'Producto actualizado', price: 150 }),
      headers: {},
      multiValueHeaders: {},
      httpMethod: 'PUT',
      isBase64Encoded: false,
      path: `/products/${productId}`,
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: {} as APIGatewayProxyEvent['requestContext'],
      resource: ''
    };

    const response = await handler(event as APIGatewayProxyEvent, {} as Context, () => {}) as APIGatewayProxyResult;

    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.message).toBe('Product updated successfully');
    expect(body.product.name).toBe('Producto actualizado');
    expect(body.product.price).toBe(150);
  });

  it('debería devolver un error 404 si el producto no existe', async () => {
    const event = {
      pathParameters: { id: 'nonexistentid123' },
      body: JSON.stringify({ name: 'Producto actualizado', price: 150 }),
      headers: {},
      multiValueHeaders: {},
      httpMethod: 'PUT',
      isBase64Encoded: false,
      path: `/products/${productId}`,
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: {} as APIGatewayProxyEvent['requestContext'],
      resource: ''
    };

    const response = await handler(event as APIGatewayProxyEvent, {} as Context, () => {}) as APIGatewayProxyResult;

    expect(response).toBeDefined();
    expect(response.statusCode).toBe(404);
    const body = JSON.parse(response.body);
    expect(body.message).toBe('Product not found');
  });
});
