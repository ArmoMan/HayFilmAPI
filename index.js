var http = require('http');
// var dt = require('./jsonApi.json');
let fs = require("fs");
let fetch = require("cross-fetch");
const express = require('express')
const app = express()
require('dotenv').config();
const API_URL = process.env.API_URL;
const port = process.env.PORT;



function getAPI() {
    
    console.log("hello ");

    //get api and extracting url part
    async function getOurApi(){
        const response = await fetch(API_URL);
        const data = await response.json();
        const getFiles = data.result.files;
        const urlList = new Array();
        const nameList = new Array();
        for(let i = 0; i < getFiles.length;i++){
            const getUrlOfMovie = data.result.files[i].file_code;
            const getTitleMovie = data.result.files[i].title;
            urlList[i] = getUrlOfMovie;
            nameList[i] = getTitleMovie;
            //console.log(getUrlOfMovie)
        }

        //add to json File:
        // let jsonBody ={ urlList};
        // let str = JSON.stringify(jsonBody);
        // fs.writeFile("jsonApi.json", str, function(error) {
        //     if (error) {
        //         console.log("Error");
        //     } else {
        //         console.log("Success");
        //     }
        //  });


         //creating api on localhost:3000/api
         app.get('/api', (req, res) => {
         res.json({urlList,nameList})
         })

         

        setTimeout(getOurApi,50000);
        // setTimeout(getOurApi,(20*60*1000));

        
    }
    //outside because I cant reuse same port as I already used it once
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
    getOurApi()
    


}
getAPI();


