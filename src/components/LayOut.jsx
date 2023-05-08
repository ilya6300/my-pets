import React from "react";
import { Link, Outlet } from "react-router-dom";

const LayOut = () => {
  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <Link to="/homelocation">You home</Link>
      </header>

      <main className="container">
        <Outlet />
      </main>

      <footer>Begin 23.04.2023</footer>
    </>
  );
};

export { LayOut };
