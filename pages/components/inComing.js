import Link from "next/link";
import React, { useEffect } from "react";
import { SearchData, useContext } from "./context";

export default function inComing() {
  const { searchData, setSearchData } = useContext(SearchData);
  const url =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=4560d630422332d526d512f960c57203";
  const [newdata, setData] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url);
      const data = await res.json();
      setData(data.results);
    };

    fetchData();
  });
  function clearData() {
    setSearchData([]);
  }
  return (
    <div className="InCaming">
      <h2 className="title">Incoming movies</h2>

      <ul className="item">
        {newdata.map((item, index) => {
          return (
            <Link
              key={index}
              href={{
                pathname: "/movieDetail",
                query: { id: item.id },
              }}
            >
              <li onClick={() => clearData()}>
                <span>{item.title}</span>
                <span>{item.vote_average}</span>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
