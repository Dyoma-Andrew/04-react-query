import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

interface FormValues {
  query: string;
}

const validationSchema = Yup.object().shape({
  query: Yup.string().trim().required("Please enter your search query."),
});

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const initialValues: FormValues = { query: "" };

  const handleSubmit = (values: FormValues) => {
    onSubmit(values.query.trim());
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, actions) => {
            handleSubmit(values);
            actions.setSubmitting(false);
          }}
        >
          {({ errors, touched, handleSubmit: formikSubmit }) => {
            if (errors.query && touched.query) {
              toast.error(errors.query);
            }

            return (
              <Form className={css.form} onSubmit={formikSubmit}>
                <Field
                  className={css.input}
                  type="text"
                  name="query"
                  autoComplete="off"
                  placeholder="Search movies..."
                  autoFocus
                />
                <button className={css.button} type="submit">
                  Search
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </header>
  );
}
