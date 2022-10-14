import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <h1>설문조사</h1>
      <Link to="/create">
        <h3>설문조사 생성</h3>
      </Link>
      <Link to="/attend">
        <h3>설문조사 참여</h3>
      </Link>
    </div>
  );
};

export default Main;
