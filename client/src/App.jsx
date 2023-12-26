
import './App.css';
import { useState, useCallback, useRef, useEffect } from 'react';
import DraggableExpansionButton from './components/Draggables/DraggableExpansionButton';
import FileList from './components/List/FileList';
import Viewport from './components/Trees/Viewport';
import { applyEdgeChanges, applyNodeChanges } from 'reactflow';
import Dagre from '@dagrejs/dagre';
function App() {
  let i = useRef(0);
  const [isDark, setIsDark] = useState(false);
  const [files, setFiles] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [shouldRunOnLayout, setShouldRunOnLayout] = useState(false);
  const appRef = useRef(null)
  const themeHandler = () => {
    setIsDark((state) => !state)
    if (isDark) {
      document.body.dataset.theme = 'light';
    }
    else {
      document.body.dataset.theme = 'dark';
    }
  }
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

  const getLayoutedElements = (nodes, edges, options) => {
    g.setGraph({
      rankdir: options.direction,
      ranksep: 100,
      nodesep: 50,
    });

    edges.forEach((edge) => g.setEdge(edge.source, edge.target));
    nodes.forEach((node) => g.setNode(node.id, node));

    Dagre.layout(g);

    return {
      nodes: nodes.map((node) => {
        const { x, y } = g.node(node.id);

        return { ...node, position: { x, y } };
      }),
      edges,
    };
  };

  const onLayout = useCallback(
    (direction) => {
      const layouted = getLayoutedElements(nodes, edges, { direction });
      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);
    },
    [nodes, edges, setEdges, setNodes]
  );

  const fileSelectHandler = (event) => {
    const fileList = event.target.files;

    Array.from(fileList).forEach(file => {

      const reader = new FileReader();

      reader.addEventListener('load', (e) => {
        const fileContent = reader.result;
        const name = file.name ? file.name : "No name";
        const ID = i.current++;
        const type = file.type ? file.type : "No type";
        const size = file.size ? file.size : "No size";
        setFiles((files) => [...files, { ID, name, type, size, fileContent }]);
      }, false,);

      reader.readAsText(file);
    })
  }
  const parseFileClickHandler = (file) => {
    fetch(`${process.env.REACT_APP_BACKEND}parse/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fileContent: file.fileContent, fileName: file.name, fileID: file.ID })

    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to parse file')
        }
        return res.json();
      })
      .then(response => {
        setEdges((edges) => [...edges, ...response.edges]);
        setNodes((nodes) => [...nodes, ...response.nodes]);
        setShouldRunOnLayout(true);
      })
      .catch(err => {
        console.log(err);
      })
  }
  useEffect(() => {
    if (nodes.length && edges.length) onLayout('TB')
    setShouldRunOnLayout(false)
  }, [shouldRunOnLayout])
  const fileDeleteHandler = (file) => {
    setFiles((files) => {
      const temp = files.filter(fileData => fileData.ID !== file.ID);
      return ([...temp]);
    })
    setNodes((nodes) => {
      const temp = nodes.filter(node => node.fileID !== file.ID);
      return ([...temp]);
    })
    setEdges((edges) => {
      const temp = edges.filter(edge => edge.fileID !== file.ID);
      return ([...temp]);
    })

  }


  return (
    <>
      <div className="app-wrapper" ref={appRef}>

        <DraggableExpansionButton dragConstraints={appRef} drag='y' icon='+'>
          <FileList files={files}
            parseFileClickHandler={parseFileClickHandler}
            fileDeleteHandler={fileDeleteHandler}
            fileSelectHandler={fileSelectHandler}
            setFiles={setFiles}
            setNodes={setNodes}
            setEdges={setEdges}
            isDark={isDark} />
        </DraggableExpansionButton>


        <div className="app-right">
          <Viewport
            onLayout={onLayout}
            themeHandler={themeHandler}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            setNodes={setNodes}
            setEdges={setEdges}
            isDark={isDark}
          />
        </div>
      </div>
    </>
  );
}

export default App;
