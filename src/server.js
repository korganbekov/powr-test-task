'use strict';

//const pgp = require('pg-promise')(/* initialization options */);

/*
const cn = {
    host: 'localhost', // server name or IP address;
    port: 5432,
    database: 'mydb',
    user: 'postgres',
    password: '12345'
};

const db = pgp(cn); // database instance;
*/

const { Client } = require('pg');
/*
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'mydb',
    password: '12345',
    port: 5432,
});
*/
const client = new Client({
    user: 'fdjzoyctivydpu',
    host: 'ec2-34-202-66-20.compute-1.amazonaws.com',
    database: 'd4s2s6rvijmk3j',
    password: '28a413ba929ed56e355657308cc965e278c279b72a02e66d7f020a63edd3bd24',
    port: 5432,
});
client.connect();

/*
const query = `
CREATE TABLE users (
    email varchar,
    firstName varchar,
    lastName varchar,
    age int
);
`;

client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Table is successfully created');
    client.end();
});
*/
/*
const query = `
INSERT INTO users (email, firstName, lastName, age)
VALUES ('johndoe@gmail.com', 'john', 'doe', 21)
`;
client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Data insert successful');
    client.end();
});
*/
/*
const query = `
CREATE TABLE boxes (
    json_string varchar

);
`;

client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Table is successfully created');
    client.end();
});
*/
/*
const query1 = `
INSERT INTO boxes (json_string)
VALUES ('121212')
`;
client.query(query1, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Data insert successful');
    //client.end();
});
*/





var path = require('path');
var express = require('express');

var app = express();

var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));

// Allows you to set port in the project properties.
app.set('port', process.env.PORT || 5000);
 // здесь у нас происходит импорт пакетов и определяется порт нашего сервера
//  app.use(favicon(__dirname + '/build/favicon.png')); 
 
 //здесь наше приложение отдаёт статику
 app.use(express.static(__dirname));
 app.use(express.static(path.join(__dirname, 'build')));


//простой тест сервера
app.get('/ping', function (req, res) {
const value = req.query.value;
const id = Math.floor(Math.random() * 1000);
const query2 = `
INSERT INTO boxes (id, json_string)
VALUES (${id}, '${value}')
`;
client.query(query2, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Data insert successful');
    //client.end();
});
    return res.send(value);
});

app.get('/box', function (req, res) {
    const id = req.query.id;
    
    const query2 = `
        SELECT * FROM boxes WHERE id = ${id} 
    `;
/*
    const result = client.query({
        rowMode: 'array',
        //text: 'SELECT 1 as one, 2 as two;',
        text: `SELECT * FROM boxes WHERE id = ${id} as result1`
      })
      console.log(result.rows) // [ [ 1, 2 ] ]
*/
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
    //res.sendFile(path.join(__dirname, 'build', 'index.html'));
    res.sendFile(path.join(__dirname, 'index.html'));
});

var server = app.listen(app.get('port'), function() {
    console.log('listening');
});