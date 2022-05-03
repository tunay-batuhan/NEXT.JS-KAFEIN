import Header from "./components/header";
import InComing from "./components/inComing";
import { SearchData, useContext } from "./components/context";
import React, { useState } from "react";
export default function Layout({ children }) {
  const [searchData, setSearchData] = React.useState([]);
  const data = {
    searchData,
    setSearchData,
  };
  return (
    <SearchData.Provider value={data}>
      <Header></Header>
      <div className="container">
        <div className="row mt-5">
          <div className="d-none d-md-block col-md-4">
            <InComing></InComing>
          </div>
          <div className="col-12 col-md-8">{children}</div>
        </div>
      </div>
    </SearchData.Provider>
  );
}
