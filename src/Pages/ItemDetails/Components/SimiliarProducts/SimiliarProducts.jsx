import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useInView, useAnimation } from 'framer-motion'
import Prod from './Prod'
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { popularProdcuts } from '../../../../Store/urls'
import useFetch from '../../../../Components/CustomHooks/useFetch'
import placeholder from './assets/placeholder.jpg'


const DragBuffer = 10
export default function SimiliarProducts() {
  const dragRef = useRef()
  const inView = useInView(dragRef)
  const controls = useAnimation()
  const [imgTurn, setImgTurn] = useState(0)
  const dragMotion = useMotionValue(0)
  const { data, loading } = useFetch({
    url: popularProdcuts(),
    method: 'GET'
  })
  const moveDenominator =
    window.innerWidth > 1280 ? 3 :
      window.innerWidth > 768 ? 2 :
        1
  const dragPercintage = 100 / moveDenominator
  const DragEnd = () => {
    handleMove()
  }
  const handleMove = (type = "drag") => {
    const x = dragMotion.get()
    if (type === "+1" && imgTurn + moveDenominator - 1 < data.length - 1) {
      setImgTurn(prev => prev + 1)
    }
    if (type === "-1" && imgTurn > 0) {
      setImgTurn(prev => prev - 1)
    }
    if (x <= -DragBuffer && imgTurn + moveDenominator - 1 < data.length - 1) {
      setImgTurn(prev => prev + 1)
    } else if (x >= DragBuffer && imgTurn > 0) {
      setImgTurn(prev => prev - 1)
    }
  }

  useEffect(() => {
    if (inView && loading === false) {
      controls.start('visible')
    }
  }, [inView])
  return (
    <main className="relative h-[120vh] z-[1] mt-56 w-full">
      <section className='flex flex-col w-full h-full space-y-10 md:space-y-0 pb-20'>
        <header className='flex justify-center'>
          <h1 className='text-center text-4xl md:text-4xl lg:text-7xl EBGaramond text-Black'>POPULAR PRODUCTS</h1>
        </header>
        <section className='flex-grow p-2 md:p-10 flex flex-col gap-5 justify-between items-center overflow-hidden'>
          <div className='w-full h-full overflow-hidden center'>
            <motion.div ref={dragRef}
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              style={{ x: dragMotion }}
              animate={{ translateX: `-${imgTurn * dragPercintage}%` }}
              transition={{ type: 'just' }}
              onDragEnd={DragEnd}
              className='cursor-grabbing w-full h-[80%] grid grid-flow-col 
              xl:auto-cols-[calc((100%/3))] md:auto-cols-[calc((100%/2))] auto-cols-[calc((100%/1))] '>

              {
                !loading && data && data.data.products.map((data, idx) => {
                  const { price, name, description, rating, rating_count, images } = data
                  return (
                    <div key={data.id} className='group center'>
                      <Prod id={data.id} img={images[0]?.image_url || placeholder} Amount={price} controls={controls} delay={idx / 10} Title={name} Description={description} Rate={rating} totalRaters={rating_count} />
                    </div>
                  )
                })
              }
              {loading &&
                <>
                  <div className='center'>
                    <LoadingSekeleton />
                  </div>
                  <div className='center'>
                    <LoadingSekeleton />
                  </div>
                  <div className='center'>
                    <LoadingSekeleton />
                  </div>
                </>
              }
            </motion.div>
          </div>
          <div className='flex gap-5'>
            <button onClick={() => { handleMove("-1") }} className='text-Black/75 hover:text-Black z-[10] duration-300'>
              <FaLongArrowAltLeft size={35} />
            </button>
            <button onClick={() => { handleMove("+1") }} className='text-Black/75 hover:text-Black z-[10] duration-300'>
              <FaLongArrowAltRight size={35} />
            </button>
          </div>
        </section>
      </section>
    </main>
  )
}

const LoadingSekeleton = () => {
  return (
    <div className="flex items-center animate-pulse justify-center w-full sm:w-[350px] xl:w-[90%] xl:h-full h-full sm:h-[400px] bg-gray-300 rounded-2xl dark:bg-DarkBlue">
      <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
      </svg>
    </div>
  )
}
