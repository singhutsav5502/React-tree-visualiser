import React from 'react';
import { Handle, Position } from 'reactflow';
import './TreeNode.css'
import { motion, AnimatePresence } from 'framer-motion'
const TreeNode = ({ data }) => {
    const { label, props, isSelected } = data;

    // Extract keys from props object
    const propKeys = props ? Object.keys(props) : [];
    const propValues = props ? Object.values(props) : []
    const index = label.indexOf('-');
    const labelText = index !== -1 ? label.slice(0, index) : label;
    const elementNum = index !== -1 ? label.slice(index) : '';

    return (
        <>
            <Handle type="source" position={Position.Bottom} />
            <AnimatePresence>
                <motion.div
                    className={`node-wrapper ${isSelected ? 'node-selected' : ''}`}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    <h2 className='font-NeueHaas'>{labelText}</h2>
                    <p>{elementNum}</p>
                    {propKeys.length !== 0 ? <div>
                        <strong>Node Properties:</strong>
                        <ul>
                            {propKeys.map((key, index) => (
                                <li key={index}>{key}: {propValues[index]}</li>
                            ))}
                        </ul>
                    </div> : null}
                </motion.div>
            </AnimatePresence>
            <Handle type="target" position={Position.Top} />
        </>

    );
};

export default TreeNode;