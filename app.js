//core-module packages

//npm packages
const chalk = require('chalk')                  //import chalk npm package for terminal output styling
const yargs = require('yargs')                  //import yargs npm package to parse CLI arguments

//own packages
const notes = require('./notes.js')             //import javascript file containing functions to modify notes


//customise yargs version
yargs.version('1.1.0')                          //set the value shown by the --version option

//create add command
yargs.command({                                 //define the command for adding new notes
    command: 'add',                             //name of command
    describe: 'Description: Add a new note',    //info about the command
    builder: {                                  //set options for the command
        title: {                                //add a -title option
            describe: 'Note title',             //info about the option
            demandOption: true,                 //set the option as mandatory
            type: 'string'                      //specify the data type of option value
        },                                      //end of -title option definition

        body: {                                 //add a -body option
            describe: 'The contents of your note',  
            demandOption: true,                 //set the option as mandatory
            type: 'string'                      //specify the data type of the option value
        }                                       //end of -body option definition
    },
    handler(argv){                              //function to handle option values
        notes.addNote(argv.title, argv.body)    //calling the appropriate function to add a note
    }
})


//create remove command
yargs.command({                                 //define the command to remove existing notes
    command: 'remove',                          //name of command
    describe: 'Remove an existing note',        //info about command
    builder: {                                  //set options for command
        title: {                                //add a -title option
            describe: 'Note title',
            demandOption: true,                 //set the option as mandatory
            type: 'string'                      //data type of option value
        }                                       //end of -title option definition
    },                                          //end of builder
    handler(argv){                              //function to handle option values
        notes.removeNote(argv.title)            //calling appropriate function to remove a note
    }
})

//create read command
yargs.command({                                 //define the command to read existing notes
    command: 'read',                            //command name
    describe: 'Open an existing note',          //info about command
    builder: {                                  //set options for command
        title: {                                //add a -title option
            describe: 'Note title',
            demandOption: true,                 //set option mandatory
            type: 'string'                      //data type of option value
        }                                       //end of -title option definition
    },
    handler(argv){                              //function to handle option values
        notes.getNote(argv.title)               //calling appropriate function to read a note
    }
})

//create list command
yargs.command({                                 //define a command to list all notes
    command: 'list',                            //command name
    describe: 'List the name of all the notes', //info about command
    handler(){                                  //no options defined, just call an appropriate method to list notes
        notes.listNotes()
    }
})

if(!process.argv[2]){                           //if no command used when file is run
    console.log('Try using --help to see a list of available commands')
}

yargs.parse()                                   //call method to parse CLI arguments