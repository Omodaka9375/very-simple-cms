var askQuestions = require('ask-questions');
var fse = require('fs-extra');
var ascrt = require('asciiart-logo');
var rimraf = require('rimraf');
var fs = require('fs');
var mkdirp = require('mkdirp');
var directoryExists = require('directory-exists');

var configUri = "./proto/client/data/config.json";

var localClientPath = "./your_website";

var nodulePath= "./proto/client";

var confs = [];

var question1 = {
    title: 'Enter Your Webiste Name:'
};
var question2 = {
    head: 'Do you need header? (y/n)'
};
var question3 = {
    isbody: 'Do you want example content? (y/n)'
};
var question4 = {
    isAboutme: 'Do you need about me on the page? (y/n)'
};
var question5 = {
    isSocial: 'Do you need social links on the page? (y/n)'
};
var question6 = {
    isFooter: 'Do you need footer on the page? (y/n)'
};
var question7 = {
    isNavbar: 'Do you need navbar on the page? (y/n)'
};
var question7a = {
    navbarPosition: 'Where do you need navbar on the page? (left/right/both)'
};

function startApp(){
    console.log(
        ascrt({
        name: 'Very-Simple-CMS',
        font: 'Speed',
        lineChars: 20,
        padding: 2,
        margin: 1,
        borderColor: 'grey',
        logoColor: 'bold-green',
        textColor: 'green'
        })
        .emptyLine()
        .wrap('Create static webpages with dynamic content in terminal!')
        .right('version 1.0.0')
        .render()
    );
    getDetails();
}

function getDetails(){

askQuestions(question1).then((function (answer) {
    confs[0]=answer.title;
    askQuestions(question2).then(function(answer) {
        confs[1]=answer.head;
            askQuestions(question3).then(function(answer) {
                confs[2] = answer.isbody;
                askQuestions(question4).then(function(answer) {
                    confs[3] = answer.isAboutme;
                    askQuestions(question5).then(function(answer) {
                        confs[4] = answer.isSocial;
                        askQuestions(question6).then(function(answer) {
                            confs[5] = answer.isFooter;
                            askQuestions(question7).then(function(answer) {
                                confs[6] = answer.isNavbar; 
                                if(confs[6] === "y"){
                                    askQuestions(question7a).then((function(answer) {
                                        confs[7] = answer.navbarPosition; 
                                        sendData();  
                                    }));
                                } else {
                                confs[7] = "left";
                                sendData(); 
                                }               
                            });
                        });
                    });
                });
            });     
    });    
}));
}

function sendData(){ 
    var m;
    fs.readFile(configUri, function(err, contents) {

        if (err) {
            throw err;
        }
         m = JSON.parse(contents);
        for (var i = 0, len = m.length; i < len; ++i) {
            if(i===0)
            m[i].active = confs[1];
    
            if(i===1){
            m[i].active = confs[6];
            m[i].position = confs[7];
            }
    
            if(i===2)
            m[i].active = confs[2];
    
            if(i===3)
            m[i].active = confs[3];
    
            if(i===4)
            m[i].active = confs[4];
    
            if(i===5)
            m[i].active = confs[5];
    
            if(i===6)
            m[i].title = confs[0];
    
        }
        fs.writeFile(configUri, JSON.stringify(m), function(err) {
            if(err) {
                return console.log(err);
            }
        
            directoryExists(localClientPath,function (err, result) {
                if(err) {
                    return console.log(err);
                }
              console.log(result); 
              if (result){// result is a boolean
        
                rimraf(localClientPath, function () { 
            
                });

                mkdirp(localClientPath, function (err) {
                    if (err) console.error(err);
                    else {
                        fse.copy(nodulePath, localClientPath, function(err) {
                            if (err) return console.error(err);
                          });
                        }
                });
            }
                else {

                    mkdirp(localClientPath, function (err) {
                        if (err) console.error(err);
                        else {
                            fse.copy(nodulePath, localClientPath, function(err) {
                                if (err) return console.error(err);
                              });
                            }
                    });
                }
                });
        
            });
        }); 

console.log(`
Website created at your_website/index.html

You can copy the content of /your_website folder and upload it to the web.

It's completely static!

Feel free to add more data at your_website/data/posts.json,
or styles at your_website/css/stylesheet.css,
and customize it further.

    Best of luck...

@Omodaka9375
`);
}

  module.exports.start = startApp();