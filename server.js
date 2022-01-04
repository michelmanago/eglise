const express = require('express')
const next = require('next')
const bodyParser = require("body-parser")
var jsonParser = bodyParser.json()
const mysql = require('mysql')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const jsdom = require("jsdom");
const { JSDOM } = jsdom;  



var Request = require("request");

// local dev proxy
//const proxyUrl = "http://localhost:8080/mycoachnutrition";
// kiolis-server dev proxy
//const proxyUrl = "http://kiolis-server:1111";
//const proxyUrl = "https://wwww.lesmeilleuresrecettes.com";

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'EgliseDormition8',
  database: 'cimetiere'
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});




app.prepare()
.then(() => {
  const server = express()
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

   server.get('/index/:language', (req, res) => {
        const actualPage = '/index'
        let queryParams = {initialLanguage: req.params.language}
        app.render(req, res, actualPage, queryParams)
    })

   server.get('/index', (req, res) => {
        const actualPage = '/index'
        let queryParams = {initialLanguage: 'en'}
         app.render(req, res, actualPage, queryParams)
    })

   server.get('/', (req, res) => {
        const actualPage = '/index'
        let queryParams = {initialLanguage: 'en'}
        app.render(req, res, actualPage, queryParams)
    })

    server.get('/bio/:language', (req, res) => {
        const actualPage = '/bio'
        let queryParams = {initialLanguage: req.params.language}
        app.render(req, res, actualPage, queryParams)
    })

   server.get('/bio', (req, res) => {
        const actualPage = '/bio'
        let queryParams = {initialLanguage: 'fr'}
         app.render(req, res, actualPage, queryParams)
    })

    server.get('/paintings/:language', (req, res) => {
        const actualPage = '/paintings'
        let queryParams = {initialLanguage: req.params.language}
        app.render(req, res, actualPage, queryParams)
    })

   server.get('/paintings', (req, res) => {
        const actualPage = '/paintings'
        let queryParams = {initialLanguage: 'fr'}
         app.render(req, res, actualPage, queryParams)
    })

   server.get('/api/get-content/:content_type/:content_language', (req, res) => {
      let sql = `SELECT * FROM ${req.params.content_type} WHERE language='${req.params.content_language}'`
//      console.log("sql = "+ sql)
      let query = db.query(sql, (err,results) => {
        if(err) throw err
        let jsonResults = JSON.stringify(results)
        res.send(jsonResults)
      })
    })


    server.get('/api/get-page-content/:name/:language', (req, res) => {
      let sql = `SELECT * FROM pageContent WHERE name='${req.params.name}' AND language='${req.params.language}'`
      let query = db.query(sql, (err,results) => {
        if(err) throw err
        if (results.length != 1) throw "length of results for get-pageContent is not 1"
        let jsonResults = JSON.stringify(results[0])
          res.send(jsonResults)
      })
    })

    server.get('/api/get-paintings/:language', (req, res) => {
      let sql = `SELECT * FROM paintings WHERE language='${req.params.language}'`
      let query = db.query(sql, (err,results) => {
        if(err) throw err
        let jsonResults = JSON.stringify(results)
        res.send(jsonResults)
      })
    })


  server.get('*', (req, res) => {
      return handle(req, res)
  })



  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})


