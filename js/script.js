function main() {
    enableDynamicStdinInput()
}

function enableDynamicStdinInput() {
    document.querySelector("#stdin input").addEventListener('input', e => {
        let newWidth = (e.target.value.length)*CHARACTER_WIDTH
        e.target.style.width = newWidth + "px"
    })
}

(document.readyState !== 'loading') ? main() : document.addEventListener('DOMContentLoaded', main)