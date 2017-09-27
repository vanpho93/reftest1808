class Person {
    constructor(name, age, weight = 100) {
        this.name = name;
        this.age = age;
        this.weight = weight;
    }

    sayHello() {
        console.log(`Xin chao toi la ` + this.name);
    }
}

class Child extends Person {
    constructor(name, age, weight, toy) {
        super(name, age, weight);
        this.toy = toy;
    }

    get birthYear() {
        return 2017 - this.age;
    }

    set birthYear(value) {
        this.age = 2017 - value;
    }

    sayHello() {
        super.sayHello();
        console.log(`Xin chao tao la ${this.name}, thich choi ${this.toy}`);
    }
}

const teo = new Child('Teo', 10, 100, 'Oto');
// teo.name = 'AAA';
// teo.weight = 100;
// console.log(teo);
// console.log(teo.birthYear);
teo.birthYear = 2000;
console.log(teo.age);
teo.sayHello();
