// 类类型在ts中的声明
class Animal{
  name:string;
  age:number;
  constructor(name:string,age:number){
    this.name = name;
    this.age = age;
  }
  write(){
    console.log(`${this.name}已经${this.age}岁了`)
  }
}