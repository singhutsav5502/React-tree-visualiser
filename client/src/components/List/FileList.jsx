import React from 'react'
import ListElement from './ListElement'
import { useRef } from 'react';
import { toast } from 'react-toastify';
import './FileList.css'
const FileList = ({ files, isDummy,isDark , setIsDummy, parseFileClickHandler, fileDeleteHandler, setFiles, fileSelectHandler, setNodes, setEdges, setZenNodes, setZenEdges, zenMode }) => {
    const addFileRef = useRef(null);
    const addFileClickHandler = () => {
        if (isDummy === true) {
            toast.error('Press "Clear Files" to remove dummy nodes and try again', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: isDark ? 'dark' : 'light',
            });
        }
        else {
            addFileRef.current.click();
        }
    }
    const fileClearHandler = () => {
        setFiles([]);
        setNodes([]);
        setZenNodes([]);
        setEdges([]);
        setZenEdges([]);
        setIsDummy(false);
    }
    const nodeDeselectHandler = () => {
        if (!zenMode) {
            setNodes((nodes) => {
                const newNodes = nodes.map((nd) => {
                    nd.data.isSelected = false
                    return nd
                })
                return [...newNodes]
            })
            setEdges((edges) => {
                const newEdges = edges.map((edge) => {
                    edge.animated = false;
                    return edge
                })
                return [...newEdges]
            })
        }
        else {
            setZenNodes((nodes) => {
                const newNodes = nodes.map((nd) => {
                    nd.data.isSelected = false
                    return nd
                })
                return [...newNodes]
            })


            setZenEdges((edges) => {
                const newEdges = edges.map((edge) => {
                    edge.animated = false;
                    return edge
                })
                return [...newEdges]
            })
        }
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

                    return (<ListElement
                        key={file.ID}
                        file={file}
                        parseFileClickHandler={parseFileClickHandler}
                        fileDeleteHandler={fileDeleteHandler}
                    />)
                })}
            </div>
        </>
    )
}

export default FileList