import React from "react";
import {
  Button,
  Typography,
} from "@material-tailwind/react";
import { useLayoutDirection } from '../../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"
import Img from "../../../../src/assets/Target.jpg"


export default function Target() {
  const { isRTL, setIsRTL } = useLayoutDirection();
  const { t, i18n } = useTranslation("global");

  return (
    <>
      <div className="bg-Black w-full relative h-[70vh] md4:h-[50vh] mb-24 mt-12
      before:bg-Black/80 before:w-full before:z-10 before:absolute before:h-full before:bg-clip-padding before:backdrop-filter before:backdrop-blur-[6px] before:content-[''] before:inset-0">
        <div className="w-full h-full center flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-8 z-20">
            <Typography
                variant="h1"
                className={`leading-tight text-White text-4xl`}
              >
                {t("ourGoal.title")}
              </Typography>
              <Typography variant="lead" className="text-[#cbcbcb] w-[85%] lg:w-[59%] text-center text-xl md:text-2xl leading-[32px] md:leading-[40px] font-medium">
               {t("ourGoal.description")} 
              </Typography>
        </div>
        <img src={Img} alt="ImageLoading" className="absolute w-full h-full object-cover imgSettings" />
      </div>
    </>
  )
}