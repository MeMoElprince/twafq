import React, { useContext, useEffect, useState } from "react";
import Card from "./Components/Card";
import { useTranslation } from 'react-i18next'
import { AuthenticationContext } from "../../Store/Context/Authentication";
import { Link } from "react-router-dom";

export default function ContactWith({ title, setPopType, setPopActive }) {
  const {i18n } = useTranslation("global");
  const {formData, isLogedIn, Token} = useContext(AuthenticationContext)
  const [currContactList, setCurrContactList] = useState([])
  
  if(!formData || !isLogedIn)
    return null;
  // console.log(formData.usersContactWith)

  useEffect(() => {
    if(formData){
      setCurrContactList(formData?.usersContactWith || []);
    }
  }, [formData, formData?.usersContactWith])


  // useEffect(() => {
  //   console.log(formData)
  // }, [formData])


  function handleClose(){
    setPopType('');
    setPopActive(false);
  }

  return (
    <div className="relative flex z-50 h-screen w-screen flex-col items-center justify-center overflow-hidden bg-Black/70 backdrop-blur-sm">
      <div className="flex h-screen w-full flex-col items-center justify-center gap-y-2 mt-11">
        <div className="w-[330px] rounded-xl border border-gray-200 bg-white py-4 px-2 shadow-md shadow-LighterPink/20">
          <div className="flex items-center justify-between px-2 text-lg py-2 font-medium text-Black">
            <div className="border-b-2 pb-1 border-DarkPink">{title}</div>
            <div>
              <button onClick={handleClose} aria-label={i18n.language === 'ar' ? "اغلاق القائمة" : "Close menu"} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-Black hover:bg-DarkPink/25">
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

            {currContactList && currContactList.length > 0 && currContactList.map((id, index) => (
                <Card id={id} formData={formData} setPopActive={setPopActive} setPopType={setPopType} isLogedIn={isLogedIn} Token={Token} key={index} />
            ))}
            {
              currContactList.length <= 0 && (
                <p className="w-full center h-[300px]">{i18n.language === 'ar' ? "لا يوجد اعضاء" : "There is no users"}</p>
              )
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
