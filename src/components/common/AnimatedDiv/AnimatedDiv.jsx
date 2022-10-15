import React from 'react'
import { motion } from 'framer-motion'

const AnimatedDiv = ({children}) => {
    const pageTransition ={
        in:{
            opacity:1
        },
        out:{
            opacity:0
        }
    }
  return (
    <motion.div className='page' initial="out" animate="in" exit="out" variants={pageTransition}>
        {children}
    </motion.div>
  )
}

export default AnimatedDiv