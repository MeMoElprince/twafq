import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import bg2 from './assets/bg.png'
import ScrollSVG from './ScrollSVG.svg'

export default function Welcome() {
  const ref = useRef()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const ExitY = useTransform(scrollYProgress, [0, 1], [0, -100])
  return (
    <motion.main
      transition={{ duration: 1 }}
      style={{
        backgroundImage: `url(${bg2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }} className='text-white z-1 min-h-screen NunitoSans'>
      <motion.section
        ref={ref}
        style={{y: ExitY}}
        className='center w-full h-full mainPadding'>
        <div className='lg:w-[50%] sm:w-[70%] w-full'>
          <div className='text-5xl md:text-7xl lg:text-[5vw] font-extrabold py-4 space-y-5'>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='hidden sm:block '>
              Use your own</motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='hidden sm:block sm:text-right'>
              Skills to Work!</motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='sm:hidden text-center'>
              Use your own Skills to Work!</motion.h1>
          </div>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className='text-md sm:text-xl md:text-2xl xl:text-3xl 3xl:text-4xl text-center'>
              With Ghrdk, you  will get the chance  to work <br />
              using your favorite hobby and explore <br />
              a world full of handmade products.</motion.p>
          </div>
        </div>
      </motion.section>
      <motion.img
        animate={{
          opacity: [0, 1, 0],
          clipPath: ['inset(0% 0px 100%)', 'inset(0% 0px 0px)', 'inset(0% 0px 0px)', 'inset(100% 0px 0%)', 'inset(100% 0px 0px)']
        }}
        transition={{
          delay: 0.6,
          duration: 3,
          repeat: Infinity,
          repeatType: 'loop'
        }} className='h-[15vh] absolute bottom-0 left-1/2 -translate-x-1/2' src={ScrollSVG} alt="" />
    </motion.main>
  )
}