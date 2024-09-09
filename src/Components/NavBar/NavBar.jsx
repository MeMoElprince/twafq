import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import ArLogo from '../../assets/ArLogo.png'
import EnLogo from '../../assets/EnLogo.png';
import { useLayoutDirection } from '../../Store/Context/LayoutDirectionContext'
import { IoMenu , IoClose } from "react-icons/io5";
import {useTranslation} from "react-i18next"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation("global");
  const { isRTL, setIsRTL } = useLayoutDirection();

  useEffect(() => {
    i18n.changeLanguage(isRTL ? "ar" : "en");
  }, [isRTL, i18n]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <nav className="fixed top-0 left-0 bg-LighterPink shadow-lg myFont w-full overflow-hidden border-b-2 border-black/5 z-50">
    <div className="w-full sm:px-6 lg:px-8 flex items-center justify-between h-20 center">
            <div className="center w-[90%]">
              <Link to="/">
                <img src={isRTL ? ArLogo : EnLogo} alt="Logo" className="h-20 w-20 focus:outline-none" />
              </Link>
              <div className={`hidden md4:flex items-baseline gap-4 lg:gap-12 ${isRTL ? "mr-auto" : "ml-auto"}`}>
                <Link to="/" className="text-Black focus:outline-none transition-colors duration-150 hover:text-DarkPink rounded-md text-lg font-medium">{t("navbar.home")}</Link>
                <Link to="/search" className="text-Black focus:outline-none transition-colors duration-150 hover:text-DarkPink rounded-md text-lg font-medium">{t("navbar.partner")}</Link>
                <Link to="/services" className="text-Black focus:outline-none transition-colors duration-150 hover:text-DarkPink rounded-md text-lg font-medium">{t("navbar.service")}</Link>
                <Link to="/about" className="text-Black focus:outline-none transition-colors duration-150 hover:text-DarkPink rounded-md text-lg font-medium">{t("navbar.about")}</Link>
                <Link to="/blogs" className="text-Black focus:outline-none transition-colors duration-150 hover:text-DarkPink rounded-md text-lg font-medium">{t("navbar.blog")}</Link>
                <Link to="/contact" className="text-Black focus:outline-none transition-colors duration-150 hover:text-DarkPink rounded-md text-lg font-medium">{t("navbar.contact")}</Link>
              </div>
                <Link to="/login" className={`hidden md4:block ${isRTL ? "mr-auto" : "ml-auto"} focus:outline-none`}><button className="bg-red-500 hover:text-Black focus:outline-none transition-colors duration-150 text-White px-4 py-2 rounded-full text-lg font-medium">{t("navbar.login")}</button></Link>
            </div>
            <button onClick={() => setIsRTL(!isRTL)} className={`absolute ${isRTL ? "md4:left-[2%] left-[7%]" : "md4:right-[2%] right-[7%]" } inline-flex items-center justify-center rounded-md text-Black hover:text-white focus:outline-none`}>
                  <p className='myFont text-lg bg-Black text-White px-3 py-1 rounded-lg'>{isRTL ? "EN" : "عر"}</p>
            </button>
            <button onClick={toggleMenu} className={`md4:hidden absolute ${isRTL ? "right-[7%]" : "left-[7%]"} inline-flex items-center justify-center rounded-md text-Black hover:text-white focus:outline-none`}>
                  {isOpen ? <IoClose size={40} /> : <IoMenu size={40} />}
            </button>
          </div>
          {isOpen && (
            <div className="md4:hidden mt-6 pt-2 pb-6 flex flex-col gap-4 w-full justify-center items-center sm:px-3">
              <Link to="/" className="text-Black hover:text-DarkPink transition-colors duration-150 block rounded-md text-lg font-medium">{t("navbar.home")}</Link>
              <Link to="/services" className="text-Black hover:text-DarkPink transition-colors duration-150 block rounded-md text-lg font-medium">{t("navbar.partner")}</Link>
              <Link to="/services" className="text-Black hover:text-DarkPink transition-colors duration-150 block rounded-md text-lg font-medium">{t("navbar.service")}</Link>
              <Link to="/about" className="text-Black hover:text-DarkPink block transition-colors duration-150 rounded-md text-lg font-medium">{t("navbar.about")}</Link>
              <Link to="/blogs" className="text-Black hover:text-DarkPink transition-colors duration-150 block rounded-md text-lg font-medium">{t("navbar.blog")}</Link>
              <Link to="/contact" className="text-Black hover:text-DarkPink block transition-colors duration-150 rounded-md text-lg font-medium">{t("navbar.contact")}</Link>
              <Link to="/login" className="bg-red-500 text-white hover:text-Black transition-colors duration-150 block px-16 py-2 rounded-full text-center mt-6 text-lg">{t("navbar.login")}</Link>
            </div>
          )}
        </nav>
  );
};

export default Navbar;
