var http = require("http");

var players = {};

function log(str) {
    var d = new Date();
    console.log('[' + d.toLocaleTimeString() + '] ' + str);
}

function player_complete(playername, labname) {
    log('VICTORY: player "' + playername + '" won "' + labname + '"');
    if (players[playername]) {
        players[playername].push(labname);
        players[playername] = players[playername].sort();
    } else {
        players[playername] = [labname];
    }
}

function request_handler(request, response) {
    var player;
    switch (request.method) {
        case 'GET':
            handle_get(request, response);
            break;
        case 'POST':
            handle_post(request, response);
            break;
    }
}

function handle_post(request, response) {
    log('POST received');
    request.on('data', handle_post_data.bind(response));
    request.on('end', handle_post_end);
}

function handle_post_data(data) {
    var playerwon;
    log('POST data received: ' + data);
    try {
        var playerwon = JSON.parse(data);
        player_complete(playerwon.name, playerwon.lab);
        this.writeHead(200);
    } catch (e) {
        this.write('Invalid Data: POST data must be valid JSON.');
        this.writeHead(400);
        log('POST client sent invalid JSON, returned 400');
    }
    this.end();
}

function handle_post_end() {
    log('POST complete');
}

function handle_get(request, response) {
    var response_body = JSON.stringify(players);
    log('GET received');
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(response_body);
    response.end();
    log('GET sent this to client: ' + response_body);
}


var server = http.createServer(request_handler);
server.listen(8088);
log("Server is listening");
