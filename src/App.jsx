import { Routes, Route } from "react-router-dom"
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop"
import Root from './Pages/Root'
import Login from './Pages/Login/index'
import SignUp from './Pages/SignUp/index'
import Page404 from './Pages/Page404/index'
import Explore from './Pages/Explore/index'
import Contact from './Pages/Contact/index'
import Blogs from './Pages/Blogs/index'
import Home from "./Pages/Home/index"
import UserProfile from "./Pages/UserProfile/index"
import SingleBlog from "./Pages/SingleBlog/SingleBlog"
import MyProfile from "./Pages/MyProfile/index"
import Services from "./Pages/Services/index"
import Privacy from "./Pages/Privacy/index"

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Root />} >
          <Route index element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="Services" element={<Services />} />
          <Route path="Privacy" element={<Privacy />} />
          <Route path="Blogs" element={<Blogs />} />
          <Route path="Blogs/:id" element={<SingleBlog />} />
          <Route path="Explore/:page" element={<Explore />} />
          <Route path="UserProfile/:id" element={<UserProfile />} />
          <Route path="MyProfile" element={<MyProfile />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
