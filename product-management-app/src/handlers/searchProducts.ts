import { APIGatewayProxyHandler } from 'aws-lambda';
import { connectToDatabase } from '../infrastructure/db';
import Product from '../domain/productModel';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    await connectToDatabase();
    // Obtener el término de búsqueda desde los parámetros de consulta
    const { keyword = "" } = event.queryStringParameters || {};
    // Realizar la búsqueda (case-insensitive)
    const products = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ products }),
    };
  } catch (error) {
    const err = error as Error;
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error searching products', error: err.message }),
    };
  }
};
