import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Emoji } from "emoji-mart";

import { PresentationData } from "../../types/presentation";
import {
  getGithubRepositoryData,
  getGithubRepositoryLast5Stargazers,
  getGithubRepositoryTop5Contributors,
} from "../../api/github";
import styles from "./Presentation.module.scss";

function Presentation({
  user,
  repository,
  textColor,
  backgroundColor,
  emoji,
}: PresentationData) {
  const [repoData, setRepoData] = useState();
  const [contributorData, setContributorData] = useState();
  const [stargazerData, setStargazerData] = useState();

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
        getGithubRepositoryTop5Contributors(user, repository)
          .then(function handleResult(data) {
            setContributorData(data);
          })
          .catch(function handleError(error) {
            console.log(error);
          });
        getGithubRepositoryLast5Stargazers(user, repository)
          .then(function handleResult(data) {
            setStargazerData(data);
          })
          .catch(function handleError(error) {
            console.log(error);
          });
      }
    },
    [user, repository]
  );

  let emojiJsx = null;
  let descriptionJsx = null;
  let infoContainerJsx = null;
  let contributorsJsx = null;
  let stargazersJsx = null;

  if (emoji) {
    emojiJsx = <Emoji emoji={emoji} native size={48} />;
  }

  if (repoData && repoData.description) {
    descriptionJsx = (
      <Typography variant="body1" gutterBottom sx={{ color: textColor }}>
        {repoData.description}
      </Typography>
    );
  }

  if (
    repoData &&
    Number.isFinite(repoData.watchers_count) &&
    Number.isFinite(repoData.forks_count) &&
    Number.isFinite(repoData.stargazers_count)
  ) {
    infoContainerJsx = (
      <div className={styles.infoContainer}>
        <Button color="primary" variant="outlined" fullWidth type="button">
          {repoData.watchers_count}
        </Button>
        <Button color="primary" variant="outlined" fullWidth type="button">
          {repoData.forks_count}
        </Button>
        <Button color="primary" variant="outlined" fullWidth type="button">
          {repoData.stargazers_count}
        </Button>
      </div>
    );
  }

  if (contributorData) {
    const contributorsListJsx = contributorData.map(function getContributorJsx(
      contributor
    ) {
      return (
        <Typography
          variant="body1"
          align="center"
          gutterBottom
          sx={{ color: textColor }}
          key={contributor.id}
        >
          {contributor.login}
        </Typography>
      );
    });

    if (contributorsListJsx.length > 0) {
      contributorsJsx = (
        <div className={styles.stargazersContainer}>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{ color: textColor }}
          >
            Top 5 contributors
          </Typography>
          {contributorsListJsx}
          <Typography
            variant="h5"
            component="h3"
            align="center"
            gutterBottom
            sx={{ color: textColor }}
          >
            Join them!
          </Typography>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="button"
            sx={{ backgroundColor }}
          >
            Fork
          </Button>
        </div>
      );
    }
  }

  if (stargazerData) {
    const stargazersListJsx = stargazerData.map(function getStargazerJsx(
      stargazer
    ) {
      return (
        <Typography
          variant="body1"
          align="center"
          gutterBottom
          sx={{ color: textColor }}
          key={stargazer.user.id}
        >
          {stargazer.user.login}
        </Typography>
      );
    });

    if (stargazersListJsx.length > 0) {
      stargazersJsx = (
        <div className={styles.stargazersContainer}>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{ color: textColor }}
          >
            First 5 stargazers
          </Typography>
          {stargazersListJsx}
          <Typography
            variant="h5"
            component="h3"
            align="center"
            gutterBottom
            sx={{ color: textColor }}
          >
            Join them!
          </Typography>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="button"
            sx={{ backgroundColor }}
          >
            Star
          </Button>
        </div>
      );
    }
  }

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.repoInfoContainer}>
            <Typography variant="h3" component="h1" sx={{ color: textColor }}>
              {emojiJsx} {user} / {repository}
            </Typography>
            {descriptionJsx}
          </div>
          {infoContainerJsx}
        </header>
        <div className={styles.peopleContainer}>
          {contributorsJsx}
          {stargazersJsx}
        </div>
      </div>
      <div style={{ backgroundColor }} className={styles.backdrop} />
    </>
  );
}

export default Presentation;
