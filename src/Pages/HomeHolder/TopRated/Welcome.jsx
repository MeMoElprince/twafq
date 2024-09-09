import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

export default function Welcome({ FirstColor: ShapeColor, SecondColor: RightColor }) {
  const mainRef = useRef()
  const inView = useInView(mainRef)
  const controls = useAnimation()
  const AnimationVariants = {
    visible: {
      clipPath: 'inset(0 0 0 0)',
      transition: { duration: 1 }
    },
    hidden: (custom) => (
      custom == 1 ? {
        clipPath: 'inset(0 100% 0 0)',
        transition: { duration: 1 }
      }
        : {
          clipPath: 'inset(0 0 0 100%)',
          transition: { duration: 1 }
        }
    )
  }
  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [inView])
  return (
    <motion.main style={{ backgroundColor: RightColor }} animate={{ backgroundColor: RightColor, transition: { duration: 0.5 } }}
      className="w-full h-fit relative">
      <Shape ShapeColor={ShapeColor} />
      <section className='w-full h-full flex text-center md:text-left justify-center items-center leading-[1] text-[20vw] md:text-8xl lg:text-9xl xl:text-[8vw] EBGaramond'>
        <div ref={mainRef} className='lg:mt-[30vh] mt-20 w-full md:w-[60%] flex flex-col gap-y-10'>
          <motion.p variants={AnimationVariants}
            custom={1}
            animate={controls}
            className='text-white mix-blend-difference w-full md:w-fit'>OUR TOP</motion.p>
          <motion.p variants={AnimationVariants}
            custom={2}
            animate={controls}
            className='text-white mix-blend-difference md:self-end w-full md:w-fit'>RATED</motion.p>
          <motion.p variants={AnimationVariants}
            custom={1}
            animate={controls}
            className='text-white mix-blend-difference md:self-center w-full md:w-fit'>SELLERS</motion.p>
        </div>
      </section>
    </motion.main>
  )
}

const Shape = ({ ShapeColor }) => {
  return (
    <svg className="w-1/2 hidden lg:block absolute top-0 left-0" viewBox="0 0 720 361" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path animate={{ fill: ShapeColor, transition: { duration: 0.5 } }} d="M-111 361C96.6347 243.7 181.059 69.0364 574.734 120.959C649.642 130.839 720 75.5565 720 0H-30L-111 361Z" />
    </svg>
  )
}
