import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

export default function Cardlayout({ details, top }) {
  const [isFavorite, setIsFavorite] = useState(details.isFavorite)
  return (
    <div
      style={{
        background: top % 2 ? 'rgba(253, 191, 80, 0.07)' : 'rgba(244, 244, 248, 0.07)'
      }}
      className='grid grid-cols-12 rounded-3xl py-3 px-3'>
      <div style={{
        background: 'linear-gradient(117.26deg, rgba(244, 244, 248, 0.6) 45.53%, #FDBF50 119.63%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }} className='col-span-2 sm2:col-span-1 center text-white NunitoSans text-2xl font-bold md:pr-4'>#{top<10 && '0'}{top}
      </div>
      <div className='col-span-6 sm2:col-span-8 md:col-span-2 items-center justify-center md:justify-normal text-white flex gap-x-4 md:pr-4'>
        <img style={{ boxShadow: '0px 0px 22.4px 0px rgba(253, 191, 80, 0.15)' }} src={details.img} className="hidden xl:block rounded-full size-14" alt="" />
        <p className="">{details.name}</p>
      </div>
      <div className='hidden md:flex col-span-6 justify-center items-center  text-white md:pr-4'>
        {details.discreption}
      </div>
      <div className='col-span-2 center text-white flex gap-x-[2px] md:pr-4'>
        <FaStar className="mr-2" size={20} />
        <p>{details.rating}</p>
        <p className="text-xs">({details.totalRates})</p>
      </div>
      <div className='col-span-2 sm2:col-span-1 center text-white px-2'>
        <button onClick={() => { setIsFavorite(prev => !prev) }}>
          {isFavorite ? <FaHeart className="" size={20} /> : <FaRegHeart size={20} />}
        </button>
      </div>
    </div >
  )
}