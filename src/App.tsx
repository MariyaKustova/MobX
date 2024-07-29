import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./layout/Header";

import s from "./App.module.scss";

function App() {
  return (
    <>
      <Header />
      <div className={s.App}>
        <Outlet />
      </div>
    </>
  );
}

export default App;
