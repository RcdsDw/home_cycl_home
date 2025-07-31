import { deleteReq, getReq, putReq, postReq } from "./api";

export async function createBrand(values) {
    return await postReq("/brands", values)
}

export async function updateBrand(id, values) {
    return await putReq(`/brands/${id}`, values)
}

export async function deleteBrand(id) {
    return await deleteReq(`/brands/${id}`)
}

export async function getBrands() {
    return await getReq("/brands")
}

export async function getBrandById(id) {
    return await getReq(`/brands/${id}`)
}