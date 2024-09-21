import React, {useState, useEffect} from 'react'
import { useLayoutDirection } from '../../../Store/Context/LayoutDirectionContext';
import imgHolder from './assets/imgHolder.webp'


export function BlogCard(props){
    const { isRTL, setIsRTL } = useLayoutDirection();
    var english = /^[A-Za-z\s]*$/;
    
    return(
        <div className="bg-white border border-Black/20 cursor-pointer rounded-xl min-w-[290px] overflow-hidden shadow-md relative group">
            <img src={props.img || imgHolder} alt="Blog Post" className="w-full h-96 object-cover" />
            <div className="p-6 absolute bottom-0 left-0 right-0 bg-gray-200 opacity-95">
                <span className="text-sm block text-gray-600 mb-2">
                    {new Date(props.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })}
                </span>
                <h3 
                    className="text-xl font-bold text-Black" 
                    style={{
                        direction: (isRTL && english.test(props?.title.split(" ")[0])) 
                        ? "ltr" 
                        : (!isRTL && !english.test(props?.title.split(" ")[0])) 
                        ? "rtl" 
                        : ""
                    }}
                    >
                    {props.title}
                </h3>
                <div className="h-0 overflow-hidden group-hover:h-16 group-hover:mt-4 transition-all duration-300">
                    <p className="text-Black/80 text-base"
                        style={{
                            direction: (isRTL && english.test(props?.description.split(" ")[0])) 
                            ? "ltr" 
                            : (!isRTL && !english.test(props?.description.split(" ")[0])) 
                            ? "rtl" 
                            : ""
                        }}
                    >{props.description}</p>
                </div>
            </div>
        </div>
    );
}