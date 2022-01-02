import { GetServerSidePropsContext } from "next";
import { GetServerSidePropsResult } from "next/types";

import { getPresentation } from "../../src/api/database";
import styles from "../../src/assets/styles/Presentation.module.scss";

interface PresentationProps {
  user: string | undefined;
  repository: string | undefined;
}

function Presentation({ user, repository }: PresentationProps) {
  return (
    <div>
      <h1>
        {user} / {repository}
      </h1>
    </div>
  );
}

export default Presentation;

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<PresentationProps>> {
  let result: GetServerSidePropsResult<PresentationProps> = {
    notFound: true,
  };

  try {
    if (context.params && context.params.id) {
      const { user, repository } = await getPresentation(
        context.params.id.toString()
      );

      result = {
        props: {
          user,
          repository,
        },
      };
    }
  } catch (error) {
    console.log(error);
  }

  return result;
}
