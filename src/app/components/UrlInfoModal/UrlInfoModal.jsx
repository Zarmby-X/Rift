"use client";
import "./UrlInfoModal.css";
import Image from "next/image";
import logo from "../../../assets/logo.svg";
import { Stick_No_Bills, Roboto } from "next/font/google";
import { useState } from "react";
import UrlsController from "../../../controllers/Urls";
import { useEffect } from "react";
import Loading from "../Loading/Loading";

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

export default function UrlInfoModal(props) {
  const urlRegExp =
    /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/i;
  const [formData, setFormData] = useState({
    alias: "",
    originalUrl: "",
  });
  const [validation, setValidation] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.url) {
      setFormData({
        urlID: props.url.id,
        alias: props.url.alias,
        originalUrl: props.url.originalUrl,
      });
    }
  }, []);

  const handleChange = (event) => {
    validateData(event.target.name, event.target.value);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleReload = () => {
    window.location.reload();
  };

  const submitForm = async (event) => {
    event.preventDefault();

    if (props.url && formData.originalUrl && !validation[0]) {
      setLoading(true);
      const url = await UrlsController.updateUrlApi(props.token, formData);
      if (url.error) {
      } else {
        handleReload();
        props.toogleModal();
      }
    }

    if (!props.url && formData.originalUrl && !validation[0]) {
      setLoading(true);
      const url = await UrlsController.createUrlApi(props.token, formData);
      if (url.error) {
      } else {
        handleReload();
        props.toogleModal();
      }
    }
    validateData("originalUrl", formData.originalUrl);
  };

  const validateData = (name, value) => {
    setValidation([]);

    if (name == "originalUrl" && !urlRegExp.test(value) && !value == "") {
      setValidation(["Invalid Format"]);
    }

    if (name == "originalUrl" && value == "") {
      setValidation(["Url cannot be empty"]);
    }
  };

  return (
    <div id="urlInfoModalWrap">
      <div id="modalContainer">
        {loading && (
          <div>
            <p id="loadingMsj">Procesacing</p>
            <Loading></Loading>
          </div>
        )}
        {!loading && (
          <div id="modalFlexColumn">
            <section id="modalUrlHeader">
              {props.url && (
                <p className={stick_No_Bills.className} id="updateUrlTittle">
                  Update url
                </p>
              )}
              {!props.url && (
                <p className={stick_No_Bills.className} id="newUrlTittle">
                  New url
                </p>
              )}
              <Image src={logo} alt="RiftLogo" width={100}></Image>
            </section>
            <form onSubmit={submitForm}>
              <label className={roboto.className} htmlFor="">
                Alias{" "}
                {!formData.alias && (
                  <span id="aliasAdvice">(Rift id by default)</span>
                )}
              </label>
              <input
                className={roboto.className}
                type="text"
                name="alias"
                value={formData.alias}
                onChange={handleChange}
                placeholder={props.url != null ? props.url.alias : "Alias"}
              />
              <label className={roboto.className} htmlFor="">
                Url
              </label>
              <div id="urlInputWrap">
                <input
                  className={roboto.className}
                  type="text"
                  name="originalUrl"
                  value={formData.originalUrl}
                  onInput={handleChange}
                  placeholder={
                    props.url != null
                      ? props.url.originalUrl
                      : "https://example.com"
                  }
                />
                {validation[0] && (
                  <div id="alertMessage" className={stick_No_Bills.className}>
                    {validation[0]}
                  </div>
                )}
              </div>
              <div id="formButtonsWrap">
                <button
                  type="submit"
                  id="modalAcceptButton"
                  className={stick_No_Bills.className}
                >
                  Accept
                </button>
                <button
                  onClick={() => props.toogleModal()}
                  type="button"
                  id="modalCancelButton"
                  className={stick_No_Bills.className}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
