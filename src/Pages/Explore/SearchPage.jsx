import { useContext, useEffect, useState } from 'react'
import Card from './Components/Card';
import { useNavigate, useParams } from 'react-router-dom'
import { useLayoutDirection } from '../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"
import Countires from "../SignUp/Components/Countires.json"
import Styles from './Styling.module.css'
import { Link } from 'react-router-dom';
import { TbHeartSearch } from "react-icons/tb";
import { AuthenticationContext } from '../../Store/Context/Authentication';


export default function SearchPage({ loadingUsers, usersS, page, totalPages }) {
  const { isRTL } = useLayoutDirection();
	const { t, i18n } = useTranslation("global");
  const queryParams = new URLSearchParams(location.search);
  const {formData} = useContext(AuthenticationContext)

  // console.log(usersS);
  

  // console.log(loadingUsers);
  
  return (
    <div className={`z[5] min-h-screen flex flex-col justify-center items-center md:justify-between gap-y-20 mainPadding mt-[20vh] mb-[20vh]`}>
      <div className={`${Styles.exactForm} bg-LighterPink/50 border-2 border-Black/20 shadow-xl rounded-2xl w-full px-8 sm:px-12 py-8 sm:py-12 z-10`}>
        <Fillters totalPages={totalPages} isRTL={isRTL} i18n={i18n} t={t} />
      </div>
      <div className='gap-12 flex flex-grow w-full flex-wrap justify-center items-center px-[5%]'>
        {
          !loadingUsers && usersS && usersS?.length > 0 && usersS?.map((el, index) => (
              (el.id !== formData.id && <Card userDetailsReceived={el} key={index}/>)
          ))
        }
        {
          !loadingUsers && usersS && !usersS?.length && <div className='w-full center flex-col h-screen gap-4'>
            <TbHeartSearch className='text-DarkPink size-[160px] sm:size-[240px]' />
            <p className='text-xl sm:text-3xl text-center font-medium'>{i18n.language === 'ar' ? "لم يتم العثور على مستخدمين..." : "No Users Found..."}</p>
          </div>
        }
        {
          loadingUsers && <>
            {[...Array(9)].map((start, index) => {
              return <LoadingSpinner key={index} />
            })}
          </>
        }
      </div>
      <ul className="myFont flex mx-auto border-2 border-Black rounded w-max mt-4 bg-LighterPink/60">
        <Link to={`/explore/${Math.max(0, (+page - 1))}?${queryParams.toString()}`} className={`${+page - 1 <= -1 && "pointer-events-none opacity-50"}`}>
          <li
            className={`px-5 py-2.5 flex items-center justify-center shrink-0 cursor-pointer text-base ${i18n.language === 'ar' && "border-l-2 border-Black"} font-semibold text-Black min-w-[110px] hover:bg-DarkPink/40 transition-all duration-200 hover:px-7`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`w-3 fill-current ${i18n.language === 'ar' ? "ml-3 scale-x-[-1]" : "mr-3"}`} viewBox="0 0 55.753 55.753">
              <path
                d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                data-original="#000000" />
            </svg>
            {i18n.language === 'ar' ? "السابق" : "Previous"}
          </li>
        </Link>
        <Link to={`/explore/${Math.min(+page+1, +totalPages)}?${queryParams.toString()}`} className={`${+page + 1 > +totalPages && "pointer-events-none opacity-50"}`}>
          <li
            className={`${i18n.language === 'en' && "border-l-2 border-Black"} px-5 py-2.5 flex items-center justify-center shrink-0 cursor-pointer text-base font-semibold text-Black min-w-[110px] hover:bg-DarkPink/40 transition-all duration-200 hover:px-7`}>
            {i18n.language === 'ar' ? "التالي" : "next"}
            <svg xmlns="http://www.w3.org/2000/svg" className={`w-3 fill-current ${i18n.language === 'ar' ? "mr-3 scale-x-[-1]" : "ml-3"} rotate-180`} viewBox="0 0 55.753 55.753">
              <path
                d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                data-original="#000000" />
            </svg>
          </li>
        </Link>
      </ul>
    </div>
  )
}


const Fillters = ({ totalPages, isRTL, i18n, t }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const {isLogedIn} = useContext(AuthenticationContext)

  const sortTypeLabels = [
    ['عشوائي', 'Random'],
    ['اعلى نسبة توافق', 'Highest Compatibility'],
    ['اقل نسبة توافق', 'Lowest Compatibility'],
    ['الاصغر في السن', 'Youngest'],
    ['الاكبر في السن', 'Oldest'],
  ];
  

  
  const [searchParams, setSearchParams] = useState({...Object.fromEntries(queryParams), minAge: 18, maxAge:100});

  
  
  function handleInputChange(event) {
    const { name, value } = event.target;
  
    setSearchParams(prevSearchParams => {
      const updatedSearchParams = { ...prevSearchParams };
  
      if (value) {
        // If value is not empty, set the value in searchParams
        updatedSearchParams[name] = (name === 'minAge' || name === 'maxAge') ? +value : value;
      } else {
        // If value is empty, remove it from searchParams
        if(name === 'maxAge' || name === 'minAge'){
          if(name === 'maxAge')
            searchParams[name] = 100;
          else
            searchParams[name] = 18;
        }else{
          delete updatedSearchParams[name];
        }
      }
  
      return updatedSearchParams;
    });
  }

  // useEffect(() => {
  //   console.log(searchParams)
  // }, [searchParams])
  
  
  function handleSearch() {
    searchParams.sort = sortTypeLabels[selectedIdx][1];
    if(searchParams['maxAge']){
      searchParams['maxAge'] = Math.min(100, searchParams['maxAge']);
      searchParams['maxAge'] = Math.max(18, searchParams['maxAge']);
    }
    if(searchParams['minAge']){
      searchParams['minAge'] = Math.min(100, searchParams['minAge']);
      searchParams['minAge'] = Math.max(18, searchParams['minAge']);
    }
    if(searchParams['minAge'] && searchParams['maxAge'] && searchParams['minAge'] > searchParams['maxAge'])
        [searchParams['minAge'], searchParams['maxAge']] = [searchParams['maxAge'], searchParams['minAge']]
    const queryString = new URLSearchParams(searchParams).toString();
    navigate(`/explore/${0}?${queryString}`);
  }

  useEffect(() => {
    const holder = searchParams.sort;
    // console.log(holder);
    if(!holder || holder === sortTypeLabels[0][1])
        setSelectedIdx(0);
    else if(holder === sortTypeLabels[1][1] && isLogedIn)
        setSelectedIdx(1);
    else if(holder === sortTypeLabels[2][1] && isLogedIn)
        setSelectedIdx(2);
    else if(holder === sortTypeLabels[3][1])
        setSelectedIdx(3);
    else if(holder === sortTypeLabels[4][1])
        setSelectedIdx(4);
    else{
      setSelectedIdx(0);
      searchParams.sort = sortTypeLabels[0][1]
      handleSearch()
    }
  }, [])

  return (
    <div className='relative myFont'>
      {false && <div className='w-full h-full absolute top-0 left-0 z-[3] cursor-wait bg-Beige/50' />}
      <h1 className='text-3xl font-medium'>{i18n.language === 'ar' ? "تصفية" : "Filter"}</h1>
      <div className='gap-8 p-8 py-10 gap-x-12 flex flex-row justify-center items-center flex-wrap'>

      <div className={`${Styles.inputHolder} relative w-[100%] md:w-[35%] md1:w-[25%] lg2:w-[20%]`}>
      <select 
          id="Gender"
          value={searchParams.gender || ''} 
          onChange={handleInputChange}
          name="gender"
          aria-label={i18n.language === 'ar' ? 'الحالة العائلية' : 'Family Status'}
          className={`myFont w-full py-2 px-3 border-b-[3px] ${
            searchParams.gender ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
          } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-Black cursor-pointer`}
        >
          <option value="">{i18n.language === 'ar' ? '-- لا يهم --' : '-- Any --'}</option>
          <option value="Male">{i18n.language === 'ar' ? 'ذكر' : 'Male'}</option>
          <option value="Female">{i18n.language === 'ar' ? 'أنثى' : 'Female'}</option>
        </select>
          <label
              htmlFor="Gender"
              className={`inputLabel absolute top-[15px] ${
                isRTL ? "-right-2" : "-left-2"
              } text-Black transform pointer-events-none -translate-y-2.5 px-1 myFont w-[100%] text-[19px] font-semibold`} style={{ top: '-12px' }}
            >
              {t("loginInfo.gender")}
            </label>
        </div>

          <div className={`${Styles.inputHolder} relative w-[100%] md:w-[35%] md1:w-[25%] lg2:w-[20%]`}>
          <select 
              id="Country"
              value={searchParams.country || ''} 
              onChange={handleInputChange}
              name="country"
              aria-label={i18n.language === 'ar' ? 'البلد' : 'Country'}
              className={`myFont w-full py-2 px-3 border-b-[3px] ${
                searchParams.country ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
              } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-Black cursor-pointer`}
            >
              <option value="">{i18n.language === 'ar' ? '-- لا يهم --' : 'Any'}</option>
              {Countires.map((country) => (
                <option 
                  key={country.code} 
                  value={country.country_en} 
                >
                  {i18n.language === 'ar' ? country.country_ar : country.country_en}
                </option>
              ))}
            </select>
          <label
              htmlFor="Country"
              className={`inputLabel absolute top-[15px] ${
                isRTL ? "-right-2" : "-left-2"
              } text-Black transform -translate-y-2.5 px-1 myFont w-[100%] text-[19px] font-semibold`} style={{ top: '-12px' }}
            >
              {t("nationality.country")}
            </label>
        </div>
        {/* <div className={`${Styles.inputHolder} relative w-[100%] md:w-[35%] md1:w-[25%] lg2:w-[20%]`}>
          <select 
                  id="City"
                  value={searchParams.city || ''}
                  onChange={handleInputChange}
                  name="city"
                  aria-label={i18n.language === 'ar' ? 'المدينة' : 'City'}
                  className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    searchParams.city ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                  } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-Black cursor-pointer`}
              >
                  <option value={""}>{i18n.language === 'ar' ? '-- لا يهم --' : 'Any'}</option>
                  
          </select>
          <label
              htmlFor="City"
              className={`inputLabel absolute top-[15px] ${
                isRTL ? "-right-2" : "-left-2"
              } text-Black transform -translate-y-2.5 px-1 myFont w-[100%] text-[19px] font-semibold`} style={{ top: '-12px' }}
            >
              {t("nationality.city")}
            </label>
        </div> */}
        <div className={`${Styles.inputHolder} relative w-[100%] md:w-[35%] md1:w-[25%] lg2:w-[20%]`}>
        <select 
            id="Nationality"
            value={searchParams.nationality || ''} 
            onChange={handleInputChange}
            name="nationality"
            aria-label={i18n.language === 'ar' ? 'الجنسية' : 'Nationality'}
            className={`myFont w-full py-2 px-3 border-b-[3px] ${
              searchParams.nationality ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
            } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-Black cursor-pointer`}
          >
            <option value="">{i18n.language === 'ar' ? '-- لا يهم --' : 'Any'}</option>
            {Countires.map((country) => (
              <option 
                key={country.code} 
                value={country.nationality_en} 
              >
                {i18n.language === 'ar' ? country.natianality_ar : country.nationality_en}
              </option>
            ))}
          </select>
          <label
              htmlFor="Nationality"
              className={`inputLabel absolute top-[15px] ${
                isRTL ? "-right-2" : "-left-2"
              } text-Black transform -translate-y-2.5 px-1 myFont w-[100%] text-[19px] font-semibold`} style={{ top: '-12px' }}
            >
              {t("nationality.nationality")}
            </label>
        </div>
        <div className={`${Styles.inputHolder} relative w-[100%] md:w-[35%] md1:w-[25%] lg2:w-[20%]`}>
        <select 
            id="CountryOfResidence"
            value={searchParams.countryOfResidence || ''} 
            onChange={handleInputChange}
            name="countryOfResidence"
            aria-label={i18n.language === 'ar' ? 'الإقامة' : 'Country of Residence'}
            className={`myFont w-full py-2 px-3 border-b-[3px] ${
              searchParams.countryOfResidence ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
            } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-Black cursor-pointer`}
          >
            <option value="">{i18n.language === 'ar' ? '-- لا يهم --' : 'Any'}</option>
            {Countires.map((country) => (
              <option 
                key={country.code}
                value={country.country_en} 
              >
                {i18n.language === 'ar' ? country.country_ar : country.country_en}
              </option>
            ))}
          </select>
          <label
              htmlFor="CountryOfResidence"
              className={`inputLabel absolute top-[15px] ${
                isRTL ? "-right-2" : "-left-2"
              } text-Black transform -translate-y-2.5 px-1 myFont w-[100%] text-[19px] font-semibold`} style={{ top: '-12px' }}
            >
              {t("nationality.residence")}
            </label>
        </div>
        <div className={`${Styles.inputHolder} relative w-[100%] md:w-[35%] md1:w-[25%] lg2:w-[20%]`}>
          <select 
                  id="FamilyStatus"
                  value={searchParams.familyStatus || ''}
                  onChange={handleInputChange}
                  name="familyStatus"
                  aria-label={i18n.language === 'ar' ? 'الحالة العائلية' : 'Family Status'}
                  className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    searchParams.familyStatus ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                  } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-Black cursor-pointer`}
              >
                  <option value={""}>{i18n.language === 'ar' ? '-- لا يهم --' : 'Any'}</option>
                  {
                    searchParams.gender &&
                    (
                      <>
                        <option value={'Single'}>{i18n.language === 'ar' ? searchParams.gender === 'Male' ? 'أعزب' : 'آنسة' : 'Single'}</option>
                        {searchParams.gender === 'Male' && <option value={'Married'}>{i18n.language === 'ar' ? 'متزوج' : 'Married'}</option>}
                        <option value={'Divorced'}>{i18n.language === 'ar' ? searchParams.gender === 'Male' ? 'مطلق' : 'مطلقة' : 'Divorced'}</option>
                        <option value={'Widowed'}>{i18n.language === 'ar' ? searchParams.gender === 'Male' ? 'أرمل' : 'أرملة' : 'Widowed'}</option>
                      </>
                    )
                  }
          </select>
          <label
              htmlFor="FamilyStatus"
              className={`inputLabel absolute top-[15px] ${
                isRTL ? "-right-2" : "-left-2"
              } text-Black transform -translate-y-2.5 px-1 myFont w-[100%] text-[19px] font-semibold`} style={{ top: '-12px' }}
            >
              {t("familyStatus.familyStatus")}
            </label>
        </div>
        <div className={`${Styles.inputHolder} relative w-[100%] md:w-[35%] md1:w-[25%] lg2:w-[20%]`}>
          <select 
                  id="MarriageType"
                  value={searchParams.marriageType || ''}
                  onChange={handleInputChange}
                  name="marriageType"
                  aria-label={i18n.language === 'ar' ? 'نوع الزواج' : 'Marriage Type'}
                  className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    searchParams.marriageType ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                  } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-Black cursor-pointer`}
              >
                  <option value={""}>{i18n.language === 'ar' ? '-- لا يهم --' : 'Any'}</option>
                  {searchParams.gender === 'Male' ? (
                    <>
                      <option value={'First Wife'}>
                        {i18n.language === 'ar' ? 'الزوجة الأولى' : 'First Wife'}
                      </option>
                      <option value={'Second Wife'}>
                        {i18n.language === 'ar' ? 'الزوجة الثانية' : 'Second Wife'}
                      </option>
                      <option value={'Third Wife'}>
                        {i18n.language === 'ar' ? 'الزوجة الثالثة' : 'Third Wife'}
                      </option>
                      <option value={'Fourth Wife'}>
                        {i18n.language === 'ar' ? 'الزوجة الرابعة' : 'Fourth Wife'}
                      </option>
                    </>
                  ) : searchParams.gender === 'Female' && (
                    <>
                      <option value={'I don\'t accept polygamy'}>
                        {i18n.language === 'ar' ? 'لا اقبل تعدد الزوجات' : "I don't accept polygamy"}
                      </option>
                      <option value={'I accept polygamy'}>
                        {i18n.language === 'ar' ? 'اقبل تعدد الزوجات' : 'I accept polygamy'}
                      </option>
                    </>
                  )}
            </select>
          <label
              htmlFor="MarriageType"
              className={`inputLabel absolute top-[15px] ${
                isRTL ? "-right-2" : "-left-2"
              } text-Black transform -translate-y-2.5 px-1 myFont w-[100%] text-[19px] font-semibold`} style={{ top: '-12px' }}
            >
              {t("familyStatus.marriageType")}
            </label>
        </div>
        <div className={`${Styles.inputHolder} relative w-[100%] md:w-[35%] md1:w-[25%] lg2:w-[20%]`}>
          <select 
                  id="Religion"
                  value={searchParams.religion || ''}
                  onChange={handleInputChange}
                  name="religion"
                  aria-label={i18n.language === 'ar' ? 'الديانة' : 'Religion'}
                  className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    searchParams.religion ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                  } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-Black cursor-pointer`}
              >
              <option value={""}>{i18n.language === 'ar' ? '-- لا يهم --' : 'Any'}</option>
              <option value={'Islam'}>{i18n.language === 'ar' ? 'الإسلام' : 'Islam'}</option>
              <option value={'Christianity'}>{i18n.language === 'ar' ? 'المسيحية' : 'Christianity'}</option>
          </select>
          <label
              htmlFor="Religion"
              className={`inputLabel absolute top-[15px] ${
                isRTL ? "-right-2" : "-left-2"
              } text-Black transform -translate-y-2.5 px-1 myFont w-[100%] text-[19px] font-semibold`} style={{ top: '-12px' }}
            >
              {t("religion.religion")}
            </label>
        </div>
        <div className={`${Styles.inputHolder} relative w-[100%] md:w-[35%] md1:w-[25%] lg2:w-[20%]`}>
          <select 
                  id="Doctrine"
                  value={searchParams.doctrine || ''}
                  onChange={handleInputChange}
                  name="doctrine"
                  aria-label={i18n.language === 'ar' ? 'المذهب' : 'Doctrine'}
                  className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    searchParams.doctrine ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                  } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-Black cursor-pointer`}
              >
                  <option value={""}>{i18n.language === 'ar' ? '-- لا يهم --' : 'Any'}</option>
                    {searchParams.religion === 'Islam' && (
                      <>
                        <option value={'Sunni'}>{i18n.language === 'ar' ? 'سني' : 'Sunni'}</option>
                        <option value={'Shia'}>{i18n.language === 'ar' ? 'شيعي' : 'Shia'}</option>
                      </>
                    )}
                    {searchParams.religion === 'Christianity' && (
                      <>
                        <option value={'Catholic'}>{i18n.language === 'ar' ? 'الكاثوليكية' : 'Catholic'}</option>
                        <option value={'Protestant'}>{i18n.language === 'ar' ? 'البروتستانتية' : 'Protestant'}</option>
                        <option value={'Orthodox'}>{i18n.language === 'ar' ? 'الأرثوذكسية' : 'Orthodox'}</option>
                      </>
                    )}
          </select>
          <label
              htmlFor="Doctrine"
              className={`inputLabel absolute top-[15px] ${
                isRTL ? "-right-2" : "-left-2"
              } text-Black transform -translate-y-2.5 px-1 myFont w-[100%] text-[19px] font-semibold`} style={{ top: '-12px' }}
            >
              {t("religion.doctrine")}
            </label>
        </div>

            <div className={`${Styles.inputHolder} relative w-[100%] md:w-[35%] md1:w-[25%] lg2:w-[20%]`}>
              <input
                id="MinAge"
                type="number"
                onChange={handleInputChange}
                name="minAge"
                placeholder= {i18n.language === 'ar' ? 'العمر من' : 'Age From'}
                value={searchParams.minAge}
                className={`myFont w-full py-2 px-3 border-b-[3px] ${
                  searchParams.minAge ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-Black cursor-text`}
              />
              <label
                htmlFor="MinAge"
                className={`inputLabel absolute top-[15px] ${
                  isRTL ? "-right-2" : "-left-2"
                } text-Black transform -translate-y-2.5 myFont text-lg w-[100%] -z-20`}
              >
                {i18n.language === 'ar' ? 'العمر من' : 'Age From'}
              </label>
          </div>
          <div className={`${Styles.inputHolder} relative w-[100%] md:w-[35%] md1:w-[25%] lg2:w-[20%]`}>
              <input
                id="MaxAge"
                type="number"
                onChange={handleInputChange}
                name="maxAge"
                placeholder= {i18n.language === 'ar' ? 'العمر من' : 'Age From'}
                value={searchParams.maxAge}
                className={`myFont w-full py-2 px-3 border-b-[3px] ${
                  searchParams.maxAge ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-Black cursor-text`}
              />
              <label
                htmlFor="MaxAge"
                className={`inputLabel absolute top-[15px] ${
                  isRTL ? "-right-2" : "-left-2"
                } text-Black transform -translate-y-2.5 myFont text-lg w-[100%] -z-20`}
              >
                {i18n.language === 'ar' ? 'العمر الى' : 'Age To'}
              </label>
          </div>

      </div>


      {
        false && <>
          {[...Array(5)].map((start, index) => {
            return <div key={index} className="h-5 rounded-full animate-pulse bg-Beige2 mb-6" />
          })}
        </>
      }
      <h1 className='text-3xl font-medium'>{i18n.language === 'ar' ? "ترتيب حسب" : "Sort By"}</h1>
      <div className='my-5 flex flex-wrap gap-5'>
        {sortTypeLabels.map((element, idx) => (
          <button key={idx} aria-label='sort type' onClick={() => { setSelectedIdx(idx);}} className={`rounded-full border-2 border-Black text-Black text-lg py-3 px-6 w-max ${selectedIdx === idx ? "bg-Black text-White" : ""} ${!isLogedIn && (idx === 1 || idx === 2) && "pointer-events-none opacity-50"}`}>
            {i18n.language === 'ar' ? element[0] : element[1]}
          </button>
        ))}
      </div>
      <div className='flex items-center justify-center w-full mt-16'>
        <button onClick={handleSearch} className='bg-DarkPink hover:bg-[#e84762] text-white text-xl font-semi-bol myFont text-center center py-4 px-5 rounded-full w-[100%] md4:w-[40%]'>
          {i18n.language === 'ar' ? "بحث" : "Search"}
        </button>
      </div>
    </div>
  )
}

const LoadingSpinner = () => {
  return (
    <div className="bg-white p-6 select-none relative min-h-[400px] border border-Black/20 max-w-[400px] w-[100%] md:w-[50%] md4:w-[35%] lg:w-[30%] rounded-2xl myFont overflow-hidden  mt-4 animate-pulse center">
      <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-DarkPink" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
    </div>
  )
}
