import {
  makeGetPresentationEndpointUrl,
  makePostPresentationEndpointUrl,
} from "../utils/api";
import { PostPresentationResponseDto } from "../types/api";
import { PresentationData } from "../types/presentation";

export function getPresentation(id: string): Promise<PresentationData> {
  return fetch(makeGetPresentationEndpointUrl(id)).then(function handleResponse(
    response
  ) {
    if (!response.ok) {
      const responseStatus = response.status ?? 0;
      throw new Error(responseStatus.toString());
    }

    return response.json();
  });
}

export function postPresentation(
  presentation: PresentationData
): Promise<PostPresentationResponseDto> {
  return fetch(makePostPresentationEndpointUrl(), {
    method: "POST",
    body: JSON.stringify(presentation),
  }).then(function handleResponse(response) {
    if (!response.ok) {
      const responseStatus = response.status ?? 0;
      throw new Error(responseStatus.toString());
    }

    return response.json();
  });
}
