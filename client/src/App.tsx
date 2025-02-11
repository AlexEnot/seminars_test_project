import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import { TSeminar } from "./types";
import { SeminarItem } from "./components/SeminarItem/SeminarItem";
import { SeminarButton } from "./components/SeminarButton/SeminarButton";

// Начальные состояния выбранного семинара
const initSeminar = {
  id: "0",
  title: "",
  description: "",
  date: "",
  time: "",
  photo: "",
};

// Функция создания id для нового семинара
const idCreate = (seminarList: TSeminar[]) => {
  if (seminarList.length === 0) {
    return 0;
  }
  const maxId = Math.max(...seminarList.map((item) => Number(item.id)));
  return (maxId + 1).toString();
};

function App() {
  const [seminarsList, setSeminarsList] = useState<TSeminar[] | []>([]);
  const [currentSeminar, setCurrentSeminar] = useState<TSeminar>(initSeminar);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(false);

  // Функция обращения к серверу для изменения объекта массива семинаров
  function updateSeminarsList() {
    axios
      .get("http://localhost:3000/seminars")
      .then((response) => {
        setSeminarsList(response.data);
      })
      .catch((error) => console.log(error));
  }

  // Функция обращения к серверу для удаления объекта массива семинаров
  function handleDeleteSeminarElement(id: string) {
    const isConfirmed = window.confirm(
      "Вы уверены, что хотите удалить семинар?"
    );

    if (isConfirmed) {
      // Удаление семинара по id при условии подтверждения
      axios
        .delete(`http://localhost:3000/seminars/${id}`)
        .then((response) => {
          if (response.status === 200) {
            updateSeminarsList();
          }
        })
        .catch((error) => console.log(error));
    }
  }

  // Закрытие модального окна с очисткой состояний
  const closeModal = () => {
    setCurrentSeminar(initSeminar);
    setIsEdit(false);
    setIsCreate(false);
  };

  // Функция формирования значений полей нового семинара
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const updatedSeminar = {
      id: isCreate ? idCreate(seminarsList) : currentSeminar!.id,
      title: currentSeminar!.title,
      description: currentSeminar!.description,
      photo: currentSeminar!.photo,
      date: new Date().toLocaleDateString("ru-RU").toString(),
      time: new Date().toLocaleTimeString("ru-RU").toString(),
    } as TSeminar;

    // Условие создания либо редактирования семинара
    if (!isCreate) {
      axios
        .put(
          `http://localhost:3000/seminars/${currentSeminar.id}`,
          updatedSeminar
        )
        .then((response) => {
          if (response.status === 200) {
            updateSeminarsList();
          }
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .post(`http://localhost:3000/seminars`, updatedSeminar)
        .then((response) => {
          if (response.status === 201) {
            updateSeminarsList();
          }
        })
        .catch((error) => console.log(error));
    }

    closeModal();
  };

  // Одиночный запрос списка семинаров после отрисовки компонентов
  useEffect(() => {
    updateSeminarsList();
  }, []);

  return (
    <>
      <div className="scroll-container">
        {seminarsList.map((item: TSeminar, index) => {
          return (
            <SeminarItem
              key={index}
              seminar={item}
              setCurrentSeminar={setCurrentSeminar}
              handleDeleteSeminarElement={handleDeleteSeminarElement}
              setIsEdit={setIsEdit}
            />
          );
        })}
      </div>
      <br />
      <SeminarButton
        onPress={() => {
          setIsEdit(true);
          setIsCreate(true);
        }}
        title={"Добавить семинар"}
        type={"add"}
      />
      {isEdit && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                {currentSeminar.id! !== "0"
                  ? "Редактировать семинар"
                  : "Создать семинар"}
              </h2>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                  <label className="label">Заголовок:</label>
                  <input
                    type="text"
                    value={currentSeminar!.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setCurrentSeminar((prev) => {
                        return {
                          ...prev,
                          title: e.target.value,
                        };
                      });
                    }}
                    className="input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="label">Описание:</label>
                  <textarea
                    value={currentSeminar.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      setCurrentSeminar((prev) => {
                        return {
                          ...prev,
                          description: e.target.value,
                        };
                      });
                    }}
                    className="textarea"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="label">URL изображения:</label>
                  <input
                    type="text"
                    value={currentSeminar.photo}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setCurrentSeminar((prev) => {
                        return {
                          ...prev,
                          photo: e.target.value,
                        };
                      });
                    }}
                    className="input"
                    required
                  />
                </div>
                <div className="modal-footer">
                  <SeminarButton
                    title={"Сохранить"}
                    type={"save"}
                    buttonType="submit"
                  />
                  <SeminarButton
                    onPress={() => closeModal()}
                    title={"Отменить"}
                    type={"cancel"}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
