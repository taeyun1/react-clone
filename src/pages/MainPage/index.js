import React from "react";
import Banner from "../../components/Banner";
import Row from "../../components/Row";
import requests from "../../api/requests";

export default function MainPage() {
  return (
    <div>
      <Banner />
      <Row
        title="넷쁠릭스 에서만 볼수 있는 영화"
        id="NO"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />

      <Row
        title="지금 인기있는 영화"
        id="TN"
        fetchUrl={requests.fetchTrending}
      />

      <Row
        title="가장 인기있는 영화"
        id="TR"
        fetchUrl={requests.fetchTopRated}
      />

      <Row title="액션 영화" id="AM" fetchUrl={requests.fetchActionMovies} />

      <Row title="코미디 영화" id="CM" fetchUrl={requests.fetchComedyMovies} />
    </div>
  );
}
