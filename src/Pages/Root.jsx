import { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";
import useFetch from "../Components/CustomHooks/useFetch";
import { MyDataUrl } from "../Store/urls";
import Cookies from "js-cookie";
import { AuthenticationContext } from "../Store/Context/Authentication";
import AppDownload from "../Components/AppDownload/AppDownload";
import RateUs from "../Components/RateUs/RateUs";
import { useLayoutDirection } from "../Store/Context/LayoutDirectionContext";
import Favorites from "../Components/Favorites/Favorites";
import ContactWith from "../Components/ContactWith/ContactWith";

export default function Root() {
  const { isRTL } = useLayoutDirection();
  const [popActive, setPopActive] = useState(false);
  const [popType, setPopType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { handleFormDataChange, setIsLogedIn, isLogedIn } = useContext(
    AuthenticationContext
  );

  const token = Cookies.get("token");

  const { retData: data } = useFetch(
    token
      ? {
          url: `${MyDataUrl()}token=${token}`,
          method: "GET",
          setErrorMessage,
          Token: token,
        }
      : { url: "", method: "GET", setErrorMessage: () => {}, Token: "" }
  );

  // console.log(data);
  // console.log(isLogedIn)

  useEffect(() => {
    if (!data) return;

    if (data) {
      setIsLogedIn(true);
      // console.log(isLogedIn)
      handleFormDataChange(data);
    } else {
      setIsLogedIn(false);
      // console.log("Logged out")
    }
  }, [data, isRTL, isLogedIn]);

  // useEffect(() => {
  //   console.log(formData)
  // }, [formData])

  useEffect(() => {
    if (popActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.overflowX = "hidden";
    }
  }, [popActive]);

  const mainStyle = popActive ? "opacity-30 imgSettings" : "";

  return (
    <main className="bg-White overflow-hidden">
      <NavBar setPopActive={setPopActive} setPopType={setPopType} />
      <div>
        <div className={mainStyle}>
          <Outlet />
        </div>
      </div>
      {popActive && (
        <div className="fixed inset-0 flex items-center justify-center w-screen h-screen z-50">
          {popType === "Favorites" && (
            <Favorites
              title={isRTL ? "قائمة المفضلة" : "Favorites"}
              setPopActive={setPopActive}
              setPopType={setPopType}
            />
          )}
          {popType === "ContactWith" && (
            <ContactWith
              title={isRTL ? "قائمة التواصل" : "Contact List"}
              setPopActive={setPopActive}
              setPopType={setPopType}
            />
          )}
        </div>
      )}
      <div className="center w-[full] bg-Black gap-0 md4:gap-32 px-16 md4:px-32 md4:flex-row flex-col pt-16 pb-2 -mb-1">
        <RateUs />
        <AppDownload />
      </div>
      <Footer />
    </main>
  );
}
