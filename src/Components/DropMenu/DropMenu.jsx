import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useState, useRef, useEffect } from 'react'


export default function DropMenu({ label, options, selectedOption, onOptionSelect, isDark }){
    const [isOpen, setIsOpen] = useState(false);
    const dropMenuRef = useRef(null);


	const handleOptionClick = (option) => {
		onOptionSelect(option);
		setIsOpen(false);
	};

	const handleClickOutside = (event) => {
		if (dropMenuRef.current && !dropMenuRef.current.contains(event.target)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

    const colorMode = isDark ? 'text-Black' : 'text-White';

    return (
        <div className="relative inline-block center Fredoka">
            <span className={`${colorMode}/60 text-[14px] sm2:text-base`}>{label}:</span>
            <button className={`flex focus:outline-none items-center justify-between px-[10px] rounded-lg bg-none cursor-pointer text-[14px] sm2:text-base ${colorMode}`} onClick={() => setIsOpen(!isOpen)}>
                {selectedOption} <span className="ml-[4px]" >{isOpen ? <IoIosArrowUp size={20} color="#ACA08C"/> : <IoIosArrowDown size={20} color="#ACA08C"/>}</span>
            </button>
            {isOpen && (
                <div className="absolute top-full right-[10%] bg-[#aca08ca3] backdrop-blur-[10px] rounded-lg mt-1 z-10 min-w-min overflow-hidden" ref={dropMenuRef}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`p-[10px] cursor-pointer hover:bg-[#7b7b7b57] flex ${option === selectedOption ? `${colorMode} font-medium` : `${colorMode}/70`}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}