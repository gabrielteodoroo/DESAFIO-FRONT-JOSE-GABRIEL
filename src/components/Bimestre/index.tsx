import { useEffect, useState, useContext } from "react";
import { loadResults } from "../../utils/requisitions";
import CardResult from "../CardResultado";
import "./styles.css";
import { Button } from "../Button";
import { Result } from "../CardResultado";
import { LancarNota } from "../Dialogs/LancarNota";

interface IBimestre {
  bimestre: string;
}
const Bimestre = (props: IBimestre) => {
  const [result, setResult] = useState<Result[]>([]);
  const [primeiro, setPrimeiro] = useState<Result[]>([]);
  const [segundo, setSegundo] = useState<Result[]>([]);
  const [terceiro, setTerceiro] = useState<Result[]>([]);
  const [quarto, setQuarto] = useState<Result[]>([]);
  const [render, setRender] = useState(false);
  const [updateModal, setUpdateModal] = useState<Result>(result[0]);
  async function fetchResults() {
    const allResults = await loadResults();

    setResult(allResults);
  }

  useEffect(() => {
    fetchResults();
  }, [render]);

  function buscarBimestre() {
    const PBimestre = result.filter((card) => card.bimestre === "PRIMEIRO");
    const SBimestre = result.filter((card) => card.bimestre === "SEGUNDO");
    const TBimestre = result.filter((card) => card.bimestre === "TERCEIRO");
    const QBimestre = result.filter((card) => card.bimestre === "QUARTO");

    setSegundo(SBimestre);
    setTerceiro(TBimestre);
    setQuarto(QBimestre);
    setPrimeiro(PBimestre);
  }

  useEffect(() => {
    buscarBimestre();
  }, [result]);

  return (
    <div className="bimestre">
      <LancarNota
        render={render}
        setRender={setRender}
        bimestre={props.bimestre}
      />
      <div className="title">
        <h1 className="bimestre__title">{props.bimestre}</h1>
        <Button bimestre={props.bimestre} />
      </div>
      <div className="bimestre__cards">
        {props.bimestre === "Bimestre 1" &&
          primeiro.map((card, indice) => (
            <CardResult
              render={render}
              setRender={setRender}
              key={indice}
              bimestre={props.bimestre}
              result={card}
              type="update"
              setUpdateModal={setUpdateModal}
            />
          ))}
        {props.bimestre === "Bimestre 2" &&
          segundo.map((card, indice) => (
            <CardResult
              render={render}
              setRender={setRender}
              key={indice}
              bimestre={props.bimestre}
              result={card}
              type="update"
              setUpdateModal={setUpdateModal}
            />
          ))}
        {props.bimestre === "Bimestre 3" &&
          terceiro.map((card, indice) => (
            <CardResult
              render={render}
              setRender={setRender}
              key={indice}
              bimestre={props.bimestre}
              result={card}
              type="update"
              setUpdateModal={setUpdateModal}
            />
          ))}
        {props.bimestre === "Bimestre 4" &&
          quarto.map((card, indice) => (
            <CardResult
              render={render}
              setRender={setRender}
              key={indice}
              bimestre={props.bimestre}
              result={card}
              type="update"
              setUpdateModal={setUpdateModal}
            />
          ))}
      </div>
    </div>
  );
};

export default Bimestre;
