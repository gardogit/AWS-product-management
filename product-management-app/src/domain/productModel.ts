import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Product name is required'] },
  category: { type: String, required: [true, 'Category is required'] },
  price: { type: Number, required: [true, 'Price is required'], min: [100, 'Price must be greater than or equal to 100'] },
});

const Product = mongoose.model('Product', productSchema, 'products');
export default Product;
