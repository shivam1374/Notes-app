const { default: chalk } = require('chalk')
const fs=require('fs')
const { stringify } = require('querystring')

const getNotes=function()
{
 return 'get notes'
}

// is jagah pr argument pass hua hai app.js vali file se 
//Adding a note
const addNote = function (title, body)    
{
    const notes=loadNotes()
    const duplicate=notes.filter(function(note)
    {
      return note.title===title
    }
    )
    if(duplicate.length===0)
    {
        notes.push(
            {
                title: title,
                body: body
            }
        )
        savenotes(notes)
        console.log(chalk.green.inverse("New note added!!"))
    }
    else{
        console.log(chalk.red.inverse('Note Already exist!!'))
    }
   
}

//Removing a note 
const removenote=function(title)
{
    const notes=loadNotes()
    const NotesTokeep=notes.filter(function(note)
    {
      return note.title!==title
    }
    )
    if(notes.length>NotesTokeep.length)
    {
        console.log(chalk.green.inverse("Note Removed!!"))
        savenotes(NotesTokeep)
    }
    else
    {
        console.log(chalk.red.inverse("Note doesn't exist"))
    }
   
}

//Listing all notes
const listnote=function(argv)
{
    const notes=loadNotes()
    notes.forEach(note => 
    {
        console.log(note.title + " " + note.body)
    });
}

//Reading Notes
const readnotes=(title)=>
{
    const notes=loadNotes()
    const note=notes.find((note) => note.title===title)
    if(note)
    {
    console.log(note.body)
    }
    else{
        console.log(chalk.inverse.red("Note not present"))
    }
}

// is function mai data save notes.json file mai ho rha hai 
const savenotes=function(notes)
{
  const dataJSON=JSON.stringify(notes)
  fs.writeFileSync('notes.json',dataJSON)
}


const loadNotes=function()
{
    // if the file is not present it return an empty array (sirf ek baar hi return hoga )
    // kyuki algi baar 13 line kai baad vali line chlenge or notes vala data save ho jaiga json vali file mai
    try
    {
    const dataBuffer=fs.readFileSync('notes.json')
    const dataJSON=dataBuffer.toString()
    return JSON.parse(dataJSON) 
    } 
    catch (e)
    {
        return []
    }
}

module.exports={
    addNote:addNote,
    removenote:removenote,
    listnote:listnote,
    readnotes:readnotes
} 