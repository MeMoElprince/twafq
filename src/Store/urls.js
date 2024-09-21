const APIURL = import.meta.env.VITE_API_URL;

const SignupUrl = () => (`${APIURL}api/signup`);
const LoginUrl = () => (`${APIURL}api/signin`);
const MyDataUrl = () => (`${APIURL}api/profile`);
const getColorsUrl = () => (`${APIURL}api/colors`)
const updateMyData = () => (`${APIURL}api/v1/users/updateMe`);
const changeMyPassword = () => (`${APIURL}api/v1/users/change-password`);
const VerifyOTP = () => (`${APIURL}api/v1/users/verify`);
const ForgetPassword = () => (`${APIURL}api/v1/users/forget-password`);
const ResetPassword = () => (`${APIURL}api/v1/users/reset-password`);
const AskForVerificationCode = () => (`${APIURL}api/v1/users/verify-token`);
const getBlogs = () => (`${APIURL}api/blogs`);
const getSingleBlog = () => (`${APIURL}api/blog?`);
const getMostViewBlogs = () => (`${APIURL}api/blog/most-viewed`);
const increaseViewCount = () => (`${APIURL}api/blog/view?`);
const getUserProfile = () => (`${APIURL}api/profile?`);
const getCountries = () => (`${APIURL}api/v1/countries/`);
const getUsers = () => (`${APIURL}api/users/filter`);
const getSingleItem = (id) => (`${APIURL}api/v1/products/items/${id}`);
const addItemToCart = (id) => (`${APIURL}api/v1/products/${id}/carts/item`);
const getFav = () => (`${APIURL}api/v1/favourites`);
const addFav = () => (`${APIURL}api/v1/favourites`);
const delFav = (id) => (`${APIURL}api/v1/favourites/${id}`);
const delFavByProId = (id) => (`${APIURL}api/v1/products/${id}/favourites`);
export {
  SignupUrl,
  LoginUrl,
  MyDataUrl,
  VerifyOTP,
  ForgetPassword,
  getSingleBlog,
  ResetPassword,
  AskForVerificationCode,
  getBlogs,
  increaseViewCount,
  getCountries,
  getColorsUrl,
  getMostViewBlogs,
  getUserProfile,
  updateMyData,
  changeMyPassword,
  getUsers,
  getSingleItem,
  addItemToCart,
  getFav,
  addFav,
  delFav,
  delFavByProId
}