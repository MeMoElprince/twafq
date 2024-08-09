import { CiCircleQuestion } from "react-icons/ci";
import { FaPlus, FaMinus, FaRegTrashAlt } from "react-icons/fa";
import { useState, useEffect, useContext } from 'react'
import Spinner from '../../../Components/Ui-Components/Spinner';
import placeholder from '../assets/placeholder.jpg'
import Fetch from '../../../Components/CustomHooks/Fetch'
import { deleteFromCart } from '../../../Store/urls'
import { updateFromCart } from '../../../Store/urls'
import { AuthenticationContext } from '../../../Store/Context/Authentication'


export default function CheckoutPart({ setLoading, setErrorMessage, errorMessage, Total, dataArray, setType, Type, Loading, setDataChanged }) {

	const [prices, setPrices] = useState({
		subtotal: 0,
		shipping: 0,
		tax: 0,
		total: 0
	})
	useEffect(() => {
		const calculatePrices = () => {
			if (!dataArray || dataArray.length === 0) {
				setPrices({
					subtotal: 0,
					shipping: 0,
					tax: 0,
					total: 0
				});
				return;
			}
			const subtotal = dataArray.reduce((acc, item) => acc + (+item.product_price) * (+item.quantity), 0);
			// const shipping = (subtotal > 100 ? 0 : 50); // no shipping if items has cost more than 100 otherwise fixed shpping (edit later)
			const shipping = 0
			const taxRate = 0.05; // tax rate (5%)
			// const tax = subtotal * taxRate;
			const tax = 0
			const total = subtotal + shipping + tax;
			setPrices({
				subtotal,
				shipping,
				tax,
				total
			});
		};
		calculatePrices();
	}, [dataArray]);

	return (
		<>
			<div className="Fredoka relative w-[85%] lg2:w-9/12 min-h-[380px] bg-[#242424] rounded-3xl p-6 center flex-col text-White">
				{Loading && <div className="cursor-wait w-full h-full center bg-Black absolute top-0 left-0 opacity-50 select-none">
					<Spinner />
				</div>}
				{Type === 'location' && <div className="w-full">
					<h2 className="text-[24px] sm2:text-3xl font-bold pb-5">Your Order</h2>
					<div className="flex justify-between pb-5 border-b-2 border-white/50">
						<p>PRODUCT</p>
						<p>SUBTOTAL</p>
					</div>
					<div className="flex justify-between py-5 border-b-2 border-white/50 mb-2">
						<DataList setDataChanged={setDataChanged} Loading={Loading} setLoading={setLoading} dataArray={dataArray} setErrorMessage={setErrorMessage} />
					</div>
				</div>}
				<div className="w-full h-full center flex-col gap-1">
					<Cost costTitle="Subtotal" costPrice={prices.subtotal} />
					<Cost costTitle="Shipping" costPrice={prices.shipping} />
					<Cost costTitle="Tax" costPrice={prices.tax} />
					<span className="w-full h-[2px] bg-White/50 my-2" />
					<Cost costTitle="Total" costPrice={Total} isTotal={true} />
					<span className="w-full h-full text-lg mt-2">{`${dataArray.length} Items`}</span>
					<span className="w-full text-red-500 py-5">{errorMessage}</span>
				</div>
				<div className="w-full h-full flex-grow flex flex-col justify-end align-middle items-center pt-10">
					<button onClick={() => {
						if (!Loading) {
							if (Type === 'cart') setType('location')
							else setType('paymob')
						}
					}} className={`
                        bg-White Fredoka text-Black text-[22px] w-[100%] py-[15px] rounded-full font-medium ${!Loading && 'hover:bg-[#f9f1ac] hover:w-[103%] transition-all ease-in-out duration-300'}`}
					>
						{Type === 'location' ? 'Checkout' : 'Proceed to Checkout'}
					</button>
				</div>
			</div>
		</>
	)

	function Cost({ costTitle, costPrice, isTotal }) {
		return (
			<div className="flex w-full h-min center">
				<h3 className={`${isTotal ? 'text-[20px] sm2:text-2xl  font-medium' : 'text-[16px] sm2:text-[18px]  font-base'}`}>{costTitle}</h3>
				<div className="ml-auto center">
					<span className={`${isTotal ? 'text-[20px] sm2:text-2xl  font-medium' : 'text-[16px] sm2:text-[18px]  font-base'}`}>{`${costPrice.toFixed(2)}`}</span>
					<span className={`${isTotal ? 'font-base text-[14px] sm2:text-md text-medium self-end mb-[2px]' : 'font-base text-[12px] sm2:text-sm text-medium self-end mb-[2px]'}`}>EGP</span>
				</div>
			</div>
		)
	}
}


// import { FaPlus, FaMinus, FaRegTrashAlt } from "react-icons/fa";
const DataList = ({ setDataChanged, Loading, dataArray, setLoading, setErrorMessage }) => {
	const [deleteItm, setDeleteItm] = useState(null)
	const [changeQ, setChangeQ] = useState(null)
	const { Token } = useContext(AuthenticationContext)
	const handleDelete = (idx) => {
		if (Loading) return;
		Fetch({
			url: deleteFromCart(dataArray[idx].id),
			method: 'DELETE',
			Token,
			setLoading,
			setData: setDeleteItm,
			setErrorMessage,
			body: {}
		})

	}
	const handleChangeQuantatiy = (value, idx) => {
		if (Loading) return;
		if (dataArray[idx].quantity + value <= 0) return handleDelete(idx)
		Fetch({
			url: updateFromCart(dataArray[idx].id),
			method: 'PATCH',
			Token,
			setLoading,
			setData: setChangeQ,
			setErrorMessage,
			body: { quantity: dataArray[idx].quantity + value }
		})
	}
	useEffect(() => {
		if (!deleteItm) return
		if (deleteItm.status === 'success') {
			setDataChanged((prev) => prev + 1)
		}
	}, [deleteItm])
	useEffect(() => {
		if (!changeQ) return
		if (changeQ.status === 'success') {
			setDataChanged((prev) => prev + 1)
		}
	}, [changeQ])
	return (
		<div className="space-y-5 w-full">
			{dataArray.map((el, idx) => (
				<div className="flex gap-5" key={el.id}>
					<button onClick={() => { handleDelete(idx) }}>
						<FaRegTrashAlt />
					</button>
					<div className="">
						<img className="size-[65px]" src={el.images[0] || placeholder} alt="" />
					</div>
					<div className="flex-grow justify-between flex items-center">
						<div className="flex flex-col justify-between">
							<div className="flex-grow">{el.name}</div>
							<div className='flex mt-auto gap-3'>
								<button onClick={() => { handleChangeQuantatiy(-1, idx) }} className='outline-none focus:outline-none active:scale-90'><FaMinus color='#8D8D8D' /></button>
								<span className='text-base sm3:text-xl font-base'>{`${el.quantity}`}</span>
								<button onClick={() => { handleChangeQuantatiy(1, idx) }} className='outline-none focus:outline-none active:scale-90'><FaPlus color='#8D8D8D' /></button>
							</div>
						</div>
						<div className="text-center">
							{el.total_price} EGP
						</div>
					</div>
				</div>
			))}
		</div>
	)
}