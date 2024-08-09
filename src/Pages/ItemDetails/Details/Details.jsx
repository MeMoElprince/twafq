import { useState, useContext, useEffect } from 'react'
import { FaPlus, FaMinus, FaRegStar, FaStar, FaStarHalfAlt, FaRegHeart, FaHeart } from "react-icons/fa";
import placeholder from './placeholder.jpg'
import { addItemToCart } from '../../../Store/urls';
import Fetch from '../../../Components/CustomHooks/Fetch';
import { addFav, delFav, delFavByProId } from '../../../Store/urls';
import { AuthenticationContext } from '../../../Store/Context/Authentication';
export default function Details({ itemDetials }) {
    const [currQuantity, setCurrQuantity] = useState(1);
    const [selectedImg, setSelectedImg] = useState(0);
    const { Token } = useContext(AuthenticationContext);
    const [isFavorite, setIsFavorite] = useState(itemDetials.isFavourite);
    const images = itemDetials?.images?.length > 0 ? itemDetials.images : [{ image_url: placeholder }];
    const [data, setData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleFavorite() {
        if (loading) return;
        setLoading(true)
        setErrorMessage('')
        if (isFavorite) {
            await Fetch({
                url: delFavByProId(itemDetials.id),
                setLoading,
                setData,
                setErrorMessage,
                method: 'DELETE',
                Token
            })
            setIsFavorite(prev => !prev);
        } else {
            await Fetch({
                url: addFav(),
                setLoading,
                setData,
                setErrorMessage,
                method: 'POST',
                body: { product_item_id: itemDetials.id },
                Token
            })
            setIsFavorite(prev => !prev);
        }
    }
    const StarCounter = () => {
        let stars = []
        for (let i = 0; i < 5; i++) {
            if (itemDetials.rating >= i + 1) {
                stars.push(<FaStar key={i} />)
            } else if (itemDetials.rating > i && itemDetials.rating < i + 1) {
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
    const addToCart = () => {
        if (loading) return;
        setLoading(true)
        setErrorMessage('')
        Fetch({
            url: addItemToCart(itemDetials.id),
            setLoading,
            setData,
            setErrorMessage,
            method: 'POST',
            body: { quantity: currQuantity },
            Token
        })
    }

    useEffect(() => {
        if (!data) return;
        console.log({ addToCart: data })
    }, [data])

    return (
        <>
            <div className='Fredoka min-h-screen h-full w-[95%] bg-Beige flex flex-col md:flex-row gap-8 py-[150px] px-4 overflow-hidden'>
                <div className="relative flex flex-col-reverse lg:flex-row w-full md:w-2/3 h-full gap-4 rounded-xl">
                    <div className="flex items-center lg:flex-col w-full lg:w-1/3 gap-4">
                        {
                            images.map((img, idx) => {
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImg(idx)}
                                        className={`relative rounded-2xl max-h-[115px] max-w-[115px] min-h-[60px] min-w-[60px] focus:outline-none overflow-hidden border ${selectedImg === idx ? 'border-Black/80 shadow-lg' : 'border-Black/10'}`}>
                                        <img src={img.image_url} className='w-full h-full object-cover rounded-2xl' loading='lazy' alt='Thumbnail' />
                                    </button>
                                )
                            })
                        }
                    </div>
                    <div className="w-full h-full rounded-2xl overflow-hidden border shadow-md self-center border-Black/10">
                        <img src={images[selectedImg].image_url} alt="SelectedImage" className='w-full h-full object-cover rounded-2xl' />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center w-full md:w-2/4 h-full gap-10">
                    <div className='flex justify-center flex-grow w-full'>
                        <div className='w-full h-full min-h-[140px] flex items-center flex-col gap-10'>
                            <div className='w-full h-full flex justify-start'>
                                <div className='flex justify-start items-start flex-col md:flex-row w-full'>
                                    <h3 className='text-2xl lg:text-3xl font-medium truncate max-w-[calc(100%-40px)]'>{itemDetials.name}</h3>
                                </div>
                            </div>
                            <div className='flex items-center gap-1 w-full h-full'>
                                <StarCounter />
                                <span className='text-md text-Black font-base'>{itemDetials.rating}</span>
                                <span className='text-sm text-Black font-normal self-end'>({itemDetials.rating_count})</span>
                            </div>
                        </div>
                        <div className='h-full w-full center self-start flex-col basis-2/4 gap-8'>
                            <div className='flex justify-center items-end w-full h-full'>
                                <span className='text-2xl font-medium ml-auto'>{itemDetials.price}</span>
                                <span className='text-[16px] font-medium mb-[1px] self-end'>EGP</span>
                            </div>
                            <button onClick={handleFavorite} className='center w-10 h-10 rounded-full overflow-hidden ml-auto focus:outline-none cursor-pointer'>
                                {
                                    isFavorite
                                        ? <FaHeart size={24} className='w-[100%] text-[#F20E0E]' />
                                        : <FaRegHeart size={24} className='w-[100%] text-black/80' />
                                }
                            </button>
                        </div>
                    </div>
                    <div className="min-w-full h-full flex items-center justify-between gap-x-4 gap-y-1">
                        <div className='flex gap-5 w-full h-min'>
                            <button className='outline-none focus:outline-none active:scale-90 w-full basis-1/12' onClick={() => setCurrQuantity(prevQuan => Math.max(1, prevQuan - 1))}><FaMinus color='#8D8D8D' /></button>
                            <span className='text-xl w-full font-base basis-1/12'>{`${currQuantity}`}</span>
                            <button className='outline-none focus:outline-none active:scale-90 w-full basis-1/12' onClick={() => setCurrQuantity(prevQuan => Math.min(itemDetials.quantity, prevQuan + 1))}><FaPlus color='#8D8D8D' /></button>
                        </div>
                        <button onClick={addToCart} className={`bg-Black Fredoka text-White text-[22px] w-7/12 py-[14px] rounded-full min-w-[150px]
                                relative overflow-hidden inline-block z-10
                                transition-all duration-300 ease-in-out focus:outline-none
                                before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:-z-10
                                before:rounded-inherit before:bg-[#505050] before:bg-opacity-40 
                                before:transition-all before:duration-300 before:ease-in-out
                                ${loading ? 'bg-[#505050] cursor-wait' : 'hover:w-[60%] hover:py-[13px] hover:my-[1px] hover:text-[21.6px] hover:before:left-0'}
                            `}>Add to cart</button>
                    </div>
                    {errorMessage && <p className='w-full text-red-500'>{errorMessage}</p>}
                    {data && data.status === 'success' && <p className='w-full text-green-500'>Success</p>}
                    <div className='relative cetner flex-col w-full h-full'>
                        <div className='w-full h-full center'>
                            <button className='w-full text-lg focus:outline-none' onClick={() => setSelectedTab('vendor')}>
                                Vendor
                            </button>
                        </div>
                        <hr className={`w-[20%] left-1/2 -translate-x-1/2 h-1 bg-Black rounded-full absolute z-30 transition-all duration-500 ease-in-out`} />
                        <div className="w-full min-h-[200px] overflow-hidden">
                            <div className={`w-[200%] h-full flex transition-all duration-500 ease-in-out`}>
                                <div className="w-full h-full  center pt-8 gap-4">
                                    <div className='w-min h-full center flex-col gap-1 min-w-min'>
                                        <img src={itemDetials.vendor_image_url} alt="vendorImg" className='object-cover rounded-full' />
                                        <span className='text-Black text-sm text-nowrap'>{itemDetials.vendor_first_name}</span>
                                    </div>
                                    <div className='w-full h-full center flex-col gap-3 border-Black border-l-4 pl-4'>
                                        <p className='text-[13px] sm2:text-sm break-words hyphens-auto'>{itemDetials.vendor_description}</p>
                                        <div className='flex items-center gap-1 w-full h-min'>
                                            <FaStar className='size-5' />
                                            <span className='text-base text-Black'>{itemDetials.vendor_rating}</span>
                                            <span className='text-[12px] text-Black font-normal self-end'>({itemDetials.vendor_rating_count})</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}