import { handler } from '@/handlers/getProducts';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import Product from '@/domain/productModel';

describe('getProducts handler', () => {
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
      { name: 'Producto 1', category: 'Categoría A', price: 100 },
      { name: 'Producto 2', category: 'Categoría B', price: 200 },
    ]);
  });

  afterEach(async () => {
    await Product.deleteMany({});
  });

  it('debería devolver todos los productos', async () => {
    const event = {};
    const response = await handler(event as APIGatewayProxyEvent, {} as Context, () => {}) as APIGatewayProxyResult;

    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.products).toHaveLength(2);
    expect(body.products[0].name).toBe('Producto 1');
    expect(body.products[1].name).toBe('Producto 2');
  });  
});
