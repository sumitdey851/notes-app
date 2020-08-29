//core-module packages

//npm packages
const chalk = require('chalk')
const yargs = require('yargs')

//own packages
const notes = require('./notes.js')


//customise yargs version
yargs.version('1.1.0')

//create add command
yargs.command({
    command: 'add',
    describe: 'Description: Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },

        body: {
            describe: 'The contents of your note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body)
    }
})


//create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove an existing note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

//create read command
yargs.command({
    command: 'read',
    describe: 'Open an existing note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string' 
        }
    },
    handler(argv){
        notes.getNote(argv.title)
    }
})

//create list command
yargs.command({
    command: 'list',
    describe: 'List the name of all the notes',
    handler(){
        notes.listNotes()
    }
})

if(!process.argv[2]){
    console.log('Try using --help to see a list of available commands')
}

yargs.parse()