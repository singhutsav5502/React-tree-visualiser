import React from 'react'
import './About.css'
const About = ({ infoExpandHandler }) => {
    return (
        <>
            <div className="about-internal-wrapper">
                <span onClick={infoExpandHandler} className='cross-button' style={{ top: '3.5%', right: '3.5%', scale: '1' }}>
                    x
                </span>
                <div className="about-content" style={{ display: 'flex' }}>

                    <span>
                        <h1 className='font-NeueHaas' style={{ fontSize: '4rem' }}>React TreeVis</h1>
                        <p style={{ marginTop: '0.2rem', marginLeft: '0.25rem', fontSize: '1.25rem' }}>A react js/jsx component tree visualiser</p>
                    </span>
                    <span style={{ marginTop: '8%' }}>
                        <p className="font-NeueHaas" style={{ fontSize: '1.25rem' }}>Steps to use: </p>
                        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                            <li style={{ marginTop: '0.2rem', fontSize: '1.25rem', fontWeight: '300' }} >Press "Add File" to load a .js or .jsx file</li>
                            <li style={{ marginTop: '0.2rem', fontSize: '1.25rem', fontWeight: '300' }} >Press the "parse" button</li>
                            <li style={{ marginTop: '0.2rem', fontSize: '1.25rem', fontWeight: '300' }} >See the magic happen!</li>
                        </ul>
                    </span>
                    <span style={{ marginTop: '1rem' }}>
                        <p className="font-NeueHaas" style={{ fontSize: '1.25rem' }}>Tech Stack: </p>
                        <div className='tech-stack-container'>
                            <span>React</span>
                            <span>React Flow</span>
                            <span>Dagre</span>
                            <span>Framer Motion</span>
                            <span>Babel</span>
                            <span>Node.Js</span>
                            <span>Express.JS</span>
                        </div>
                    </span>
                    <span style={{ marginTop: '1rem' }}>
                        <p className="font-NeueHaas" style={{ fontSize: '1.25rem' }}>About the Author: </p>
                        <div className='about-author' style={{ display: 'flex', alignItems: 'left', justifyContent: 'flex-start', gap: '1rem', marginTop: '0.5rem' }}>
                            <img src="/images/author.jpg" alt="" height='35px' width='35px' style={{ borderRadius: '100%', objectFit: 'cover' }} />
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'center' }}>
                                <p className="font-NeueHaas" style={{ fontSize: '1.25rem' }}>Utsav Singh</p>
                                <p style={{ fontSize: '0.8rem', fontWeight: '300' }} >Fullstack Dev | B.Tech student at NSUT</p>
                            </div>
                        </div>

                    </span>
                    <span style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '4rem' }}>

                        <a href="https://github.com/singhutsav5502/React-tree-visualiser" className="button-secondary" rel="noreferrer" target="_blank" style={{ fontWeight: '500', marginLeft: '0', textDecoration: 'none', marginTop: '5px' }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                <path d="M9 18c-4.51 2-5-2-7-2" />
                            </svg> React TreeVis on GitHub</a>

                        <a href="https://github.com/singhutsav5502" className="button-secondary" rel="noreferrer" target="_blank" style={{ fontWeight: '500', marginLeft: '0', textDecoration: 'none', marginTop: '5px' }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                <path d="M9 18c-4.51 2-5-2-7-2" />
                            </svg> Utsav Singh on GitHub</a>
                    </span>
                </div>
            </div></>
    )
}

export default About