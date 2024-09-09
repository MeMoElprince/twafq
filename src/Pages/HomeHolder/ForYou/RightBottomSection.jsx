import { motion } from 'framer-motion'
export default function RightBottomSection({ RightBottomColor }) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-10 lg:mt-0 pb-10">
      <motion.div animate={{ color: RightBottomColor === '#101010' ? '#F4F4F8' : '#101010', transition: { duration: 0.5 } }} className="w-[70%] md:text-left text-center flex flex-col BeloveMelody text-[25vw] lg:text-[10vw]">
        <p className="w-full md:w-fit">JUST</p>
        <p className="w-full md:w-fit md:self-end">FOR</p>
        <p className="w-full md:w-fit md:self-center">YOU</p>
      </motion.div>
      <div className="self-center lg:self-end mainPadding">
        <motion.button animate={{ backgroundColor: RightBottomColor === '#101010' ? '#F4F4F8' : '#101010', transition: { duration: 0.5 } }} className="Lekton rounded-full bg-black px-16 py-8 text-3xl
          relative overflow-hidden inline-block z-10 focus:outline-none
          before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:-z-10
          before:rounded-inherit before:bg-[#505050] before:bg-opacity-40 
          before:transition-all before:duration-300 before:ease-in-out
          hover:before:left-0
        ">
          <p className="text-white mix-blend-difference">VIEW ALL</p>
        </motion.button>
      </div>
    </div>
  )
}
