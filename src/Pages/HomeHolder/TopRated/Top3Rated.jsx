import { motion } from "framer-motion"
import CartLayout from "./CartLayout"
import { Link } from "react-router-dom"
import smoke from './assets/smoke.png'
import Fillters from "./Fillters"
import AdsSection from "../AdsSection/index"

export default function Top3Rated({ details, SecondColor: RightColor, from = "Home" }) {
  return (
    <motion.section style={{ background: RightColor }} animate={{ backgroundColor: RightColor, transition: { duration: 0.5 } }} className="min-h-screen bg-Black text-white">
      <div className="mainPadding sm:pb-0 flex flex-col justify-center items-center gap-y-10">
        <div className="BeloveMelody relative w-full flex center gap-x-5 text-5xl">
          <span className="w-1/3 h-[2px] bg-Yellow/50"></span>
          IN
          <span className="w-1/3 h-[2px] bg-Yellow/50"></span>
        </div>
        <div className="flex gap-5 flex-wrap center">
          <Fillters />
        </div>
      </div>
      <div className="mainPadding sm:pb-0 relative z-[1] min-h-[80vh] mt-20 overflow-hidden">
        <div style={{
          backgroundImage: `url(${smoke})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }} className="w-full h-full top-0 left-0 z-[-1] absolute opacity-[0.03]" />

        <div className="w-full min-h-[80vh] grid xl:grid-cols-3 place-items-center space-y-40 xl:space-y-0">
          <CartLayout idx={0} details={details[0]} delay={0} classes="-translate-y-10 xl:-translate-y-5 xl:order-2" />
          <CartLayout idx={1} details={details[1]} delay={0.1} classes="xl:-rotate-[10deg] xl:translate-y-10 xl:order-1" />
          <CartLayout idx={2} details={details[2]} delay={0.2} classes="xl:rotate-[10deg] xl:translate-y-10  xl:order-3" />
        </div>
      </div>
      {from === 'Home' && <div className="mainPadding sm:pb-0 center xl:mt-0 mt-40">
        <Link to='/TopRated' className="Lekton text-2xl relative
          before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:content-[''] before:w-10 before:h-[2px] before:bg-white before:rounded-full
          hover:before:bg-Yellow hover:before:w-full before:duration-300
          hover:text-Yellow hover:duration-300
        ">VIEW MORE</Link>
      </div>}
      {from === 'Home' && <AdsSection />}
    </motion.section>
  )
}
