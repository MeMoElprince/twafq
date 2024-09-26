import { useState, useEffect, useContext } from "react";
import Fetch from "../../../../Components/CustomHooks/Fetch";
import { updateInfoURL } from "../../../../Store/urls";
import { Link, useNavigate } from "react-router-dom";
import Styles from "../../Styling.module.css";
import { AuthenticationContext } from "../../../../Store/Context/Authentication";
import PersonalInfo from "./Steps/PersonalInfo";
import Nationality from "./Steps/Nationality";
import FamilyStatus from "./Steps/FamilyStatus";
import Education from "./Steps/Education";
import Religion from "./Steps/Religion";
import Description from "./Steps/Description";
import { useTranslation } from "react-i18next";
import { handleGeneral } from "../ErrorHandling";
import Swal from "sweetalert2";

export default function Form({ editActive, setEditActive, oldFormData }) {
  const { isLogedIn, Token } = useContext(AuthenticationContext);
  if (!isLogedIn) return;
  const { i18n } = useTranslation("global");
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const Navigate = useNavigate();
  const stepLabels = [
    ["البيانات الشخصية", "Personal Information"],
    ["الجنسية", "Nationality"],
    ["الدين", "Religion"],
    ["الحالة العائلية", "Family Status"],
    ["التعليم", "Education"],
    ["الوصف", "Description"],
    // ["كلمة المرور", "Password"],
  ];
  const [formData, setFormData] = useState(oldFormData);
  //   const [passwordData, setPasswordData] = useState({
  //     oldPassword: "",
  //     newPassword: "",
  //     confirmPassword: "",
  //   });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    const isMultiValue = [
      "skinColor",
      "shape",
      "health",
      "nationality",
      "country",
      "city",
      "residence",
      "familyStatus",
      "marriageType",
      "gender",
      "smoking",
      "religiousCommitment",
      "doctrine",
      "religion",
      "alcoholDrgus",
      "educationLevel",
      "financialStatus",
    ].includes(name);

    setFormData((prevFormData) => {
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
        [name]: newValue,
      };
    });
  }

  //   function handlePasswordChange(event) {
  //     const { name, value, type, checked, dataset } = event.target;
  //     setPasswordData((prevPasswordData) => {
  //       return {
  //         ...prevPasswordData,
  //         [name]: value,
  //       };
  //     });
  //     // console.log(passwordData);
  //   }

  function handleSubmit(e) {
    Swal.fire({
      title: i18n.language ? "تعديل البيانات الشخصية" : "Edit personal Information",
      text: i18n.language
        ? "هل أنت متأكد أنك تريد تعديل بياناتك"
        : "Are you sure you want to edit your information?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      iconColor: "#E84762",
      cancelButtonColor: "#d33",
      confirmButtonText: i18n.language ? "نعم, تعديل البيانات" : "Yes, Edit Information",
      cancelButtonText: i18n.language ? "إلغاء" : "Cancel",
      scrollbarPadding: false,
    }).then((result) => {
      if (result.isConfirmed && Token) {
        e.preventDefault();
        if (loading) return;

        setErrorMessage([]);
        const generalErrors = handleGeneral(formData);

        if (generalErrors.length === 0 && formData !== oldFormData) {
          Fetch({
            url: `${updateInfoURL()}user_id=${oldFormData.id}`,
            setLoading,
            Token,
            method: "PUT",
            body: formData,
          });
          window.location.reload();
        } else {
          setErrorMessage(generalErrors);
          if (formData === oldFormData) {
            setErrorMessage((prev) => {
              let holder = [...prev];
              holder.push([
                "لا يوجد تغيير بالبيانات",
                "There is no difference in your data",
              ]);
              return holder;
            });
          }
        }
      }
    });
  }

  // useEffect(() => {
  // 	if (!data) return
  // 	if (data.statusCode === '200') {
  // 		Navigate('/login');
  // 	}
  // }, [data])

  // useEffect(() => {
  // 	if (isLogedIn) {
  // 		Navigate('/')
  // 		window.location.reload();
  // 	}
  // }, [isLogedIn])

  function StepChoose({ word, isSelected }) {
    return (
      <div
        className={`text-White text-lg border-2 ${
          isSelected
            ? "bg-DarkPink/60 border-DarkPink font-medium"
            : "bg-Black/15 backdrop-blur-md hover:bg-DarkPink/30 hover:border-DarkPink/30"
        } py-2 px-4 rounded-full`}
      >
        {word}
      </div>
    );
  }

  function LoadingSpinner() {
    return (
      <div className="center">
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-gray-200 animate-spin fill-DarkPink"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 z-20 bg-none">
      <section
        className={`${Styles.formContainer} h-[calc(220vh+9rem)] relative min-h-screen w-screen bg-none z-10 flex flex-col content-center items-center py-40 overflow-hidden`}
      >
        <div className="center w-[90%] z-20 gap-4 flex-wrap">
          {stepLabels.map((element, idx) => {
            return (
              <button
                key={idx}
                onClick={() => setStep(idx)}
                aria-label={i18n.language ? "تغيير الخطوة" : "Change Step"}
                className="cursor-pointer"
              >
                <StepChoose
                  word={`${i18n.language === "ar" ? element[0] : element[1]}`}
                  isSelected={step === idx}
                />
              </button>
            );
          })}
        </div>
        <div
          className={`${Styles.exactForm} ${
            step === 7 ? Styles.step7 : Styles.notstep7
          }  relative border-Black/5 shadow-lg mt-20 border-2 py-8 min-h-[6%]  transition-all duration-300 rounded-2xl center flex-col gap-8`}
        >
          {step === 0 && (
            <PersonalInfo
              handleChange={handleChange}
              formData={formData}
              setFormData={setFormData}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          )}
          {step === 1 && (
            <Nationality
              handleChange={handleChange}
              formData={formData}
              setFormData={setFormData}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          )}
          {step === 2 && (
            <Religion
              handleChange={handleChange}
              formData={formData}
              setFormData={setFormData}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          )}
          {step === 3 && (
            <FamilyStatus
              handleChange={handleChange}
              formData={formData}
              setFormData={setFormData}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          )}
          {step === 4 && (
            <Education
              handleChange={handleChange}
              formData={formData}
              setFormData={setFormData}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          )}
          {step === 5 && (
            <Description
              handleChange={handleChange}
              formData={formData}
              setFormData={setFormData}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          )}
          {/* {step === 6 && (
            <ResetPassword
              handlePasswordChange={handlePasswordChange}
              passwordData={passwordData}
              setPasswordData={setPasswordData}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          )} */}
          <div className="center gap-4 w-[73%] flex-col-reverse sm:flex-row py-6">
            <button
              onClick={() => setEditActive(0)}
              className={`${Styles.loginBtnAnimate} bg-none border border-Black myFont text-Black text-[18px] sm2:text-[22px]  w-[100%] py-[14px] rounded-full
									relative overflow-hidden inline-block z-10
									transition-all duration-300 ease-in-out
									focus:outline-none
									before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:-z-10
									before:rounded-inherit before:bg-[#b5b5b5] before:bg-opacity-40 
									before:transition-all before:duration-300 before:ease-in-out
									hover:before:left-0
									`}
            >
              {i18n.language === "ar" ? "إلغاء" : "Cancel"}
            </button>
            <button
              onClick={handleSubmit}
              className={`${Styles.loginBtnAnimate} bg-Black myFont text-White text-[18px] sm2:text-[22px] w-[100%] py-[14px] rounded-full
									relative overflow-hidden inline-block z-10
									transition-all duration-300 ease-in-out
									focus:outline-none
									before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:-z-10
									before:rounded-inherit before:bg-[#505050] before:bg-opacity-40 
									before:transition-all before:duration-300 before:ease-in-out
									
									hover:before:left-0
									
									`}
            >
              {!loading && (i18n.language === "ar" ? "حفظ" : "Save")}
              {loading && <LoadingSpinner />}
            </button>
          </div>
          {errorMessage.length !== 0 && (
            <div className="bg-red-200/90 w-[70%] -mb-3 -mt-3 rounded-sm px-4 py-4 flex flex-col gap-3">
              <ul className="list-disc list-inside">
                {errorMessage.map((msg, index) => (
                  <li
                    key={index}
                    className="text-red-700 font-semibold text-sm sm:text-base py-[6px]"
                    style={{ color: "#B91C1C" /* red-700 color */ }}
                  >
                    {msg[i18n.language === "ar" ? 0 : 1]}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
