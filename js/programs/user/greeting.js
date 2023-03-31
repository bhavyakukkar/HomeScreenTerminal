//Author: Bhavya Kukkar
//Date: 2023-03-24
//Desc: Sample program to demonstrate user input over multiple commands

export default function(name, args) {
    if(args.length == 0)
        return {
            content: "What's your name?",

            //'done: false' indicates execution not over, next command will call this program
            done: false
        }
    return {
        content: `Hello, ${args.join(' ')}`,
        done: true
    }
}