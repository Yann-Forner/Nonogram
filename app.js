var express = require("express");
var mustache = require('mustache-express');
var app = express();
var mysql = require('mysql');
app.use(express.urlencoded());

app.use(express.static('.'));
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', './views');

var sql = mysql.createConnection({
    host: 'mysql-forner-yann.alwaysdata.net',
    user: '148620',
    password: 'YannForner83',
    database: 'forner-yann_bd1'
});


app.get('/',(req,res) => {
    res.render('index',{});
});

app.get('/createNonoGram',(req,res) => {
    res.render('createNonoGram',{});
});

app.get('/playNonoGram',(req,res) =>{
    sql.connect((err) => {
        sql.query('SELECT * FROM NonoGram ', (err, result, fields) => {
            if (err) throw err;
           var myResult = result;
            res.render('playNonoGram',{myResult : myResult});
        });
    });

});

app.get('/nonoGramDetails/:id',(req,res)=>{
    sql.connect((err) => {
        sql.query('SELECT * FROM NonoGram WHERE id = ?',[req.params.id] , (err, result, fields) => {
            if (err) throw err;
            var myResult = result;
            var myStrNonoGram = myResult[0]['nonoGram'];
            var myArrayNonoGram = [];
            for(var z=0; z<11; z++) {
                myArrayNonoGram[z] = [11];
            }
            let i = 1;
            let j = 0;
            let indexStr = 0;
            for (let x = 0; x < 11; x++){
                myArrayNonoGram[j][x] = 3;
            }
            for (let x = 0; x <11; x++){
                myArrayNonoGram[x][0] = 3;
            }
            ++j;
            while(indexStr < myStrNonoGram.length){
                if(myStrNonoGram[indexStr] === ';'){
                    i=1;
                    ++j;
                }else{
                    myArrayNonoGram[j][i] = myStrNonoGram[indexStr];
                    ++i;
                }

                ++indexStr;


            }
            res.render('detailsNonoGram',{myArrayNonoGram : myArrayNonoGram, name : myResult[0]['name'], id : req.params.id});
        });
    });
});

app.post('/importedNonoGram',(req,res) =>{
    var myStrArr = "";
    for (let i  = 0; i < req.body.myArray.length ; ++i ) {
        for (let j  = 0; j < req.body.myArray[0].length ; ++j ){
            myStrArr+= req.body.myArray[i][j];
        }
        myStrArr += ";"
    }
    sql.connect((err) => {
        sql.query('INSERT INTO NonoGram VALUES (null ,? , ?)',[req.body.nameNono,myStrArr], (err, result, fields) => {
            if (err) throw err;
            res.redirect("/");
        });
    });

});


app.listen(3000, () => console.log('movie server at http://localhost:3000'));