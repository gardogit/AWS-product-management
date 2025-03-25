import { APIGatewayProxyHandler } from 'aws-lambda';
import { connectToDatabase } from 'infrastructure/db';
import Product from 'domain/productModel';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    await connectToDatabase();
    const { id } = event.pathParameters || {};
    const product = await Product.findById(id);

    if (!product) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Product not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ product }),
    };
  } catch (error) {
    const err = error as Error;
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching product', error: err.message }),
    };
  }
};
