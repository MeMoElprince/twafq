import placeholder from '../assets/placeholder.jpg'
import { FaStar, FaRegHeart, FaHeart, FaStarHalfAlt } from 'react-icons/fa'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function DetialsCard({ id, name, description, price, rating, rating_count, img }) {
    const [isFavorite, setIsFavorite] = useState(false);
    function handleFavorite() {
        setIsFavorite(prevIsFavorite => !prevIsFavorite);
    }
    const StarCounter = () => {
        let stars = []
        for (let i = 0; i < 5; i++) {
            if (rating >= i + 1) {
                stars.push(<FaStar key={i} />)
            } else if (rating > i && rating < i + 1) {
                // if there is a half star
                stars.push(<FaStarHalfAlt key={i} />)
            } else {
                stars.push(<FaStar key={i} style={{ color: 'rgba(255,255,255,0.5)' }} />)
            }
        }
        return (
            <div className='flex items-center font-thin'>
                {stars}
            </div>
        )
    }

    return (
        <>
            <Link to={`/ItemDetails/${id}`} className="relative flex-grow xl:flex-grow-0 center w-full md:w-80 h-96 bg-Beige2 shadow-lg rounded-lg flex-col overflow-hidden group Fredoka border border-Black/15">
                <div className='absolute w-full h-[80px] z-10 -top-[30%] center px-4
                group-hover:top-0 transition-all duration-300 ease-in-out'>
                </div>
                <div className="relative w-full h-full overflow-hidden">
                    <span className='w-full h-full bg-Black/10 absolute
                    group-hover:bg-Black/0 transition-all duration-300 ease-in-out'></span>
                    <img src={img || placeholder} className='imgSettings w-full h-full group-hover:scale-105 object-cover transition-all duration-300 ease-in-out' alt='LoadingImg' />
                </div>
                <div className="w-full h-full basis-1/2">
                    <div className="itemData w-full h-full center flex-col p-3 px-4">
                        <div className='w-full h-full flex flex-col'>
                            <h3 className='Fredoka text-lg text-Black font-medium w-[calc(100%-20px)]'>{name}</h3>
                            <p className='Fredoka text-sm text-Black/60 font-normal w-[100%]'>
                                {description}
                            </p>
                        </div>
                        <div className='w-full h-full basis-[70%] center pt-1'>
                            <div className='w-full h-full flex justify-center items-center'>
                                <div className='w-full h-full flex items-center'>
                                    <h3 className='Fredoka text-[16px] text-Black font-medium inline-block m-0 mr-2'>Price:</h3>
                                    <span className='Fredoka text-[16px] text-Black font-medium inline'>{`${price} EGP`}</span>
                                </div>
                                <div className='center'>
                                    <span className='Fredoka text-sm text-Black font-base'>{rating}</span>
                                    <span className='Fredoka text-[12px] text-Black font-normal self-end mr-1'>({rating_count})</span>
                                    <StarCounter />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}