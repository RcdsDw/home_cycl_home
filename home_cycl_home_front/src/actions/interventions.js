import { deleteReq, getReq, patchReq, postReq } from "./api";

export async function createIntervention(values) {
    return await postReq("/interventions/new", values)
}

export async function updateIntervention(values, id) {
    return await patchReq(`/interventions/${id}`, values)
}

export async function deleteIntervention(id) {
    return await deleteReq(`/interventions/${id}`)
}

export async function getInterventions() {
    return await getReq("/interventions")
}

export async function getInterventionById(id) {
    return await getReq(`/interventions/${id}`)
}