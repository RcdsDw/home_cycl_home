import { deleteReq, getReq, patchReq, postReq } from "./api";

export async function createZone(values) {
  return await postReq("/zones", values);
}

export async function testAddress(values) {
  return await postReq("/zones/check", values, false);
}

export async function updateZone(values, id) {
  return await patchReq(`/zones/${id}`, values);
}

export async function deleteZone(id) {
  return await deleteReq(`/zones/${id}`);
}

export async function getZones() {
  return await getReq("/zones");
}

export async function getZoneById(id) {
  return await getReq(`/zones/${id}`);
}
