const validator=require('validator')
const chalk=require('chalk')
const yargs=require('yargs')
const notes=require('./notes.js')
const fs= require("fs");
const { argv } = require('process');
const { removenote } = require('./notes.js');
fs.writeFileSync("notes.txt","this is notes file ");
fs.appendFileSync("notes.txt","this is the appended text");
//console.log(validator.isEmail('shivam@gmail.com'))
//console.log(chalk.red.inverse.bold('shivam yadav'))
//console.log(process.argv)

//creating command for add 
yargs.command(
    {
        command:'add' , 
        describe: 'to add a new note' ,
        builder: 
        {
            title: 
            {
                describe: 'Note title' ,
                demandOption: true,     // means if argument pass kra toh title dena jruri hai (else error ayega)
                type:'string'           // title dene kai baad data bhi dena hoga as a string
            },
            body:
            {
                describe:"Body content",
                demandOption: true,
                type:'string'
            }
        },
        handler: function(argv)         // argv mai argument pass hokr aya fir argv.title use krke tile ki value print kra li
        {
            //console.log("Adding a new note!")
            // console.log('Title:' + argv.title)   //printing title part
            // console.log('Body :' +argv.body)     //printing body part 
            notes.addNote(argv.title,argv.body)
        }
    }
    )

//creating command for remove 
yargs.command(
    {
        command:'remove',
        describe:'to remove a note',
        builder: 
        {
            title: 
            {
                describe: 'Note title' ,
                demandOption: true,     
                type:'string'           
            },
            body:
            {
                describe:"Body content",
                demandOption: false,
                type:'string'
            }
        },
        handler: function(argv)
        {
            console.log("Removing a note")
            notes.removenote(argv.title)
        }
    }
)

//creating command for list
yargs.command(
    {
        command:'list',
        describe:'list all note',
        handler: function(argv)
        {
            console.log(chalk.green.inverse("Listing all notes"))
            notes.listnote()
        }
    }
)

//creating command for read
yargs.command(
    {
        command:'read',
        describe:'reading a note',
        builder: 
        {
            title: 
            {
                describe: 'Note title' ,
                demandOption: true,     
                type:'string'           
            }
        },
        handler: function(argv)
        {
            console.log(chalk.green.inverse('Reading a note'))
            notes.readnotes(argv.title)
        }
    }
)
//console.log(yargs.argv)    
yargs.parse()