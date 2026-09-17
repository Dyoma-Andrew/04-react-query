import React, { useRef } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (formData: FormData) => {
    const query = (formData.get("query") as string)?.trim();

    if (!query) {
      toast.error("Будь ласка, введіть пошуковий запит!");
      return;
    }

    onSubmit(query);
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
        <form ref={formRef} action={handleSubmit} className={css.form}>
          <input
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            className={css.input}
          />
          <button type="submit" className={css.button}>
            Search
          </button>
        </form>
      </div>
    </header>
  );
};
