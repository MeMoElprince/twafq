import { useState, useEffect} from 'react'

export default function WindowSize() {
  const [size, setSize] = useState({x:window.innerWidth,y:window.innerHeight});
  
  useEffect(()=>{
    const getWidnowSize = ()=>{
      setSize({x:window.innerWidth,y:window.innerHeight})
    }
    window.addEventListener('resize',getWidnowSize)
    
    return ()=>{
      window.removeEventListener('resize',getWidnowSize)
    }
  },[])

  return {
    width:size.x,
    height:size.y
  }
}
