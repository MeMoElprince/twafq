import React from "react";
import Card from "./Components/Card";
import Woman from "../../assets/Avatars/woman.png";
import Man from "../../assets/Avatars/man.png";
import verifiedMan from "../../assets/Avatars/verifiedMan.png";
import verifiedWoman from "../../assets/Avatars/verifiedWoman.png";
import { useTranslation } from 'react-i18next'

const dummyDetails = {
  firstName: "عبدالرحمن",
  lastName: "عبدالله",
  gender: ["ذكر", "Male"],
  age: 28,
  country: ["مصر", "Egypt"],
  city: ["القاهرة", "Cairo"],
  phone: "01284932223",
  isVerified: true,
  compatibilityRatio: 75,
};

export default function AccepetedRequests({ title, subTitle }) {
  const { t, i18n } = useTranslation("global");
  return (
    // <!-- component -->
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-Black/70 backdrop-blur-sm">
      <div class="flex h-screen w-full flex-col items-center justify-center gap-y-2 mt-11">
        <div class="w-[330px] rounded-xl border border-gray-200 bg-white py-4 px-2 shadow-md shadow-LighterPink/20">
          <div class="flex items-center justify-between px-2 text-lg py-2 font-medium text-Black">
            <div className="border-b-2 pb-1 border-DarkPink">{title}</div>
            <div>
              <button class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-Black hover:bg-DarkPink/25">
                <svg
                  class="h-5 w-5"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex max-h-[400px] w-full flex-col overflow-y-scroll px-2 gap-5">

              <Card userDetails = {dummyDetails} />
              <Card userDetails = {{...dummyDetails, isVerified: false, gender:["انثى", "Female"], compatibilityRatio : 93}} />
              <Card userDetails = {dummyDetails} />
              <Card userDetails = {{...dummyDetails, isVerified: true, gender:["انثى", "Female"]}} />
              <Card userDetails = {{...dummyDetails, isVerified: false}} />


              <Card userDetails = {{...dummyDetails, isVerified: true, gender:["انثى", "Female"]}} />
              <Card userDetails = {dummyDetails} />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
