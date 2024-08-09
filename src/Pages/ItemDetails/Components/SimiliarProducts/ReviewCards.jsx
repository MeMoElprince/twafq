import Card from "../Card";
import { motion, useMotionValue, useInView, useAnimation } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const reviewDetails = [
    {
        name: 'Mohammed Nasr',
        rating: 3.5,
        text: 'Obsessed with my Boho Bliss Tote Bag! Stylish, spacious, and the handwoven details take it to the next level. A must-have accessory for any fashion lover!',
        date: '26/6/2024'
    },
    {
        name: 'Mohammed Nasr',
        rating: 3.5,
        text: 'Obsessed with my Boho Bliss Tote Bag! Stylish, spacious, and the handwoven details take it to the next level. A must-have accessory for any fashion lover!',
        date: '26/6/2024'
    },
    {
        name: 'Mohammed Nasr',
        rating: 3.5,
        text: 'Obsessed with my Boho Bliss Tote Bag! Stylish, spacious, and the handwoven details take it to the next level. A must-have accessory for any fashion lover!',
        date: '26/6/2024'
    },
    {
        name: 'Mohammed Nasr',
        rating: 3.5,
        text: 'Obsessed with my Boho Bliss Tote Bag! Stylish, spacious, and the handwoven details take it to the next level. A must-have accessory for any fashion lover!',
        date: '26/6/2024'
    },
    {
        name: 'Mohammed Nasr',
        rating: 3.5,
        text: 'Obsessed with my Boho Bliss Tote Bag! Stylish, spacious, and the handwoven details take it to the next level. A must-have accessory for any fashion lover!',
        date: '26/6/2024'
    },
    {
        name: 'Mohammed Nasr',
        rating: 3.5,
        text: 'Obsessed with my Boho Bliss Tote Bag! Stylish, spacious, and the handwoven details take it to the next level. A must-have accessory for any fashion lover!',
        date: '26/6/2024'
    },
    {
        name: 'Mohammed Nasr',
        rating: 3.5,
        text: 'Obsessed with my Boho Bliss Tote Bag! Stylish, spacious, and the handwoven details take it to the next level. A must-have accessory for any fashion lover!',
        date: '26/6/2024'
    }
]

export default function ReviewCards() {
    const dragRef = useRef()
    const [Width, setWidth] = useState(0)
    
    
    useEffect(() => {
        setWidth(dragRef.current.scrollWidth - dragRef.current.offsetWidth)
     }, [])

    return (
        <>
            <div className='relative w-[100%] h-full overflow-hidden center mb-56'>
                <motion.div
                    ref={dragRef}
                    drag="x"
                    dragConstraints={{ left: -Width/2, right: Width/2 }}
                    dragElastic={0.1}
                    className='w-min h-full center gap-8 px-12'
                >
                    {
                        reviewDetails.map((review, idx) => {
                            return <Card key={idx} reviewDetails={review} />;
                        })
                    }
                </motion.div>
            </div>
        </>
    );
}