
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
    const [isVisibleInfo, setIsVisibleInfo] = useState(true)
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
                        animate={{ scale: 1, opacity: 0.8 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="about-wrapper"
                    >
                        <div className="about-internal-wrapper">
                            <span onClick={infoExpandHandler} className='cross-button' style={{ top: '3%', right: '3%', scale: '1.5' }}>
                                x
                            </span>
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