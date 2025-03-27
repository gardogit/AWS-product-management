import { handler } from '@/handlers/searchProducts';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import Product from '@/domain/productModel';

describe('searchProducts handler', () => {
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

  beforeEach(async () => {
    await Product.insertMany([
      { name: 'Producto A', category: 'Categoría X', price: 100 },
      { name: 'Producto B', category: 'Categoría Y', price: 200 },
    ]);
  });

  afterEach(async () => {
    await Product.deleteMany({});
  });

  it('debería devolver productos que coincidan con el término de búsqueda', async () => {
    const event = {
      queryStringParameters: { keyword: 'Producto' },
      body: '',
      headers: {},
      multiValueHeaders: {},
      httpMethod: 'GET',
      isBase64Encoded: false,
      path: '/products/search',
      pathParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: {} as APIGatewayProxyEvent['requestContext'],
      resource: ''
    };

    const response = await handler(event as APIGatewayProxyEvent, {} as Context, () => {}) as APIGatewayProxyResult;

    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.products).toHaveLength(2);
  });

  it('debería devolver un array vacío si no hay coincidencias', async () => {
    const event = {
      queryStringParameters: { keyword: 'Inexistente' },
      body: '',
      headers: {},
      multiValueHeaders: {},
      httpMethod: 'GET',
      isBase64Encoded: false,
      path: '/products/search',
      pathParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: {} as APIGatewayProxyEvent['requestContext'],
      resource: ''
    };

    const response = await handler(event as APIGatewayProxyEvent, {} as Context, () => {}) as APIGatewayProxyResult;

    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.products).toHaveLength(0);
  });
});
