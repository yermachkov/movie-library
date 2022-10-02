import axios from 'axios';

const API_KEY = '48c8290358fa5316a044ddee2fc9cc6f';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`/trending/movie/day?api_key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

export const fetchMoviesByQuery = async query => {
  try {
    const response = await axios.get(
      `/search/movie?api_key=${API_KEY}&query=${query}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchMovieById = async id => {
  try {
    const response = await axios.get(`/movie/${id}?api_key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchMovieCreditsById = async id => {
  try {
    const response = await axios.get(`/movie/${id}/credits?api_key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchMovieReviewsById = async id => {
  try {
    const response = await axios.get(`/movie/${id}/reviews?api_key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const api = {
  fetchTrendingMovies,
  fetchMoviesByQuery,
  fetchMovieById,
  fetchMovieCreditsById,
  fetchMovieReviewsById,
};

export default api;
