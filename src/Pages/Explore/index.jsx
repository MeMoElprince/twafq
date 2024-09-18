import { useEffect, useState } from "react";
import SearchPage from "./SearchPage";
import useFetch from "../../Components/CustomHooks/useFetch";
import { getUsers } from "../../Store/urls";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Explore() {
  const { t, i18n } = useTranslation("global");
  const { page } = useParams();
  const [usersUrl, setUsersUrl] = useState(getUsers());
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const sortTypeLabels = [
    ['اعلى نسبة توافق', 'Highest Compatibility'],
    ['النشاط الاحدث', 'Most Recent Activity'],
    ['الاصغر في السن', 'Youngest'],
    ['الاكبر في السن', 'Oldest'],
  ]; 
  const [retFormData, setRetFormData] = useState(
    {
      ...Object.fromEntries(
        [...queryParams].map(([key, value]) => [key, [value]])
      ),
      page: +page || 0,
      size: 5,
    }
  );
  const { retData: users, loading: usersLoading } = useFetch({
    url: getUsers(),
    method: 'POST',
    setErrorMessage,
    body: retFormData
  });
  const [usersS, setUsersS] = useState(users);
  const [loadingUsers, setLoadingUsers] = useState(usersLoading);

  // useEffect(() => {
  //   console.log(usersS)
  // }, [usersS])

  useEffect(() => {
    if (users) {
      setUsersS(users);
      setLoadingUsers(false);
    }
  }, [users]);

  useEffect(() => {
    if (usersS?.length === 0) {
      navigate(`/Explore/${0}?${queryParams.toString()}`);
    }
  }, [usersS]);

  useEffect(() => {
    
    setLoadingUsers(true);

    setRetFormData(prevData => {
      const updatedParams = Object.fromEntries(
        [...queryParams].map(([key, value]) => [
          key,
          (key === 'minAge' || key === 'maxAge') ? +value : [value]
        ])
      );
      return {
        ...updatedParams,
        page: +page || 0,
        size: 5,
      };
    });

    console.log(retFormData);
    
  }, [page, queryParams.toString()]);

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
        setUsersUrl={setUsersUrl}
        usersUrl={usersUrl}
        loadingUsers={loadingUsers}
        setLoadingUsers={setLoadingUsers}
        usersS={usersS}
        setUsersS={setUsersS}
      />
    </div>
  );
}
