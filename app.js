let express = require('express');
let todocontroller = require(__dirname + '/controllers/todocontroller');

let app = express();

//set up template engine
app.set('view engine', 'ejs');

// static files 
app.use(express.static(__dirname + '/public'));

//fire controllers
todocontroller(app);

//listen to port
app.listen(3000);
console.log('You are listening to port 3000');