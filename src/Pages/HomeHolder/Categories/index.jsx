import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView, useAnimation } from 'framer-motion'
import { Link } from 'react-router-dom'
import CategorieLayout from './CategorieLayout'

import smoke from './assets/smoke.png'
import img1 from './assets/Categorie1.jpg'
import img2 from './assets/Categorie2.jpg'

export default function Categories() {
  const [Width, setWidth] = useState(0)
  const mainRef = useRef()
  const dragRef = useRef()
  const inView = useInView(dragRef)
  const controls = useAnimation()

  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ['start end', 'end start'],
  })
  
  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [inView])
  useEffect(() => {
    setWidth(dragRef.current.scrollWidth - dragRef.current.offsetWidth)
  }, [])
  return (
    <motion.main ref={mainRef} className="relative center min-h-screen z-[1]">
      {/* <Backgrounds scrollYProgress={scrollYProgress} /> */}
      <section className='mainPadding w-full h-full flex justify-center items-center text-white'>
        <div className='flex flex-col lg:flex-row gap-10 w-full lg:h-[470px] overflow-hidden'>
          <div className='flex flex-col gap-14 items-center justify-center px-10'>
            <motion.h1 className='text-4xl md:text-6xl EBGaramond'>CATEGORIES</motion.h1>
            <Link to='/Explore' className='text-2xl px-10 py-4 Lekton hover:bg-white hover:text-black duration-300' style={{ border: '1px solid white' }}>Shop Now</Link>
          </div>
          <div className='flex-grow overflow-hidden'>
            <motion.div 
              ref={dragRef} drag='x'
              dragConstraints={{ left: -Width, right: 0 }}
              whileTap={{ cursor: "grabbing" }}
              className='w-full h-full flex gap-8 pr-10'>
              <CategorieLayout img={img1} delay={0} controls={controls}/>
              <CategorieLayout img={img2} delay={0.1} controls={controls}/>
              <CategorieLayout img={img1} delay={0.2} controls={controls}/>
              <CategorieLayout img={img2} delay={0.3} controls={controls}/>
              <CategorieLayout img={img1} delay={0.4} controls={controls}/>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.main>
  )
}

const Backgrounds = ({ scrollYProgress }) => {
  const y = useTransform(scrollYProgress, [0, 0.5, 1], ['30%', '0%', '0%'])
  return (
    <>
      <motion.div style={{
        backgroundImage: `url(${smoke})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // y
      }} className='w-full h-full absolute left-0 z-[-1] ' />
    </>
  )
}