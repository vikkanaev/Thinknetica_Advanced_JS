const {Student} = require('./student.js');
const {Group} = require('./group.js');

const student1 = new Student('Иванов Иван Иванович');
const student2 = new Student('Петров Петр Петрович');
const student3 = new Student('Зоя Михайловна Шниперсон');

const firstGroup = new Group(1);
firstGroup.addStudent(student1);
firstGroup.addStudent(student2);
firstGroup.addStudent(student3);
console.log(firstGroup);

student2.isSick = true;
student3.isSick = true;
console.log('Студент: ' + student2.shortName() + ' заболел');
console.log('Студент: ' + student3.shortName() + ' заболел');

console.log('Отсутствующие студенты: ' + firstGroup.whoIsAbsent().map((s) => s.fullName()));
