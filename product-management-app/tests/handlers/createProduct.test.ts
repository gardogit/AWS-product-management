import { handler } from '../../src/handlers/createProduct';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import Product from '../../src/domain/productModel';

describe('createProduct handler', () => {
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

  afterEach(async () => {
    await Product.deleteMany({});
  });

  it('debería crear un producto y devolver un código 201', async () => {
    const event = {
      body: JSON.stringify({
        name: 'Producto de prueba',
        category: 'Categoría de prueba',
        price: 200,
      }),
    };

    const response = await handler(event as APIGatewayProxyEvent, {} as Context, () => {}) as APIGatewayProxyResult;

    expect(response).toBeDefined();
    expect(response.statusCode).toBe(201);
    const body = JSON.parse(response.body);
    expect(body.message).toBe('Product created successfully');
    expect(body.product).toMatchObject({
      name: 'Producto de prueba',
      category: 'Categoría de prueba',
      price: 200,
    });

    const productInDb = await Product.findOne({ name: 'Producto de prueba' });
    expect(productInDb).not.toBeNull();
    expect(productInDb?.name).toBe('Producto de prueba');
  });

  it('debería devolver un error si los datos son inválidos', async () => {
    const event = {
      body: JSON.stringify({
        category: 'Categoría de prueba',
        price: 50,
      }),
    };

    const response = await handler(event as APIGatewayProxyEvent, {} as Context, () => {}) as APIGatewayProxyResult;

    expect(response).toBeDefined();
    expect(response.statusCode).toBe(500);
    const body = JSON.parse(response.body);
    expect(body.message).toBe('Error creating product');
    expect(body.error).toContain('Product validation failed');
  });
});
