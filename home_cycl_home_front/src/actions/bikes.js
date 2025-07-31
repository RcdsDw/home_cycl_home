import { deleteReq, getReq, putReq, postReq } from "./api";

export async function createBike(values) {
    return await postReq("/bikes", values)
}

export async function updateBike(id, values) {
    return await putReq(`/bikes/${id}`, values)
}

export async function deleteBike(id) {
    return await deleteReq(`/bikes/${id}`)
}

export async function getBikes() {
    return await getReq("/bikes")
}

export async function getBikeById(id) {
    return await getReq(`/bikes/${id}`)
}