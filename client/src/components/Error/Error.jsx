import React from 'react'
import './Error.css'
const Error = ({  setIsErr }) => {
    const okClickHandler = ()=>{
        setIsErr((state)=>false);
    }
    return (
        <>
            <div className="error-wrapper">
                <div className="error-internal-wrapper">

                    <h1 className='font-NeueHaas' style={{ marginBottom: '1.25rem' , color:'var(--font-primary)'}}>Error</h1>
                    <p style={{ fontSize: '0.9rem', fontWeight: '300' , color:'var(--font-primary)'}}>There seems to be an error while parsing the file!</p>
                    <p style={{ fontSize: '0.9rem', fontWeight: '300' , color:'var(--font-primary)'}}>Please check and make sure that you are using a <strong>js/jsx</strong> file that contains JSX syntax</p>
                    {/* reuse existing button class */}
                    <span className="file-header-buttons-wrapper" style={{alignSelf:'flex-end' , marginTop:'1.5rem'}}>
                        <button style={{padding:'10px 15px 10px 15px' , marginLeft:'0'}} onClick={okClickHandler}>OK</button>
                    </span>
                </div>
            </div>
        </>
    )
}

export default Error