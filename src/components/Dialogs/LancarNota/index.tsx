import { useEffect, useState } from "react";
import "./styles.css";
import api from "../../../services/api";
import { Result } from "../../CardResultado";

export const LancarNota = (props: {
  bimestre: string;
  render: boolean;
  setRender: any;
}) => {
  const [inputNota, setInputNota] = useState("");
  const [bimestreName, setBimestreName] = useState("");
  const [disciplinaName, setDisciplinaName] = useState("");
  useEffect(() => {
    function bimestreTransform(bimestre: string): string {
      if (bimestre === "Bimestre 1") {
        setBimestreName("PRIMEIRO");
      }
      if (bimestre === "Bimestre 2") {
        setBimestreName("SEGUNDO");
      }
      if (bimestre === "Bimestre 3") {
        setBimestreName("TERCEIRO");
      }
      if (bimestre === "Bimestre 4") {
        setBimestreName("QUARTO");
      }
      return bimestreName;
    }

    bimestreTransform(props.bimestre);
  }, []);

  function handleChangeInput(event: any) {
    const newValue = event.target.value;
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (
      regex.test(newValue) &&
      parseFloat(newValue) >= 0 &&
      parseFloat(newValue) <= 10
    ) {
      setInputNota(newValue);
    } else {
      setInputNota("");
    }
  }

  function handleChangeDisciplina(disciplina: string) {
    setDisciplinaName("");
    setDisciplinaName(disciplina.toUpperCase());
  }

  async function handleCreateResult() {
    try {
      const req = await api.post("/results", {
        nota: parseFloat(inputNota),
        bimestre: bimestreName,
        disciplina: disciplinaName,
      });

      props.setRender(!props.render);
      const dialog = document.querySelector(
        `.${bimestreName}`
      ) as HTMLDialogElement;
      dialog?.close();
      setInputNota("");
      setDisciplinaName("");
    } catch (error: any) {
      if (error.response.data.message === "Essa nota já foi lançada") {
        alert(error.response.data.message);
      }
      if (inputNota === "" || disciplinaName === "") {
        alert("Selecione a disciplina e informe a nota");
      }
    }
  }
  return (
    <dialog className={`lancarnota__container ${bimestreName}`}>
      <div className="container__dialog">
        <div className="dialog__header">
          <h1 className="dialog__bimestre">{props.bimestre}</h1>
          <strong
            className="dialog__close"
            onClick={() => {
              setDisciplinaName("");
              setInputNota("");
              const dialog = document.querySelector(
                `.${bimestreName}`
              ) as HTMLDialogElement;
              dialog?.close();
            }}
          >
            X
          </strong>
        </div>

        <div className="dialog__disciplinas__content">
          <span className="disciplina__title">Disciplina</span>
          <div className="dialog__disciplinas">
            <button
              className="dialog__disciplina__button"
              style={{ backgroundColor: "rgba(204, 64, 144, 0.20)" }}
              onClick={() => handleChangeDisciplina("biologia")}
            >
              Biologia
            </button>
            <button
              className="dialog__disciplina__button"
              style={{ backgroundColor: "#05A2C2" }}
              onClick={() => handleChangeDisciplina("artes")}
            >
              Artes
            </button>
            <button
              className="dialog__disciplina__button"
              style={{ backgroundColor: "rgba(155, 25, 194, 0.20)" }}
              onClick={() => handleChangeDisciplina("sociologia")}
            >
              Sociologia
            </button>
            <button
              className="dialog__disciplina__button"
              style={{ backgroundColor: "rgba(194, 103, 25, 0.20)" }}
              onClick={() => handleChangeDisciplina("geografia")}
            >
              Geografia
            </button>
          </div>
          <label className="nota__label" htmlFor="nota">
            Nota
          </label>
          <input
            className="dialog__input"
            type="text"
            name="nota"
            value={inputNota}
            onChange={handleChangeInput}
          />
          <button className="confirm__button" onClick={handleCreateResult}>
            Confirmar
          </button>
        </div>
      </div>
    </dialog>
  );
};
