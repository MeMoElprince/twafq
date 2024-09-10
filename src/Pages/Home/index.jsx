import React from 'react'
import Describe from './Describe/Describe'
import Features from './Features/Features'
import Target from './Target/Target'
import AccountVerfiy from './AccountVerfiy/AccountVerfiy'
import FAQ from './FAQ/FAQ'
import UsersCardRatio from './UsersCardRatio.jsx/UsersCardRatio'
import { useLayoutDirection } from "../../Store/Context/LayoutDirectionContext";
import { useTranslation } from "react-i18next";
import { Helmet } from 'react-helmet-async';
import Reviews from './Reviews/Reviews'



export default function Home() {
  const { isRTL, setIsRTL } = useLayoutDirection();
  const { t, i18n } = useTranslation("global");
  return (
    <div className='bg-White center flex-col'>
      <Helmet>
        <title>{t('home.title')}</title>
        <meta name='description' content={t('home.description')} />
      </Helmet>
        <Describe />
        <Target />
        <UsersCardRatio />
        <Features />
        <AccountVerfiy />
        <Reviews />
        <FAQ />
    </div>
  )
}