import { deleteReq, getReq, putReq, postReq } from "./api";

export async function createModel(values) {
    return await postReq("/models", values)
}

export async function updateModel(id, values) {
    return await putReq(`/models/${id}`, values)
}

export async function deleteModel(id) {
    return await deleteReq(`/models/${id}`)
}

export async function getModels() {
    return await getReq("/models")
}

export async function getModelById(id) {
    return await getReq(`/models/${id}`)
}