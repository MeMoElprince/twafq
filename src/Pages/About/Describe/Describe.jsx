import React from "react";
import {
  Button,
  Typography,
} from "@material-tailwind/react";
import { useLayoutDirection } from '../../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"
import Img from "../../../../src/assets/Image1.png"
// import ThemeProvider from "../theme-provider";

export default function Describe() {
  const { isRTL, setIsRTL } = useLayoutDirection();
  const { t, i18n } = useTranslation("global");

  return (
    <header className="min-h-screen w-screen bg-White relative px-8 py-8 lg2:mb-36 myFont flex items-center justify-center pt-28">
      <div className="mx-auto flex justify-center items-center ">
        <div className={`text-center ${isRTL ? "lg2:text-right" : "lg2:text-left"} w-[80%]`}>
          {/* <div className="mb-8 inline-flex items-center">
            <Typography
              variant="small"
              className={`"mr-3 py-0.5 px-3 font-bold text-dark uppercase border-r border-dark"`}
            >
              New
            </Typography>
            <Typography
              color="dark"
              variant="small"
              className="flex items-center font-bold uppercase"
            >
              Astro Starter Template
            </Typography>
          </div> */}
          <Typography
            variant="h1"
            color="blue-gray"
            className={`mb-8 leading-tight font-Black`}
          >
            {t("aboutSec1.title")} <span className="text-DarkPink">{`${i18n.language == 'ar' ? "عرايس" : "Arayes"}`}</span>
          </Typography>
          <Typography variant="lead" color="blue-gray">
          {t("aboutSec1.description")}
          </Typography>
          <div className="mt-12 flex flex-wrap justify-center gap-3 lg2:justify-start">
              <Button className="flex items-center bg-DarkPink hover:bg-[#e84762] text-White rounded-full px-9 text-md sm:text-lg font-semibold">
                {t("aboutSec1.buttonText")}
              </Button>
          </div>
        </div>
      </div>
      <div className="basis-[75%] h-full hidden lg2:flex">
        <img src={Img} alt="components" className="w-[80%] min-w-[400px]" />
      </div>
    </header>
  )
}