import { processor } from './processor.js'
import { setStdin } from './ui.js'
import { addToSessionHistory, getFromSessionHistory } from './storage.js'
import routeArgs from 'argsUsagex'


const QUERY = 0
const INFO = 1
const ERROR = 2

let programInExec = false


export function makeInput() {
    let commandInFocus = 0
    let command = ""
    let input
    document.addEventListener('keydown', e => {
        if(e.key === "Enter") {
            output({content: (input = document.querySelector("#stdin input").value)}, QUERY, programInExec == false) //output stdin after entered[1]
            addToSessionHistory(input)
            parseInput(document.querySelector("#stdin input").value)
                .then((result) => output(result, INFO, ))
                .catch(output())
            setStdin("")
        }
        else if(e.ctrlKey && e.key != "Control")
            parseInput(document.querySelector("#stdin input").value, e.key)
        else if(e.key == "ArrowUp") {
            command = getFromSessionHistory(commandInFocus + 1);
            (command != null) && (!setStdin(command.command) && commandInFocus++)
        }
        else if(e.key == "ArrowDown") {
            command = getFromSessionHistory(commandInFocus - 1);
            (command != null) && (!setStdin(command.command) && commandInFocus--)
        }
    })
}

export function parseInput(input, keyWithCtrl = null) {
    const program = !programInExec ? input.split(" ")[0] : programInExec
    const argString = !programInExec ? input.split(" ").slice(1).join(" ") : input
    if(!input.match("--disable-parse-usage"));
        //todo
    if(!input.match("--disable-parse-posix"));
        //todo
}

function output(payload, type, done = true) {
    const typeContainer = document.createElement('span')
    typeContainer.innerHTML = payload.type ? payload.type : ((type === 0) ? '?' : (type === 1) ? '>' : '!')

    const contentContainer = document.createElement('p')
    if(payload.content.search('\t') != -1)
        contentContainer.innerHTML = (
            `<table><tr><td>
            ${payload.content.replaceAll('\t', '</td><td>').replaceAll('\n', '</td></tr><tr><td>')}
            </td></tr></table>`
        )
    else
        contentContainer.innerHTML = payload.content.replaceAll("\n", "<br>")
    

    const element = document.createElement('article')
    
    element.className = (type === 0) ? 'query' : (type === 1) ? 'info' : 'error'
    !done && (element.className += ' incomplete')

    element.appendChild(typeContainer)
    element.appendChild(contentContainer)
    document.querySelector("#stdout").appendChild(element)
}