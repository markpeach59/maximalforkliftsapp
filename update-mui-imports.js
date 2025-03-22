const fs = require('fs');
const path = require('path');

// Directory to search for files
const componentsDir = path.join(__dirname, 'src/components');
const styleDir = path.join(__dirname, 'src/style');

// Function to update imports in a file
function updateImports(filePath) {
  try {
    // Read the file
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the file contains Material-UI imports
    if (content.includes('@material-ui/core')) {
      console.log(`Updating imports in ${filePath}`);
      
      // Replace Material-UI imports with MUI imports
      content = content.replace(/@material-ui\/core\/([A-Za-z]+)/g, '@mui/material/$1');
      content = content.replace(/@material-ui\/core\/styles/g, '@mui/material/styles');
      content = content.replace(/@material-ui\/icons\/([A-Za-z]+)/g, '@mui/icons-material/$1');
      
      // Handle direct imports from @material-ui/core
      content = content.replace(/import\s+{([^}]+)}\s+from\s+["']@material-ui\/core["']/g, (match, importList) => {
        const imports = importList.split(',').map(item => {
          const trimmed = item.trim();
          return `import ${trimmed} from "@mui/material/${trimmed}"`;
        });
        return imports.join(';\n');
      });
      
      // Write the updated content back to the file
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated imports in ${filePath}`);
    }
  } catch (error) {
    console.error(`Error updating imports in ${filePath}:`, error);
  }
}

// Function to recursively process files in a directory
function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      // Recursively process subdirectories
      processDirectory(filePath);
    } else if (stats.isFile() && (file.endsWith('.js') || file.endsWith('.jsx'))) {
      // Update imports in JavaScript and JSX files
      updateImports(filePath);
    }
  }
}

// Process the components and style directories
console.log('Updating Material-UI imports to MUI v5...');
processDirectory(componentsDir);
processDirectory(styleDir);
console.log('Import update complete!');
