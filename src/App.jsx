import { useContext } from "react"
import { Routes, Route } from "react-router-dom"
import { ReactLenis } from '@studio-freight/react-lenis'
import { BackDropContext } from "./Store/Context/BackDrop"

import Root from './Pages/Root'
import Home from './Pages/Home/index'
import Login from './Pages/Login/index'
import SignUp from './Pages/SignUp/index'
import Cart from './Pages/Cart/index'
import Page404 from './Pages/Page404/index'
import TopRated from "./Pages/TopRated/index"
import Explore from './Pages/Explore/index'
import ItemDetails from './Pages/ItemDetails/index'
import SearchPage from './Pages/SearchPage/index'

function App() {
  const { BackDropActive } = useContext(BackDropContext)
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />} >
          <Route index element={<Home />} />
          <Route path="/Search/:name" element={<SearchPage />} />
          <Route path="Login" element={<Login />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="TopRated" element={<TopRated />} />
          <Route path="Cart" element={<Cart />} />
          <Route path="Explore" element={<Explore />} />
          <Route path="ItemDetails/:id" element={<ItemDetails />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
      <ReactLenis root={!BackDropActive} />
    </>
  )
}

export default App