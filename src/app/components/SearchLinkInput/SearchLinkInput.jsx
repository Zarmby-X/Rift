"use client";
import searchIcon from "../../../assets/searchIcon.svg";
import "./SearchLinkInput.css";
import Image from "next/image";
import { Roboto } from "next/font/google";
import { useRef } from "react";

const roboto = Roboto({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export default function SearchLinkInput(props) {
  const $inputBox = useRef(null);

  const onFocus = () => {
    $inputBox.current.style.border = "2px solid #bebebe";
    $inputBox.current.style.boxShadow = "0px 0px 10px 0px #ffffff13";
  };

  const onBlur = () => {
    $inputBox.current.style.border = "2px solid #6c6c6c";
    $inputBox.current.style.boxShadow =
      "0px 0px 0px 0px rgba(255, 255, 255, 0.113)";
  };

  const filterInput = (e) => {
    const filterText = e.target.value;
    props.filterUrl(filterText);
  };

  return (
    <div ref={$inputBox} id="searchLinkInput">
      <Image src={searchIcon} height={40} alt="searchIcon"></Image>
      <input
        name="filterSearchImput"
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={filterInput}
        className={roboto.className}
        type="text"
        placeholder="Search"
      />
    </div>
  );
}
