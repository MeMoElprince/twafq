import { useState, useEffect, useContext } from "react";
import Spinner from "../../../Components/Ui-Components/Spinner";
import useFetch from "../../../Components/CustomHooks/useFetch";
import Fetch from "../../../Components/CustomHooks/Fetch";
import { getCountries, getMyDefaultAddress, addNewAddress, updateAddress } from "../../../Store/urls";
import { AuthenticationContext } from "../../../Store/Context/Authentication";

export default function CartLocationPart() {
  const [myCountry, setMyCountry] = useState('')
  const [myCity, setMyCity] = useState('')
  const [myAddress, setMyAddress] = useState('')
  const [myStreatName, setMyStreatName] = useState('')
  const [myPostalCode, setMyPostalCode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [Type, setType] = useState({ type: 'addNewAddress' })
  const { Token } = useContext(AuthenticationContext)
  const [data, setData] = useState(null)

  const [Loading, setLoading] = useState(true);
  const { data: AllCountries, loading: firstLoading } = useFetch({
    url: getCountries(),
    method: 'GET',
  })
  const { data: myDefaultAddress, loading: secondLoading } = useFetch({
    url: getMyDefaultAddress(),
    method: 'GET',
    Token
  })
  const Submit = (e) => {
    e.preventDefault();
    if (!myCountry || !myCity || !myAddress || !myStreatName || !myPostalCode) {
      return setErrorMessage('Please fill all the fields')
    }
    if (Type.type === 'addNewAddress') {
      Fetch({
        url: addNewAddress(),
        method: 'POST',
        Token,
        body: {
          country_id: myCountry,
          city: myCity,
          description: myAddress,
          street_name: myStreatName,
          postal_code: myPostalCode,
          is_default: 1
        },
        setData,
        setLoading,
        setErrorMessage
      })
    }
    if (Type.type === 'updateAddress') {
      Fetch({
        url: updateAddress(Type.id),
        method: 'PATCH',
        Token,
        body: {
          country_id: myCountry,
          city: myCity,
          description: myAddress,
          street_name: myStreatName,
          postal_code: myPostalCode,
          is_default: 1
        },
        setData,
        setLoading,
        setErrorMessage
      })
    }
  }
  useEffect(() => {
    setLoading(firstLoading)
  }, [firstLoading])
  useEffect(() => {
    console.log(Loading);
  }, [Loading])
  useEffect(() => {
    setLoading(secondLoading)
  }, [secondLoading])
  useEffect(() => {
    if (myDefaultAddress && myDefaultAddress?.status === 'success') {
      setMyCountry(myDefaultAddress?.data.address.country_id)
      setMyCity(myDefaultAddress?.data.address.city)
      setMyAddress(myDefaultAddress?.data.address.description)
      setMyStreatName(myDefaultAddress?.data.address.street_name)
      setMyPostalCode(myDefaultAddress?.data.address.postal_code)
      setType({
        type: 'updateAddress',
        id: myDefaultAddress.data.address.id
      })
    }
  }, [myDefaultAddress])
  return (
    <div className="Fredoka relative w-[85%] min-h-[140px] max-h-[80%] bg-[rgb(36,36,36)] rounded-3xl p-6 text-White gap-2 md:gap-4">
      <h1 className="text-2xl my-5">Billing Details</h1>
      <p className="text-red-500 mb-2">{errorMessage}</p>
      <form onSubmit={Submit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="state">City <span className="text-red-500">*</span></label>
          <select value={myCity} onChange={(e) => { setMyCity(e.target.value) }} id="state" className="bg-[rgb(36,36,36)] w-full px-3 py-2 border rounded-md">
            <option value=''>Choose</option>
            <EgyptStates />
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="country">Country / Region <span className="text-red-500">*</span></label>
          <select value={myCountry} onChange={(e) => { setMyCountry(e.target.value) }} id="country" className="bg-[rgb(36,36,36)] w-full px-3 py-2 border rounded-md">
            <option value=''>Choose</option>
            <Countries AllCountries={AllCountries} Loading={Loading} />
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="address">Address <span className="text-red-500">*</span></label>
          <input value={myAddress} onChange={(e) => setMyAddress(e.target.value)}
            type="text"
            id="address"
            className="bg-transparent w-full px-3 py-2 border rounded-md"
            placeholder="Enter your address"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="neighborhood">Streat name <span className="text-red-500">*</span></label>
          <input value={myStreatName} onChange={(e) => setMyStreatName(e.target.value)}
            type="text"
            id="neighborhood"
            className="bg-transparent w-full px-3 py-2 border rounded-md"
            placeholder="Enter your streat name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="neighborhood">Postal code <span className="text-red-500">*</span></label>
          <input value={myPostalCode} onChange={(e) => setMyPostalCode(e.target.value)}
            type="text"
            id="neighborhood"
            className="bg-transparent w-full px-3 py-2 border rounded-md"
            placeholder="Enter your postal code"
          />
        </div>
        <button type="submit" className="
        bg-White Fredoka text-Black text-[22px] mt-5 w-[100%] py-[8px] rounded-full font-medium hover:bg-[#f9f1ac] transition-all ease-in-out duration-300
        ">
          Save
        </button>
      </form>
      {Loading && <div className="w-full h-full absolute top-0 left-0 bg-black/50 center">
        <Spinner />
      </div>}
    </div>
  )
}


const EgyptStates = () => {
  const states = [
    "Alexandria",
    "Aswan",
    "Asyut",
    "Beheira",
    "Beni Suef",
    "Cairo",
    "Dakahlia",
    "Damietta",
    "Faiyum",
    "Gharbia",
    "Giza",
    "Ismailia",
    "Kafr El Sheikh",
    "Luxor",
    "Matrouh",
    "Minya",
    "Monufia",
    "New Valley",
    "North Sinai",
    "Port Said",
    "Qalyubia",
    "Qena",
    "Red Sea",
    "Sharqia",
    "Sohag",
    "South Sinai",
    "Suez"
  ];
  return (
    <>
      {states.map((state, index) => (
        <option key={index} value={state}>{state}</option>
      ))}
    </>
  )
}
const Countries = ({ AllCountries, Loading }) => {
  if (Loading) return;
  return (
    <>
      {AllCountries && AllCountries.data.docs.map((country, index) => (
        <option key={index} value={country.id}>{country.name}</option>
      ))}
    </>
  )
}