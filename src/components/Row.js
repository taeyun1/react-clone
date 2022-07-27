import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import MovieModal from "./MovieModal/MovieModal";
import "./Row.css";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// Swiper를 이용해 터치슬라이드 구현 : https://swiperjs.com/react

export default function Row({ title, fetchUrl, id, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const req = await axios.get(fetchUrl);
    setMovies(req.data.results);
  };

  const handleClick = (movie) => {
    console.log(movie);
    setModalOpen(true);
    setMovieSelected(movie);
  };

  return (
    <section className="row">
      <h2>{title}</h2>
      {/* <div className="slider"> */}
      {/* <div
          className={`slider__arrow-left ${
            isLargeRow && "slider__arrow-Large"
          }`}
          onClick={() => {
            document.getElementById(id).scrollLeft -= window.innerWidth - 80;
          }}
        >
          <span className="arrow">{"<"}</span>
        </div> */}
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true} // loop기능 사용할 것인지
        navigation // 화살표 버튼 사용 유무 <, >
        spaceBetween={20} // 아이템 사이 간격
        pagination={{ clickable: true }} // 페이지 버튼 보이게 할지
        breakpoints={{
          1378: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
        // slidesPerView={7} // 아이템 몇개씩 보이게 할것인지
        // scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)} // 슬라이드 할때 어떤 함수를 주고 싶을때 사용
        // onSlideChange={() => console.log("slide change")} // 슬라이드 할때 어떤 함수를 주고 싶을때 사용
      >
        <div id={id} className="row__posters">
          {movies &&
            movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <img
                  key={movie.id}
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  src={`https://image.tmdb.org/t/p/original/${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  } `}
                  alt={movie.name}
                  onClick={() => handleClick(movie)}
                />
              </SwiperSlide>
            ))}
        </div>
      </Swiper>

      {/* <div
          className={`slider__arrow-right ${
            isLargeRow && "slider__arrow-Large"
          }`}
          onClick={() => {
            document.getElementById(id).scrollLeft += window.innerWidth - 80;
          }}
        >
          <span className="arrow">{">"}</span>
        </div> */}
      {/* </div> */}

      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  );
}
