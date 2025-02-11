import { TSeminarItem } from "../../types";
import { SeminarButton } from "../SeminarButton/SeminarButton";
import "./SeminarItem.css";

export const SeminarItem = ({
  seminar,
  setCurrentSeminar,
  handleDeleteSeminarElement,
  setIsEdit,
}: TSeminarItem) => {
  const handleSeminarUpdate = () => {
    setCurrentSeminar(seminar);
  };
  console.log(seminar);
  return (
    <div key={seminar.id} className="scroll-item">
      <img src={seminar.photo} alt={seminar.title} className="item-photo" />
      <div className="item-content">
        <h2 className="item-title">{seminar.title}</h2>
        <p className="item-description">{seminar.description}</p>
        <p className="item-datetime">
          {seminar.date} | {seminar.time}
        </p>
        <div className="item-actions">
          <SeminarButton
            title={"Удалить"}
            type={"delete"}
            onPress={() => {
              handleDeleteSeminarElement(seminar.id!);
              console.log(seminar.id);
            }}
          />
          <SeminarButton
            title={"Изменить"}
            type={"edit"}
            onPress={() => {
              handleSeminarUpdate();
              setIsEdit(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};
