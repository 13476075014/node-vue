/* 用es6的语法，在这里建一个singer页面公用的类 */
export default class Singer {
    constructor ({ id, name }) {
        this.id = id
        this.name = name
        this.avatar = `https://y.gtimg.cn/music/photo_new/T001R150x150M000${id}.jpg?max_age=2592000`
    }
}
