import { useState } from "react"
import TextRevAnim from "../../../utils/TextRevAnim"

const AllFillters = ['All', 'New', 'Top Rated', 'Trending', 'Best Seller', 'Featured']
export default function Fillters() {
  const [activeFillter, setActiveFillter] = useState(['All'])

  const SelectedStyle = 'bg-white text-Black'
  const handleSelected = (elem) => {
    setActiveFillter(prev => {
      if (prev.includes(elem)) {
        return prev.filter(e => e !== elem)
      }
      return [...prev, elem]
    })
  }
  return (
    <>
      {
        AllFillters.map((item, idx) => (
          <button onClick={() => { handleSelected(item) }} key={idx} className={`flex-grow border-[1px] hover:border-white duration-300 border-white/50 rounded-full ${activeFillter.includes(item) && SelectedStyle}`}>
            {
              activeFillter.includes(item) ?
                <span className="py-4 px-8 center">{item}</span>
                :
                <TextRevAnim classes='py-4 px-8 center'>{item}</TextRevAnim>
            }
          </button>
        ))
      }
    </>
  )
}
