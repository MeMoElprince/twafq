import { useContext, useEffect, useState } from "react";
import SearchPage from "./SearchPage";
import useFetch from "../../Components/CustomHooks/useFetch";
import { getUsers } from "../../Store/urls";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../Store/Context/Authentication";

export default function Explore() {
  const { Token, formData, isLogedIn } = useContext(AuthenticationContext)
  const { i18n } = useTranslation("global");
  const { page } = useParams();
  const [errorMessage, setErrorMessage] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  let mp = new Map();
  mp.set('Random', '');
  mp.set('Highest Compatibility', 'likeme=desc');
  mp.set('Lowest Compatibility', 'likeme=asc');
  mp.set('Youngest', 'age=asc');
  mp.set('Oldest', 'age=desc');
  // const addId = formData?.id ? `?userId=${formData?.id}` : ``;
  const [retFormData, setRetFormData] = useState(
    {
      ...Object.fromEntries(
        [...queryParams].map(([key, value]) => [
          key,
          (key === 'minAge' || key === 'maxAge') ? +value + 0 : [value]
        ])
      ),
      page: +page > 0 ? (+page || 0) : 0,
      size: 6,
      userId: formData?.id || '',
    }
  );

  const { retData: users, loading: usersLoading } = useFetch({
    url: `${getUsers()}${((retFormData?.sort && isLogedIn && Token && mp.get(retFormData?.sort[0]) !== '') ? (`?${mp.get(retFormData?.sort[0])}` || "") : "")}`,
    method: 'POST',
    setErrorMessage,
    setTotalPages,
    body: retFormData,
    Token
  });

  // console.log(totalPages)
  
  const [usersS, setUsersS] = useState(users);
  const [loadingUsers, setLoadingUsers] = useState(usersLoading);

  // useEffect(() => {
  //   console.log(usersS)
  // }, [usersS])

  useEffect(() => {
  if (users) {
    setUsersS(users.filter(el => el.id !== formData?.id));
    setLoadingUsers(false);
  }
}, [users, formData.id]);



  useEffect(() => {
    if (page < 0 || usersS?.length === 0) {
      navigate(`/explore/${0}?${queryParams.toString()}`, {replace: true});
    }
  }, [usersS]);

  useEffect(() => {
    
    setLoadingUsers(true);

    setRetFormData(() => {
      const updatedParams = Object.fromEntries(
        [...queryParams].map(([key, value]) => [
          key,
          (key === 'minAge' || key === 'maxAge') ? +value + 0 : [value]
        ])
      );
      return {
        ...updatedParams,
        page: +page > 0 ? (+page || 0) : 0,
        size: 6,
        userId: formData?.id || ''
      };
    });

    // console.log(retFormData);
    
  }, [page, queryParams.toString(), formData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: '#F4F4F8' }} className="relative w-full min-h-screen text-Black flex flex-col items-center gap-40">
      <Helmet>
        <title>{i18n.language === 'ar' ? "البحث عن شريك" : "Find a partner"}</title>
        <meta
          name='description'
          content={
            i18n.language === 'ar'
              ? 'استكشف أفضل الخيارات للعثور على شريك الحياة المثالي من خلال أداة البحث المتقدمة لدينا. ابحث عن توافقات مثالية واستمتع بتجربة بحث مريحة وفعالة.'
              : 'Explore top options to find your perfect life partner with our advanced search tool. Discover ideal matches and enjoy a seamless and effective search experience.'
          }
        />
      </Helmet>
      <SearchPage
        page={page}
        loadingUsers={loadingUsers}
        setLoadingUsers={setLoadingUsers}
        usersS={usersS}
        setUsersS={setUsersS}
        totalPages={totalPages}
      />
    </div>
  );
}
