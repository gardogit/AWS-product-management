import { APIGatewayProxyHandler } from 'aws-lambda';
import { connectToDatabase } from 'infrastructure/db';
import Product from 'domain/productModel';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    await connectToDatabase();
    const { id } = event.pathParameters || {};
    const data = JSON.parse(event.body || '{}');
    const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });

    if (!updatedProduct) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Product not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Product updated successfully', product: updatedProduct }),
    };
  } catch (error) {
    const err = error as Error;
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error updating product', error: err.message }),
    };
  }
};
