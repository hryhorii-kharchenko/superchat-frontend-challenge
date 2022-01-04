import { GetServerSidePropsContext } from "next";
import { GetServerSidePropsResult } from "next/types";

import Presentation from "../../src/components/Presentation/Presentation";

import { getPresentation } from "../../src/api/database";
import { PresentationData } from "../../src/types/presentation";

import styles from "../../src/assets/styles/PresentationPage.module.scss";

function PresentationPage({
  user,
  repository,
  textColor,
  backgroundColor,
}: PresentationData) {
  return (
    <Presentation
      user={user}
      repository={repository}
      textColor={textColor}
      backgroundColor={backgroundColor}
    />
  );
}

export default PresentationPage;

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<PresentationData>> {
  let result: GetServerSidePropsResult<PresentationData> = {
    notFound: true,
  };

  try {
    if (context.params && context.params.id) {
      const { user, repository, textColor, backgroundColor } =
        await getPresentation(context.params.id.toString());

      result = {
        props: {
          user,
          repository,
          textColor,
          backgroundColor,
        },
      };
    }
  } catch (error) {
    console.log(error);
  }

  return result;
}
