//  Типизация объекта семинара
export type TSeminar = {
  id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  photo: string;
};

// Типизация пропсов компонента "SeminarItem"
export type TSeminarItem = {
  seminar: TSeminar;
  setCurrentSeminar: (item: TSeminar) => void;
  handleDeleteSeminarElement: (id: string) => void;
  setIsEdit: (val: boolean) => void;
};

// Типизация пропсов компонента "SeminarButton"
export type TSeminarButton = {
  onPress?: () => void;
  title: string;
  type: "add" | "delete" | "edit" | "save" | "cancel";
  buttonType?: "button" | "submit" | "reset" | undefined;
};
