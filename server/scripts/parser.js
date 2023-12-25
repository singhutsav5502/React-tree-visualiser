const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;

function extractComponents(node, parent = null, parentStack = [], fileName, fileID, i) {
    if (node.type === 'JSXOpeningElement') {
        const componentName = `${node.name.name}- Element No. ${i}`;
        const props = {};
        node.attributes.forEach((attribute) => {
            if (attribute.type === 'JSXAttribute') {
                const attributeName = attribute.name.name;
                if (attribute.value && attribute.value.type === "Literal") {
                    props[attributeName] = attribute.value.value;
                }
                else if(attribute.name.name==='className'){
                    props[attributeName]= attribute.value.value;
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
            type: 'treeNode',
            data: { label: componentName, props,isSelected:false }, // Include props in the data
            position: { x: 0, y: 0 },
            parent,
        };
        return { componentInfo, parentStack: [...parentStack, componentName] };
    }
    return { componentInfo: null, parentStack };
}

function parseJSXContent(jsxContent, fileName, fileID) {
    let i = 1;
    const ast = parse(jsxContent, {
        sourceType: 'module',
        plugins: ['jsx'],
    });
    const hasSourceEdge= new Set([])
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
        data: { label: `${fileName}`, props: rootProps , isSelected:false }, // Include root props in the data
        position: { x: 0, y: 0 },
        type: 'treeNode'
    };
    const nodes = [rootComponent];
    const edges = [];
    let parentStack = [`${fileName}-${fileID}`]; // ID of root element

    traverse(ast, {
        JSXOpeningElement(path) {
            const { componentInfo, parentStack: updatedParentStack } = extractComponents(path.node, null, parentStack, fileName,fileID, i);

            if (componentInfo) {
                const componentLevel = updatedParentStack.length - 1;

                // Update x, y positions based on the hierarchy level
                const x = componentLevel * 250 * Math.pow(-1, i); // Adjust the horizontal spacing between nodes
                const y = componentLevel * (250); // Adjust the vertical spacing between nodes

                componentInfo.position = { x, y };

                nodes.push(componentInfo);

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
                    hasSourceEdge.add(updatedParentStack[componentLevel - 1]); // Source Edge Set
                }
                parentStack.push(componentInfo.id);
            }
            if (path.node.selfClosing) { parentStack.pop(); }
        },
        JSXClosingElement() { parentStack.pop(); }
    });

    return { nodes, edges , hasSourceEdge };
}

module.exports = parseJSXContent;