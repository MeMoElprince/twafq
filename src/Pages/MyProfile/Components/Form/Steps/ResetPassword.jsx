// import React from "react";
// import { useLayoutDirection } from '../../../../../Store/Context/LayoutDirectionContext'
// import {useTranslation} from "react-i18next"
// import Styles from '../../../Styling.module.css'

// export default function ResetPassword({handlePasswordChange, passwordData, setpasswordData, errorMessage, setErrorMessage, handleStep}) {
//     const { isRTL, setIsRTL } = useLayoutDirection();
// 	const { t, i18n } = useTranslation("global");
//   return (
//     <>
//       <h2 className="Title text-Black myFont text-[25px] font-semibold mb-12">
//         {i18n.language === 'ar' ? "تغيير كلمة السر" : "Change Password"}
//       </h2>
//       <div className="Form center flex-col gap-12 w-[70%]">
//         <div className={`${Styles.inputHolder} relative w-full`}>
//             <input
//               id="OldPassword"
//               type="password"
//               onChange={handlePasswordChange}
//               name="oldPassword"
//               value={passwordData.oldPassword}
//               placeholder="Old Password"
//               className={`myFont w-full py-2 px-3 border-b-[3px] ${
//                 passwordData.oldPassword ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
//               } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-text`}
//               style={{
//                 fontFamily: "Verdana",
//                 letterSpacing: "0.125em",
//               }}
//             />
//             <label
//               htmlFor="OldPassword"
//               className={`inputLabel absolute top-[15px] ${
//                   isRTL ? "-right-2" : "-left-2"
//                 } text-Black transform -translate-y-2.5 myFont text-lg w-[100%] -z-20`}
//             >
//               {i18n.language === 'ar' ? "كلمة المرور القديمة" : "Old Password"}
//             </label>
//           </div>
//         <div className={`${Styles.inputHolder} relative w-full`}>
//             <input
//               id="NewPassword"
//               type="password"
//               onChange={handlePasswordChange}
//               name="newPassword"
//               value={passwordData.newPassword}
//               placeholder="New Password"
//               className={`myFont w-full py-2 px-3 border-b-[3px] ${
//                 passwordData.newPassword ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
//               } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-text`}
//               style={{
//                 fontFamily: "Verdana",
//                 letterSpacing: "0.125em",
//               }}
//             />
//             <label
//               htmlFor="NewPassword"
//               className={`inputLabel absolute top-[15px] ${
//                   isRTL ? "-right-2" : "-left-2"
//                 } text-Black transform -translate-y-2.5 myFont text-lg w-[100%] -z-20`}
//             >
//               {i18n.language === 'ar' ? "كلمة المرور الجديدة" : "New Password"}
//             </label>
//           </div>
//         <div className={`${Styles.inputHolder} relative w-full`}>
//             <input
//               id="ConfirmPassword"
//               type="password"
//               onChange={handlePasswordChange}
//               name="confirmPassword"
//               value={passwordData.confirmPassword}
//               placeholder="Confirm Password"
//               className={`myFont w-full py-2 px-3 border-b-[3px] ${
//                 passwordData.confirmPassword ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
//               } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-text`}
//               style={{
//                 fontFamily: "Verdana",
//                 letterSpacing: "0.125em",
//               }}
//             />
//             <label
//               htmlFor="ConfirmPassword"
//               className={`inputLabel absolute top-[15px] ${
//                   isRTL ? "-right-2" : "-left-2"
//                 } text-Black transform -translate-y-2.5 myFont text-lg w-[100%] -z-20`}
//             >
//               {i18n.language === 'ar' ? "تأكيد كلمة المرور" : "Confirm Password"}
//             </label>
//           </div>
        
//         {/* <div className={`${Styles.forgotPassword} self-end mt-[-15px]`}>
//                     <button onClick={() => { setType('forgotpassword') }} type='button' className={`${Styles.clickableButton}`}><p className='myFont text-[18px] opacity-80 cursor-pointer font-medium'>نسيت كلمة السر</p></button>
//                 </div> */}
//         <p className="text-red-700 font-bold -mb-5 -mt-5">{errorMessage}</p>
//       </div>
//     </>
//   );
// }
