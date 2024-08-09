import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CheckoutPart from './Components/CheckoutPart'
import CartItemsPart from './Components/CartItemsPart'
import CartLocationPart from './Components/CartLocationPart'
import Spinner from '../../Components/Ui-Components/Spinner';
import useFetch from '../../Components/CustomHooks/useFetch'
import Fetch from '../../Components/CustomHooks/Fetch'
import { AuthenticationContext } from '../../Store/Context/Authentication'
import { getCart, Checkout } from '../../Store/urls'

export default function Cart() {
  const { Token, isLogedIn } = useContext(AuthenticationContext)
  const [dataArray, setDataArray] = useState(null);
  const Navigate = useNavigate()
  const [Loading, setLoading] = useState(false)
  const [LoadingFirstFetch, setLoadingFirstFetch] = useState(true)
  const [Type, setType] = useState('cart')
  const [errorMessage, setErrorMessage] = useState(null)
  const [dataChanged, setDataChanged] = useState(0)

  useEffect(() => {
    Fetch({
      url: getCart(),
      method: 'GET',
      Token,
      setData: setDataArray,
      setLoading: setLoadingFirstFetch,
      setErrorMessage,
    })
  }, [dataChanged])

  useEffect(() => {
    setErrorMessage('')
  }, [Type])

  if (!isLogedIn) {
    Navigate('/login')
  }
  if (!dataArray && LoadingFirstFetch) return <div className='w-full h-screen center bg-Black'><Spinner /></div>
  if (!dataArray?.data?.count) {
    return <div className='w-full text-center h-screen flex flex-col justify-center items-center bg-Black text-White'>
      <h1 className='EBGaramond font-medium text-[40px] sm2:text-[50px] text-White mb-20'>Shopping Cart</h1>
      <p className='Fredoka opacity-60 text-4xl mb-4'>Shopping cart is empty</p>
      <p className='Fredoka opacity-50 sm:w-[300px]'>Explore items now and fill your cart
        with handmade beauties.</p>
    </div>
  }

  return (
    <>
      {Type === 'cart' && <CartReview errorMessage={errorMessage} setErrorMessage={setErrorMessage} dataArray={dataArray} setType={setType} Type={Type} Loading={Loading} setLoading={setLoading} setDataArray={setDataArray} setDataChanged={setDataChanged} />}
      {Type === 'location' && <CartLocation errorMessage={errorMessage} setErrorMessage={setErrorMessage} dataArray={dataArray} setType={setType} Type={Type} Loading={Loading} setLoading={setLoading} setDataArray={setDataArray} setDataChanged={setDataChanged} />}
      {Type === 'paymob' && <Paymob Token={Token} />}
    </>
  )
}

const CartReview = ({ dataArray, setDataArray, setType, Type, Loading, setLoading, errorMessage, setErrorMessage, setDataChanged }) => {
  return (
    <section className='center flex-col w-screen min-h-screen bg-Black'>
      <div className='h-[50%] flex flex-col mainPadding'>
        <h1 className='EBGaramond font-medium text-[40px] sm2:text-[50px] text-White mt-44 mb-5'>Shopping Cart</h1>
      </div>
      <div className='w-full h-full flex justify-start flex-col lg2:flex-row py-16 gp-16'>
        <div className='relative w-full h-full center flex-col gap-12 pb-16'>
          {dataArray.data.cartProducts.map((element) => (
            <CartItemsPart setDataChanged={setDataChanged} setErrorMessage={setErrorMessage} setDataArray={setDataArray} Loading={Loading} setLoading={setLoading} key={element.id} itemDetials={element} />
          ))}
          {Loading && <div className="cursor-wait w-[calc(100%+50px)] h-full center bg-Black absolute -top-[50px] left-0 opacity-50 select-none">
            <Spinner />
          </div>}
        </div>
        <div className='w-full h-full center basis-7/12 pb-16'>
          <CheckoutPart Total={dataArray.data.checkout_price} errorMessage={errorMessage} setType={setType} dataArray={dataArray.data.cartProducts} Type={Type} Loading={Loading} />
        </div>
      </div>
    </section>
  )
}
const CartLocation = ({ dataArray, setDataArray, setType, Type, Loading, setLoading, errorMessage, setErrorMessage, setDataChanged }) => {
  return (
    <section className='center flex-col w-screen min-h-screen bg-Black'>
      <div className='h-[50%] flex flex-col mainPadding'>
        <h1 className='EBGaramond font-medium text-[40px] sm2:text-[50px] text-White mt-44 mb-5'>Enter your location</h1>
      </div>
      <div className='w-full h-full flex justify-start flex-col lg2:flex-row py-16 gp-16'>
        <div className='w-full h-full center flex-col gap-12 pb-16'>
          <CartLocationPart setErrorMessage={setErrorMessage} errorMessage={errorMessage} />
        </div>
        <div className='w-full h-full center basis-2/3 pb-16'>
          <CheckoutPart Total={dataArray.data.checkout_price} setDataChanged={setDataChanged} setLoading={setLoading} setErrorMessage={setErrorMessage} errorMessage={errorMessage} setType={setType} dataArray={dataArray.data.cartProducts} Type={Type} Loading={Loading} />
        </div>
      </div>
    </section>
  )
}
const Paymob = ({ Token }) => {
  const { data, loading } = useFetch({
    url: Checkout(),
    method: 'PATCH',
    Token
  })
  return (
    <div className='w-screen h-screen bg-Black center py-20'>
      {!loading && <iframe src={data.frame} className='w-[80%] h-[100%]'></iframe>}
      {loading && <Spinner />}
    </div>
  )
}