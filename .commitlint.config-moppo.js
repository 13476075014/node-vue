/*
* Level [0..2]: 0 disables the rule. For 1 it will be considered a warning for 2 an error.
* Applicable always|never: never inverts the rule.
* Value: value to use for this rule.
* */
module.exports = {
    rules: {
        'body-leading-blank': [1, 'always'],
        'footer-leading-blank': [1, 'always'],
        'header-max-length': [2, 'always', 72],
        'scope-case': [2, 'always', 'lower-case'],
        'subject-case': [
            2,
            'always',
            'lower-case'
        ],
        'subject-empty': [2, 'never'],
        'subject-full-stop': [2, 'never', '.'],
        'type-case': [2, 'always', 'lower-case'],
        'type-empty': [2, 'never'],
        'type-enum': [
            2,
            'always',
            [
                'feat',
                'fix',
                'docs',
                'build',
                'format',
                'refactor',
                'perf',
                'test',
                'tool',
                'revert',
                'merge'
            ]
        ]
    }
};
