const {Student} = require('./student.js');
/**
 * Объект группа
 * @param {*} groupNumber - номер группы
 */
function Group(groupNumber) {
  this.groupNumber = groupNumber,
  this._students = [],

  this.addStudent = (student) => {
    if (!(student instanceof Student)) throw new Error('Wrong input. Student object required.');
    if (this._students.filter((s) => s.fullName === student.fullName).length > 0) {
      throw new Error('Student already in this group.');
    }
    this._students.push(student);
    return true;
  },

  this.whoIsAbsent = () => this._students.filter((s) => s.isSick);
}

module.exports={Group};
