> The program object must maintain a usageObject of the format:
```
usage = {
    modal: {
        <most_significant_mode>: {
            positional: {
                wrap: false,
                keys: {
                    '<positional_key_1>': {
                        desc: '<description>',
                        eg: '<example>'
                    },
                    ...
                }
            },
            named: {
                keys: {
                    <named_key_1>: {
                        short: '<shorthand>',
                        desc: '<description>',
                        eg: '<example>'
                    },
                    ...
                }
            }
        },
        ...
    },

    optional: {
        keys: {
            <optional_key_1>: {
                modes: null | ['<mode_1>', ...], //null means every mode
                short: '<shorthand>',
                desc: '<description>',
                eg: '<example>'
            },
            ...
        }
    }
}
```

> After the parser has parsed command line arguments into one of the modes, the program will be supplied the following parsed arguments object:
```
argsParsed = {
    mode: '<mode_1>',
    positional: {
        <positional_key_1>: <value>,
        ...
    },
    named: {
        <named_key_1>: <value>,
        ...
    },
    optional: {
        <optional_key_1>: <value>,
        ...
    }
}
```