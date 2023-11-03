let bodyParser = require('body-parser');
let mongoose = require('mongoose');

//Connect to the db
mongoose.connect('mongodb+srv://user:Aa123456@todo.pnlwzxo.mongodb.net/')

//Createe a schema 
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
var itemOne = new Todo({item: 'get flowers'});
itemOne.save()
  .then(() => {
    console.log('Item saved');
  })
  .catch((err) => {
    console.error(err);
  });

let data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
let urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
    
app.get('/todo', (req, res) => {
    res.render(__dirname + '/views/todo', {todos: data});
});

app.post('/todo', urlencodedParser, (req, res) => {
    console.log(urlencodedParser);
    data.push(req.body);
    console.log(req.body);
    console.log(data);
    res.json(data);
    console.log(res);
});

app.delete('/todo', (req, res) => {
    data = data.filter((todo) => {
        return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.json(data);
});

};