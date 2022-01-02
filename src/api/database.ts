import {
  makeGetPresentationEndpointUrl,
  makePostPresentationEndpointUrl,
} from "../utils/api";
import {
  GetPresentationResponseDto,
  PostPresentationResponseDto,
} from "../types/api";

export function getPresentation(
  id: string
): Promise<GetPresentationResponseDto> {
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

export function postPresentation(): Promise<PostPresentationResponseDto> {
  return fetch(makePostPresentationEndpointUrl()).then(function handleResponse(
    response
  ) {
    if (!response.ok) {
      const responseStatus = response.status ?? 0;
      throw new Error(responseStatus.toString());
    }

    return response.json();
  });
}
