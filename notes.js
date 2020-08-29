const chalk = require('chalk')
const fs = require('fs')


const getNote = (title) => {
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
    const duplicateNote = notes.find((note) => note.title === title)

    

    if(!duplicateNote){
        notes.push({
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
    
    if(notes.length !== notesToKeep.length)
    {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else{
        console.log(chalk.red.inverse('No note found!'))
    }  
}

const listNotes = () => {
    const notes = loadNotes()
    
    console.log(chalk.magenta.inverse('Your notes'))
    
    notes.forEach((note) => console.log(note.title))
    
}



const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
    } catch(e){
        return []
    }
}

module.exports = {
    getNote: getNote,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
}