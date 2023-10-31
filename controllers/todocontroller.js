module.exports = function(app){
    
app.get('/todo', (req, res) => {
    res.render(__dirname + '/views/todo');
});

app.post('/todo', (req, res) => {
    
});

app.delete('/todo', (req, res) => {
    
});

};