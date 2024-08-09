import { useState } from 'react'
import { motion } from 'framer-motion'

export default function TextRevAnim({ children, classes }) {
  const [isHover, setIsHover] = useState(false)
  return (
    <motion.div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`w-full h-full overflow-hidden relative ${classes}`}>
      <div className='flex flex-col w-fit overflow-hidden'>
        <motion.span className=''
          animate={{ y: isHover ? '-40px' : 0 }}
          transition={{ duration: 0.3, ease: [0.75, 0, 0.24, 1] }}
        >{children}</motion.span>
        <motion.span className='absolute -bottom-10'
          animate={{ y: isHover ? '-55px' : 0 }}
          transition={{ duration: 0.3, ease: [0.75, 0, 0.24, 1] }}
        >{children}</motion.span>
      </div>
    </motion.div>
  )
}