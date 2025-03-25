import { APIGatewayProxyHandler } from 'aws-lambda';
import { connectToDatabase } from 'infrastructure/db';
import Product from 'domain/productModel';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    await connectToDatabase();
    const { id } = event.pathParameters || {};
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Product not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Product deleted successfully' }),
    };
  } catch (error) {
    const err = error as Error;
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error deleting product', error: err.message }),
    };
  }
};
