function main() {
    document.querySelector("#stdin input").addEventListener('input', e => updateWidth(e.target))
    setInterval(() => document.querySelector("#stdin input").focus(), 100)
}

function updateWidth(element) {
    let newWidth = (element.value.length)*CHARACTER_WIDTH
    element.style.width = newWidth + "px"
}

function clearStdin() {
    document.querySelector("#stdin input").value = ""
    updateWidth(document.querySelector("#stdin input"))
}

function clearStdout() {
    document.querySelector("#stdout").innerHTML = ""
}

(document.readyState !== 'loading') ? main() : document.addEventListener('DOMContentLoaded', main)