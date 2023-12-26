import React from 'react'
import ListElement from './ListElement'
import { useRef } from 'react';
import './FileList.css'
const FileList = ({  files, parseFileClickHandler, fileDeleteHandler, setFiles, fileSelectHandler, setNodes, setEdges, isDark }) => {
    const addFileRef = useRef(null);
    const addFileClickHandler = () => {
        addFileRef.current.click();
    }
    const fileClearHandler = () => {
        setFiles([]);
        setNodes([]);
        setEdges([]);
    }
    const nodeDeselectHandler = () => {
        setNodes((nodes) => {
            const newNodes = nodes.map((nd) => {
                nd.data.isSelected = false
                return nd
            })
            return [...newNodes]
        })
        setEdges((edges) => {
            const newEdges = edges.map((edge) => {
                edge.animated=false;
                return edge
            })
            return [...newEdges]
        })
    }
    // need to clear input value so that onChange is triggered when selecting the same file after delete
    const fileSelectHandlerInternal = (event) => {
        fileSelectHandler(event);
        addFileRef.current.value = null;
    }
    return (
        <>
            <div className="file-list-wrapper" onClick={nodeDeselectHandler}>
                
                <div className="file-list-header">
                    <h2 className='font-NeueHaas'>FILES</h2>
                    <div className="file-header-buttons-wrapper">

                        <input style={{ display: 'none' }} type="file" onChange={fileSelectHandlerInternal} accept=".js,.jsx" ref={addFileRef} />

                        <button onClick={addFileClickHandler}>Add File</button>

                        <button onClick={fileClearHandler}>Clear Files</button>
                    </div>
                </div>
                {files?.map((file) => {

                    return (<ListElement key={file.ID} file={file} parseFileClickHandler={parseFileClickHandler} fileDeleteHandler={fileDeleteHandler} setFiles={setFiles} />)
                })}
            </div>
        </>
    )
}

export default FileList