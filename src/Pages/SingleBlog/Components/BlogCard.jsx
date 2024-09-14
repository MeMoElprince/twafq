import React, {useState, useEffect} from 'react'

const containsLongWord = (sentence) => {
    return sentence.split(" ").some((word) => word.length > 12);
  };


export function BlogCard(props){
    return(
        <div className="cursor-pointer overflow-hidden w-full relative flex gap-4 transition-all duration-200 myFont text-Black hover:text-DarkPink">
            <img src={props.img} alt="Blog Post 1" className="size-[100px] object-cover rounded-sm" />
            <div className="flex flex-col gap-2">
                <h4 className={`text-base font-medium line-clamp-2 breaka-all ${
                    containsLongWord(props.title)
                ? "break-all hyphenated"
                : ""
            }`}>{props.title}</h4>
                <p className={`text-sm text-gray-600 line-clamp-2 breaka-all ${
                    containsLongWord(props.description)
                ? "break-all hyphenated"
                : ""
            }`}>{props.description}</p>
            </div>
        </div>
    );
}