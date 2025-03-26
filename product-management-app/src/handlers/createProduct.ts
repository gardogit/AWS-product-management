import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { connectToDatabase } from '../infrastructure/db';
import Product from '../domain/productModel';

export const handler: APIGatewayProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
  try {
    await connectToDatabase();
    const data = JSON.parse(event.body || '{}');
    const product = new Product(data);
    await product.save();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Product created successfully', product }),
    };
  } catch (error) {
    const err = error as Error;
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error creating product', error: err.message }),
    };
  }
};
