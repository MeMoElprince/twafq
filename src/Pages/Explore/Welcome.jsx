import Left from './assets/Left.png';
import Right from './assets/Right.png';
import Bear from '../../assets/Bear.png'

export default function Welcome() {
  return (
    <div className="relative w-full min-h-screen center select-none">
      <img className='h-[210vh] imgSettings absolute -bottom-[40%] -left-[33%] scale-[1] hidden lg2:inline-block' src={Left} alt="" />
      <img className='h-[210vh] imgSettings absolute -top-[40%] -right-[38%] -rotate-6 hidden lg2:inline-block' src={Right} alt="" />
      <div className='relative w-min h-min'>
        <h1 className='EBGaramond uppercase font-medium text-[25vw] lg:text-[17vw] select-none'>
          Shop
        </h1>
        <img src={Bear} alt="loadingBear" className='absolute top-[44%] right-[28%] w-2/12 select-none' />
      </div>
    </div>
  )
}