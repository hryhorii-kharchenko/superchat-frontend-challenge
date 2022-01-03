import { GITHUB_ENDPOINTS, GITHUB_URL } from "../constants/api";

export function getGithubRepositoryData(user: string, repository: string) {
  return fetch(`${GITHUB_URL}${GITHUB_ENDPOINTS.REPOS}/${user}/${repository}`, {
    headers: {
      accept: "application/vnd.github.v3+json",
    },
  }).then(function handleResponse(response) {
    if (!response.ok) {
      const responseStatus = response.status ?? 0;
      throw new Error(responseStatus.toString());
    }

    return response.json();
  });
}

export function getGithubRepositoryTop5Contributors(
  user: string,
  repository: string
) {
  return fetch(
    `${GITHUB_URL}${GITHUB_ENDPOINTS.REPOS}/${user}/${repository}${GITHUB_ENDPOINTS.CONTRIBUTORS}?q=contributions&order=desc&per_page=5`,
    {
      headers: {
        accept: "application/vnd.github.v3+json",
      },
    }
  ).then(function handleResponse(response) {
    if (!response.ok) {
      const responseStatus = response.status ?? 0;
      throw new Error(responseStatus.toString());
    }

    return response.json();
  });
}

export function getGithubRepositoryLast5Stargazers(
  user: string,
  repository: string
) {
  return fetch(
    `${GITHUB_URL}${GITHUB_ENDPOINTS.REPOS}/${user}/${repository}${GITHUB_ENDPOINTS.STARGAZERS}?sort=created&direction=desc`,
    {
      headers: {
        accept: "application/vnd.github.v3+json",
      },
    }
  );
}
