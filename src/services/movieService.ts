import axios from "axios";
import type { Movie } from "../types/movie";

export interface TMDBResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export interface FetchMoviesResult {
  results: Movie[];
  totalPages: number;
}

export const fetchMovies = async (
  query: string,
  page: number = 1,
): Promise<FetchMoviesResult> => {
  const response = await apiClient.get<TMDBResponse>("/search/movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page,
    },
  });
  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  };
};
