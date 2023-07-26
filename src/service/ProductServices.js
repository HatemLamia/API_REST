import axios from "axios";

const API_URL = "https://rzhpt7-4000.csb.app/products";

export const getProducts = () => {
  return axios.get(API_URL);
};

export const saveProduct = (product) => {
  if (product.id) {
    return axios.put(`${API_URL}/${product.id}`, product);
  } else {
    return axios.post(API_URL, product);
  }
};

export const deleteProduct = (productId) => {
  return axios.delete(`${API_URL}/${productId}`);
};

export const searchProductByName = (name) => {
  return axios.get(`${API_URL}?name=${name}`);
};
