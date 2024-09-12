const APIURL = import.meta.env.VITE_API_URL;

const SignupUrl = () => (`${APIURL}api/signup`);
const LoginUrl = () => (`${APIURL}api/signin`);
const MyDataUrl = () => (`${APIURL}api/profile`);
const updateMyData = () => (`${APIURL}api/v1/users/updateMe`);
const changeMyPassword = () => (`${APIURL}api/v1/users/change-password`);
const VerifyOTP = () => (`${APIURL}api/v1/users/verify`);
const ForgetPassword = () => (`${APIURL}api/v1/users/forget-password`);
const ResetPassword = () => (`${APIURL}api/v1/users/reset-password`);
const AskForVerificationCode = () => (`${APIURL}api/v1/users/verify-token`);
const getCart = () => (`${APIURL}api/v1/carts`);
const deleteFromCart = (id) => (`${APIURL}api/v1/carts/${id}`);
const updateFromCart = (id) => (`${APIURL}api/v1/carts/${id}`);
const getCountries = () => (`${APIURL}api/v1/countries/`);
const getMyDefaultAddress = () => (`${APIURL}api/v1/addresses/defaultAddress`);
const addNewAddress = () => (`${APIURL}api/v1/addresses/`);
const updateAddress = (id) => (`${APIURL}api/v1/addresses/${id}`);
const Checkout = () => (`${APIURL}api/v1/sales/checkout`);
const popularProdcuts = () => (`${APIURL}api/v1/products/popular`);
const getCategories = () => (`${APIURL}api/v1/categories`);
const getAllUsers = () => (`${APIURL}api/v1/users/search?`);
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
  ResetPassword,
  AskForVerificationCode,
  getCart,
  deleteFromCart,
  updateFromCart,
  getCountries,
  getMyDefaultAddress,
  addNewAddress,
  updateAddress,
  Checkout,
  popularProdcuts,
  updateMyData,
  changeMyPassword,
  getCategories,
  getAllUsers,
  getSingleItem,
  addItemToCart,
  getFav,
  addFav,
  delFav,
  delFavByProId
}