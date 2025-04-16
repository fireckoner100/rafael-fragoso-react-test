export interface LoginFormData {
    email: string;
    password: string;
    confirmPassword: string;
  }

export interface ProductForm {
  title: string;
  price: number;
  description: string;
  image: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductsInterface {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface Character {
    id: number;
    name: string;
    species: string;
    gender: string;
    image: string;
    created: string;
}