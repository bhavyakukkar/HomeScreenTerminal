import { processor } from './processor.js'
import { setStdin } from './ui.js'

const QUERY = 0
const INFO = 1
const ERROR = 2


function main() {
    makeInput()
    parseInput('start')
}

function makeInput() {
    document.addEventListener('keydown', e => {
        if(e.key === "Enter")
            parseInput(document.querySelector("#stdin input").value)
        else if(e.ctrlKey && e.key != "Control")
            parseInput(document.querySelector("#stdin input").value, e.key)
        else if(e.key == "ArrowUp")
            setStdin(lastExecutedOutput())
    })
}

function parseInput(input, keyWithCtrl = null) {
    output({content: input}, QUERY)
    if(!keyWithCtrl)
        processor(input.split(" ")[0], input.split(" ").slice(1,))
            .then(result => result && output(result, INFO))
            .catch(result => result && output(result, ERROR))
    setStdin("")
}

function output(payload, type) {
    const typeContainer = document.createElement('span')
    typeContainer.innerHTML = payload.type ? payload.type : ((type === 0) ? '?' : (type === 1) ? '>' : '!')

    const contentContainer = document.createElement('p')
    contentContainer.innerHTML = payload.content.replaceAll("\n", "<br>")

    const element = document.createElement('article')
    element.className = (type === 0) ? 'query' : (type === 1) ? 'info' : 'error'
    element.appendChild(typeContainer)
    element.appendChild(contentContainer)
    document.querySelector("#stdout").appendChild(element)
}


(document.readyState !== 'loading') ? main() : document.addEventListener('DOMContentLoaded', main)