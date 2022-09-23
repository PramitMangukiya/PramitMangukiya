var http = require("http");
var fs = require("fs");
var qs = require("querystring");

function homepage(request,response){
    fs.readFile("index.html",(error, data)=>{
        if(error){
            response.writeHead(404);
            response.write(error.tostring());
            response.end();
            return;
        }
        response.writeHead(200);
        response.write(data);
        response.end();
    });
}

function createpage(request,response){
    console.log("request",request.body);
    {
        if(request.method === "post"){
            var body= "";
            request.on("data",function(data){
                body+=data;
            });
            request.on("end",function(){
                console.log("body",body);
                var post = qs.parse(body);
                console.log("post",post);

                fs.readFile("data.json",(error,data)=>{
                    var output = [];
                    if(error){

                    }else{
                        output = JSON.parse(data);
                    }
                    output.push(post);
                    console.log("output",output);
                });
            });
        }
    }
    response.end();
}

function defaultPage(request, response){
    fs.readFile(__dirname+request.url,(error,data)=>{
        if(error){
            response.writeHead(404);
            response.write(error.tostring());
            response.end();
            return;
        }
        response.writeHead(200);
        response.write(data);
        response.end();
    });
}

const app = http.createServer(function(request,response){
    console.log("request.url",request.url);
    switch(request.url){
        case "/":
            homePage(request,response);
            break;
        case "createPage":
            createPage(request,response);
            break;
        default:
            defaultPage(request,response);
    }
});

app.listen(3000);
