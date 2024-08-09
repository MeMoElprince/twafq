import { useState } from 'react'
import Welcome from './Welcome/Welcome'
import Categories from './Categories/index'
import PopularProd from './PopularProd/index'
import ForYou from './ForYou/index'
import TopRatedRoot from './TopRated/index'

import Smoke from './assets/double-Background.png'

export default function Home() {
  const [FirstColor, setFirstColor] = useState('#ACA08C')
  const [SecondColor, setSecondColor] = useState('#D4CDCD')
  return (
    <>
      <Welcome />
      <div className='bg-DarkerBlue' style={{
        backgroundImage: `url(${Smoke})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <Categories />
        <PopularProd />
      </div>
      <ForYou FirstColor={FirstColor} SecondColor={SecondColor} setFirstColor={setFirstColor} setSecondColor={setSecondColor} />
      <TopRatedRoot FirstColor={FirstColor} SecondColor={SecondColor} />
      {/* add Ads section in Top rated becouse of background problem when refresh page */}
    </>
  )
}
