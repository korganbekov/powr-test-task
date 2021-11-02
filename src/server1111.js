var sql = require("mssql");
    // config for your database
    var config = {
        user: 'sa',
        password: 'Aa123456',
        server: 'DESKTOP-FAD4D0G', 
        database: 'Docz9',
        synchronize: true,
        trustServerCertificate: true,
    };


const express = require('express');
const bodyParser = require('body-parser');
const paginate = require('express-paginate');

const app = express();

// keep this before all routes that will use pagination
app.use(paginate.middleware(10, 50));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get('/getdocs', function (req, res) {
    
    // connect to your database
    sql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
	const url = req.originalUrl
//	const id = req.query.id
	const query = req.query.type ? `select * from Documents where DocumentType like  \'${req.query.type}\'` : `select * from Documents`
        // query to the database and get the records
        request.query(query, function (err, recordset) {
            if (err) console.log('getDOcs', err)
            // send records as a response
            res.send(recordset);
        });
    });
});

app.get('/getdocs1', function(req, res, next){
	sql.connect(config, function (err){
		// create Request object
        	var request = new sql.Request();
		const url = req.originalUrl
	//	const id = req.query.id
/*
		const query = req.query.id ? `select * from UserProfiles where id = ${req.query.id}` : `select * from UserProfiles`
*/

console.log('req', req.query.page, req.query.limit, req.query);
//return

const query = `select * from Documents order by [title] offset ${req.query.page} rows FETCH next ${req.query.limit} rows only`;
	        // query to the database and get the records
        	request.query(query, function (err, recordset) {
	            if (err) console.log('getUsers.',  err)
        	    // send records as a response
	            //res.send(recordset );
var result = {
	documents: recordset,
	page: req.query.page
};
res.send(result);

/*
			return res.render('documents', {
        			documents: recordset,
	        		page: req.query.page,
  //      			itemCount,
	        		//pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
			});
*/
        	});

	})
	
})


app.get('/getusers', function (req, res){
	sql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
	const url = req.originalUrl
//	const id = req.query.id
	const query = req.query.id ? `select * from UserProfiles where id = ${req.query.id}` : `select * from UserProfiles`
        // query to the database and get the records
        request.query(query, function (err, recordset) {
            if (err) console.log('getUsers. Id=', id, err)
            // send records as a response
            res.send(recordset);
        });
    });
})

app.get('/getequipmentstatuses', function (req, res){
	sql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
	const url = req.originalUrl
//	const id = req.query.id
	const query = req.query.id ? `select * from EquipmentStatus where id = ${req.query.id}` : `select * from UserProfiles`
        // query to the database and get the records
        request.query(query, function (err, recordset) {
            if (err) console.log('getEquipmentStatus. Id=', err)
            // send records as a response
            res.send(recordset);
        });
    });
})

app.post('/postequipmentstatuses', (req, res) => {
    console.log('Got body:', req.body);
res.status(200).json({
         status: 'success',
         message: 'Запись в базе создана',
      });
res.sen
});

app.post('/postequipmentstatuses1', function (req, res, next) {
	if(!req.body) return res.sendStatus(400);
	console.log('req.body', req.body);


	sql.connect(config, function (err) {
        	if (err) console.log(err);
	        // create Request object
	        var request = new sql.Request();
		const query = `INSERT INTO EquipmentStatus (Status, DisplayNameEng) VALUES ('${req.body.Status}', 	'${req.body.DisplayNameEng}')`
		console.log('query', query)
        	// query to the database and get the records
	        request.query(query, function (err, recordset) {
        		if (err) {
				console.log('postEquipmentStatus.', err)
				return res.sendStatus(500);
			}
        	});
	});

	return res.sendStatus(200);

})
 
var server = app.listen(5000, function () {
    console.log('http://localhost:5000 server is running..');
});