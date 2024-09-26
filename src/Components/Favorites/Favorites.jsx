import React, { useContext } from "react";
import Card from "./Components/Card";
import { useTranslation } from 'react-i18next'
import { AuthenticationContext } from "../../Store/Context/Authentication";
import { Link } from "react-router-dom";

export default function Favorites({ title, subTitle, Token }) {
  const {i18n } = useTranslation("global");
  const {formData, isLogedIn} = useContext(AuthenticationContext)
  
  if(!formData || !isLogedIn)
    return null;
  // console.log(formData.favoriteUsers)
  return (
    <div className="relative flex min-h-screen z-50 flex-col items-center justify-center overflow-hidden bg-Black/70 backdrop-blur-sm">
      <div className="flex h-screen w-full flex-col items-center justify-center gap-y-2 mt-11">
        <div className="w-[330px] rounded-xl border border-gray-200 bg-white py-4 px-2 shadow-md shadow-LighterPink/20">
          <div className="flex items-center justify-between px-2 text-lg py-2 font-medium text-Black">
            <div className="border-b-2 pb-1 border-DarkPink">{title}</div>
            <div>
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-Black hover:bg-DarkPink/25">
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex max-h-[400px] w-full flex-col overflow-y-scroll px-2 gap-5">

            {formData?.favoriteUsers?.map((id, index) => (
                <Card id={id} formData={formData} isLogedIn={isLogedIn} key={index} />
            ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
