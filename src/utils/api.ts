import { DATABASE_URL, DATATYPE, ENDPOINTS } from "../constants/api";

export function makeGetPresentationEndpointUrl(id: string) {
  return `${DATABASE_URL}${ENDPOINTS.PRESENTATION}/${id}${DATATYPE}`;
}

export function makePostPresentationEndpointUrl() {
  return `${DATABASE_URL}${ENDPOINTS.PRESENTATION}${DATATYPE}`;
}
