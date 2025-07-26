import { deleteReq, getReq, patchReq, postReq } from "./api";

export async function createUser(values) {
    return await postReq("/users/new", values)
}

export async function updateUser(values, id) {
    return await patchReq(`/users/${id}`, values)
}

export async function deleteUser(id) {
    return await deleteReq(`/users/${id}`)
}

export async function getUsers() {
    return await getReq("/users")
}

export async function getUserById(id) {
    return await getReq(`/users/${id}`)
}

export async function getTechUsers() {
    return await getReq(`/users?roles=ROLE_TECH`)
}

export async function getUsersBikes(id) {
    console.log("🚀 ~ getUsersBikes ~ id:", id)
    return await getReq(`/users/${id}/bikes`)
}