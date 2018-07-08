const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var data = require("./data.json");

var username;

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3500, () => {
    console.log('Listening on Port 3500');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/welcome.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/submitregister', (req, res) => {
    data.list.push({
        username: req.body.username,
        pass: req.body.pass,
        schedules: []
    });

    fs.writeFile('./data.json', JSON.stringify(data, null, 4));
    fs.writeFile(`./Users/${req.body.username}.html`, `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <style>
                body {
                    margin: 0;
                    font-family: Arial, Helvetica, sans-serif;
                    background-color: rgb(53, 53, 53);
                    color: rgb(255, 255, 255);
                }
          
                .topnav {
                    overflow: hidden;
                    background-color: rgb(88, 18, 18);
                }
          
                .topnav a {
                    float: left;
                    color: #ffffff;
                    text-align: center;
                    padding: 14px 16px;
                    text-decoration: none;
                    font-size: 17px;
                }
                
                .topnav a:hover {
                    background-color: rgb(223, 101, 101);
                    color: black;
                }
                
                .topnav a.active {
                    background-color: #FF0000;
                    color: white;
                }
    
                table, th, td {
                    border: 1px solid white;
                    border-collapse: collapse;
                }
            </style>
        <title>Deep's schedule planner</title>
    </head>
    <body>
        <div class="topnav">
            <a href="/">Home</a>
            <a href="/register">Register</a>
            <a href="/login">Login</a>
            <a href="./lol.html" class="active">Dashboard</a>
            <a href="./${req.body.username}_schedule.html">Schedule</a>
        </div>
        <div align="center"><h1>Your schedules</h1></div>
    
        <div style="margin-left: 10%; margin-right: 10%;">
            Logged in as <font color="indianred">${req.body.username}</font>.
            <br><br>
            Your schedules are presented below.
            <br>
            <br>
            <table style="width: 100%;">
                <tr>
                    <th>Date</th>
                    <th>Plan</th>
                </tr>
            </table>
        </div>
    </body>
    </html>`);

    fs.writeFile(`./Users/${req.body.username}_schedule.html`, `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <style>
                body {
                    margin: 0;
                    font-family: Arial, Helvetica, sans-serif;
                    background-color: rgb(53, 53, 53);
                    color: rgb(255, 255, 255);
                }
          
                .topnav {
                    overflow: hidden;
                    background-color: rgb(88, 18, 18);
                }
          
                .topnav a {
                    float: left;
                    color: #ffffff;
                    text-align: center;
                    padding: 14px 16px;
                    text-decoration: none;
                    font-size: 17px;
                }
                
                .topnav a:hover {
                    background-color: rgb(223, 101, 101);
                    color: black;
                }
                
                .topnav a.active {
                    background-color: #FF0000;
                    color: white;
                }
            </style>
        <title>Deep's schedule planner</title>
    </head>
    <body>
        <div class="topnav">
            <a href="/">Home</a>
            <a href="/register">Register</a>
            <a href="/login">Login</a>
            <a href="./Users/${req.body.username}.html">Dashboard</a>
            <a href="./Users/${req.body.username}_schedule.html" class="active">Schedule</a>
        </div>
        <div align="center"><h1>Create a new schedule item</h1></div>
    
        <div style="margin-left: 33%; margin-right: 33%;">
            Logged in as <font color="indianred">${req.body.username}</font>.
            <br><br>
            <form action="./${req.body.username}_submit" method="POST">
                Date: <input type="text" name="date"><br>
                Plan: <input type="text" name="plan"><br>
                <button type="submit">Submit</button>
            </form>
        </div>
    </body>
    </html>`);

    var username = req.body.username;

    fs.appendFile('./server.js', ``);

    res.sendFile(__dirname + '/submitregister.html');
});

app.post('./${username}_submit', (req, res) => {
    for(var i=0; i<data.list.length; i++) {
        if(data.list[i].username == username) {
            data.list[i].schedules.push({
                date: req.body.date,
                plan: req.body.plan
            });
        }
    }

    fs.writeFile();
});

app.post('/submitlogin', (req, res) => {
    for(var i=0; i<data.list.length; i++) {
        if(data.list[i].username == req.body.username) {
            if(data.list[i].pass == req.body.pass) {
                res.sendFile(__dirname + `/Users/${req.body.username}.html`);
            }
            else {
                res.sendFile(__dirname + '/nopassword.html');
            }
        }
    }
});