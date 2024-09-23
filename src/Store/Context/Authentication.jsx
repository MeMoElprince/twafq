import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthenticationContext = createContext();

export default function AuthenticationProvider({ children }) {
  const [Token, setToken] = useState(Cookies.get('token')); 
  const [isLogedIn, setIsLogedIn] = useState(!!Token);

  const [formData, setFormData] = useState({
    gender: ["", ""],
    id: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    age: 0,
    weight: 0,
    height: 0,
    skinColor: ["", ""],
    shape: ["", ""],
    health: ["انا بحالة جيدة", "I'm fine"],
    nationality: ["", ""],
    country: ["", "", ""],
    city: ["القاهرة", "Cairo"],
    residence: ["", ""],
    familyStatus: ["", ""],
    marriageType: ["", ""],
    children: 0,
    educationLevel: ["", ""],
    work: '',
    financialStatus: ["", ""],
    religion: ["", ""],
    doctrine: ["", ""],
    religiousCommitment: ["", ""],
    smoking: ["", ""],
    selfDescription: '',
    partnerDescription: '',
    isChecked: false,
    colorAnswers: []
  });

  const handleFormDataChange = (data) => {
    setFormData(data);
  };

  useEffect(() => {
    if (!isLogedIn) {
      Cookies.remove('token');
      // console.log("token deleted");
      setToken('');
      // Reset form data when logged out
      setFormData({
        gender: ["", ""],
        email: '',
        id: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
        age: 0,
        weight: 0,
        height: 0,
        skinColor: ["", ""],
        shape: ["", ""],
        health: ["انا بحالة جيدة", "I'm fine"],
        nationality: ["", ""],
        country: ["", "", ""],
        city: ["القاهرة", "Cairo"],
        residence: ["", ""],
        familyStatus: ["", ""],
        marriageType: ["", ""],
        children: 0,
        educationLevel: ["", ""],
        work: '',
        financialStatus: ["", ""],
        religion: ["", ""],
        doctrine: ["", ""],
        religiousCommitment: ["", ""],
        smoking: ["", ""],
        selfDescription: '',
        partnerDescription: '',
        isChecked: false,
        colorAnswers: []
      });
    } else {
      Cookies.set('token', Token, { expires: 7 });
    }
  }, [isLogedIn]);

  return (
    <AuthenticationContext.Provider value={{
      isLogedIn, setIsLogedIn,
      Token, setToken,
      formData, handleFormDataChange
    }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
