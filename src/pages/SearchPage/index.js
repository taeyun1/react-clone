import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useDebounce } from "../../hooks/useDebounce";
import "./SearchPage.css";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  // console.log("useLocation()", useLocation());

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  // 검색창에 검색한 값을 가져옴
  // ex) search?q=hello => q 뒤에 hello값만 가져옴
  let query = useQuery();

  const searchTerm = query.get("q");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 0.5초에 한번씩 검색
  // console.log("searchTerm", searchTerm);

  // searchTerm이 바뀔때마다. 즉, 검색어를 입력할때마다 영화 데이터 가져오기
  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchMoive(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  // 검색한 영화의 results값 만 setSearchResults에 저장
  const fetchSearchMoive = async (searchTerm) => {
    try {
      const req = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      console.log(req);
      setSearchResults(req.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  // searchTerm(검색결과)에 해당 영화 데이터가 있을경우
  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className="search-container">
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
            return (
              <div className="movie" key={movie.id}>
                <div
                  onClick={() => navigate(`/${movie.id}`)}
                  className="movie__column-poster"
                >
                  <img
                    src={movieImageUrl}
                    alt="movie"
                    className="movie__poster"
                  />
                </div>
              </div>
            );
          }
        })}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-results__text">
          <p>
            찾고자 하는 검색어 "{debouncedSearchTerm}"에 맞는 영화가 없습니다.
          </p>
        </div>
      </section>
    );
  };

  return renderSearchResults();
}
