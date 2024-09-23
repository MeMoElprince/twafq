import React, { useState, useEffect, useRef } from "react";
import { useLayoutDirection } from "../../../Store/Context/LayoutDirectionContext";
import { Link } from "react-router-dom";

export default function LoggedInMenu({ handleLogout, upper }) {
  const { isRTL } = useLayoutDirection();
  const [isActive, setIsActive] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsActive(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div
      className={`${isRTL ? "mr-auto" : "ml-auto"} relative center`}
      ref={menuRef}
    >
      <button
        onClick={() => setIsActive((prev) => !prev)}
        className={`text-white bg-red-500 hover:bg-red-600/85 ${
          isActive && "ring-2 outline-none ring-DarkPink/40"
        } font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center`}
        type="button"
      >
        {isRTL ? "الاعدادات" : "Settings"}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {isActive && (
        <div className={`bg-gray-700 absolute ${upper ? "bottom-[100%] mb-2" : "top-[100%] mt-2"} divide-y divide-gray-600 rounded-lg shadow w-44`}>
          <ul
            className="py-2 text-sm text-White"
            aria-labelledby="dropdownDividerButton"
          >
            <li>
              <Link to="/myProfile" aria-label={isRTL ? "الملف الشخصي" : "My profile"} className="block px-4 py-2 hover:bg-gray-600 text-center">
                {isRTL ? "الملف الشخصي" : "My profile"}
              </Link>
            </li>
            
          </ul>
          <div className="py-2 w-full">
            <button
              onClick={handleLogout}
              aria-label={isRTL ? "تسجيل الخروج" : "Logout"}
              className="block px-4 py-2 w-full text-sm text-White hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              {isRTL ? "تسجيل الخروج" : "Logout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
