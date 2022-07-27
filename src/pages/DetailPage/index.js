import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";

export default function DetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({}); // 하나의 객체 정보니까 {}안에 넣음

  useEffect(() => {
    async function fetchData() {
      try {
        const req = await axios.get(`/movie/${movieId}`);
        setMovie(req.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [movieId]); // movieId가 바뀔때마다 useEffect 실행

  // movie가 없을때
  if (!movie) return <div>...Loding</div>;

  return (
    <section>
      <img
        className="modal__poster-img"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="poster"
      />
    </section>
  );
}
