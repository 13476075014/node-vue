// 一：加class的方法

export function addClass (el, className) { // 如果没有这个class就添加这个class
    if (hasClass(el, className)) {
        return true
    }
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}

export function hasClass (el, className) { // 检查这个el是否有这个className
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}

// 二：加style前缀的方法
let elementStyle = document.createElement('div').style

let vendor = (() => {
    let transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    }

    for (let key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined) {
            return key
        }
    }

    return false
})()

export function prefixStyle (style) {
    if (vendor === false) {
        return false
    }

    if (vendor === 'standard') {
        return style
    }

    return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
