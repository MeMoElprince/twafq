import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import DetailsCard from './Components/DetailsCard'
import Card from './Components/Card';
import Selected from './assets/Selected.png'
import ReactSlider from 'react-slider'
import Spinner from '../../Components/Ui-Components/Spinner'
import { useNavigate } from 'react-router-dom'
import { useLayoutDirection } from '../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"
import Countires from "../SignUp/Components/Countires.json"
import Styles from './Styling.module.css'
import { getAllUsers } from '../../Store/urls';

export default function SearchPage({ usersUrl, setUsersUrl, loadingUsers, setLoadingUsers, usersS, setUsersS }) {
  const { isRTL, setIsRTL } = useLayoutDirection();
	const { t, i18n } = useTranslation("global");

  console.log(loadingUsers);
  
  return (
    <div className={`z[5] min-h-screen flex flex-col justify-center items-center md:justify-between gap-y-20 mainPadding mt-[20vh] mb-[20vh]`}>
      <div className={`${Styles.exactForm} bg-LighterPink/50 border-2 border-Black/20 shadow-xl rounded-2xl w-full px-8 sm:px-12 py-8 sm:py-12 z-10`}>
        <Fillters usersUrl={usersUrl} setUsersUrl={setUsersUrl} loadingUsers={loadingUsers} setLoadingUsers={setLoadingUsers} usersS={usersS} setUsersS={setUsersS} isRTL={isRTL} i18n={i18n} t={t} />
      </div>
      <div className='gap-12 flex flex-grow w-full flex-wrap px-12'>
        {
          !loadingUsers && usersS && usersS?.data?.userCards?.length > 0 && usersS?.data?.userCards.map((el, index) => (
             <Card userDetails={el} key={index}/> 
          ))
        }
        {
          !loadingUsers && usersS && !usersS?.data?.userCards?.length && <div className='w-full center'>
            <p className='text-2xl'>No Users Found</p>
          </div>
        }
        {
          loadingUsers && <>
            {[...Array(10)].map((start, index) => {
              return <LoadingSpinner key={index} />
            })}
          </>
        }
      </div>
    </div>
  )
}


const Fillters = ({ usersUrl, setUsersUrl, loadingUsers, setLoadingUsers, usersS, setUsersS, isRTL, i18n, t }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const sortTypeLabels = [
    ['اعلى نسبة توافق', 'Highest Compatibility'],
    ['اقل نسبة توافق', 'Lowest Compatibility'],
    ['النشاط الاحدث', 'Most Recent Activity'],
    ['الاصغر في السن', 'Youngest'],
    ['الاكبر في السن', 'Oldest'],
    ['اعلى مستوى تعليمي', 'Highest Education Level'],
  ];
  
  // State for the form fields
  const [formData, setFormData] = useState({
    gender: ["", ""],
    ageFrom: 18,
    ageTo: 100,
    nationality: ["", ""],
    country: ["", "", ""],
    city: ["", ""],
    residence: ["", ""],
    familyStatus: ["", ""],
    marriageType: ["", ""],
    religion: ["", ""],
    doctrine: ["", ""],
    sortType: sortTypeLabels[0],
  });
  
  const [searchParams, setSearchParams] = useState(null);
  
  function handleInputChange(event) {
    const { name, value, type, checked, dataset } = event.target;
  
    const isMultiValue = ['skinColor', 'shape', 'health', 'nationality', 'country', 'city', 'residence',
      'familyStatus', 'marriageType', 'gender', 'smoking', 'religiousCommitment', 'doctrine', 'religion',
      'alcoholDrgus', 'educationLevel', 'financialStatus'
    ].includes(name);
  
    setFormData(prevFormData => {
      let newValue;
      if (type === "checkbox") {
        newValue = checked;
      } else if (isMultiValue) {
        const valueHolder = JSON.parse(value);
        newValue = valueHolder;
      } else {
        newValue = value;
      }
      return {
        ...prevFormData,
        [name]: newValue
      };
    });
  }

  useEffect(() => {
    const params = {
      gender: formData.gender[1],
      age_from: formData.ageFrom,
      age_to: formData.ageTo,
      nationality: formData.nationality[1],
      country: formData.country[1],
      city: formData.city[1], 
      residence: formData.residence[1],
      family_status: formData.familyStatus[1],
      marriage_type: formData.marriageType[1],
      religion: formData.religion[1],
      doctrine: formData.doctrine[1],
      sort: sortTypeLabels[selectedIdx][1],
    };
  
    const validParams = Object.entries(params)
      .filter(([_, value]) => value)
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
  
    setSearchParams(validParams);
  }, [formData]);
  
  
  function handleSearch() {
    // console.log(searchParams);
    const queryString = new URLSearchParams(searchParams).toString();
    setUsersUrl(`${getAllUsers()}${queryString}`);
    // console.log(queryString);
  }

  return (
    <div className='relative myFont'>
      {false && <div className='w-full h-full absolute top-0 left-0 z-[3] cursor-wait bg-Beige/50' />}
      <h1 className='text-3xl font-medium'>{i18n.language === 'ar' ? "تصفية" : "Filter"}</h1>
      <div className='gap-8 p-8 py-10 gap-x-12 flex flex-row justify-center items-center flex-wrap'>

      <div className={`${Styles.inputHolder} relative w-[100%] md:w-[35%] md1:w-[25%] lg2:w-[20%]`}>
          <select 
                  id="Gender"
                  value={formData.gender ? JSON.stringify(formData.gender) : ''}
                  onChange={handleInputChange}
                  name="gender"
                  aria-label={i18n.language === 'ar' ? 'الحالة العائلية' : 'Family Status'}
                  className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    formData.gender ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                  } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
              >
                  <option value={JSON.stringify(["", ""])}>{i18n.language === 'ar' ? '-- اختر --' : '-- Choose --'}</option>
                  <option value={JSON.stringify(['ذكر', 'Male'])}>{i18n.language === 'ar' ? 'ذكر' : 'Male'}</option>
                  <option value={JSON.stringify(['أنثى', 'Female'])}>{i18n.language === 'ar' ? 'أنثى' : 'Female'}</option>
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
                  value={formData.country ? JSON.stringify(formData.country) : ''}
                  onChange={handleInputChange}
                  name="country"
                  aria-label={i18n.language === 'ar' ? 'البلد' : 'country'}
                  className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    formData.country ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                  } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
              >
                    <option value={JSON.stringify(["", "", ""])}>{i18n.language === 'ar' ? '-- اختر --' : '-- Choose --'}</option>
                    {Countires.map((country) => (
                        <option 
                            key={country.code} 
                            value={JSON.stringify([country.country_ar, country.country_en, country.code])}
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
        <div className={`${Styles.inputHolder} relative w-[100%] md:w-[35%] md1:w-[25%] lg2:w-[20%]`}>
          <select 
                  id="City"
                  value={formData.city ? JSON.stringify(formData.city) : ''}
                  onChange={handleInputChange}
                  name="city"
                  aria-label={i18n.language === 'ar' ? 'المدينة' : 'City'}
                  className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    formData.city ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                  } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
              >
                  <option value={JSON.stringify(["", ""])}>{i18n.language === 'ar' ? '-- اختر --' : '-- Choose --'}</option>
                  
          </select>
          <label
              htmlFor="City"
              className={`inputLabel absolute top-[15px] ${
                isRTL ? "-right-2" : "-left-2"
              } text-Black transform -translate-y-2.5 px-1 myFont w-[100%] text-[19px] font-semibold`} style={{ top: '-12px' }}
            >
              {t("nationality.city")}
            </label>
        </div>
        <div className={`${Styles.inputHolder} relative w-[100%] md:w-[35%] md1:w-[25%] lg2:w-[20%]`}>
          <select 
                  id="Nationality"
                  value={formData.nationality ? JSON.stringify(formData.nationality) : ''}
                  onChange={handleInputChange}
                  name="nationality"
                  aria-label={i18n.language === 'ar' ? 'الجنسية' : 'Nationality'}
                  className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    formData.nationality ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                  } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
              >
                  <option value={JSON.stringify(["", ""])}>{i18n.language === 'ar' ? '-- اختر --' : '-- Choose --'}</option>
                    {Countires.map((country) => (
                        <option 
                            key={country.code} 
                            value={JSON.stringify([country.natianality_ar, country.nationality_en])}
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
                  id="Residence"
                  value={formData.residence ? JSON.stringify(formData.residence) : ''}
                  onChange={handleInputChange}
                  name="residence"
                  aria-label={i18n.language === 'ar' ? 'الإقامة' : 'Residence'}
                  className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    formData.residence ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                  } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
              >
                  <option value={JSON.stringify(["", ""])}>{i18n.language === 'ar' ? '-- اختر --' : '-- Choose --'}</option>
                  {Countires.map((country) => (
                      <option 
                          key={country.code} 
                          value={JSON.stringify([country.country_ar, country.country_en])}
                      >
                          {i18n.language === 'ar' ? country.country_ar : country.country_en}
                      </option>
                  ))}
          </select>
          <label
              htmlFor="Residence"
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
                  value={formData.familyStatus ? JSON.stringify(formData.familyStatus) : ''}
                  onChange={handleInputChange}
                  name="familyStatus"
                  aria-label={i18n.language === 'ar' ? 'الحالة العائلية' : 'Family Status'}
                  className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    formData.familyStatus ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                  } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
              >
                  <option value={JSON.stringify(["", ""])}>{i18n.language === 'ar' ? '-- اختر --' : '-- Choose --'}</option>
                  {
                    formData.gender[1] &&
                    (
                      <>
                        <option value={JSON.stringify([formData.gender[1] === 'Male' ? 'أعزب' : 'آنسة', 'Single'])}>{i18n.language === 'ar' ? formData.gender[1] === 'Male' ? 'أعزب' : 'آنسة' : 'Single'}</option>
                        {formData.gender[1] === 'Male' && <option value={JSON.stringify(['متزوج', 'Married'])}>{i18n.language === 'ar' ? 'متزوج' : 'Married'}</option>}
                        <option value={JSON.stringify([formData.gender[1] === 'Male' ? 'مطلق' : 'مطلقة', 'Divorced'])}>{i18n.language === 'ar' ? formData.gender[1] === 'Male' ? 'مطلق' : 'مطلقة' : 'Divorced'}</option>
                        <option value={JSON.stringify([formData.gender[1] === 'Male' ? 'أرمل' : 'أرملة', 'Widowed'])}>{i18n.language === 'ar' ? formData.gender[1] === 'Male' ? 'أرمل' : 'أرملة' : 'Widowed'}</option>
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
                  value={formData.marriageType ? JSON.stringify(formData.marriageType) : ''}
                  onChange={handleInputChange}
                  name="marriageType"
                  aria-label={i18n.language === 'ar' ? 'نوع الزواج' : 'Marriage Type'}
                  className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    formData.marriageType ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                  } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
              >
                  <option value={JSON.stringify(["", ""])}>{i18n.language === 'ar' ? '-- اختر --' : '-- Choose --'}</option>
                  {formData.gender[1] === 'Male' ? (
                    <>
                      <option value={JSON.stringify(['الزوجة الأولى', 'First Wife'])}>
                        {i18n.language === 'ar' ? 'الزوجة الأولى' : 'First Wife'}
                      </option>
                      <option value={JSON.stringify(['الزوجة الثانية', 'Second Wife'])}>
                        {i18n.language === 'ar' ? 'الزوجة الثانية' : 'Second Wife'}
                      </option>
                      <option value={JSON.stringify(['الزوجة الثالثة', 'Third Wife'])}>
                        {i18n.language === 'ar' ? 'الزوجة الثالثة' : 'Third Wife'}
                      </option>
                      <option value={JSON.stringify(['الزوجة الرابعة', 'Fourth Wife'])}>
                        {i18n.language === 'ar' ? 'الزوجة الرابعة' : 'Fourth Wife'}
                      </option>
                    </>
                  ) : formData.gender[1] === 'Female' && (
                    <>
                      <option value={JSON.stringify(['لا اقبل تعدد الزوجات', 'I don\'t accept polygamy'])}>
                        {i18n.language === 'ar' ? 'لا اقبل تعدد الزوجات' : "I don't accept polygamy"}
                      </option>
                      <option value={JSON.stringify(['اقبل تعدد الزوجات', 'I accept polygamy'])}>
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
                  value={formData.religion ? JSON.stringify(formData.religion) : ''}
                  onChange={handleInputChange}
                  name="religion"
                  aria-label={i18n.language === 'ar' ? 'الديانة' : 'Religion'}
                  className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    formData.religion ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                  } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
              >
              <option value={JSON.stringify(["", ""])}>{i18n.language === 'ar' ? '-- اختر --' : '-- Choose --'}</option>
              <option value={JSON.stringify(['الإسلام', 'Islam'])}>{i18n.language === 'ar' ? 'الإسلام' : 'Islam'}</option>
              <option value={JSON.stringify(['المسيحية', 'Christianity'])}>{i18n.language === 'ar' ? 'المسيحية' : 'Christianity'}</option>
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
                  value={formData.doctrine ? JSON.stringify(formData.doctrine) : ''}
                  onChange={handleInputChange}
                  name="doctrine"
                  aria-label={i18n.language === 'ar' ? 'المذهب' : 'Doctrine'}
                  className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    formData.doctrine ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                  } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
              >
                  <option value={JSON.stringify(["", ""])}>{i18n.language === 'ar' ? '-- اختر --' : '-- Choose --'}</option>
                    {formData.religion[0] === 'الإسلام' && (
                      <>
                        <option value={JSON.stringify(['سني', 'Sunni'])}>{i18n.language === 'ar' ? 'سني' : 'Sunni'}</option>
                        <option value={JSON.stringify(['شيعي', 'Shia'])}>{i18n.language === 'ar' ? 'شيعي' : 'Shia'}</option>
                      </>
                    )}
                    {formData.religion[0] === 'المسيحية' && (
                      <>
                        <option value={JSON.stringify(['الكاثوليكية', 'Catholic'])}>{i18n.language === 'ar' ? 'الكاثوليكية' : 'Catholic'}</option>
                        <option value={JSON.stringify(['البروتستانتية', 'Protestant'])}>{i18n.language === 'ar' ? 'البروتستانتية' : 'Protestant'}</option>
                        <option value={JSON.stringify(['الأرثوذكسية', 'Orthodox'])}>{i18n.language === 'ar' ? 'الأرثوذكسية' : 'Orthodox'}</option>
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
                id="AgeFrom"
                type="text"
                onChange={handleInputChange}
                name="ageFrom"
                placeholder= {i18n.language === 'ar' ? 'العمر من' : 'Age From'}
                value={formData.ageFrom}
                min={18}
                max={formData.ageTo}
                className={`myFont w-full py-2 px-3 border-b-[3px] ${
                  formData.ageFrom ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-text`}
              />
              <label
                htmlFor="AgeFrom"
                className={`inputLabel absolute top-[15px] ${
                  isRTL ? "-right-2" : "-left-2"
                } text-Black transform -translate-y-2.5 myFont text-lg w-[100%] -z-20`}
              >
                {i18n.language === 'ar' ? 'العمر من' : 'Age From'}
              </label>
          </div>
          <div className={`${Styles.inputHolder} relative w-[100%] md:w-[35%] md1:w-[25%] lg2:w-[20%]`}>
              <input
                id="AgeTo"
                type="text"
                onChange={handleInputChange}
                name="ageTo"
                placeholder= {i18n.language === 'ar' ? 'العمر من' : 'Age From'}
                value={formData.ageTo}
                min={formData.ageFrom}
                max={100}
                className={`myFont w-full py-2 px-3 border-b-[3px] ${
                  formData.ageTo ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-text`}
              />
              <label
                htmlFor="AgeTo"
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
          <button key={idx} onClick={() => { setSelectedIdx(idx); formData.sort = sortTypeLabels[idx]; }} className={`rounded-full border-2 border-Black text-Black text-lg py-3 px-6 w-max ${selectedIdx === idx ? "bg-Black text-White" : ""}`}>
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
    <div className="bg-white p-6 select-none relative min-h-[400px] border border-Black/20 w-[290px] rounded-2xl myFont overflow-hidden mx-auto mt-4 animate-pulse center">
      <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
    </div>
  )
}
