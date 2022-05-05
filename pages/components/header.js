import Link from "next/dist/client/link";
import React, { useState, useEffect } from "react";
import { SearchData, useContext } from "./context";

export default function header() {
  const ApiKey = "4560d630422332d526d512f960c57203";
  const textInput = React.createRef();
  const { searchData, setSearchData } = useContext(SearchData);
  const [historyData, setHistoryData] = React.useState([]);

  React.useEffect(() => {
    let x = JSON.parse(localStorage.getItem("inputHistory"));
    setHistoryData(x.reverse());
  }, [setHistoryData]);
  const setInputHistory = (inputvalue) => {
    let x = JSON.parse(localStorage.getItem("inputHistory"));
    if (x != null && x.includes(inputvalue)) return false;
    x == null ? (x = [inputvalue]) : x.push(inputvalue);
    if (x.length > 5) {
      x.shift();
      localStorage.setItem("inputHistory", JSON.stringify(x));
      setHistoryData(x.reverse());
    } else {
      localStorage.setItem("inputHistory", JSON.stringify(x));
      setHistoryData(x.reverse());
    }
  };

  const getInputValue = () => {
    if (!textInput.current.value) return false;
    let inputvalue = textInput.current.value;
    setInputHistory(inputvalue);
    const fetchData = async () => {
      const SearchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${ApiKey}&query=${inputvalue}`;
      const res = await fetch(SearchUrl);
      const data = await res.json();
      setSearchData(data.results);
    };
    fetchData();
    textInput.current.value = "";
  };

  return (
    <header>
      <div className="container d-flex justify-content-between align-items-center">
        <Link href="/">
          <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"></img>
        </Link>
        <div className="movieSearch">
          <label>
            <input
              id="search"
              type="text"
              ref={textInput}
              autoComplete="off"
              list="history"
            />
          </label>
          <datalist id="history">
            {historyData.map((item, index) => {
              return <option className="my-option" value={item} key={index} />;
            })}
          </datalist>
          <Link href="/">
            <button className="btn" type="button" onClick={getInputValue}>
              Search
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
