import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/';
// const ACCESS_KEY = '0f067bee4ef5fb92459c287b7eeb2984';
const options = {
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjA2N2JlZTRlZjVmYjkyNDU5YzI4N2I3ZWViMjk4NCIsInN1YiI6IjY2NGNjZjNhN2FjM2ZhYTU3ZDc5ZDVmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2V5SwOAzu0ocVDqlFYlY-woJNA-hZKH_n5hV7hDqw-s',
  },
  params: {
    // api_key: ACCESS_KEY,
    // page: 1,
    include_adult: false,
    language: 'en-US',
  },
};

export const fetchMovies = async page => {
  const response = await axios.get(`3/trending/movie/day`, {
    ...options,
    params: {
      ...options.params,
      page,
    },
  });
  return response.data;
};

export const fetchMovieById = async movieId => {
  const response = await axios.get(`3/movie/${movieId}`, options);
  return response.data;
};

export const fetchMovieCastById = async movieId => {
  const response = await axios.get(`3/movie/${movieId}/credits`, options);
  return response.data;
};

export const fetchMovieReviewsById = async movieId => {
  const response = await axios.get(`3/movie/${movieId}/reviews`, options);
  return response.data;
};

export const fetchMoviesByQuery = async (query, page) => {
  const response = await axios.get(`3/search/movie`, {
    ...options,
    params: {
      ...options.params,
      query,
      page,
    },
  });
  return response.data;
};
export const fetchSortedMovies = async (sort_by, page) => {
  const response = await axios.get(`3/discover/movie?`, {
    ...options,
    params: {
      ...options.params,
      sort_by,
      page,
    },
  });
  return response.data;
};
