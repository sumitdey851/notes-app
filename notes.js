const chalk = require('chalk')
const fs = require('fs')                            //import fs nodejs module for file-system operations


const getNote = (title) => {                        //function to search and get the contents of a note using note title
    const notes = loadNotes()
    const readNote = notes.find((note) => note.title === title)
    
    if(!readNote){
        console.log(chalk.red.inverse('Note not found!'))
    } else {
        console.log(chalk.magenta(readNote.title))
        console.log(readNote.body)
    }

}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)    //finding duplicate note title
    //The find() method returns the value of the first element in an array that pass a test (provided as a function).
    // The find() method executes the function once for each element present in the array:
    // If it finds an array element where the function returns a true value, find() returns the value of that array element (and does not check the remaining values)
    // Otherwise it returns undefined
    

    if(!duplicateNote){
        notes.push({                //The push() method adds new items to the end of an array, and returns the new length.
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}


const removeNote = (title) => {
    const notes = loadNotes()
    const flag = 0
    const notesToKeep = notes.filter((note) => note.title !== title)
    //The filter() method creates an array filled with all array elements that pass a test (provided as a function).
    if(notes.length !== notesToKeep.length)             //length of original array not equal to filtered array
    {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else{
        console.log(chalk.red.inverse('No note found!'))
    }  
}

const listNotes = () => {
    const notes = loadNotes()                           //get the notes in array form
    
    console.log(chalk.magenta.inverse('Your notes'))
    
    notes.forEach((note) => console.log(note.title))    //use forEach() to cycle through the array objects and display the title property of each object
    //The forEach() method calls a function once for each element in an array, in order.
}



const saveNotes = (notes) => {                          //receive the JavaScript object passed as an argument
    const dataJSON = JSON.stringify(notes)              //convert value to JSON string
    fs.writeFileSync('notes.json', dataJSON)            //write the json string to file
}

const loadNotes = () => {
    try{
    const dataBuffer = fs.readFileSync('notes.json')    //get the byte values stored in file
    const dataJSON = dataBuffer.toString()              //get a string representation of the byte values
    return JSON.parse(dataJSON)                         //parse the string into JSON
    } catch(e){
        return []                                       //return empty array on error
    }
}

//module is a variable and exports is an object that export the functions for use in a different file
module.exports = {                                      
    getNote: getNote,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
}