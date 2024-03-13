"use client";
import "./OptionsSesion.css";
import { Roboto } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import logout from "../../../../assets/logout.svg";
import homeIcon from "../../../../assets/homeIcon.svg";
import dashboardIcon from "../../../../assets/dashboardIcon.svg";
import logo from "../../../../assets/logo.svg";
import { useState } from "react";
import ClickDetector from "../../../../libs/ClickDetector/ClickDetector";
import { useRouter } from "next/navigation";

const roboto = Roboto({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export default function OptionsSesion() {
  const router = useRouter();
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
              <div className="navOption" onClick={() => router.push("/")}>
                <p className={roboto.className}>Home</p>
                <Image src={homeIcon} width={20} alt="home icon"></Image>
              </div>
              <div
                className="navOption"
                onClick={() => router.push("/dashboard")}
              >
                <p className={roboto.className}>DashBoard</p>
                <Image src={dashboardIcon} width={20} alt="home icon"></Image>
              </div>
              <div className="navOption" onClick={() => signOut()}>
                <p className={roboto.className}>Logout</p>
                <Image src={logout} width={20} alt="Logout icon"></Image>
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
              <div
                className={roboto.className + " movileMenuOption"}
                onClick={() => router.push("/")}
              >
                Home
              </div>
              <div
                className={roboto.className + " movileMenuOption"}
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
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
