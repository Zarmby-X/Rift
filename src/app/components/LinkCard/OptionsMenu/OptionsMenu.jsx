import "./OptionsMenu.css";
import viewIcon from "../../../../assets/eye-icon.svg";
import editIcon from "../../../../assets/edit-icon.svg";
import deleteIcon from "../../../../assets/delete-icon.svg";
import Image from "next/image";
import { Stick_No_Bills } from "next/font/google";
import ClickDetector from "../../../../libs/ClickDetector/ClickDetector";

const stick_No_Bills = Stick_No_Bills({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export default function OptionsMenu(props) {
  const handleGlobalClick = (event) => {
    if (
      !(event.target.classList[0] === "optionsCardMenuWrap") &&
      !(event.target.classList[0] === "cardMenuSeparator")
    ) {
      props.toogleMenu();
    }
  };

  return (
    <div className="optionsCardMenuWrap">
      <ClickDetector onGlobalClick={handleGlobalClick} />
      <div
        className="cardMenuOption"
        onClick={() => window.open(props.url.originalUrl, "_blank")}
      >
        <Image
          className="menuOptionIcon"
          src={viewIcon}
          alt="eye icon"
          width={18}
          height={18}
        ></Image>
        <p className={stick_No_Bills.className}>View</p>
      </div>
      <div className="cardMenuSeparator"></div>
      <div
        className="cardMenuOption"
        onClick={() => {
          props.toogleModal(props.url);
          props.toogleMenu();
        }}
      >
        <Image
          className="menuOptionIcon"
          src={editIcon}
          alt="edit icon"
          width={18}
          height={18}
        ></Image>
        <p className={stick_No_Bills.className}>Update</p>
      </div>
      <div className="cardMenuSeparator"></div>
      <div
        className="cardMenuOption"
        onClick={() => {
          props.toogleDeleteAlert(props.url);
          props.toogleMenu();
        }}
      >
        <Image
          className="menuOptionIcon"
          src={deleteIcon}
          alt="delete icon"
          width={18}
          height={18}
        ></Image>
        <p className={stick_No_Bills.className}>Delete</p>
      </div>
    </div>
  );
}
