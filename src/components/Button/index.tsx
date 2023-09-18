import React, { useState, useEffect } from "react";
import addButton from "../../assets/addButton.svg";
import { useWindowSize } from "usehooks-ts";
import "./styles.css";

export const Button = (props: { bimestre: string }) => {
  const [bimestreName, setBimestreName] = useState("");
  const { width } = useWindowSize();
  const isMobile = width < 768 ? true : false;

  function transformBimestre() {
    if (props.bimestre === "Bimestre 1") {
      setBimestreName("PRIMEIRO");
    }
    if (props.bimestre === "Bimestre 2") {
      setBimestreName("SEGUNDO");
    }
    if (props.bimestre === "Bimestre 3") {
      setBimestreName("TERCEIRO");
    }
    if (props.bimestre === "Bimestre 4") {
      setBimestreName("QUARTO");
    }
  }

  useEffect(() => {
    transformBimestre();
  }, []);

  return (
    <button
      className="button__nota"
      onClick={() => {
        const dialog = document.querySelector(
          `.${bimestreName}`
        ) as HTMLDialogElement;
        dialog?.showModal();
      }}
    >
      {!isMobile ? <span>Lançar Nota</span> : null}
      <img src={addButton} alt="Botão para abrir modal" />
    </button>
  );
};
