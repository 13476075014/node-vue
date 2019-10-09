Date.prototype.add = function (part, value) {  
    value *= 1;  
    if (isNaN(value)) {  
        value = 0;  
    }  
    switch (part) {  
        case "y":  
            this.setFullYear(this.getFullYear() + value);  
            break;  
        case "m":  
            this.setMonth(this.getMonth() + value);  
            break;  
        case "d":  
            this.setDate(this.getDate() + value);  
            break;  
        case "h":  
            this.setHours(this.getHours() + value);  
            break;  
        case "n":  
            this.setMinutes(this.getMinutes() + value);  
            break;  
        case "s":  
            this.setSeconds(this.getSeconds() + value);  
            break;  
        default:  
   
    }  
}  