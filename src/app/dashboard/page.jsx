"use client";
import "./Dashboard.css";
import { Bebas_Neue, Roboto } from "next/font/google";
import Image from "next/image";
import starAdd from "../../assets/starAdd.svg";
import LinkList from "./LinkList/LinkList";
import ClipBoardAlert from "../components/ClipBoardAlert/ClipBoardAlert";
import { useState } from "react";
import { useSession } from "next-auth/react";
import UrlInfoModal from "../components/UrlInfoModal/UrlInfoModal";
import Loading from "../components/Loading/Loading";
import DeleteAlertModal from "../components/DeleteAlertModal/DeleteAlertModal";

const bebas_Neue = Bebas_Neue({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export default function Dashboard() {
  const { data: session } = useSession();
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(null);

  const toogleAlert = () => {
    if (!showAlert) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  };

  const toogleModal = (url) => {
    if (url) {
      setCurrentUrl(url);
    }
    if (showModal == false) {
      setShowModal(true);
    } else {
      setCurrentUrl(null);
      setShowModal(false);
    }
  };

  const toogleDeleteAlert = (url) => {
    if (showDeleteAlert == false) {
      setCurrentUrl(url);
      setShowDeleteAlert(true);
    } else {
      setCurrentUrl(null);
      setShowDeleteAlert(false);
    }
  };

  if (session) {
    return (
      <>
        <div id="dashboardContainer">
          {showModal && (
            <UrlInfoModal
              token={session.token}
              toogleModal={toogleModal}
              url={currentUrl}
            ></UrlInfoModal>
          )}
          {currentUrl && showDeleteAlert && (
            <DeleteAlertModal
              token={session.token}
              url={currentUrl}
              toogleDeleteAlert={toogleDeleteAlert}
            ></DeleteAlertModal>
          )}
          <div id="dashboardHeader">
            <p className={bebas_Neue.className} id="dashboardTittle">
              DASHBOARD
            </p>
            <button onClick={() => toogleModal()} id="addLinkButton">
              <Image src={starAdd} width={20} alt="star"></Image>
              <p className={roboto.className}>CREATE NEW LINK</p>
            </button>
          </div>
          <LinkList
            toogleModal={toogleModal}
            toogleAlert={toogleAlert}
            token={session.token}
            toogleDeleteAlert={toogleDeleteAlert}
          ></LinkList>
          {showAlert && <ClipBoardAlert></ClipBoardAlert>}
        </div>
      </>
    );
  }

  return (
    <div id="dashBoardLoadingContainer">
      <Loading></Loading>
    </div>
  );
}
