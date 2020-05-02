// this isn't project, this is just to learn HTTP 
//we're gonna use the core HTTP module instead of express which is lower level
// express gives us a whole bunch of utilities and methods that make things easier
// using this raw HTTP module will give us the understanding of the request/response cycle and header / content type etc

const http = require('http');
// this is, ofc, a core node module, it comes with node so we don't have to install it with npm. if we wanted to install a third party module like express, we'd have to use npm

const server = http.createServer((req, res) =>{
//this method allows us to create servers that take requests and send back responses
const { headers, method, url } = req;
console.log(headers, method, url);
//with this we're going to console.log the request object just so we can see what it looks like
res.end(); // to get a correct response back. ends teh response wihtout getting any data. as long as there is no error will always be a 200 response. 
});

const PORT = 5000; 

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
//in order to call our server, we jall the listen method on it which listens for a specific port
//typically we will have a variable (usually in the config file, but here we'll just set it to 5000)
//on the listen method, we put the port as a parameter, but we can also put down an optional parameter of function console.log a message saying the port is running