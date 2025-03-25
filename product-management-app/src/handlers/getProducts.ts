import { APIGatewayProxyHandler } from 'aws-lambda';
import { connectToDatabase } from 'infrastructure/db';
import Product from 'domain/productModel';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    await connectToDatabase();
    // Obtener los parámetros de consulta
    const { page = "1", limit = "10", category } = event.queryStringParameters || {};
    // Construir el filtro (si se proporciona una categoría)
    const query = category ? { category } : {};
    const products = await Product.find(query)
      .skip((Number(page) - 1) * Number(limit)) // Saltar los documentos según la página
      .limit(Number(limit));

    return {
      statusCode: 200,
      body: JSON.stringify({ products }),
    };
  } catch (error) {
    const err = error as Error;
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching products', error: err.message }),
    };
  }
};
