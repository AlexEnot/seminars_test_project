import { TSeminarButton } from "../../types";
import "./SeminarButton.css";

export const SeminarButton = ({
  onPress,
  title,
  type,
  buttonType = "button",
}: TSeminarButton) => {
  return (
    <button
      className={`action-button ${type}`}
      onClick={onPress}
      type={buttonType}
    >
      {title}
    </button>
  );
};
