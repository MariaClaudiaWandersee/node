const http = require("http");

http
    .createServer((request, response) =>{
        response.writeHead(200, {'Content-Type': 'application/json'});
        
        if(request.url === '/produto') { //Rota produto
            response.end(JSON.stringify({ //Mensagem em formato JSON
                message: 'Rota de Produto'
            }));
        }
        
        if(request.url === '/usuario') { //Rota produto
            response.end(JSON.stringify({ //Mensagem em formato JSON
                message: 'Rota de Usuário'
            }));
        }

        response.end(JSON.stringify({
            message: 'Qualquer outra rota'
        }));
    })
    .listen(3001, () => console.log("Servidor está rodando na porta 3001"));