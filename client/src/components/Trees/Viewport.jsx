
import React, { useCallback, useMemo, useRef } from 'react';
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


const Viewport = ({ onLayout,themeHandler, nodes, edges, onNodesChange, onEdgesChange, setNodes, setEdges, isDark,  }) => {
    const nodeTypes = useMemo(() => {
        return { treeNode: TreeNode }
    }, []); // define custom node
   
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
    const NodesChangeHandler = (changes, load)=>{
        onNodesChange(changes);
    }
    return (
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
                    <div className="theme-change-wrapper">
                        {isDark ? <i className="icon"
                            style={{
                                backgroundImage: 'url("/moon.png")',
                                filter: "invert(1)",
                            }}>
                        </i> :
                            <i className="icon"
                                style={{
                                    backgroundImage: 'url("/sun.png")'
                                }}>
                            </i>}
                        <button onClick={themeHandler} className='button-secondary  theme-button' style={{ marginLeft: '0px' }}>Theme Toggle</button>
                    </div>
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
    );
};
export default Viewport;