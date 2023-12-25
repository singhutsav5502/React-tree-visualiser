import React, { useState } from 'react'
import './draggableMenu.css'
import { motion, AnimatePresence } from 'framer-motion'
const DraggableExpansionButton = (props) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const expandHandler = (event) => {
        setIsExpanded((state) => !state)
    }


    return (
        <>
            <motion.div className='drag-wrapper'

                drag={props.drag}
                dragConstraints={props.dragConstraints}
                dragElastic={2}
                dragMomentum={0.1}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
                style={{...props.style}}
            >
                {!isExpanded && (<motion.button
                    className='plus-button'
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onDoubleClick={expandHandler} >{props.icon}
                    </motion.button>)}

                <AnimatePresence>
                    {isExpanded &&
                        (<motion.div
                            className='drag-internal-wrapper'
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            style={{marginLeft:'15px'}}
                        >
                            <motion.span onClick={expandHandler} className='cross-button'>
                                x
                            </motion.span>
                            {props.children}
                        </motion.div>)

                    }
                </AnimatePresence>
            </motion.div >
        </>
    )
}

export default DraggableExpansionButton