import React from 'react'
import Describe from './Describe/Describe'
import Features from './Features/Features'
import Target from './Target/Target'
import AccountVerfiy from './AccountVerfiy/AccountVerfiy'
import FAQ from './FAQ/FAQ'
import UsersCardRatio from './UsersCardRatio/UsersCardRatio'
import { useLayoutDirection } from "../../Store/Context/LayoutDirectionContext";
import { useTranslation } from "react-i18next";
import { Helmet } from 'react-helmet-async';
import Reviews from './Reviews/Reviews'
import { AuthenticationContext } from '../../Store/Context/Authentication'
import UsersCard from './UsersCard/UsersCard'



export default function Home() {
  const {isLogedIn, formData, Token} = React.useContext(AuthenticationContext)
  const { t } = useTranslation("global");
  return (
    <div className='bg-White center flex-col'>
      <Helmet>
        <title>{t('home.title')}</title>
        <meta name='description' content={t('home.description')} />
      </Helmet>
        <Describe />
        <Target />
        {isLogedIn && <UsersCardRatio />}
        <UsersCard />
        <Features />
        <AccountVerfiy formData={formData} Token={Token} isLogedIn={isLogedIn} />
        <Reviews />
        <FAQ />
    </div>
  )
}