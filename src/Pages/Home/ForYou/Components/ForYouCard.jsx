import { useState, useEffect } from 'react'
import Giraffe from '../../../../assets/giraffe.png'
import { FaRegStar, FaRegHeart } from 'react-icons/fa'
import { BsCartPlus } from "react-icons/bs";


export default function ForYouCard(props) {
	return (
		<>
			<section className='relative h-[270px] lg:h-[27%] w-1/1 lg:w-3/4 bg-Beige2 center rounded-2xl flex-col overflow-hidden border-[10px] border-Beige2 shadow-xl'>
				<div className="relative upperContent w-[99%] h-full basis-[60%] center rounded-2xl overflow-hidden mt-2">
					<div className="vendorInfo w-2/5 h-full center flex-col">
						<div className='w-16 h-16 rounded-full overflow-hidden shadow-md border border-Black/10'>
							<img src={Giraffe} className='w-[100%] h-full' alt='LoadingImg' />
						</div>
						<h3 className='Fredoka text-sm text-Black font-normal mt-auto'>Mohammed Nasr</h3>
					</div>
					<div className="vendorStatus w-full h-full flex flex-col items-end justify-center pr-[6px]">
						<div className='center w-12 h-12 rounded-full overflow-hidden shadow-md border border-Black/10 bg-White'>
							<FaRegHeart size={24} className='w-[100%] text-black/80' />
						</div>
						<div className='center gap-1 mt-auto'>
							<span className='Fredoka text-sm text-Black font-base'>3.5</span>
							<span className='Fredoka text-[12px] text-Black font-normal self-end'>(1024)</span>
							{
								[...Array(5)].map((start, index) => {
									return <FaRegStar key={index} size={16} className='Fredoka text-black/60' />
								})
							}
						</div>
					</div>
				</div>
				<div className="relative lowerContent bg-White w-full h-full bg-center center rounded-2xl overflow-hidden mt-4">
					<div className="itemImage w-full h-full basis-[40%] overflow-hidden">
						<img src={Giraffe} className='w-[100%] h-full' alt='LoadingImg' />
					</div>
					<div className="itemData w-full h-full center flex-col p-3">
						<div className='w-full h-full flex flex-col'>
							<h3 className='Fredoka text-lg text-Black font-medium w-[calc(100%-20px)]'>Giradasdasffe Soft Toy</h3>
							<p className='Fredoka text-sm text-Black/60 font-normal w-[100%]'>
								Handmade giraffe, crafted from soft cotton for cuddly charm and lifelike detailing.
							</p>
						</div>
						<div className='w-full h-full basis-[70%] center'>
							<div className='w-full h-full flex flex-col'>
								<div className='w-full h-full flex'>
									<h3 className='Fredoka text-[16px] text-Black font-medium inline-block m-0 mr-2 self-end'>Price:</h3>
									<span className='Fredoka text-[16px] text-Black font-medium inline self-end'>{`${50} EGP`}</span>
								</div>
								<div className='center gap-1 mt-auto self-start'>
									<span className='Fredoka text-sm text-Black font-base'>3.5</span>
									<span className='Fredoka text-[12px] text-Black font-normal self-end'>(1024)</span>
									{
										[...Array(5)].map((start, index) => {
											return <FaRegStar key={index} size={16} className='Fredoka text-[#FF724C]/80' />
										})
									}
								</div>
							</div>
							<div className='w-full h-full basis-[60%] flex justify-end align-middle content-center'>
								<div className='center w-12 h-12 rounded-[16px] overflow-hidden shadow-md border border-Black/10 bg-Beige2'>
									<BsCartPlus size={26} className='w-[100%] text-black/80' />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}