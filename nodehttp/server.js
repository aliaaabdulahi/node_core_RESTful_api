// this isn't project, this is just to learn HTTP 
//we're gonna use the core HTTP module instead of express which is lower level
// express gives us a whole bunch of utilities and methods that make things easier
// using this raw HTTP module will give us the understanding of the request/response cycle and header / content type etc

const http = require('http');
// this is, ofc, a core node module, it comes with node so we don't have to install it with npm. if we wanted to install a third party module like express, we'd have to use npm

//mock data for API
const todos = [
    {id: 1, text: 'todo one'},
    {id: 2, text: 'todo two'},
    {id: 3, text: 'todo three'}
] // this is hard coded data but it would come from a database for a real application

const server = http.createServer((req, res) =>{
//this method allows us to create servers that take requests and send back responses
// res.statusCode = 200; // how to manually send a status code (right now its automatic)
// res.setHeader('Content-Type', 'application/json'); // first param is the header key(content-type), then key (which is text/plain)
// res.setHeader('X-Powered-By', 'Node.js');

const { method, url } = req;

let body = [];

req.on('data', chunk => {
    body.push(chunk)
}).on('end', () => {
    body = Buffer.concat(body).toString();

    let status = 404;
    const response = {
        success: false,
        data: null,
        error: null
    };

    if (method === 'GET' && url === '/todos') {
        status = 200;
        response.success = true;
        response.data = todos;
    } else if (method === 'POST' && url === '/todos') { 
       const { id, text} = JSON.parse(body);

       if (!id || text) {
        status=404;
        response.error = 'please add id and text';
       } else {
        todos.push({ id, text});
        status = 201;
        response.success = true;
        response.data = todos;
       }
    }

    // examples of how a get and post request would be done with just pure node core HTTP module
    // one req of an event data, we pass parameter chunk to be pushed onto the body array 
    // body array is a concatinated version of body
    // we will make teh status 404 when it starts
    // the status will default to null and false
    // the only exception is if they go to the specific routes we wrote
    // and if they are post and get methods
    // id and text are properties of the JSON
    // if there is no id or text then there is an error
    //else push the id and text object to the body with a 201 error
    //and change the default response as well



    res.writeHead(status, { //how to set status code & header information at once
        'Content-Type': 'application/json',
        'X-Powered-By': 'Node.js'
    });

    res.end(
        JSON.stringify(response)
    )
    // res.end(JSON.stringify({
    //     success:false, //set this false to indicate that its a 404
    //     data: null,
    //     error: 'Not Found' //null bc not found
    //     // the data coming back will be the todos. The parameter of res.end is an object, JSON.stringify is what is going to turn it into a string so it can be parsed as one
    // })); // to get a correct response back. ends teh response wihtout getting any data. as long as there is no error will always be a 200 response. when we make a request and get the data value back. when we use express we don't have to do stringify, or put the headers, but using node modules lets you know how things happen under the hood


    // we need to move what we need to in this method bc this is where we actually have access to the body data 
}) // you have to listen to the request and the request is a readable stream of data and events. rquest on certain events, so on data, we take in chunk parameter, we push chunk onto body & on event 'end' , we have access to buffer, which lets us concat to the body

});

const PORT = 5000; 

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
//in order to call our server, we jall the listen method on it which listens for a specific port
//typically we will have a variable (usually in the config file, but here we'll just set it to 5000)
//on the listen method, we put the port as a parameter, but we can also put down an optional parameter of function console.log a message saying the port is running