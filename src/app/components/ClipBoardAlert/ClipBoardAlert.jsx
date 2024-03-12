import "./ClipBoardAlert.css";
import { Stick_No_Bills } from "next/font/google";

const stick_No_Bills = Stick_No_Bills({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export default function ClipBoardAlert(props) {
  return (
    <div id="clipBoardAlertWrap">
      <p className={stick_No_Bills.className}>Copied</p>
    </div>
  );
}
