import React from "react";
import {
  Button,
  Typography,
} from "@material-tailwind/react";
import { useLayoutDirection } from '../../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"
import Confirmed from "../../../assets/Confirmed.png"

export default function AccountVerfiy() {
  const { isRTL, setIsRTL } = useLayoutDirection();
  const { t, i18n } = useTranslation("global");

  return (
    <section className="bg-White myFont">
        <div className="container mx-auto px-4 sm:px-6 lg:px-24">
            <div className="grid grid-cols-1 md4:grid-cols-2 items-center gap-8">
                <div className="max-w-[90%]">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{t("aboutVerify.title")}</h2>
                    <p className="mt-4 text-gray-600 text-lg">{t("aboutVerify.description")}</p>
                    <div className="mt-8 group transition-all duration-300">
                        <a href="#" className="text-DarkPink hover:text-[#e84762] font-medium text-lg">{t("aboutVerify.buttonText")}
                            {isRTL ? <span className="mr-2 group-hover:mr-4 transition-all duration-300">&#8592;</span> : <span className="ml-2 group-hover:ml-4 transition-all duration-300">&#8594;</span>}
                        </a>
                    </div>
                </div>
                <div className="mt-12 md:mt-0">
                    <img src={Confirmed} alt="About Us Image" className={`object-cover rounded-lg ${!isRTL && "scale-x-[-1]"}`} />
                </div>
            </div>
        </div>
    </section>
  )
}