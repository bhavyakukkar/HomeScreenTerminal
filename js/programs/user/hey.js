//Author: Bhavya Kukkar
//Date: 2023-03-24
//Desc: Basic Sample Program

export default function(name, args) {
    let responses = ['hiya', 'hello there', 'howdy', 'uwu', 'how are you today']
    if(args._main.join(" ") == "you suck")
        //'\n' to break result into multiple lines
        return 'and\nyou\nswallow'
    
    return responses[Math.floor(responses.length * Math.random())]
}