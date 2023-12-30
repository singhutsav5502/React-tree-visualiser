export const initialNodes = [
  {
    fileName: "DummyFile1",
    fileID: 1,
    id: `1`, // Set ID to 1
    type: `reactTreeNode`, // Updated type to reactTreeNode
    data: {
      label: "DummyComponent",
      props: {
        prop1: 'value1', // Added key-value pairs to props
        prop2: 100,
        className: 'a-dummy-node!',
        // Add more key-value pairs as needed
      },
      isSelected: false,
      isVisible: true,
      borderColor: 'red'
    },
    position: { x: 0, y: 0 },
    parent: null,
  },
  {
    fileName: "DummyFile2",
    fileID: 2,
    id: `2`, // Set ID to 2
    type: `treeNode`,
    data: { label: "DummyComponent2", props: {}, isSelected: false, isVisible: true, borderColor: 'blue' },
    position: { x: 0, y: 0 },
    parent: null,
  },
  {
    fileName: "DummyFile3",
    fileID: 3,
    id: `3`, // Set ID to 3
    type: `treeNode`,
    data: { label: "DummyComponent3", props: {}, isSelected: false, isVisible: true, borderColor: 'blue' },
    position: { x: 0, y: 0 },
    parent: null,
  },
];

export const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', },
  { id: 'e1-3', source: '1', target: '3', animated: true },

];

export const initialZenNodes = [
  {
    fileName: "DummyFile1",
    fileID: 1,
    id: `1`, // Set ID to 1
    type: `reactTreeNode`, // Updated type to reactTreeNode
    data: {
      label: "DummyComponent",
      props: {
        prop1: 'value1', // Added key-value pairs to props
        prop2: 100,
        prop3: true,
        // Add more key-value pairs as needed
      },
      isSelected: false,
      isVisible: true,
      borderColor: '#808080'
    },
    position: { x: 0, y: 0 },
    parent: null,
  },
]
export const initialZenEdges = []