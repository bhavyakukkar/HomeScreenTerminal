import { setBackground } from "../../ui.js"


export default {
    /*usage: [
        [
            ['i', "image", "https://test/image.jpg"],
            ['f', "forecolor", "#000044aa"],
            ['b', "blur", 1]
        ],
        [
            [3, "https://example.com/img.jpg", "#000044aa", 1]
        ]
    ],*/
    usageExps: ["{i,f,b}", "[<i/image>,<f/forecolor>,<b/blur>]", "<h/help>"],
    help: "",
    execute: function(name, args) {
        //let printHelp = ('h' in args) || ('help' in args) || (args._main.length != 3) || 
        if(('h' in args) || ('help' in args) || args._main.length == 0 || !(('i' in args) && ('')))
        if(args.length == 1)
            if(args[0] !== "null" && args[0] !== null) {
                setBackground(...JSON.parse(args[0]))
                return {
                    content: "Background Set: user preference",
                    done: true
                }
            }
            else {
                setBackground('./res/wallpapers/mIQbeROq8zc.jpg', '#00000099', 1)
                return {
                    content: "Background Set: default",
                    done: true
                }
            }
        else {
            setBackground(args[0], args[1], args[2])
            return {
                content: "Background Set",
                done: true
            }
        }
    }
}