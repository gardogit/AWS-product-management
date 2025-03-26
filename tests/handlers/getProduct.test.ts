import { handler } from '../../src/handlers/getProduct';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import Product from '../../src/domain/productModel';

describe('getProduct handler', () => {
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
      name: 'Producto de prueba',
      category: 'Categoría de prueba',
      price: 100,
    });
    productId = product._id.toString();
  });

  afterEach(async () => {
    await Product.deleteMany({});
  });

  it('debería devolver un producto existente', async () => {
    const event = {
      pathParameters: { id: productId },
      body: null,
      headers: {},
      multiValueHeaders: {},
      httpMethod: 'GET',
      isBase64Encoded: false,
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: {} as APIGatewayProxyEvent['requestContext'],
      resource: '',
      path: '/products/' + productId
    };

    const response = await handler(event as APIGatewayProxyEvent, {} as Context, () => {}) as APIGatewayProxyResult;

    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.product).toBeDefined();
    expect(body.product.name).toBe('Producto de prueba');
  });

  it('debería devolver un error 404 si el producto no existe', async () => {
    const event = {
      pathParameters: { id: 'nonexistentid123' },
      body: null,
      headers: {},
      multiValueHeaders: {},
      httpMethod: 'GET',
      isBase64Encoded: false,
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: {} as APIGatewayProxyEvent['requestContext'],
      resource: '',
      path: '/products/nonexistentid123'
    };

    const response = await handler(event as APIGatewayProxyEvent, {} as Context, () => {}) as APIGatewayProxyResult;

    expect(response).toBeDefined();
    expect(response.statusCode).toBe(404);
    const body = JSON.parse(response.body);
    expect(body.message).toBe('Product not found');
  });
});
