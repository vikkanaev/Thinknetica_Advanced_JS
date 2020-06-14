# Как выстрелить себе в ногу при помощи строгой типизации
## Вариант 1: ООП и TS
- Пишем вот такой example1-oop-ts.ts
```
class Animal {}
class Dog extends Animal { bark() {} }
class Cat extends Animal { meow() {} }

const arr1 = [new Dog(), new Dog()];
let arr2: Animal[] = arr1;
arr2.push(new Cat());

arr1.forEach(d => d.bark());
```
- Смотрим в VSCode - ошибок нет
![В IDE чисто](img/example1-oop-ts.png?raw=true "В IDE чисто")
- Компилируем его `tsc example1-oop-ts.ts`
- Запускаем нодой и получаем вот такую ошибку рантайма
![Ошибка при выполнении](img/example1-oop-ts-console.png?raw=true "Ошибка Рантайма")

