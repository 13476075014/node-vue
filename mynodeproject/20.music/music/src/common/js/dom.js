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
