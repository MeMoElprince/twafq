import React, {useState, useEffect} from "react";
import { useLayoutDirection } from '../../../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"
import Styles from '../../Styling.module.css'
import Countires from '../../Components/Countires.json'

export default function Nationality({handleChange, formData, setFormData, errorMessage, setErrorMessage, handleStep}) {
  const { isRTL, setIsRTL } = useLayoutDirection();
	const { t, i18n } = useTranslation("global");

  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('EG');

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedCountry) {
        try {
          const response = await fetch(
            `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${selectedCountry}/places`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              data : {"query" : "QUERY"}
            }
          );

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          console.log(data); // Log the response data

          setCities(data || []); // Adjust based on actual response structure
        } catch (error) {
          console.error('There has been a problem with your fetch operation:', error);
        }
      }
    };

    fetchCities();
  }, [selectedCountry]);

  const handleCountryChange = (e) => {
    const countryCode = JSON.parse(e.target.value)[2];
    setSelectedCountry(countryCode);
    handleChange(e);
  };


  return (
    <>
      <h2 className="Title text-Black myFont text-[25px] font-semibold mb-6">
        {t("nationality.title")}
      </h2>
      <div className="Form center flex-col gap-10 w-[70%]">
        <div className={`${Styles.inputHolder} relative w-full`}>
          <select 
                  id="Nationality"
                  value={formData.nationality ? JSON.stringify(formData.nationality) : ''}
                  onChange={handleChange}
                  name="nationality"
                  aria-label={i18n.language == 'ar' ? 'الجنسية' : 'Nationality'}
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
        <div className={`${Styles.inputHolder} relative w-full`}>
          <select 
                  id="Country"
                  value={formData.country ? JSON.stringify(formData.country) : ''}
                  onChange={handleCountryChange}
                  name="country"
                  aria-label={i18n.language == 'ar' ? 'البلد' : 'country'}
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
        <div className={`${Styles.inputHolder} relative w-full`}>
          <select 
                  id="City"
                  value={formData.city ? JSON.stringify(formData.city) : ''}
                  onChange={handleChange}
                  name="city"
                  aria-label={i18n.language == 'ar' ? 'المدينة' : 'City'}
                  className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    formData.city ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                  } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
              >
                  <option value={JSON.stringify(["", ""])}>{i18n.language === 'ar' ? '-- اختر --' : '-- Choose --'}</option>
                  {cities.map((city) => (
                      <option 
                          key={country.code} 
                          value={JSON.stringify(['', ''])}
                      >
                          {i18n.language === 'ar' ? city : city}
                      </option>
                  ))}
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
        <div className={`${Styles.inputHolder} relative w-full`}>
          <select 
                  id="Residence"
                  value={formData.residence ? JSON.stringify(formData.residence) : ''}
                  onChange={handleChange}
                  name="residence"
                  aria-label={i18n.language == 'ar' ? 'الإقامة' : 'Residence'}
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
        
        {/* <div className={`${Styles.forgotPassword} self-end mt-[-15px]`}>
                    <button onClick={() => { setType('forgotpassword') }} type='button' className={`${Styles.clickableButton}`}><p className='myFont text-[18px] opacity-80 cursor-pointer font-medium'>نسيت كلمة السر</p></button>
                </div> */}
        <div className="w-full center gap-4">
        <button
              onClick={() => handleStep(-1)}
              className={`${
                Styles.loginBtnAnimate
              } bg-none border border-Black myFont text-Black text-[18px] sm2:text-[22px]  w-[100%] py-[14px] rounded-full
                      relative overflow-hidden inline-block z-10
                      transition-all duration-300 ease-in-out
                      focus:outline-none
                      before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:-z-10
                      before:rounded-inherit before:bg-[#b5b5b5] before:bg-opacity-40 
                      before:transition-all before:duration-300 before:ease-in-out
                      hover:before:left-0
                      `}
            >
              {t("personalInfo.prev")}
            </button>
            <button
              onClick={() => handleStep(1)}
              className={`${
                Styles.loginBtnAnimate
              } bg-Black myFont text-White text-[18px] sm2:text-[22px] w-[100%] py-[14px] rounded-full
                      relative overflow-hidden inline-block z-10
                      transition-all duration-300 ease-in-out
                      focus:outline-none
                      before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:-z-10
                      before:rounded-inherit before:bg-[#505050] before:bg-opacity-40 
                      before:transition-all before:duration-300 before:ease-in-out
                      
                      hover:before:left-0
                      
                      `}
            >
              {t("personalInfo.next")}
            </button>
        </div>
        <p className="text-red-700 font-bold -mb-5 -mt-5">{errorMessage}</p>
      </div>
    </>
  );
}
