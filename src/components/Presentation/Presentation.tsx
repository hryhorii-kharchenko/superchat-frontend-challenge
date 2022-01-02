import { PresentationData } from "../../types/presentation";
import styles from "./Presentation.module.scss";

function Presentation({ user, repository }: PresentationData) {
  return (
    <div>
      <h1>
        {user} / {repository}
      </h1>
    </div>
  );
}

export default Presentation;
