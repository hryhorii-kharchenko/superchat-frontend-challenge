import { useRouter } from "next/router";
import Button from "@mui/material/Button";

import { useEffect } from "react";
import { text } from "stream/consumers";
import Presentation from "../src/components/Presentation/Presentation";

import { PresentationData } from "../src/types/presentation";
import styles from "../src/assets/styles/Preview.module.scss";
import {
  MAIN_PAGE_ROUTE,
  PRESENTATION_PAGE_ROUTE,
} from "../src/constants/pages";
import { postPresentation } from "../src/api/database";

function Preview({
  presentation,
  setPresentation,
}: {
  presentation: PresentationData;
  setPresentation: (presentation: PresentationData | undefined) => void;
}) {
  const router = useRouter();

  useEffect(
    function redirectIfNothingToPreview() {
      if (!presentation) {
        router.push(MAIN_PAGE_ROUTE).catch(console.log);
      }
    },
    [router, presentation]
  );

  function goBack() {
    router.back();
  }

  async function publish() {
    try {
      const { name: id } = await postPresentation(presentation);

      await router.push(`${PRESENTATION_PAGE_ROUTE}/${id}`);
      setPresentation(undefined);
    } catch (error) {
      console.log(error);
    }
  }

  let resultJsx = null;

  if (presentation) {
    const { user, repository, textColor, backgroundColor, emoji } =
      presentation;

    resultJsx = (
      <>
        <aside className={styles.buttonsContainer}>
          <Button
            onClick={goBack}
            color="primary"
            variant="outlined"
            fullWidth
            type="button"
          >
            Back
          </Button>
          <Button
            onClick={publish}
            color="primary"
            variant="contained"
            fullWidth
            type="button"
          >
            Publish
          </Button>
        </aside>

        <Presentation
          user={user}
          repository={repository}
          textColor={textColor}
          backgroundColor={backgroundColor}
          emoji={emoji}
        />
      </>
    );
  }

  return resultJsx;
}

export default Preview;
