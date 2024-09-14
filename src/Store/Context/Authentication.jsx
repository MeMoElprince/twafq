import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthenticationContext = createContext();

export default function AuthenticationProvider({ children }) {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [Token, setToken] = useState(Cookies.get('token'));
  
  const [gender, setGender] = useState(["", ""]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [skinColor, setSkinColor] = useState(["", ""]);
  const [shape, setShape] = useState(["", ""]);
  const [health, setHealth] = useState(["", ""]);
  const [nationality, setNationality] = useState(["", ""]);
  const [country, setCountry] = useState(["", "", ""]);
  const [city, setCity] = useState(["", ""]);
  const [residence, setResidence] = useState(["", ""]);
  const [familyStatus, setFamilyStatus] = useState(["", ""]);
  const [marriageType, setMarriageType] = useState(["", ""]);
  const [childreen, setChildreen] = useState('');
  const [educationLevel, setEducationLevel] = useState(["", ""]);
  const [work, setWork] = useState('');
  const [financialStatus, setFinancialStatus] = useState(["", ""]);
  const [religion, setReligion] = useState(["", ""]);
  const [doctrine, setDoctrine] = useState(["", ""]);
  const [religiousCommitment, setReligiousCommitment] = useState(["", ""]);
  const [smoking, setSmoking] = useState(["", ""]);
  const [selfDescription, setSelfDescription] = useState('');
  const [partnerDescription, setPartnerDescription] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [colorAnswers, setColorAnswers] = useState([]);

  useEffect(() => {
    if (!isLogedIn) {
      Cookies.remove('token');
      console.log("token deleted");
      setToken('');
      // Reset all fields when logged out
      setGender(["", ""]);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setFirstName('');
      setLastName('');
      setPhone('');
      setAge('');
      setWeight('');
      setHeight('');
      setSkinColor(["", ""]);
      setShape(["", ""]);
      setHealth(["", ""]);
      setNationality(["", ""]);
      setCountry(["", "", ""]);
      setCity(["", ""]);
      setResidence(["", ""]);
      setFamilyStatus(["", ""]);
      setMarriageType(["", ""]);
      setChildreen('');
      setEducationLevel(["", ""]);
      setWork('');
      setFinancialStatus(["", ""]);
      setReligion(["", ""]);
      setDoctrine(["", ""]);
      setReligiousCommitment(["", ""]);
      setSmoking(["", ""]);
      setSelfDescription('');
      setPartnerDescription('');
      setIsChecked(false);
      setColorAnswers([]);
    } else {
      Cookies.set('token', Token, { expires: 7 });
      localStorage.setItem('token', Token);
    }
  }, [isLogedIn]);

  return (
    <AuthenticationContext.Provider value={{
      isLogedIn, setIsLogedIn,
      Token, setToken,
      gender, setGender,
      email, setEmail,
      password, setPassword,
      confirmPassword, setConfirmPassword,
      firstName, setFirstName,
      lastName, setLastName,
      phone, setPhone,
      age, setAge,
      weight, setWeight,
      height, setHeight,
      skinColor, setSkinColor,
      shape, setShape,
      health, setHealth,
      nationality, setNationality,
      country, setCountry,
      city, setCity,
      residence, setResidence,
      familyStatus, setFamilyStatus,
      marriageType, setMarriageType,
      childreen, setChildreen,
      educationLevel, setEducationLevel,
      work, setWork,
      financialStatus, setFinancialStatus,
      religion, setReligion,
      doctrine, setDoctrine,
      religiousCommitment, setReligiousCommitment,
      smoking, setSmoking,
      selfDescription, setSelfDescription,
      partnerDescription, setPartnerDescription,
      isChecked, setIsChecked,
      colorAnswers, setColorAnswers
    }}>
      {children}
    </AuthenticationContext.Provider>
  )
}
