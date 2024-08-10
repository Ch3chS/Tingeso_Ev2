const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

const backendServer = process.env.BACKEND_SERVER;
const backendPort = process.env.BACKEND_PORT;

const replaceEnvVariables = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');

    content = content.replace(/__BACKEND_SERVER__/g, backendServer);
    content = content.replace(/__BACKEND_PORT__/g, backendPort);

    fs.writeFileSync(filePath, content, 'utf8');
};

replaceEnvVariables(indexPath);
