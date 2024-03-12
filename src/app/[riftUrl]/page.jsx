"use client";
import { useState, useEffect } from "react";
import Loading from "../components/Loading/Loading";
import "./page.css";
import { Stick_No_Bills } from "next/font/google";
import Image from "next/image";
import Logo from "../../assets/logo.svg";

const stick_No_Bills = Stick_No_Bills({
  weight: ["400"],
  display: "swap",
  style: "normal",
  subsets: ["latin"],
});

export default function redirectPage({ params }) {
  const [originUrl, setOriginUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/api/redirect`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        riftUrl: `http://localhost:3000/${params.riftUrl}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setTimeout(() => {
            setOriginUrl(data.originUrl);
          }, 1000);
        } else {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      });
  }, []);

  if (originUrl) {
    window.location.assign(originUrl);
  }

  if (loading) {
    return (
      <div id="redirectLoadingContainer">
        <div id="redirectRiftLogor">
          <div id="logoShiner"></div>
          <Image src={Logo} priority alt="rift logo" width={500}></Image>
        </div>
        <div id="redirectRiftmsjr">
          <p className={stick_No_Bills.className}>Redirecting</p>
          <p id="point1">.</p>
          <p id="point2">.</p>
          <p id="point3">.</p>
        </div>
      </div>
    );
  }

  return (
    <div id="urlNotfoundContainer">
      <div id="redirectRiftLogo">
        <div id="logoShine"></div>
        <Image src={Logo} priority alt="rift logo" width={500}></Image>
      </div>
      <p className={stick_No_Bills.className}>
        Sorry but this url does't exist.
      </p>
    </div>
  );
}
