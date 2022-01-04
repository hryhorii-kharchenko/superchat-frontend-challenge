import { ChangeEvent } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { RgbaStringColorPicker } from "react-colorful";
import { Emoji, EmojiData, Picker } from "emoji-mart";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";

import { PresentationData } from "../src/types/presentation";
import { PREVIEW_PAGE_ROUTE } from "../src/constants/pages";
import { getGithubRepositoryData } from "../src/api/github";
import styles from "../src/assets/styles/Home.module.scss";

import "emoji-mart/css/emoji-mart.css";

const validationSchema = yup.object({
  user: yup.string().required("User is required"),
  repository: yup.string().required("Repository is required"),
  textColor: yup.string().required("Text color is required"),
  backgroundColor: yup.string().required("Background color is required"),
  emoji: yup.string(),
});

function Home({
  presentation,
  setPresentation,
}: {
  presentation: PresentationData;
  setPresentation: (presentation: PresentationData | undefined) => void;
}) {
  const router = useRouter();

  let initialValues: PresentationData = {
    user: "",
    repository: "",
    textColor: "rgba(0, 0, 0, 0.87)",
    backgroundColor: "rgba(255, 255, 255, 1)",
    emoji: "",
  };

  if (presentation) {
    initialValues = { ...presentation };
  }

  const formik = useFormik({
    initialStatus: "",
    initialValues,
    validationSchema,
    onSubmit: async function handleSubmit(
      values: PresentationData,
      { setStatus }
    ) {
      let isSuccessful = false;

      try {
        const repoData = await getGithubRepositoryData(
          values.user,
          values.repository
        );

        if (repoData && repoData.id) {
          isSuccessful = true;

          setPresentation({ ...values });
          router.push(PREVIEW_PAGE_ROUTE).catch(console.log);
        }
      } catch (error) {
        console.log(error);
      }

      if (!isSuccessful) {
        setStatus("This author or repository cannot be found");
      }
    },
  });

  function handleRepositoryInfoChange(event: ChangeEvent<any>) {
    formik.handleChange(event);
    formik.setStatus("");
  }

  function handleColorChangeCurried(field: string) {
    return function handleColorChange(color: string) {
      formik.setFieldValue(field, color);
    };
  }

  function handleEmojiChange(emoji: EmojiData) {
    formik.setFieldValue("emoji", emoji.id);
  }

  return (
    <main className={styles.main}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Welcome to Prettier GitHub Links!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Customize your repository presentation card using form below, preview it
        and then hit publish!
      </Typography>
      <Typography variant="body1" gutterBottom>
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
          onChange={handleRepositoryInfoChange}
          error={
            (formik.touched.repository && Boolean(formik.errors.repository)) ||
            Boolean(formik.status)
          }
          helperText={formik.touched.user && formik.errors.user}
        />
        <TextField
          fullWidth
          id="repository"
          name="repository"
          label="Repository"
          type="repository"
          value={formik.values.repository}
          onChange={handleRepositoryInfoChange}
          error={
            (formik.touched.repository && Boolean(formik.errors.repository)) ||
            Boolean(formik.status)
          }
          helperText={
            (formik.touched.repository && formik.errors.repository) ||
            formik.status
          }
        />

        <div className={styles.colorPickerContainer}>
          <Typography variant="body1" gutterBottom>
            Select text color
          </Typography>

          <div className={styles.colorPickerSelectionContainer}>
            <RgbaStringColorPicker
              color={formik.values.textColor}
              onChange={handleColorChangeCurried("textColor")}
            />

            <div className={styles.colorPickerBackground}>
              <p
                style={{ color: formik.values.textColor }}
                className={styles.colorPickerText}
              >
                Example text
              </p>
            </div>
          </div>
        </div>

        <div className={styles.colorPickerContainer}>
          <Typography variant="body1" gutterBottom>
            Select background color
          </Typography>

          <div className={styles.colorPickerSelectionContainer}>
            <RgbaStringColorPicker
              color={formik.values.backgroundColor}
              onChange={handleColorChangeCurried("backgroundColor")}
            />

            <div
              style={{ backgroundColor: formik.values.backgroundColor }}
              className={styles.colorPickerBackground}
            >
              <p className={styles.colorPickerTextInvisible}>Example text</p>
            </div>
          </div>
        </div>

        <div className={styles.emojiContainer}>
          <Emoji emoji={formik.values.emoji} native size={64} />
        </div>
        <Picker onSelect={handleEmojiChange} native title="Pick your emoji" />

        <Button color="primary" variant="contained" fullWidth type="submit">
          Preview
        </Button>
      </form>
    </main>
  );
}

export default Home;
