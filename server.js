'use strict';
// const { credentials } = require('./config.js');

const { Client } = require('pg');
// const { connectionString } = credentials.postgresHome;


const cs = {
    user: 'fdjzoyctivydpu',
    host: 'ec2-34-202-66-20.compute-1.amazonaws.com',
    database: 'd4s2s6rvijmk3j',
    password: '28a413ba929ed56e355657308cc965e278c279b72a02e66d7f020a63edd3bd24',
    port: 5432,
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
}

// let stroka = JSON.stringify(connectionString);


//const client = new Client({ stroka });
// client.connect();


/*
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'mydb',
    password: '12345',
    port: 5432,
});
client.connect();
*/

//heruko
const client = new Client({
    user: 'fdjzoyctivydpu',
    host: 'ec2-34-202-66-20.compute-1.amazonaws.com',
    database: 'd4s2s6rvijmk3j',
    password: '28a413ba929ed56e355657308cc965e278c279b72a02e66d7f020a63edd3bd24',
    port: 5432,
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
});
client.connect();

/*
//isilo.db.elephantsql.com (isilo-01)
const client = new Client({
    user: 'fdjzoyctivydpu',
    host: 'isilo.db.elephantsql.com',
    database: 'stgpjwmm',
    password: 'zpKt1B8wHmz_35Y69sCQBR1qzacXhvMi',
    port: 5432,
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
});
client.connect();
*/


const queryCreateBoxes = `
CREATE TABLE IF NOT EXISTS boxes (
    id SERIAL PRIMARY KEY,
    json_string varchar
);
`;

client.query(queryCreateBoxes, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('table boxes is created');
});

var path = require('path');
var express = require('express')  ;

var app = express();

//здесь наше приложение отдаёт статику
var staticPath = path.join(__dirname, '/');
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
 // здесь у нас происходит импорт пакетов и определяется порт нашего сервера
//  app.use(favicon(__dirname + '/build/favicon.png'));
// app.use(cookieParser(credentials.cookieSecret)) 
 

// Allows you to set port in the project properties.
app.set('port', process.env.PORT || 8081);

//простой тест сервера
app.get('/ping', function (req, res) {
const value = req.query.value;
const id = Math.floor(Math.random() * 1000);
const query2 = `
INSERT INTO boxes (json_string)
VALUES ('${value}')
`;
client.query(query2, (err, result) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Data insert successful');
    console.log('Get data successful');
    console.log('result', result.rows);
    res.status(200);
    return res.send(result.rows);
});
    return res.send(value);
});

app.get('save', function(req, res) {
    const value = req.query.value;
    const id = Math.floor(Math.random() * 1000);
    const query2 = `
    INSERT INTO boxes (json_string)
    VALUES ('${value}')
    `;
    client.query(query2, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data insert successful');
        console.log('Get data successful');
        console.log('result', result.rows);
        res.status(200);
        return res.send(result.rows);
    });
        return res.send(value);
    });

app.get('/box', function (req, res) {
    const id = req.query.id;
    
    const query2 = `
        SELECT * FROM boxes WHERE id = ${id} 
    `;

    client.query(query2, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Get data successful');
        console.log('result', result.rows);
        res.status(200);
        return res.send(result.rows);

 //res.end();
    });
    
    //return res.send(id);
});

app.get('/boxes', function (req, res) {
    const id = req.query.id;
    
    const query2 = `
        SELECT * FROM boxes
    `;

    client.query(query2, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Get data successful');
        console.log('result', result.rows);
        res.status(200);
        return res.send(result.rows);

 //res.end();
    });
    
    //return res.send(id);
});


//обслуживание html
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
    //res.sendFile(path.join(__dirname, '../public/index.html'));
});

var server = app.listen(app.get('port'), function() {
    console.log('listening');
});
 