import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

import { PresentationData } from "../../types/presentation";
import { getGithubRepositoryData } from "../../api/github";
import styles from "./Presentation.module.scss";

function Presentation({ user, repository }: PresentationData) {
  const [repoData, setRepoData] = useState();

  useEffect(
    function getRepositoryData() {
      if (user && repository) {
        getGithubRepositoryData(user, repository)
          .then(function handleResult(data) {
            setRepoData(data);
          })
          .catch(function handleError(error) {
            console.log(error);
          });
      }
    },
    [user, repository]
  );

  let repoJsx = null;

  if (repoData) {
    repoJsx = (
      <Typography variant="body1" align="center" gutterBottom>
        {repoData.description}
      </Typography>
    );
  }

  return (
    <div>
      <h1>
        {user} / {repository}
      </h1>
      {repoJsx}
    </div>
  );
}

export default Presentation;
