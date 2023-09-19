import React, { useState, useEffect, useContext } from "react";
import "./styles.css";
import deleteButton from "../../assets/deleteButton.svg";
import { format } from "date-fns";
import redNotaIcon from "../../assets/redNotaIcon.svg";
import greenNotaIcon from "../../assets/greenNotaIcon.svg";
import yellowNotaIcon from "../../assets/yellowNotaIcon.svg";
import { deleteResult } from "../../utils/requisitions";

export interface Result {
  atualizadoEm: string;
  bimestre: string;
  criadoEm: string;
  disciplina: string;
  id: string;
  nota: number;
}

const CardResult = (props: {
  result: Result;
  bimestre: string;
  render: boolean;
  setRender: any;
  type: string;
  setUpdateModal: any;
}) => {
  const [background, setBackground] = useState("");
  const [notaColor, setNotaColor] = useState("");
  const [icon, setIcon] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    async function setColor() {
      if (props.result.disciplina === "BIOLOGIA") {
        return setBackground("#CC4090");
      } else if (props.result.disciplina === "ARTES") {
        return setBackground("#05A2C2");
      } else if (props.result.disciplina === "GEOGRAFIA") {
        return setBackground("#C26719");
      } else {
        return setBackground("#9B19C2");
      }
    }

    async function fetchIcon() {
      if (props.result.nota < 6) {
        setNotaColor("#FF5964");
        return setIcon(redNotaIcon);
      } else if (props.result.nota >= 6 && props.result.nota < 8) {
        setNotaColor("#FF9");
        return setIcon(yellowNotaIcon);
      } else {
        setNotaColor("#05FF00");
        return setIcon(greenNotaIcon);
      }
    }

    const dataSemFormatar = new Date(props.result.atualizadoEm);
    const dataFormatada = format(dataSemFormatar, "dd/MM/yyyy");
    setData(dataFormatada);
    setColor();
    fetchIcon();
  });

  async function handleDeleteUser() {
    await deleteResult(props.result.id);

    props.setRender(!props.render);
  }

  function handleChandeUpdateModal() {
    props.setUpdateModal(props.result);
    // props.setIsOpen(true);
  }

  return (
    <div className="card__container">
      <div
        onClick={handleChandeUpdateModal}
        className="card__result"
        style={{ backgroundColor: background }}
      >
        <div className="card__header">
          <h1 className="card__title">
            {props.result.disciplina[0].toUpperCase() +
              props.result.disciplina.slice(1).toLowerCase()}
          </h1>
          <span className="card__data">{data}</span>
        </div>
        <div className="card__nota">
          <img src={icon} alt="Icone da nota" />
          <span className="nota__result" style={{ color: notaColor }}>
            Nota: {props.result.nota}
          </span>
        </div>
      </div>
      <img
        className="delete__button"
        src={deleteButton}
        alt="Botão para deletar resultado"
        onClick={() => {
          handleDeleteUser();
        }}
      />
    </div>
  );
};

export default CardResult;
