import { useEffect, useState } from 'react'
import DetailsCard from './Components/DetailsCard'
import ReactSlider from 'react-slider'
import Spinner from '../../Components/Ui-Components/Spinner'
import { useNavigate } from 'react-router-dom'


export default function Shop({ setProductsUrl, ProductsUrl, loadingCategories, loadingProducts, setLoadingProducts, Categories, setLoadingCategories, Products, setProducts, searchWord }) {

  return (
    <div className="z-[5] w-full min-h-screen flex items-center flex-col justify-center md:justify-between gap-y-20 mainPadding mt-[25vh]">
      <div className='w-full h-full text-center'>
        <h2 className='text-3xl font-medium'>{`Results for "${searchWord}"`}</h2>
      </div>
      <div className='gap-4 flex flex-grow justify-center flex-wrap'>
        {
          !loadingProducts && Products && Products.data?.productItems.length > 0 && Products.data.productItems.map((el) => (
            <DetailsCard key={el.id} id={el.id} img={el.images[0]?.image_url} name={el.name} description={el.description} price={el.price} rating={el.rating} rating_count={el.rating_count} />
          ))
        }
        {
          !loadingProducts && Products && !Products.data?.productItems.length && <div className='w-full center'>
            <p className='text-2xl'>No Products Found</p>
          </div>
        }
        {
          loadingProducts && <>
            {[...Array(10)].map((start, index) => {
              return <LoadingSekeleton key={index} />
            })}
          </>
        }
      </div>
    </div>
  )
}



const LoadingSekeleton = () => {
  return (
    <div className="center animate-pulse w-full md:w-80 h-96 bg-Beige2 shadow-lg rounded-lg border-Black/15">
      <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
      </svg>
    </div>
  )
}
