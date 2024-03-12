"use client";
import "./LinkCard.css";
import { Stick_No_Bills } from "next/font/google";
import OptionsMenu from "./OptionsMenu/OptionsMenu";
import { useState } from "react";

const stick_No_Bills = Stick_No_Bills({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export default function LinkCard(props) {
  const [showMenu, setShowMenu] = useState(false);

  const toogleMenu = () => {
    setShowMenu(!showMenu);
  };

  const copyOnClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
    props.toogleAlert();
  };

  return (
    <div className="linkCardContainer">
      <div className="backgroundWrap"></div>
      <div className="colorBg"></div>
      {showMenu && (
        <OptionsMenu
          toogleMenu={toogleMenu}
          toogleModal={props.toogleModal}
          toogleDeleteAlert={props.toogleDeleteAlert}
          url={{
            id: props.id,
            alias: props.alias,
            originalUrl: props.originalUrl,
          }}
        ></OptionsMenu>
      )}
      <button
        onClick={() => toogleMenu()}
        className="cardOptionsButtons"
        title="options"
      >
        <div className="cardOptionPoint"></div>
      </button>
      <div className="LinkCardHeader">
        <p className={"LinkCardTittle " + stick_No_Bills.className}>
          {props.alias}
        </p>
        <p className={"linkCardSubTittle " + stick_No_Bills.className}>
          {props.originalUrl}
        </p>
      </div>
      <div className="linkCardFooter">
        <p className={"linkCardDesc " + stick_No_Bills.className}>
          {props.riftUrl}
        </p>
      </div>
      <button
        onClick={() => copyOnClipboard(props.riftUrl)}
        className="cardCopyButton"
        title="Copy"
      >
        <div className="squareIconCopyButton"></div>
      </button>
    </div>
  );
}
