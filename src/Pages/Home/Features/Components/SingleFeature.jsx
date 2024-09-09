import React from 'react'
import { useLayoutDirection } from '../../../../Store/Context/LayoutDirectionContext'
import { useTranslation } from "react-i18next"
import { BsHearts } from "react-icons/bs";

export default function SingleFeature({image, title, description}) {
  const { isRTL, setIsRTL } = useLayoutDirection();
  const { t, i18n } = useTranslation("global");
  return (
    <div className="relative">
        <dt>
            <div
                className="absolute flex items-center justify-center h-12 w-12 rounded-md text-White">
                <BsHearts className='text-DarkPink' size={64}/>
            </div>
            <p className={`font-heading ${isRTL ? "mr-16" : "ml-16"} text-xl leading-6 font-bold text-Black`}>{title}</p>
        </dt>
        <dd className={`mt-2 ${isRTL ? "mr-16" : "ml-16"} text-lg text-Black/70`}>
            {description}
        </dd>
    </div>
  )
}
