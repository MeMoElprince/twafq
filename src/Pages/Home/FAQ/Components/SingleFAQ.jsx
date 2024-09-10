import React, {useState} from 'react'
import { useLayoutDirection } from '../../../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"

export default function SingleFAQ({question, answer, theme}) {
    const { isRTL, setIsRTL } = useLayoutDirection();
    const { t, i18n } = useTranslation("global");
    const [isActive, setIsActive] = useState(false);

    return (
        <div className={`${theme === 1 ? "bg-[#e4e4e4]" : "bg-White"} ${isActive ? "shadow-[0_2px_10px_-3px_rgba(255,8,109,0.2)]" : "shadow-sm"} border border-Black/15 h-min rounded-lg flex flex-col w-full md4:w-[80%]`}>
            <button 
                type="button"
                onClick={() => setIsActive(prevStatus => !prevStatus)}
                className="w-full text-lg font-semibold text-left p-6 text-Black flex items-center focus:outline-none"
            >
                <span className="mr-4">{question}</span>
                {
                    isActive ?
                    (
                        <svg className={`w-4 fill-current ${isRTL ? "mr-auto" : "ml-auto"} shrink-0`} viewBox="0 0 124 124">
                            <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000" />
                        </svg>
                    )
                    :
                    (
                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 fill-current ${isRTL ? "mr-auto" : "ml-auto"} shrink-0`}viewBox="0 0 42 42">
                            <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000" />
                        </svg>
                    )
                }
            </button>
            <div className={`pb-5 px-6 ${!isActive && "h-0 hidden"} overflow-hidden`}>
                <p className={`text-md text-Black/80 ${!isActive && "opacity-0 h-0"}`}>
                    {answer}
                </p>
            </div>
        </div>
    )
}
