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
res.setHeader('Content-Type', 'application/json'); // first param is the header key(content-type), then key (which is text/plain)
res.setHeader('X-Powered-By', 'Node.js')
res.write('<h1>hello</h1>');
res.write('<h2>hello</h2>');
res.end(JSON.stringify({
    success:true,
    data: todos
    // the data coming back will be the todos. The parameter of res.end is an object, JSON.stringify is what is going to turn it into a string so it can be parsed as one
}); // to get a correct response back. ends teh response wihtout getting any data. as long as there is no error will always be a 200 response. when we make a request and get the data value back. when we use express we don't have to do stringify, or put the headers, but using node modules lets you know how things happen under the hood
});

const PORT = 5000; 

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
//in order to call our server, we jall the listen method on it which listens for a specific port
//typically we will have a variable (usually in the config file, but here we'll just set it to 5000)
//on the listen method, we put the port as a parameter, but we can also put down an optional parameter of function console.log a message saying the port is running