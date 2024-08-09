import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
export default function InView({ children, variants, repeat=false, classes="" }) {
  const ref = useRef()
  const controls = useAnimation()
  const inView = useInView(ref)
  
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      if(!repeat) return
      controls.start("hidden")
    }
  }, [inView])
  return (
    <motion.span className={classes} ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
    >
      {children}
    </motion.span>
  )
}
