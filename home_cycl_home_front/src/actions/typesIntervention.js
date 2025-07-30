import { deleteReq, getReq, postReq, putReq } from "./api";

export async function createTypeIntervention(values) {
    return await postReq("/type_interventions", values)
}

export async function updateTypeIntervention(id, values) {
    return await putReq(`/type_interventions/${id}`, values)
}

export async function deleteTypeIntervention(id) {
    return await deleteReq(`/type_interventions/${id}`)
}

export async function getTypeInterventions() {
    return await getReq("/type_interventions")
}

export async function getTypeInterventionById(id) {
    return await getReq(`/type_interventions/${id}`)
}