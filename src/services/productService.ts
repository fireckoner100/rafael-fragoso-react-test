import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

export const createProduct = async (productData: any) => {
  try {
    const response = await axios.post(API_URL, productData);
    return response.data;
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};
