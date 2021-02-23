//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
//var sql = require("mssql");
var sql = require("mssql/msnodesqlv8");
var app = express();

// Body Parser Middleware
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
  //Enabling CORS 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
  next();
});

//Setting up server
var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

//Initiallising connection string
var dbConfig = {
  driver: "msnodesqlv8",
  connectionString: 'Driver={SQL Server Native Client 11.0};Server ={http://SQL5102.site4now.net}; database={DB_A6FA75_ShahzaibUI_admin} ; password=12qwaszx; trusted connection={yes}',

  options: {
    //trustedConnection: true,
    enableArithAbort: true,
    // useUTC: true
  }
};

//Function to connect to database and execute query
var executeQuery = function (res, query) {
  sql.connect(dbConfig, function (err) {
    if (err) {
      console.log("Error while connecting database :- " + err);
      return res.send(err);
    }
    else {
      // create Request object
      var request = new sql.Request();
      // query to the database
      request.query(query, function (err, resp) {
        if (err) {
          console.log("Error while querying database :- " + err);
          return res.send(err);
        }
        else {
         return res.send(resp);
        }
      });
    }
  });
}

//GET API
app.get("/api/user", function (req, res) {
  var query = 'select * from Callers';
  executeQuery(res, query);
  //  res.send('hello');
});

app.post("/api/username", function (req, res) {
  const Sana = req.body;
  console.log(Sana);
  var query = ` INSERT INTO [Callers]  (Name,Email,PhoneNo,Password) VALUES ('${req.body.Name}','${req.body.Email}','${req.body.PhoneNo}','${req.body.Password}')`

  executeQuery (res, query);
  
});
//For Login Caller
app.post("/api/login", function (req, res) {
 
  //var query = ` SELECT  *  FROM [FYP].[dbo].[Callers] where  [Email]='${req.body.Email}' and [Password] ='${req.body.Password}'`
  var query = 'select count(*) from Callers where Email='+'\''+req.body.email+'\'';
  sql.connect(dbConfig, function (err) {
    if (err) {
      console.log("Error while connecting database :- " + err);
      return res.send(err);
    }
    else {
      var request = new sql.Request();

      request.query(query , function (err, resp) {
        if (err) {
          console.log("Error while querying database :- " + err);
          return console.log(err);
        }
        //console.log(resp.recordset);
         res.send(resp.recordset);
         console.log(resp.recordset);
         console.log(resp.recordset[0]);
         for (var key in resp.recordset[0]) {
          console.log("Key: " + key);
          console.log("Value: " + resp.recordset[0][key]);
          console.log(resp.recordset[0][key]);
      }
      })
    }
  })
});

//For SIgnUp o register Caller
app.post("/api/userSignUp", function (req, res) {
 var query='INSERT INTO [dbo].[Callers] ([Name] ,[PhoneNo] ,[Email] ,[Password])VALUES ( '+ '\'' +req.body.Name+'\'' +','+ '\'' +req.body.phoneNo+'\'' +','+ '\'' +req.body.email+'\'' +','+ '\'' +req.body.password+'\'' +')'

   sql.connect(dbConfig, function (err) {
    if (err) {
      console.log("Error while connecting database :- " + err);
      return res.send(err);
    }
    else {
      var request = new sql.Request();

      request.query(query , function (err, resp) {
        if (err) {
          console.log("Error while querying database :- " + err);
          return console.log(err);
        }
         res.send('Added Successfully');
      })
    }
  })
});

//For Login Caller
app.post("/api/driverlogin", function (req, res) {
 
  //var query = ` SELECT  *  FROM [FYP].[dbo].[Callers] where  [Email]='${req.body.Email}' and [Password] ='${req.body.Password}'`
  var query = 'select count(*) from Drivers where Email='+'\''+req.body.email+'\' and Password='+'\''+req.body.password+'\'';
  sql.connect(dbConfig, function (err) {
    if (err) {
      console.log("Error while connecting database :- " + err);
      return res.send(err);
    }
    else {
      var request = new sql.Request();

      request.query(query , function (err, resp) {
        if (err) {
          console.log("Error while querying database :- " + err);
          return console.log(err);
        }
        //console.log(resp.recordset);
         res.send(resp.recordset);
         console.log(resp.recordset);
         console.log(resp.recordset[0]);
         for (var key in resp.recordset[0]) {
          console.log("Key: " + key);
          console.log("Value: " + resp.recordset[0][key]);
          console.log(resp.recordset[0][key]);
      }
      })
    }
  })
});

  
//For SignUp /register Driver
app.post("/api/driversignup", function (req, res) {
  var query=`INSERT INTO [dbo].[Drivers] ([Name],[PhoneNo],[Email],[CNIC],[V_ID],[L_ID],[Password],[Status])VALUES ( '${req.body.name}','${req.body.email}','${req.body.phoneNo}','${req.body.CNIC}','${req.body.V_ID}','${req.body.L_ID}','${req.body.password}','${req.body.status}')`
   console.log(query);
  // res.send('Added Successfull');

  sql.connect(dbConfig, function (err) {
   if (err) {
     console.log("Error while connecting database :- " + err);
     return res.send(err);
   }
   else {
     var request = new sql.Request();

     request.query(query , function (err, resp) {
       if (err) {
         console.log("Error while querying database :- " + err);
         return console.log(err);
       }
        res.send('Added Successfully');
     })
   }
 })
 
 })


//   var query = ` SELECT  [C_ID]  FROM [FYP].[dbo].[Callers] where  [Email]='${req.body.Email}' and [Password] ='${req.body.Password}'`

//  // execut)eQuery (res, query);
//  res.send('sahi hai');
// sql.connect(dbConfig,function(err) {
//   if (err) throw err;
//   /*Select all customers with the address "Park Lane 38":*/
//   con.query(`SELECT  [C_ID]  FROM [FYP].[dbo].[Callers] where  [Email]='${req.body.Email}' and [Password] ='${req.body.Password}'`, function (err, result) {
//     if (err) throw err;
//     console.log(result);
//   });



//res.send('hello');
  // sql.connect(dbConfig, function (err) {
  //   if (err) {
  //     console.log("Error while connecting database :- " + err);
  //     return res.send(err);
      
  //   }
  //   else {

  //     // query to the database
  //     request.query(query, function (err, resp) {
  //       if (err) {
  //         console.log("Error while querying database :- " + err);
          
  //         return res.send(err);
  //       }
  //       else {
  //         return res.send(resp);
  //       }
  //     });
  //   }
  // })
//LOgIN

// app.post("/api/username", function(req , res){
//   const Sana=req.body;
//  console.log(Sana);
//   var query = ` INSERT INTO [Callers]  (Name,Email,PhoneNo,Password) VALUES ('${req.body.Name}','${req.body.Email}','${req.body.PhoneNo}','${req.body.Password}')`

// //executeQuery (res, query);
//   res.send('hello');

//////////////////////



// //POST API
//  app.post("/api/user", function(req , res){
//                 var query = "INSERT INTO [Callers] (Name,Email,Password) VALUES (req.body.Name,req.body.Email,req.body.Password”);
//                 executeQuery (res, query);
// });

// //PUT API
//  app.put("/api/user/:id", function(req , res){
//                 var query = "UPDATE [user] SET Name= " + req.body.Name  +  " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
//                 executeQuery (res, query);
// });

// // DELETE API
//  app.delete("/api/user /:id", function(req , res){
//                 var query = "DELETE FROM [user] WHERE Id=" + req.params.id;
//                 executeQuery (res, query);
// });



i.listen(server , () => {

  console.log(`listening to the port at ${server}`)

})