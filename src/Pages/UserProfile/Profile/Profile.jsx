import { useState, useContext, useEffect } from 'react'
import { FaPlus, FaMinus, FaRegStar, FaStar, FaStarHalfAlt, FaRegHeart, FaHeart } from "react-icons/fa";
import placeholder from './placeholder.jpg'
import { addItemToCart } from '../../../Store/urls';
import Fetch from '../../../Components/CustomHooks/Fetch';
import { addFav, delFav, delFavByProId } from '../../../Store/urls';
import { AuthenticationContext } from '../../../Store/Context/Authentication';
import Woman from '../../../assets/Avatars/woman.png'
import Man from '../../../assets/Avatars/man.png'
import verifiedMan from '../../../assets/Avatars/verifiedMan.png'
import verifiedWoman from '../../../assets/Avatars/verifiedWoman.png'
import Texture from '../../../assets/Avatars/Texture.svg'
  

export default function Profile({ profileDetails }) {
    // const { Token } = useContext(AuthenticationContext);
    const [isFavorite, setIsFavorite] = useState(0);
    console.log(profileDetails)
    // const images = ProfileDetails?.images?.length > 0 ? ProfileDetails.images : [{ image_url: placeholder }];
    const [data, setData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleFavorite() {
        // if (loading) return;
        // setLoading(true)
        // setErrorMessage('')
        // if (isFavorite) {
        //     await Fetch({
        //         url: delFavByProId(ProfileDetails.id),
        //         setLoading,
        //         setData,
        //         setErrorMessage,
        //         method: 'DELETE',
        //         Token
        //     })
        //     setIsFavorite(prev => !prev);
        // } else {
        //     await Fetch({
        //         url: addFav(),
        //         setLoading,
        //         setData,
        //         setErrorMessage,
        //         method: 'POST',
        //         body: { product_item_id: ProfileDetails.id },
        //         Token
        //     })
        //     setIsFavorite(prev => !prev);
        // }
        setIsFavorite(prev => !prev);
    }

    // useEffect(() => {
    //     if (!data) return;
    //     console.log({ addToCart: data })
    // }, [data])

    function UserProfileField({ label, value }) {
        return (
          <div className="py-6 px-3 gap-2 sm:px-6 sm:gap-4 flex items-center flex-wrap break-all hyphenated">
            <p className="text-lg font-medium text-Black">
              {label + ":"}
            </p>
            <p className="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2">
              {value}
            </p>
          </div>
        );
      }

    return (
        <section className="w-full relative pt-36 pb-24 bg-White myFont flex flex-col justify-center items-center">
            <div className="">
                <div className={`absolute top-0 left-0 z-10 w-full h-[180px] mt-20 ${profileDetails.gender.en === 'Male' ? "bg-Blue/50" : "bg-DarkPink/50"}`}></div>
                <img 
                    src={Texture} 
                    alt="cover-image" 
                    className="absolute top-0 left-0 z-0 w-full h-[180px] object-cover mt-20 before:bg-DarkPink shadow-md"
                />
            </div>
            <div className="w-full max-w-7xl mx-auto px-6 md:px-8 mt-4">
                <div className="flex items-center justify-center relative z-10 mb-2.5">
                    <img src={
                        profileDetails.isVerified ? 
                            profileDetails.gender.en === 'Male' ? verifiedMan : verifiedWoman 
                            :
                            profileDetails.gender.en === 'Male' ? Man : Woman 
                    } alt="user-avatar-image" className="border-4 border-solid w-[200px] h-[200px] border-White rounded-full" />
                </div>
                <h3 className="text-center myFont font-bold text-3xl leading-10 text-Black mb-3">{profileDetails.firstName + " " + profileDetails.lastName}</h3>
            </div>
            <div className="w-[90%] center flex-wrap py-12 gap-8">
                <div className="bg-DarkBeige/40 overflow-hidden shadow-lg rounded-lg border border-Black/15 lg2:max-w-[43.25%] max-w-[90%]">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-xl leading-6 font-semibold text-Black">
                            البيانات الشخصية
                        </h3>
                    </div>
                    <div className="border-t border-Black/10 px-4 py-2 sm:p-0">
                        <div className="flex flex-wrap">
                            <UserProfileField label="العمر" value="24" />
                            <UserProfileField label="الطول" value="175" />
                            <UserProfileField label="الوزن" value="68" />
                            <UserProfileField label="لون البشرة" value="قمحاوي" />
                            <UserProfileField label="الهيئة" value="سمين" />
                            <UserProfileField label="الحالة الصحية" value="صداع" />
                        </div>
                    </div>
                </div>
                <div className="bg-DarkBeige/40 overflow-hidden shadow-lg rounded-lg border border-Black/15 lg2:max-w-[43.25%] max-w-[90%]">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-xl leading-6 font-semibold text-Black">
                            البيانات الشخصية
                        </h3>
                    </div>
                    <div className="border-t border-Black/10 px-4 py-2 sm:p-0">
                        <div className="flex flex-wrap">
                            <UserProfileField label="العمر" value="24" />
                            <UserProfileField label="الطول" value="175" />
                            <UserProfileField label="الوزن" value="68" />
                            <UserProfileField label="لون البشرة" value="قمحاوي" />
                            <UserProfileField label="الهيئة" value="سمين" />
                            <UserProfileField label="الحالة الصحية" value="صداع" />
                        </div>
                    </div>
                </div>
                <div className="bg-DarkBeige/40 overflow-hidden shadow-lg rounded-lg border border-Black/15 lg2:w-[89%] max-w-[90%]">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-xl leading-6 font-semibold text-Black">
                            البيانات الشخصية
                        </h3>
                    </div>
                    <div className="border-t border-Black/10 px-4 py-2 sm:p-0">
                        <div className="flex flex-wrap">
                            <UserProfileField label="العمر" value="24" />
                            <UserProfileField label="الطول" value="175" />
                            <UserProfileField label="الوزن" value="68" />
                            <UserProfileField label="لون البشرة" value="قمحاوي" />
                            <UserProfileField label="الهيئة" value="سمين" />
                            <UserProfileField label="الحالة الصحية" value="صداع" />
                        </div>
                    </div>
                </div>
                <div className="bg-DarkBeige/40 overflow-hidden shadow-lg rounded-lg border border-Black/15 lg2:max-w-[43.25%] max-w-[90%]">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-xl leading-6 font-semibold text-Black">
                            البيانات الشخصية
                        </h3>
                    </div>
                    <div className="border-t border-Black/10 px-4 py-2 sm:p-0">
                        <div className="flex flex-wrap">
                            <UserProfileField label="العمر" value="24" />
                            <UserProfileField label="الطول" value="175" />
                            <UserProfileField label="الوزن" value="68" />
                            <UserProfileField label="لون البشرة" value="قمحاوي" />
                            <UserProfileField label="الهيئة" value="سمين" />
                            <UserProfileField label="الحالة الصحية" value="صداع" />
                        </div>
                    </div>
                </div>
                <div className="bg-DarkBeige/40 overflow-hidden shadow-lg rounded-lg border border-Black/15 lg2:max-w-[43.25%] max-w-[90%]">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-xl leading-6 font-semibold text-Black">
                            البيانات الشخصية
                        </h3>
                    </div>
                    <div className="border-t border-Black/10 px-4 py-2 sm:p-0">
                        <div className="flex flex-wrap">
                            <UserProfileField label="العمر" value="24" />
                            <UserProfileField label="الطول" value="175" />
                            <UserProfileField label="الوزن" value="68" />
                            <UserProfileField label="لون البشرة" value="قمحاوي" />
                            <UserProfileField label="الهيئة" value="سمين" />
                            <UserProfileField label="الحالة الصحية" value="صداع" />
                        </div>
                    </div>
                </div>
            </div>
        </section>                             
    );
}