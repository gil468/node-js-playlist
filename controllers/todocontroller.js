let bodyParser = require('body-parser');
let mongoose = require('mongoose');

//Connect to the db
mongoose.connect('mongodb+srv://user:Aa123456@todo.pnlwzxo.mongodb.net/')

//Createe a schema 
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = new Todo({item: 'get flowers'});
// itemOne.save()
//   .then(() => {
//     console.log('Item saved');
//   })
//   .catch((err) => {
//     console.error(err);
//   });

//let data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
let data = {};
let urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
    
app.get('/todo', (req, res) => {
    //get data from mongodb and pass it to view
    Todo.find()
    .then(() => {
        res.render('todo', {todos: data});
      })
      .catch((err) => {
        console.error(err);
      });
    res.render(__dirname + '/views/todo', {todos: data});
});

app.post('/todo', urlencodedParser, (req, res) => {
    // get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err,data){
        if(err) throw err;
        res.json(data);
    });
});

app.delete('/todo', (req, res) => {
    //Delete the requested item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
        if (err) throw err;
        res.json(data);
    })
});

};