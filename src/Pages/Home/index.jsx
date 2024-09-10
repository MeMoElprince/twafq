import React from 'react'
import Describe from './Describe/Describe'
import Features from './Features/Features'
import Target from './Target/Target'
import AccountVerfiy from './AccountVerfiy/AccountVerfiy'
import FAQ from './FAQ/FAQ'
import UsersCardRatio from './UsersCardRatio.jsx/UsersCardRatio'



export default function Home() {
  return (
    <div className='bg-White center flex-col'>
        <Describe />
        <Target />
        <UsersCardRatio />
        <Features />
        <AccountVerfiy />
        <FAQ />
    </div>
  )
}