import { useContext } from "react"
import { Routes, Route } from "react-router-dom"
import { BackDropContext } from "./Store/Context/BackDrop"

import Root from './Pages/Root'
import Login from './Pages/Login/index'
import SignUp from './Pages/SignUp/index'
import Page404 from './Pages/Page404/index'
import Explore from './Pages/Explore/index'
import ItemDetails from './Pages/ItemDetails/index'
import Contact from './Pages/Contact/index'
import Blogs from './Pages/Blogs/index'
import Home from "./Pages/Home/index"
import UserProfile from "./Pages/UserProfile/index"

function App() {
  const { BackDropActive } = useContext(BackDropContext)
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />} >
          <Route index element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="Blogs" element={<Blogs />} />
          <Route path="Explore" element={<Explore />} />
          <Route path="ItemDetails/:id" element={<ItemDetails />} />
          <Route path="UserProfile/:id" element={<UserProfile />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
