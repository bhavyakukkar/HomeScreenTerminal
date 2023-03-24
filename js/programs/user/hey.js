//Author: Bhavya Kukkar
//Date: 2023-03-24

export default function(args) {
    let responses = ['hiya', 'hello there', 'howdy', 'uwu', 'how are you today']

    if(args.join(' ') == "u suck")
        return 'and\nu\nswallow'
    
    return responses[Math.floor(responses.length * Math.random())]
}