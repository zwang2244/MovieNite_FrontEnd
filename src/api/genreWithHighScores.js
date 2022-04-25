import api from '../utils/request';

export const getMovieOfGenreWithHighScores = (genre,startDate) => api.get(`/movie/movieWithHighScore?genre=${genre}&startTime=${startDate}`).then(res => res.data);
