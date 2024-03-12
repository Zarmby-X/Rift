import "./DeleteAlertModal.css";
import { Stick_No_Bills, Roboto } from "next/font/google";
import Image from "next/image";
import logo from "../../../assets/logo.svg";
import { useState } from "react";
import Loading from "../Loading/Loading";
import UrlsController from "../../../controllers/Urls";

const stick_No_Bills = Stick_No_Bills({
  weight: ["400"],
  display: "swap",
  style: ["normal"],
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ["400"],
  display: "swap",
  style: ["normal"],
  subsets: ["latin"],
});

export default function DeleteAlertModal(props) {
  const [loading, setLoading] = useState(false);

  const deleteUrl = async (event) => {
    setLoading(true);
    const deletedUrl = await UrlsController.deleteUrlApi(
      props.token,
      props.url.id
    );
    if (deletedUrl.error) {
      //i need to solve errors logic :P
    } else {
      window.location.reload();
    }
  };

  return (
    <div id="deleteAlertModal">
      <div id="deleteAlertContainer">
        {!loading && (
          <div id="deleteAlertHeader">
            <p className={stick_No_Bills.className}>Delete Url</p>
            <Image src={logo} alt="RiftLogo" width={80}></Image>
          </div>
        )}
        {!loading && (
          <div id="deleteAlertConten">
            <p>
              Are you sure want to delete:{" "}
              <span id="deleteAlertUrlAlias">{props.url.alias}</span> Url?
            </p>
            <p>
              Origin:{" "}
              <a href={props.url.originalUrl} target="blank">
                {props.url.originalUrl}
              </a>
            </p>
          </div>
        )}
        {!loading && (
          <div id="deleteAlertButtonsWrap">
            <button
              type="button"
              id="deleteAlertAcceptButton"
              className={stick_No_Bills.className}
              onClick={() => deleteUrl()}
            >
              Accept
            </button>
            <button
              type="button"
              id="deleteAlertCancelButton"
              className={stick_No_Bills.className}
              onClick={() => props.toogleDeleteAlert()}
            >
              Cancel
            </button>
          </div>
        )}
        {loading && (
          <div>
            <p className={stick_No_Bills.className} id="deleteAlertProcessMsj">
              Processing
            </p>
            <Loading></Loading>
          </div>
        )}
      </div>
    </div>
  );
}
