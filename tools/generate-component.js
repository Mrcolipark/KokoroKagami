const fs = require('fs');
const name = process.argv[2];
if (!name) throw new Error('Component name required');
const content = `import React from 'react';\nexport const ${name} = () => null;\n`;
fs.writeFileSync(`src/components/${name}.tsx`, content);
console.log(`Component ${name} created`);
