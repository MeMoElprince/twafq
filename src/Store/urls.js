const APIURL = import.meta.env.VITE_API_URL;

const SignupUrl = () => (`${APIURL}api/signup`);
const LoginUrl = () => (`${APIURL}api/signin`);
const MyDataUrl = () => (`${APIURL}api/user/data/by-token?`);
const getUsersLikeMe = () => (`${APIURL}api/users/sorted/usersLikeMe?`);
const getColorsUrl = () => (`${APIURL}api/colors`)
const updateInfoURL = () => (`${APIURL}api/profile?`)
const updateMyData = () => (`${APIURL}api/v1/users/updateMe`);
const VerifyOTP = () => (`${APIURL}api/v1/users/verify`);
const contactUsURL = () => (`${APIURL}api/user/contactus?`);
const ForgetPassword = () => (`${APIURL}api/forgotpassword?`);
const ResetPassword = () => (`${APIURL}api/resetpassword?`);
const likeMeTarget = () => (`${APIURL}api/user/likeme/target?`);
const favoriteChange = () => (`${APIURL}api/user/favorite?`);
const putReview = () => (`${APIURL}api/user/story?`);
const getPhoneURL = () => (`${APIURL}api/user/phone?`);
const addToContactURL = () => (`${APIURL}create-add-user-intent?`);
const verifyURL = () => (`${APIURL}create-verify-intent?`);
const getAllReviews = () => (`${APIURL}api/user/stories`);
const AskForVerificationCode = () => (`${APIURL}api/v1/users/verify-token`);
const getBlogs = () => (`${APIURL}api/blogs`);
const getSingleBlog = () => (`${APIURL}api/blog?`);
const getMostViewBlogs = () => (`${APIURL}api/blog/most-viewed`);
const increaseViewCount = () => (`${APIURL}api/blog/view?`);
const getUserProfile = () => (`${APIURL}api/profile?`);
const getCountries = () => (`${APIURL}api/v1/countries/`);
const getUsers = () => (`${APIURL}api/users/filter`);
const getFav = () => (`${APIURL}api/v1/favourites`);
const addFav = () => (`${APIURL}api/v1/favourites`);
const delFav = (id) => (`${APIURL}api/v1/favourites/${id}`);
export {
  SignupUrl,
  likeMeTarget,
  LoginUrl,
  MyDataUrl,
  VerifyOTP,
  ForgetPassword,
  getSingleBlog,
  ResetPassword,
  AskForVerificationCode,
  getBlogs,
  increaseViewCount,
  putReview,
  favoriteChange,
  getPhoneURL,
  getAllReviews,
  getCountries,
  getColorsUrl,
  getMostViewBlogs,
  getUserProfile,
  updateMyData,
  contactUsURL,
  getUsers,
  getFav,
  addFav,
  delFav,
  addToContactURL,
  verifyURL,
  getUsersLikeMe,
  updateInfoURL,
}