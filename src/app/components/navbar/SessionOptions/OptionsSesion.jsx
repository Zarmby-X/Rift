"use client";
import "./OptionsSesion.css";
import { Roboto } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import logout from "../../../../assets/logout.svg";
import logo from "../../../../assets/logo.svg";
import { useState } from "react";
import ClickDetector from "../../../../libs/ClickDetector/ClickDetector";

const roboto = Roboto({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export default function OptionsSesion() {
  const { data: session } = useSession();
  const [displayNavOptions, setDisplayNavOptions] = useState(false);

  const handleGlobalClick = (event) => {
    setDisplayNavOptions(false);
  };

  if (session) {
    return (
      <div>
        <div
          id="accountInfo"
          className="accountInfo"
          onClick={() => setDisplayNavOptions(true)}
        >
          <ClickDetector onGlobalClick={handleGlobalClick} />
          <p className={roboto.className}>{session.user.email}</p>
          <div id="accountOptionsIcon">
            <div id="accountOptionsIconline"></div>
          </div>
          {displayNavOptions && (
            <div id="navOptionsMenu">
              <div className="navOption" onClick={() => signOut()}>
                <p className={roboto.className}>Logout</p>
                <Image
                  id="logoutIcon"
                  src={logout}
                  width={20}
                  alt="Logout icon"
                ></Image>
              </div>
            </div>
          )}
        </div>
        <div id="mobileMenuButton" onClick={() => setDisplayNavOptions(true)}>
          <div id="mobileMenuButtonLine"></div>
          {displayNavOptions && (
            <div id="mobileNavOptionsMenu">
              <Image src={logo} width={150} alt="Rift logo"></Image>
              {!session && (
                <div
                  className={roboto.className + " movileMenuOption"}
                  onClick={() => signIn()}
                >
                  Sing in
                </div>
              )}
              <div className={roboto.className + " movileMenuOption"}>
                About
              </div>
              <div className={roboto.className + " movileMenuOption"}>
                Github
              </div>
              {session && (
                <div
                  className={roboto.className + " movileMenuOption"}
                  onClick={() => signOut()}
                >
                  Logout
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div id="accountInfo">
        <button id="signInButton" onClick={() => signIn()}>
          <p className={roboto.className}>Sign in </p>
        </button>
      </div>
      <div id="mobileMenuButton" onClick={() => setDisplayNavOptions(true)}>
        <div id="mobileMenuButtonLine"></div>
        {displayNavOptions && (
          <div id="mobileNavOptionsMenu">
            <Image src={logo} width={150} alt="Rift logo"></Image>
            {!session && (
              <div
                className={roboto.className + " movileMenuOption"}
                onClick={() => signIn()}
              >
                Sing in
              </div>
            )}
            <div className={roboto.className + " movileMenuOption"}>About</div>
            <div className={roboto.className + " movileMenuOption"}>Github</div>
            {session && (
              <div
                className={roboto.className + " movileMenuOption"}
                onClick={() => signOut()}
              >
                Logout
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
