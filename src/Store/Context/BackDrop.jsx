import { createContext, useState } from 'react'

export const BackDropContext = createContext();

// eslint-disable-next-line react/prop-types
export default function BackDropProvider({ children }) {
  const [BackDropType, setBackDropType] = useState('');
  const [BackDropActive, setBackDropActive] = useState(false);
  return (
    <BackDropContext.Provider value={{ 
      BackDropType, setBackDropType,
      BackDropActive, setBackDropActive
     }}>
      {children}
    </BackDropContext.Provider>
  )
}