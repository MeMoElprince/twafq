import Welcome from './Welcome'
import Top3Rated from './Top3Rated'
const Top10 = [
  {
    name: 'Mohammed Nasr',
    img: 'https://picsum.photos/200/300',
    discreption: 'Korem ipsum dolor sit amet, conjjctetur ng elit. Nunc vulputate libero et velitxc iedum bc aliquet odio mattis.',
    isFavorite: true,
    rating: 3.5,
    totalRates: 84
  },
  {
    name: 'Mohammed Nasr',
    img: 'https://picsum.photos/200/300',
    discreption: 'Korem ipsum dolor sit amet, conjjctetur ng elit. Nunc vulputate libero et velitxc iedum bc aliquet odio mattis.',
    isFavorite: false,
    rating: 3.5,
    totalRates: 84
  },
  {
    name: 'Mohammed Nasr',
    img: 'https://picsum.photos/200/300',
    discreption: 'Korem ipsum dolor sit amet, conjjctetur ng elit. Nunc vulputate libero et velitxc iedum bc aliquet odio mattis.',
    isFavorite: true,
    rating: 3.5,
    totalRates: 84
  },
  {
    name: 'Mohammed Nasr',
    img: 'https://picsum.photos/200/300',
    discreption: 'Korem ipsum dolor sit amet, conjjctetur ng elit. Nunc vulputate libero et velitxc iedum bc aliquet odio mattis.',
    isFavorite: true,
    rating: 3.5,
    totalRates: 84
  },
  {
    name: 'Mohammed Nasr',
    img: 'https://picsum.photos/200/300',
    discreption: 'Korem ipsum dolor sit amet, conjjctetur ng elit. Nunc vulputate libero et velitxc iedum bc aliquet odio mattis.',
    isFavorite: true,
    rating: 3.5,
    totalRates: 84
  },
  {
    name: 'Mohammed Nasr',
    img: 'https://picsum.photos/200/300',
    discreption: 'Korem ipsum dolor sit amet, conjjctetur ng elit. Nunc vulputate libero et velitxc iedum bc aliquet odio mattis.',
    isFavorite: true,
    rating: 3.5,
    totalRates: 84
  },
  {
    name: 'Mohammed Nasr',
    img: 'https://picsum.photos/200/300',
    discreption: 'Korem ipsum dolor sit amet, conjjctetur ng elit. Nunc vulputate libero et velitxc iedum bc aliquet odio mattis.',
    isFavorite: true,
    rating: 3.5,
    totalRates: 84
  },
  {
    name: 'Mohammed Nasr',
    img: 'https://picsum.photos/200/300',
    discreption: 'Korem ipsum dolor sit amet, conjjctetur ng elit. Nunc vulputate libero et velitxc iedum bc aliquet odio mattis.',
    isFavorite: true,
    rating: 3.5,
    totalRates: 84
  },
  {
    name: 'Mohammed Nasr',
    img: 'https://picsum.photos/200/300',
    discreption: 'Korem ipsum dolor sit amet, conjjctetur ng elit. Nunc vulputate libero et velitxc iedum bc aliquet odio mattis.',
    isFavorite: true,
    rating: 3.5,
    totalRates: 84
  },
  {
    name: 'Mohammed Nasr',
    img: 'https://picsum.photos/200/300',
    discreption: 'Korem ipsum dolor sit amet, conjjctetur ng elit. Nunc vulputate libero et velitxc iedum bc aliquet odio mattis.',
    isFavorite: true,
    rating: 3.5,
    totalRates: 84
  },

]
export default function TopRatedRoot({ FirstColor, SecondColor }) {
  return (
    <>
      <Welcome FirstColor={FirstColor} SecondColor={SecondColor} />
      <Top3Rated details={[Top10[0],Top10[1],Top10[2]]} SecondColor={SecondColor} />
    </>
  )
}
