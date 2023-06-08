import { CHARACTER_WIDTH } from './constants.js'

export function updateWidth(element) {
    let newWidth = (element.value.length)*CHARACTER_WIDTH
    element.style.width = newWidth + "px"
    setTimeout(function() { element.selectionStart = element.selectionEnd = 10000 }, 0)
}

export function setStdin(query) {
    document.querySelector("#stdin input").value = query
    updateWidth(document.querySelector("#stdin input"))
}

export function clearStdout() {
    document.querySelector("#stdout").innerHTML = ""
}

export function setBackground(image, forecolor, blur) {
    document.body.style.backgroundImage = `linear-gradient(${forecolor}, ${forecolor}), url(${image})`
    document.body.style.backdropFilter = `blur(0.${blur}em)`
    document.body.style.backgroundSize = 'cover'
    document.body.style.backgroundPosition = 'bottom'
}