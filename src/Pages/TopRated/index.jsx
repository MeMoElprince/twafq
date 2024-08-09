import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Lantern from './assets/lantern.png'
import Lanternleft from './assets/lanternleft.png'
import Top3Rated from '../Home/TopRated/Top3Rated'
import Cardlayout from './Cardlayout'
import { clipPathLeftToRight } from '../../Store/AnimationValues'
import InView from '../../utils/InView'

import Shape1 from './assets/Shape1.svg'
import Shape2 from './assets/Shape2.svg'
import Shape3 from './assets/Shape3.svg'
import Shape4 from './assets/Shape4.svg'

const Top10 = [
  {
    name: 'Mohammed Nasr',
    img: 'https://picsum.photos/200/300',
    discreption: 'Korem ipsum dolor sit amet, conjjctetur ng elit. Nunc vulputate libero et velitxc iedum bc aliquet odio mattis.',
    isFavorite: true,
    rating: 3.5,
    totalRates: 84
  },
  {
    name: 'Mohammed Nasr',
    img: 'https://picsum.photos/200/300',
    discreption: 'Korem ipsum dolor sit amet, conjjctetur ng elit. Nunc vulputate libero et velitxc iedum bc aliquet odio mattis.',
    isFavorite: false,
    rating: 3.5,
    totalRates: 84
  },
  {
    name: 'Mohammed Nasr',
    img: 'https://picsum.photos/200/300',
    discreption: 'Korem ipsum dolor sit amet, conjjctetur ng elit. Nunc vulputate libero et velitxc iedum bc aliquet odio mattis.',
    isFavorite: true,
    rating: 3.5,
    totalRates: 84
  },
  {
    name: 'Moemen Adam',
    img: 'https://picsum.photos/200/300',
    discreption: 'Korem ipsum dolor sit amet, conjjctetur ng elit. Nunc vulputate libero et velitxc iedum bc aliquet odio mattis.',
    isFavorite: false,
    rating: 3.5,
    totalRates: 84
  },
  {
    name: 'Mohammed Nasr',
    img: 'https://picsum.photos/200/300',
    discreption: 'Korem ipsum dolor sit amet, conjjctetur ng elit. Nunc vulputate libero et velitxc iedum bc aliquet odio mattis.',
    isFavorite: true,
    rating: 3.5,
    totalRates: 84
  },
  {
    name: 'Mohammed Nasr',
    img: 'https://picsum.photos/200/300',
    discreption: 'Korem ipsum dolor sit amet, conjjctetur ng elit. Nunc vulputate libero et velitxc iedum bc aliquet odio mattis.',
    isFavorite: false,
    rating: 3.5,
    totalRates: 84
  },
  {
    name: 'Mohammed Nasr',
    img: 'https://picsum.photos/200/300',
    discreption: 'Korem ipsum dolor sit amet, conjjctetur ng elit. Nunc vulputate libero et velitxc iedum bc aliquet odio mattis.',
    isFavorite: true,
    rating: 3.5,
    totalRates: 84
  },
  {
    name: 'Mohammed Nasr',
    img: 'https://picsum.photos/200/300',
    discreption: 'Korem ipsum dolor sit amet, conjjctetur ng elit. Nunc vulputate libero et velitxc iedum bc aliquet odio mattis.',
    isFavorite: true,
    rating: 3.5,
    totalRates: 84
  },
  {
    name: 'Mohammed Nasr',
    img: 'https://picsum.photos/200/300',
    discreption: 'Korem ipsum dolor sit amet, conjjctetur ng elit. Nunc vulputate libero et velitxc iedum bc aliquet odio mattis.',
    isFavorite: false,
    rating: 3.5,
    totalRates: 84
  },
  {
    name: 'Mohammed Nasr',
    img: 'https://picsum.photos/200/300',
    discreption: 'Korem ipsum dolor sit amet, conjjctetur ng elit. Nunc vulputate libero et velitxc iedum bc aliquet odio mattis.',
    isFavorite: true,
    rating: 3.5,
    totalRates: 84
  },

]

export default function TopRated() {
  const LanternRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: LanternRef,
    offset: ['start end', 'end start']
  })
  const rotateA = useTransform(scrollYProgress, [0, 1], [65, 40])
  const moveA = useTransform(scrollYProgress, [0, 1], ['30%', '-30%'])
  const rotateB = useTransform(scrollYProgress, [0, 1], [-40, -15])
  const moveB = useTransform(scrollYProgress, [0, 1], ['-50%', '30%'])

  const Variant = clipPathLeftToRight(0, 0.5, 1, 1)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="w-full min-h-[100vh] bg-Black  text-White overflow-hidden">
      <div ref={LanternRef} className='sm:block hidden absolute top-0 left-0  w-screen h-full imgSettings'>
        <motion.img className='absolute left-[-10vh] bottom-[-30vh] w-[60vw] md:w-[60vh] lg:w-[35vw] opacity-30' style={{ rotate: rotateA, translateX: moveA }} src={Lantern} alt="" />
        <motion.img className='absolute right-[-25vh] bottom-[-25vh] w-[60vw] md:w-[60vh] lg:w-[35vw] opacity-30 rotate-[45deg]' style={{ rotate: rotateB, translateX: moveB }} src={Lanternleft} alt="" />
      </div>
      <section className='relative w-full min-h-screen flex text-center md:text-left justify-center items-center leading-[1] text-[20vw] md:text-8xl lg:text-9xl xl:text-[8vw] EBGaramond'>
        <div className='w-full md:w-[60%] flex flex-col gap-y-10 text-center'>
          <p className='text-white w-full'>TOP RATED</p>
          <p className='text-white md:self-center w-full'>SELLERS</p>
        </div>
      </section>
      <section className='center'>
        <Imgs />
      </section>
      <section className='pt-[20vh]'>
        <div className='w-full flex flex-col gap-y-10 text-center text-[20vw] md:text-8xl lg:text-9xl xl:text-[8vw] EBGaramond'>
          <InView variants={Variant}>
            <p className='text-white w-full'>TOP RATED</p>
          </InView>
        </div>
        <Top3Rated details={[Top10[0], Top10[1], Top10[2]]} from="topRatedPage" />
        <div className='grid grid-cols-12 mainPadding sm:pt-20 pt-20 sm:pb-5 pb-5'>
          <div className='col-span-1 center text-Yellow/50'> Rank</div>
          <div className='col-span-8 md:col-span-2 center text-Yellow/50'>Seller</div>
          <div className='hidden md:flex col-span-6 justify-center items-center text-Yellow/50'>Description</div>
          <div className='col-span-2 center text-Yellow/50'>Rate</div>
        </div>
        <div className='mainPadding sm:pt-0 pt-0 space-y-5'>
          {
            Top10.slice(3).map((item, index) => <Cardlayout key={index} details={item} top={index + 4} />)
          }
        </div>
      </section>
    </div>
  )
}


const Imgs = () => {
  const ShapesRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ShapesRef,
    offset: ['start end', 'end start']
  })
  const Shapes = [Shape1, Shape2, Shape3, Shape4]
  const Moves = [
    useTransform(scrollYProgress, [0, 1], ['-50%', '30%']),
    useTransform(scrollYProgress, [0, 1], ['30%', '-30%']),
    0,
    0,
  ]
  const Rotates = [
    useTransform(scrollYProgress, [0, 1], [-10, -100]),
    useTransform(scrollYProgress, [0, 1], [10, 100]),
    useTransform(scrollYProgress, [0, 1], [-10, -100]),
    useTransform(scrollYProgress, [0, 1], [40, -40]),
  ]
  const Y = [
    100,
    -100,
    useTransform(scrollYProgress, [0, 1], ['00%', '-50%']),
    100
  ]
  return (
    <div ref={ShapesRef} className='hidden w-[80%] sm:flex justify-between pt-[10vw]'>
      {
        Shapes.map((shape, index) => {

          return (
            <motion.img key={index} style={{
              rotate: Rotates[index],
              translateX: Moves[index],
              translateY: Y[index]
            }} src={shape} className='w-fit' alt="" />
          )
        })
      }
    </div>
  )
}