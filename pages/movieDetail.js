import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Index from "./index";
export default function movieDetail() {
  const ApiKey = "4560d630422332d526d512f960c57203";
  const [detailData, setDetailData] = React.useState([]);
  const router = useRouter();
  const id = router.query.id;

  React.useEffect(() => {
    const id = router.query.id;

    const fetchData = async () => {
      if (!id) return false;
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${ApiKey}`
      );
      const data = await res.json();
      setDetailData(data);
    };
    fetchData();
  }, [id]);
  return (
    <>
      {
        <div className="cardDetail mb-5" key={detailData.id}>
          <div className="row align-items-center">
            <div className="col-12 col-lg-5">
              <div className="cardImg">
                <img
                  src={
                    detailData.poster_path
                      ? "https://image.tmdb.org/t/p/w500/" +
                        detailData.poster_path
                      : "https://via.placeholder.com/261x360"
                  }
                ></img>
              </div>
            </div>
            <div className="col-12 col-lg-7 p-4">
              <div className="cardTitle">
                <div className="title">
                  <p>{detailData.title}</p>
                </div>
                <ul className="list">
                  <li>Crime</li>
                  <li>Mystery</li>
                  <li>Thriller</li>
                </ul>
              </div>
              <div className="cardContent">
                <div className="summary">
                  <p className="title">Summary</p>
                  <p className="text">{detailData.overview}</p>
                </div>
                <ul className="list">
                  <li>asdasdasda</li>
                  <li>asdasdasda</li>
                  <li>asdasdasda</li>
                  <li>asdasdasda</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      }
      <Index></Index>
    </>
  );
}
