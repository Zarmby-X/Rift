"use client";
import OptionsSesion from "./SessionOptions/OptionsSesion";
import "./Navbar.css";
import { Stick_No_Bills } from "next/font/google";
import Image from "next/image";
import logo from "../../../assets/logo.svg";
import { usePathname } from "next/navigation";

const stick_No_Bills = Stick_No_Bills({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export default function NavBar() {
  const path = usePathname();

  if (path == "/dashboard" || path == "/") {
    return (
      <nav>
        <div id="navLogo">
          <Image
            id="logoImage"
            src={logo}
            alt="Rift Logo"
            priority
            height={50}
          ></Image>
          <p className={stick_No_Bills.className}>RIFT</p>
        </div>
        <OptionsSesion></OptionsSesion>
      </nav>
    );
  }
}
