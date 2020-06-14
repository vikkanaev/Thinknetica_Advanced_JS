class Animal {}
class Dog extends Animal { bark() {} }
class Cat extends Animal { meow() {} }

const arr1 = [new Dog(), new Dog()];
let arr2: Animal[] = arr1;
arr2.push(new Cat());

arr1.forEach(d => d.bark());
