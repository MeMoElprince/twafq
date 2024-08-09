import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function Card({ reviewDetails }){

    const StarCounter = () => {
        let stars = []
        for (let i = 0; i < 5; i++) {
            if (reviewDetails.rating >= i + 1) {
                stars.push(<FaStar key={i} />)
            } else if (reviewDetails.rating > i && reviewDetails.rating < i + 1) {
                // if there is a half star
                stars.push(<FaStarHalfAlt key={i} />)
            } else {
                stars.push(<FaRegStar key={i} style={{ color: '#101010' }} />)
            }
        }
        return (
            <div className='flex items-center font-thin'>
                {stars}
            </div>
        )
    }

    return (
        <>
            <div className="min-w-[300px] h-min p-4 cetner flex-col bg-DarkBeige rounded-xl shadow-[inset_0_0px_4px_rgba(0,0,0,0.3)]">
                <section className="w-full h-full center">
                    <div className="w-full h-full">
                        <StarCounter />
                    </div>
                    <span className="ml-auto text-sm text-Black/80">
                        {reviewDetails.date}
                    </span>
                </section>
                <section className="w-full h-full text-sm mt-4">
                    {reviewDetails.text}
                </section>
                <section className="w-full h-full mt-5 text-sm text-Black/75 font-medium">
                    {reviewDetails.name}
                </section>
            </div>
        </>
    );
}