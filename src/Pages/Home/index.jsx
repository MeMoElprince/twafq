import React from 'react'
import Describe from './Describe/Describe'
import Features from './Features/Features'
import Target from './Target/Target'
import AccountVerfiy from './AccountVerfiy/AccountVerfiy'



export default function Home() {
  return (
    <div className='bg-White'>
        <Describe />
        <Target />
        <Features />
        <AccountVerfiy />
    </div>
  )
}