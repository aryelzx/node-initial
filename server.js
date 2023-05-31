const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    if(req.url === '/'){
        res.end('home page\n');
    }
    else if(req.url === '/produtos'){
        res.end('produto page\n');
    }
    else if(req.url === '/usuarios'){
        res.end('usuarios page\n')
    }
    else {
        res.end('pagina nao encontrada\n');
    }
}).listen(3000, () => console.log('Server running at http://localhost:3000/'))