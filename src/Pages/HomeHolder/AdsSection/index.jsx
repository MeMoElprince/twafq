import { useState } from 'react';
import { motion, useMotionValue } from 'framer-motion'
import Ad from './assets/Ad.jpg'
import InView from '../../../utils/InView'
import { HiArrowLongRight } from "react-icons/hi2";

import { clipPathLeftToRight } from '../../../Store/AnimationValues'

const Ads = [Ad, Ad, Ad]

export default function AdsSection() {
  const [imgTurn, setImgTurn] = useState(0)
  const dragMotion = useMotionValue(0)
  const DragBuffer = 10

  const variants = clipPathLeftToRight(0)

  const handleMove = (type = "drag") => {
    const x = dragMotion.get()
    if (type === "+1" && imgTurn < Ads.length) {
      setImgTurn(prev => prev + 1)
    }
    if (type === "-1" && imgTurn > 0) {
      setImgTurn(prev => prev - 1)
    }
    if (x <= -DragBuffer && imgTurn < Ads.length - 1) {
      setImgTurn(prev => prev + 1)
    } else if (x >= DragBuffer && imgTurn > 0) {
      setImgTurn(prev => prev - 1)
    }
  }
  return (
    <div className="relative w-full h-screen center overflow-hidden">
      <InView variants={variants} classes="w-screen h-full center">
        <div className='relative w-full h-[60%]'>
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            style={{ x: dragMotion }}
            animate={{ translateX: `-${imgTurn * (100 / Ads.length)}%` }}
            transition={{ stiffness: 300, damping: 30 }}
            onDragEnd={handleMove}
            className='absolute top-0 left-0  h-full flex'>
            {
              Ads.map((el, idx) => (
                <div key={idx} style={{
                  backgroundImage: `url(${el})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }} className="w-screen h-full imgSetting" />
              ))
            }
          </motion.div>
        </div>
        <Functionality handleMove={handleMove} imgTurn={imgTurn} setImgTurn={setImgTurn} AdsLength={Ads.length} />
      </InView>
    </div>
  )
}

const Functionality = ({ handleMove, imgTurn, setImgTurn, AdsLength }) => {
  return (
    <>
      <div className='absolute left-10 bottom-1/4'>
        <button className='text-white self-end bg-Black rounded-full py-5 px-6 sm:py-7 sm:px-12
            relative overflow-hidden inline-block z-10 focus:outline-none
            before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:-z-10
            before:rounded-inherit before:bg-[#505050] before:bg-opacity-40 
            before:transition-all before:duration-300 before:ease-in-out
            hover:before:left-0'>
          VIEW PROFILE
        </button>
      </div>
      {imgTurn > 0 && <div className='absolute left-2 sm:left-10 top-1/2 -translate-y-1/2'>
        <button onClick={() => { handleMove("-1") }} className='rotate-180 self-center text-white bg-Black/50 rounded-full p-5 group hover:bg-white/50 duration-300'>
          <HiArrowLongRight className='size-6 sm:size-8 group-hover:text-Black group-hover:translate-x-[10px] duration-300' />
        </button>
      </div>}
      {imgTurn < AdsLength - 1 && <div className='absolute right-2 sm:right-10 top-1/2 -translate-y-1/2'>
        <button onClick={() => { handleMove("+1") }} className='self-center text-white bg-Black/50 rounded-full p-5 group hover:bg-white/50 duration-300'>
          <HiArrowLongRight className='size-6 sm:size-8 group-hover:text-Black group-hover:translate-x-[10px] duration-300' />
        </button>
      </div>}
      <div className='absolute left-1/2 bottom-[21%] -translate-x-1/2 flex bg-white/30 p-1 rounded-full'>
        {
          Array.from({ length: AdsLength }, (_, idx) => (
            <button key={idx} onClick={() => {setImgTurn(idx)}} className={`w-4 h-4 rounded-full mx-1 cursor-pointer ${imgTurn === idx ? 'bg-Black' : 'bg-White'}`} />
          ))
        }
      </div>
    </>
  )
}
