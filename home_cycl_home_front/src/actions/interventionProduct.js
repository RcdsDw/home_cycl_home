import { deleteReq, getReq, putReq, postReq } from "./api";

export async function createInterventionProduct(values) {
    return await postReq("/intervention_products", values)
}

export async function updateInterventionProduct(id, values) {
    return await putReq(`/intervention_products/${id}`, values)
}

export async function deleteInterventionProduct(id) {
    return await deleteReq(`/intervention_products/${id}`)
}

export async function getInterventionProducts() {
    return await getReq("/intervention_products")
}

export async function getInterventionProductById(id) {
    return await getReq(`/intervention_products/${id}`)
}