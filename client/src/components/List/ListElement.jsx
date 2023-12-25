import React,{useRef} from 'react'
import './FileList.css'
const ListElement = ({ file, parseFileClickHandler, fileDeleteHandler, setFiles }) => {
    const parseRef=useRef(null);
    const parseHandler = () => {
        parseFileClickHandler(file)
        if(parseRef.current) parseRef.current.disabled=true
    }
    const deleteHandler = () => {
        fileDeleteHandler(file) // remove from files and remove all corresponding nodes and edges
    }

    return (
        <div className="list-element-wrapper" key={file.ID}>
            <p>{file.name}</p>
            <button ref={parseRef} className="list-element-parse-button button-secondary" onClick={parseHandler}>Parse</button>
            <button className="list-element-delete-button button-secondary" onClick={deleteHandler}>delete</button>

        </div>
    )
}

export default ListElement