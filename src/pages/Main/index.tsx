import { useState, useEffect } from "react";
import "./styles.css";
import Bimestre from "../../components/Bimestre";

function App() {
  return (
    <div className="container">
      <div className="content">
        <Bimestre bimestre={"Bimestre 1"}></Bimestre>
        <Bimestre bimestre={"Bimestre 2"}></Bimestre>
        <Bimestre bimestre={"Bimestre 3"}></Bimestre>
        <Bimestre bimestre={"Bimestre 4"}></Bimestre>
      </div>
    </div>
  );
}

export default App;
