import React, { useState, useEffect } from "react";
import { useLayoutDirection } from "../../../Store/Context/LayoutDirectionContext";
import { useTranslation } from "react-i18next";
import Confirmed from "../../../assets/Confirmed.webp";
import Fetch from "../../../Components/CustomHooks/Fetch";
import { verifyURL } from "../../../Store/urls";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function AccountVerfiy({isLogedIn, formData, Token}) {
  const { isRTL } = useLayoutDirection();
  const { t } = useTranslation("global");

  const [addingUrl, setAddingUrl] = useState("");
  const [addingUrlHolder, setAddingUrlHolder] = useState({});
  const [addingLoading, setAddingLoading] = useState(false);
  const navigate = useNavigate();

  function handleGetData(e) {
    if(!isLogedIn){
        navigate("/login")
        return;
    }
    if (!isLogedIn || !Token || addingLoading || !formData?.id || formData.isVerifiedUser)
      return;
    Fetch({
      url: `${verifyURL()}amount=${1000}${`&user_id=${formData?.id}`}`,
      setLoading: setAddingLoading,
      setData: setAddingUrlHolder,
      method: "GET",
      Token,
    });
  }

  //   useEffect(() => {
  //     console.log(addingUrl)
  //   }, [addingUrl])

  useEffect(() => {
    if (addingUrlHolder) {
      setAddingUrl(addingUrlHolder?.statusMsg);
    }
    if (addingUrl !== "" && addingUrl) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.overflowX = "hidden";
    }
  }, [addingUrlHolder]);

  function LoadingSpinnerTwo() {
    return (
      <div className="center">
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-gray-200 animate-spin fill-DarkPink"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }

  return (
    <section className="myFont bg-White py-8">
      {addingUrl && (
        <div className="fixed inset-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
          <div className="relative size-[80%] z-50">
            <button
              className={`absolute size-[40px] bg-red-500 center text-white rounded-full p-2 -top-3 -right-3 z-50`}
              onClick={() => {
                setAddingUrl("");
                window.location.reload();
              }}
            >
              <IoClose size={24} />
            </button>
            <iframe
              src={addingUrl}
              className="size-full bg-white rounded-lg shadow-lg z-50"
              title={isRTL ? "الدفع" : "payment"}
            ></iframe>
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-28">
        <div className="center flex-col md4:flex-row justify-center items-center gap-8">
          <div className="max-w-[90%]">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {t("aboutVerify.title")}
            </h2>
            <p className="mt-4 text-gray-600 text-lg w-[100%] md4:w-[90%]">
              {t("aboutVerify.description")}
            </p>
            <div className="mt-8 group w-max transition-all duration-300">
              {!formData.isVerifiedUser &&
                <button
                onClick={handleGetData}
                aria-label="Verify Account"
                className="text-DarkPink w-max hover:text-[#e84762] font-medium text-lg"
              >
                {!addingLoading ? (
                  (isRTL ? (
                    <>
                        {t("aboutVerify.buttonText")}
                        <span className="mr-2 group-hover:mr-4 transition-all duration-300">
                        &#8592;
                        </span>
                    </>
                  ) : (
                    <>
                        {t("aboutVerify.buttonText")}
                        <span className="ml-2 group-hover:ml-4 transition-all duration-300">
                        &#8594;
                        </span>
                    </>
                  ))
                ) : (
                  addingLoading && <LoadingSpinnerTwo />
                )}
              </button>
              }
            </div>
          </div>
          <div className="mt-12 md:mt-0">
            <img
              src={Confirmed}
              alt="About Us Image"
              className={`object-cover rounded-lg ${!isRTL && "scale-x-[-1]"}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
