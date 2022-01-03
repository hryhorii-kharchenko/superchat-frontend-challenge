import { DATABASE_URL, DATATYPE, DATABASE_ENDPOINTS } from "../constants/api";

export function makeGetPresentationEndpointUrl(id: string) {
  return `${DATABASE_URL}${DATABASE_ENDPOINTS.PRESENTATION}/${id}${DATATYPE}`;
}

export function makePostPresentationEndpointUrl() {
  return `${DATABASE_URL}${DATABASE_ENDPOINTS.PRESENTATION}${DATATYPE}`;
}
