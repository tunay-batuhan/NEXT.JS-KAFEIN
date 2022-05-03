import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SearchData, useContext } from "./components/context";
export default function Home() {
  const ApiKey = "4560d630422332d526d512f960c57203";
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${ApiKey}`;
  const { searchData, setSearchData } = useContext(SearchData);
  const [newdata, setData] = React.useState([]);
  const router = useRouter();
  const id = router.query.id;
  React.useEffect(() => {
    const fetchData = async () => {
      const baseUrl = id
        ? `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${ApiKey}`
        : url;
      const res = await fetch(baseUrl);
      const data = await res.json();
      setData(searchData.length == 0 ? data.results : searchData);
    };
    fetchData();
  }, [id, searchData]);
  return (
    <div className="row">
      {!id && searchData.length == 0 ? (
        <h1 className="mb-5">Popular Movies</h1>
      ) : (
        ""
      )}
      {!newdata ? (
        <h2>Loading...</h2>
      ) : (
        newdata.map((movies, index) => {
          return (
            <div className="col-12 col-sm-6 col-md-4 mb-4" key={index}>
              <Link
                href={{
                  pathname: "/movieDetail",
                  query: { id: movies.id },
                }}
              >
                <div className="movieCard">
                  <div className="card border-0">
                    <div className="cardBody">
                      <div className="cardImg">
                        <img
                          src={
                            movies.poster_path
                              ? "https://image.tmdb.org/t/p/w500/" +
                                movies.poster_path
                              : "https://via.placeholder.com/261x360"
                          }
                        ></img>
                      </div>
                      <h5 className="card-title mt-4">{movies.title}</h5>
                      <p className="card-text">{movies.vote_average}</p>
                      <a href="#" className="btn btn-primary">
                        {movies.popularity}
                      </a>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
}
