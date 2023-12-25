import React from 'react';
import { Handle, Position } from 'reactflow';
import './TreeNode.css'
const TreeNode = ({ data }) => {
    const { label, props, isSelected } = data;

    // Extract keys from props object
    const propKeys = props ? Object.keys(props) : [];
    const propValues = props ? Object.values(props) : []
    const index = label.indexOf('-');
    const labelText = index !== -1 ? label.slice(0, index) : label;
    const elementNum = index !== -1? label.slice(index) : '';
        
    return (
        <>
            <Handle type="source" position={Position.Bottom} />
            <div className={`node-wrapper ${isSelected?'node-selected':''}`}>
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
            </div>
            <Handle type="target" position={Position.Top} />
        </>

    );
};

export default TreeNode;