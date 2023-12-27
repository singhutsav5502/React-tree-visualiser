const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;

function extractComponents(node, parent = null, parentStack = [], zenParentStack=[], fileName, fileID, i) {
    if (node.type === 'JSXOpeningElement') {
        const componentName = `${node.name.name}- Element No. ${i}`;
        const props = {};
        node.attributes.forEach((attribute) => {
            if (attribute.type === 'JSXAttribute') {
                const attributeName = attribute.name.name;
                if (attribute.value && attribute.value.type === "Literal") {
                    props[attributeName] = attribute.value.value;
                }
                else if (attribute.name.name === 'className') {
                    props[attributeName] = attribute.value.value;
                }
                else if (attribute?.value && attribute?.value.type === "JSXExpressionContainer") {
                    if (attribute?.value.expression.type === "Literal") {
                        props[attributeName] = attribute.value.expression.value;

                    } else {
                        // Handle more complex expressions or nested structures if needed
                        props[attributeName] = attribute.value?.expression?.name; // Placeholder for complex expressions
                    }
                }
                else {
                    props[attributeName] = `Complex`; // For attributes without values like <ComponentName attribute />
                }
            }
        });
        const componentInfo = {
            fileName: fileName,
            fileID: fileID,
            id: `${componentName}-${fileID}`,
            type: `treeNode`,
            data: { label: componentName, props, isSelected: false }, // Include props in the data
            position: { x: 0, y: 0 },
            parent,
        };
        let updatedZenParentStack = [...zenParentStack]
        let isReactComponent = false;
        if (componentInfo.data.label[0] === componentInfo.data.label[0].toUpperCase()) {
            // if first letter is capatalized then it is not an html dom element
            isReactComponent = true;
            updatedZenParentStack = [...updatedZenParentStack, componentName]

            componentInfo.type='reactTreeNode'
        }
        return { componentInfo, parentStack: [...parentStack, componentName],zenParentStack: updatedZenParentStack, isReactComponent: isReactComponent};
    }
    return { componentInfo: null, parentStack, zenParentStack, isReactComponent: false };
}

function parseJSXContent(jsxContent, fileName, fileID) {
    let i = 1;
    const ast = parse(jsxContent, {
        sourceType: 'module',
        plugins: ['jsx'],
    });
    const rootProps = {};
    traverse(ast, {
        JSXOpeningElement(path) {
            if (path.parent.type === 'JSXElement' && path.parent.openingElement === path.node) {
                // Root component props
                path.node.attributes.forEach((attribute) => {
                    rootProps[attribute.name.name] = attribute?.value?.value;
                });
            }
        },
    });

    const rootComponent = {
        fileName: fileName,
        fileID: fileID,
        id: `${fileName}-${fileID}`,
        data: { label: `${fileName}`, props: rootProps, isSelected: false }, // Include root props in the data
        position: { x: 0, y: 0 },
        type: 'reactTreeNode'
    };
    // Default Nodes and Edges
    const nodes = [rootComponent];
    const edges = [];
    let parentStack = [`${fileName}-${fileID}`]; // ID of root element

    // Zen Mode Nodes and Edges
    let zenParentStack = [`${fileName}-${fileID}`]
    const zenNodes = [rootComponent]
    const zenEdges = []

    traverse(ast, {
        JSXOpeningElement(path) {
            const { componentInfo, parentStack: updatedParentStack, zenParentStack: updatedZenParentStack , isReactComponent: isReactComponent } = extractComponents(path.node, null, parentStack, zenParentStack, fileName, fileID, i);

            if (componentInfo) {
                const componentLevel = updatedParentStack.length - 1;
                const zenComponentLevel = updatedZenParentStack.length-1
                // Update x, y positions based on the hierarchy level
                const x = componentLevel * 250 * Math.pow(-1, i); // Adjust the horizontal spacing between nodes
                const y = componentLevel * (250); // Adjust the vertical spacing between nodes

                componentInfo.position = { x, y };

                nodes.push(componentInfo);
                if (isReactComponent){
                    zenNodes.push(componentInfo)
                }
                if (componentInfo.id !== `${fileName}-${fileID}`) {
                    edges.push({
                        fileName: fileName,
                        fileID: fileID,
                        id: `${fileName}-${componentInfo.id}-${fileID}-${i++}`,
                        source: updatedParentStack[componentLevel - 1],
                        target: `${componentInfo.id}`,
                        type: 'smoothstep', // Type of edge
                        animated: false,
                    });
                    if(isReactComponent){
                        zenEdges.push({
                            fileName: fileName,
                            fileID: fileID,
                            id: `${fileName}-${componentInfo.id}-${fileID}-${i++}`,
                            source: updatedZenParentStack[zenComponentLevel - 1],
                            target: `${componentInfo.id}`,
                            type: 'smoothstep', // Type of edge
                            animated: false,
                        });
                    }
                }
                parentStack.push(componentInfo.id);
                if(isReactComponent) zenParentStack.push(componentInfo.id);
            }
            if (path.node.selfClosing) { 
                parentStack.pop();
                zenParentStack.pop() }
        },
        JSXClosingElement() { 
            parentStack.pop();
         }
    });

    return { nodes, edges, zenNodes ,zenEdges };
}

module.exports = parseJSXContent;