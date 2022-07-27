import axios from "axios";
// APU 요청 예) => https://api.themoviedb.org/3/movie/550?api_key=91ee4b65589660d9a2368fe66cb604cf

// axios인스턴스화 하기
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.REACT_APP_MOVIE_DB_API_KEY,
    language: "ko-KR", // language를 ko-KR로 해줘야 정보를 한국어로 가져옴
  },
});

export default instance;
