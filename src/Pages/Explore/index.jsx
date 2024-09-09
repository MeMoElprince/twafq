import { useEffect, useState } from "react"
import Welcome from "./Welcome"
import Shop from "./Shop"
import useFetch from "../../Components/CustomHooks/useFetch"
import { getCategories, getAllProducts } from "../../Store/urls"

export default function Explore() {
  const queryParams = new URLSearchParams(location.search);
  const [productsUrl, setProductsUrl] = useState(`${getAllProducts()}${queryParams.toString()}`)
  const [categoriesUrl, setCategoriesUrl] = useState(getCategories())
  const [errorMessage, setErrorMessage] = useState('')
  const { data: Cat, loading: CatLoading } = useFetch({ url: categoriesUrl, method: 'GET', setErrorMessage })
  const { data: Prod, loading: ProdLoading } = useFetch({ url: productsUrl, method: 'GET', setErrorMessage })
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loadingCategories, setLoadingCategories] = useState(CatLoading)
  const [loadingProducts, setLoadingProducts] = useState(ProdLoading)
  useEffect(() => {
    if (Cat) {
      setCategories(Cat)
      setLoadingCategories(false)
    }
    if (Prod) {
      setProducts(Prod)
      setLoadingProducts(false)
    }
  }, [Cat, Prod])

  useEffect(() => {
    // console.log({ categories });
    // console.log({ products });
  }, [categories, products])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div style={{
      background: 'rgba(212, 205, 205, 1)'
    }} className="relative w-full min-h-screen text-Black flex flex-col gap-40">
      <Shop
        setProductsUrl={setProductsUrl} ProductsUrl={productsUrl}
        loadingCategories={loadingCategories} setLoadingCategories={setLoadingCategories}
        loadingProducts={loadingProducts} setLoadingProducts={setLoadingProducts}
        Categories={categories} Products={products} setProducts={setProducts} />
    </div>
  )
}