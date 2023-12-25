
import React, { useMemo, useState } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    Panel,
    Background,
    Controls,
    MiniMap,
    BackgroundVariant
} from 'reactflow';
import 'reactflow/dist/style.css';
import TreeNode from './Node/TreeNode'
import './Viewport.css'
import { motion, AnimatePresence } from 'framer-motion'

const Viewport = ({ onLayout, themeHandler, nodes, edges, onNodesChange, onEdgesChange, setNodes, setEdges, isDark, }) => {
    const nodeTypes = useMemo(() => {
        return { treeNode: TreeNode }
    }, []); // define custom node
    const [isVisibleInfo, setIsVisibleInfo] = useState(false)
    const infoExpandHandler = () => {
        setIsVisibleInfo((state) => !state)
    }
    const onNodeClickHandler = (event, node) => {
        // for highlighting selected node
        setNodes((nodes) => {
            const newNodes = nodes.map((nd) => {
                if (nd.id === node.id) nd.data.isSelected = true
                else nd.data.isSelected = false
                return nd
            })
            return [...newNodes]
        })
        // for animated edges
        setEdges((edges) => {
            const newEdges = edges.map((edge) => {
                if (edge.source === node.id) {
                    edge.animated = true;
                }
                else edge.animated = false;
                return edge;
            })
            return [...newEdges]
        })
    }
    const NodesChangeHandler = (changes, load) => {
        onNodesChange(changes);
    }
    return (
        <>
            <AnimatePresence>
                {isVisibleInfo &&
                    <motion.div
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 1, opacity: 0.9 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="about-wrapper"
                    >
                        <div className="about-internal-wrapper">
                            <span onClick={infoExpandHandler} className='cross-button' style={{ top: '2%', right: '2%', scale: '1.5' }}>
                                x
                            </span>
                            <div className="about-content" style={{ display: 'flex' }}>
                                <div className="about-left" style={{ gap: '10%' }}>
                                    <span>
                                        <h1 className='font-NeueHaas' style={{ fontSize: '4rem' }}>React Tree Vision</h1>
                                        <p style={{ marginTop: '0.2rem', marginLeft: '0.25rem', fontSize: '1.25rem' }}>A react based js/jsx component tree visualiser</p>
                                    </span>
                                    <span>
                                        <h2 className="font-NeueHaas">Steps to use: </h2>
                                        <ol style={{ marginLeft: '2.5rem', marginTop: '0.5rem' }}>
                                            <li style={{ marginTop: '0.2rem', fontSize: '1.25rem' }} >Press "Add File" to load a .js or .jsx file</li>
                                            <li style={{ marginTop: '0.2rem', fontSize: '1.25rem' }} >Press the "parse" button</li>
                                            <li style={{ marginTop: '0.2rem', fontSize: '1.25rem' }} >See the magic happen!</li>
                                        </ol>
                                    </span>
                                    <span>
                                        <h2 className="font-NeueHaas">Tech Stack: </h2>
                                        <ul style={{ marginLeft: '1.8rem', marginTop: '0.5rem' }}>
                                            <li style={{ marginTop: '0.2rem', fontSize: '1.25rem' }} >React</li>
                                            <li style={{ marginTop: '0.2rem', fontSize: '1.25rem' }} >React Flow</li>
                                            <li style={{ marginTop: '0.2rem', fontSize: '1.25rem' }} >Dagre</li>
                                            <li style={{ marginTop: '0.2rem', fontSize: '1.25rem' }} >Framer Motion</li>
                                            <li style={{ marginTop: '0.2rem', fontSize: '1.25rem' }} >Babel</li>
                                            <li style={{ marginTop: '0.2rem', fontSize: '1.25rem' }} >Node.Js</li>
                                            <li style={{ marginTop: '0.2rem', fontSize: '1.25rem' }} >Express.JS</li>
                                        </ul>
                                    </span>
                                    <span>
                                        <h2 style={{ display: 'inline' }}>Github: </h2>
                                        <a href="https://github.com/singhutsav5502/React-tree-visualiser" rel="noreferrer" target="_blank">Click me!</a>
                                    </span>
                                </div>


                                <div className="about-right">
                                    <span >
                                        <h1 className='font-NeueHaas' style={{ fontSize: '4rem' }}>Created By: </h1>
                                        <h1 className='font-NeueHaas' style={{ fontSize: '4rem' }}>Utsav Singh</h1>
                                    </span>
                                    <span>
                                        <p style={{ fontSize: '1.25rem' }}>An Indian <img
                                            src="https://flagcdn.com/in.svg"
                                            width="30"
                                            alt="India"></img> fullstack developer and engineering student</p>
                                    </span>
                                    <span>
                                        <h2 className="font-NeueHaas">LINKS:</h2>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={NodesChangeHandler}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    onNodeClick={onNodeClickHandler}
                    fitView
                >
                    <Panel position='top-left'>
                        <span style={{ display: 'flex', gap: '1.5rem' }}>
                            <button onClick={infoExpandHandler} className='info-button' style={{ cursor: "pointer", border: 'none', background: 'none' }}>
                                <i className="icon"
                                    style={{
                                        backgroundImage: 'url("/images/info.png")',
                                        filter: `invert(${isDark ? 1 : 0})`,
                                    }}>
                                </i>
                            </button>
                            <button className="theme-change-wrapper" onClick={themeHandler} style={{ cursor: "pointer", border: 'none', background: 'none' }}>
                                {isDark ? <i className="icon"
                                    style={{
                                        backgroundImage: 'url("/images/moon.png")',
                                        filter: "invert(1)",
                                    }}>
                                </i> :
                                    <i className="icon"
                                        style={{
                                            backgroundImage: 'url("/images/sun.png")'
                                        }}>
                                    </i>}

                            </button>

                        </span>

                    </Panel>
                    <Panel position="top-right">

                        {/* Error handling use nodes.length for empty arrays */}
                        <button onClick={() => { if (nodes.length) onLayout('TB') }} className='button-secondary'>vertical layout</button>
                        <button onClick={() => { if (nodes.length) onLayout('LR') }} className='button-secondary'>horizontal layout</button>
                    </Panel>
                    <Background color={isDark ? '#999' : '#333'} gap='40' variant={BackgroundVariant.Dots} />
                    <Controls />
                    <MiniMap pannable='true' maskColor={isDark ? "rgb(20, 20, 20, 0.6)" : "rgb(240, 240, 240, 0.6)"} />
                </ReactFlow>
            </ReactFlowProvider>
        </>
    );
};
export default Viewport;