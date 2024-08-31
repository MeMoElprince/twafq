import React, {useState, useEffect} from 'react'


export function BlogCard(props){
    return(
        <div className="bg-White cursor-pointer rounded-xl overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative group">
            <img src={props.img} alt="Blog Post 1" className="w-full h-96 object-cover" />
            <div className="p-6 absolute bottom-0 left-0 right-0 bg-gray-200 opacity-90">
                <span className="text-sm block text-gray-600 mb-2">{props.date}</span>
                <h3 className="text-xl font-bold text-[#333]">{props.title}</h3>
                <div className="h-0 overflow-hidden group-hover:h-16 group-hover:mt-4 transition-all duration-300">
                    <p className="text-gray-600 text-sm">{props.description}</p>
                </div>
            </div>
        </div>
    );
}