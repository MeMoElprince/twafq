import { useEffect, useState } from 'react'
import DetailsCard from './Components/DetailsCard'
import Selected from './assets/Selected.png'
import ReactSlider from 'react-slider'
import Spinner from '../../Components/Ui-Components/Spinner'
import { useNavigate } from 'react-router-dom'

export default function Shop({ setProductsUrl, ProductsUrl, loadingCategories, loadingProducts, setLoadingProducts, Categories, setLoadingCategories, Products, setProducts }) {
  return (
    <div className="z-[5] w-full min-h-screen flex flex-col justify-center md:justify-between gap-y-20 md:flex-row mainPadding mt-[25vh]">
      <div className='w-full md:min-w-[400px] md:max-w-[400px] md:pr-10 z-10'>
        <Fillters ProductsUrl={ProductsUrl} setProductsUrl={setProductsUrl} Categories={Categories} loadingProducts={loadingProducts} setLoadingProducts={setLoadingProducts} loadingCategories={loadingCategories} setLoadingCategories={setLoadingCategories} setProducts={setProducts} />
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


const Fillters = ({ setProductsUrl, Categories, loadingProducts, setLoadingProducts, loadingCategories, setLoadingCategories, setProducts, ProductsUrl }) => {
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const sortTypes = [
    'Newest',
    'Top Rated',
    'High Price',
    'Low Price'
  ]
  const [selectedSort, setSelectedSort] = useState(
    queryParams.get('sort') === 'rating' ? 1 : queryParams.get('sort') === 'price' && queryParams.get('sortType') === 'DESC' ? 2 : queryParams.get('sort') === 'price' && queryParams.get('sortType') === 'ASC' ? 3 : 0
  )
  const [selected, setSelected] = useState(
    queryParams.get('category_id') ? [parseInt(queryParams.get('category_id'))] : []
  )
  let PriceMin = queryParams.get('minPrice');
  let PriceMax = queryParams.get('maxPrice');
  PriceMin = Math.max(PriceMin || 1, 1);
  PriceMax = Math.min(PriceMax || 10000, 10000);
  if (PriceMax < PriceMin) [PriceMax, PriceMin] = [PriceMin, PriceMax]

  const [priceRange, setPriceRange] = useState([PriceMin, PriceMax])

  const updateQueryParams = (newParams) => {
    const mergedParams = new URLSearchParams({
      ...Object.fromEntries(new URLSearchParams(location.search)), // Convert existing query parameters to object
      ...newParams // Merge new parameters
    });
    navigate(`/Explore?${mergedParams.toString()}`);
  };

  const deleteQueryParams = (key) => {
    queryParams.delete(key)
    navigate(`/Explore?${queryParams.toString()}`);
  }

  const deleteSpecificParam = (value) => {
    setProductsUrl((prev) => {
      const newUrl = prev.split('?')[1].split('&').filter((el) => !el.includes(value)).join('&')
      return `${prev.split('?')[0]}?${newUrl}`
    })
  }

  const handleSelect = (id) => {
    if (loadingProducts) return;
    setLoadingProducts(true)
    // check if the category is already selected
    deleteSpecificParam('category_id')
    if (selected.includes(id)) {
      setSelected([])
      deleteQueryParams('category_id')
    } else {
      setSelected([id])
      updateQueryParams({ category_id: id });
      setProductsUrl((prev) => `${prev}&category_id=${id}`)
    }
  }
  const handleSortTypes = (idx) => {
    if (loadingProducts) return;
    if (selectedSort === idx) return;
    setLoadingProducts(true)
    setSelectedSort(idx)
    deleteSpecificParam('sort')
    deleteSpecificParam('sortType')
    deleteQueryParams('sort')
    deleteQueryParams('sortType')
    if (idx === 1) {
      setProductsUrl((prev) => `${prev}&sort=rating`)
      updateQueryParams({ sort: 'rating' });
    } else if (idx === 2) {
      setProductsUrl((prev) => `${prev}&sort=price&sortType=DESC`)
      updateQueryParams({ sort: 'price' });
      updateQueryParams({ sortType: 'DESC' });
    } else if (idx === 3) {
      setProductsUrl((prev) => `${prev}&sort=price&sortType=ASC`)
      updateQueryParams({ sort: 'price' });
      updateQueryParams({ sortType: 'ASC' });
    }
  }
  const handlePriceRange = () => {
    if (loadingProducts) return;
    setLoadingProducts(true)
    deleteSpecificParam('minPrice')
    deleteSpecificParam('maxPrice')
    deleteQueryParams('minPrice')
    deleteQueryParams('maxPrice')
    setProductsUrl((prev) => `${prev}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`)
    updateQueryParams({ minPrice: priceRange[0] });
    updateQueryParams({ maxPrice: priceRange[1] });
  }

  return (
    <div className='relative EBGaramond'>
      {loadingProducts && <div className='w-full h-full absolute top-0 left-0 z-[3] cursor-wait bg-Beige/50' />}
      <h1 className='text-3xl font-medium'>Categories</h1>
      <div className='my-5'>
        {!loadingCategories && Categories && Categories?.data?.categories.map((el) => (
          <button onClick={() => { handleSelect(el.id) }} className='w-full flex justify-between py-1' key={el.id}>
            <p className='text-xl'>{el.name}</p>
            <div style={{
              border: '1px solid rgba(16, 16, 16, 0.1)',
              boxShadow: '0px 0px 12.3px 0px rgba(0, 0, 0, 0.2) , 0px 0px 4.5px 0px rgba(0, 0, 0, 0.15) inset',
              borderRadius: '4px'
            }} className='bg-White/50 size-[34px] p-2 select-none center'>
              {selected.includes(el.id) && <img src={Selected} alt="" />}
            </div>
          </button>
        ))}
      </div>
      {
        loadingCategories && <>
          {[...Array(5)].map((start, index) => {
            return <div key={index} className="h-5 rounded-full animate-pulse bg-Beige2 mb-6" />
          })}
        </>
      }
      <h1 className='text-3xl font-medium'>Sort By</h1>
      <div className='my-5 flex flex-wrap gap-5'>
        {sortTypes.map((el, idx) => (
          <button key={idx} onClick={() => { handleSortTypes(idx) }} className={`rounded-full border-2 border-Black text-Black text-xl py-3 px-6 flex-grow ${selectedSort === idx ? "bg-Black text-White" : ""}`}>
            {el}
          </button>
        ))}
      </div>
      <h1 className='text-3xl font-medium'>Filter By</h1>
      <div className='flex items-center justify-between'>
        <p className='text-xl my-5 font-medium '> Price</p>
        <button onClick={handlePriceRange} className='bg-black text-white text-center center py-2 px-5 rounded-full'>
          Go
        </button>
      </div>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        defaultValue={[priceRange[0], priceRange[1]]}
        min={PriceMin}
        max={PriceMax}
        ariaLabel={['Lower thumb', 'Upper thumb']}
        ariaValuetext={state => `Thumb value ${state.valueNow}`}
        pearling
        onChange={(value) => setPriceRange(value)}
        minDistance={2000}
      />
      <div className='w-full flex justify-between mt-5 Fredoka font-medium'>
        <span>{priceRange[0]}<span className='text-xs'>EGP</span></span>
        <span>{priceRange[1]}<span className='text-xs'>EGP</span></span>
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
