import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";

import { PresentationData } from "../src/types/presentation";
import { PREVIEW_PAGE_ROUTE } from "../src/constants/pages";
import styles from "../src/assets/styles/Home.module.scss";

const validationSchema = yup.object({
  user: yup.string().required("User is required"),
  repository: yup.string().required("Repository is required"),
});

function Home({
  presentation,
  setPresentation,
}: {
  presentation: PresentationData;
  setPresentation: (presentation: PresentationData | undefined) => void;
}) {
  const router = useRouter();

  const initialValues = {
    user: "",
    repository: "",
  };

  if (presentation) {
    const { user, repository } = presentation;

    if (user) {
      initialValues.user = user;
    }

    if (repository) {
      initialValues.repository = repository;
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setPresentation({ ...values });
      router.push(PREVIEW_PAGE_ROUTE).catch(console.log);
    },
  });

  return (
    <main className={styles.main}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Welcome to Prettier GitHub Links!
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Customize your repository presentation card using form below, preview it
        and then hit publish!
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Now you have your own personalized way to present your repository on any
        social media!
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="user"
          name="user"
          label="User"
          value={formik.values.user}
          onChange={formik.handleChange}
          error={formik.touched.user && Boolean(formik.errors.user)}
          helperText={formik.touched.user && formik.errors.user}
        />
        <TextField
          fullWidth
          id="repository"
          name="repository"
          label="Repository"
          type="repository"
          value={formik.values.repository}
          onChange={formik.handleChange}
          error={formik.touched.repository && Boolean(formik.errors.repository)}
          helperText={formik.touched.repository && formik.errors.repository}
        />

        <Button color="primary" variant="contained" fullWidth type="submit">
          Preview
        </Button>
      </form>
    </main>
  );
}

export default Home;
