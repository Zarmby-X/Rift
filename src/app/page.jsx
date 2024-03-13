"use client";
import Image from "next/image";
import "./globals.css";
import "./home.css";
import { Bebas_Neue, Stick_No_Bills } from "next/font/google";
import dashboard from "../assets/dashboard.svg";
import star from "../assets/starAdd.svg";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const bebas_Neue = Bebas_Neue({
  weight: ["400"],
  display: "swap",
  subsets: ["latin"],
  style: "normal",
});

const stick_No_Bills = Stick_No_Bills({
  weight: ["400"],
  display: "swap",
  subsets: ["latin"],
  style: "normal",
});

export default function home() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div id="homeMainContainer">
      <h1 className={bebas_Neue.className}>Rift - Shortener Url</h1>
      <div id="homeSeparatorLine"></div>
      <div id="homeButtonsWrap">
        <button id="aboutButton" className={stick_No_Bills.className}>
          About
        </button>
        <button
          id="githubButton"
          className={stick_No_Bills.className}
          onClick={() =>
            window.open("https://github.com/Zarmby-X/Rift", "_blank")
          }
        >
          Github
        </button>
      </div>
      <div id="starDashBoardWrap">
        <Image id="starDashBoard" src={star} width={70} alt="Star icon"></Image>
        <div id="shineStar"></div>
      </div>
      <div id="dashBoardImage">
        {/* <Image src={dashboard} width={1000} alt="sashboard image"></Image> */}
      </div>
    </div>
  );
}
