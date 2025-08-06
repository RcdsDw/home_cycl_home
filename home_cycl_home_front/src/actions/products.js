import { deleteReq, getReq, patchReq, postReq } from "./api";

export async function createProduct(values) {
  return await postReq("/products/new", values);
}

export async function updateProduct(values, id) {
  return await patchReq(`/products/${id}`, values);
}

export async function deleteProduct(id) {
  return await deleteReq(`/products/${id}`);
}

export async function getProducts() {
  return await getReq("/products");
}

export async function getProductById(id) {
  return await getReq(`/products/${id}`);
}
