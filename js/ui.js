import { CHARACTER_WIDTH } from './constants.js'

export function updateWidth(element) {
    let newWidth = (element.value.length)*CHARACTER_WIDTH
    element.style.width = newWidth + "px"
}

export function setStdin(query) {
    document.querySelector("#stdin input").value = query
    updateWidth(document.querySelector("#stdin input"))
}

export function clearStdout() {
    document.querySelector("#stdout").innerHTML = ""
}

export function lastExecutedOutput(query) {
    //todo
    /*const stdout = document.querySelector("#stdout")
    return stdout.childNodes[stdout.childNodes.length - 1].childNodes[1].value*/
}