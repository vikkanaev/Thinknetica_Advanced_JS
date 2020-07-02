/* eslint-disable no-unused-vars */
/**
 * Собственная реализация Промиса
 */
class CustomPromise {
  /**
   * Конструктор
   * @param {Function} callback колбек для нашего промиса
   */
  constructor(callback) {
    this.__success__ = [];
    this.__error__ = [];
    this.__state__ = 'pending',
    this._callback = callback;

    setTimeout(() => {
      callback(this._resolve.bind(this), this._reject.bind(this));
    }, 0);
  }

  /**
   * медод класса, позволяющий создать новый промис сразу в статусе fulfilled
   * @param {Function} callback колбек для нашего промиса
   * @return {CustomPromise} возвращаем наш кастомный промис
   */
  static resolve(callback) {
    const p = new CustomPromise(callback);
    p.__state__ = 'fulfilled';
    return p;
  }

  /**
   * медод класса, позволяющий создать новый промис сразу в статусе rejected
   * @param {Function} callback колбек для нашего промиса
   * @return {CustomPromise} возвращаем наш кастомный промис
   */
  static reject(callback) {
    const p = new CustomPromise(callback);
    p.__state__ = 'rejected';
    return p;
  }

  /**
   * Обработчик успешного/не успешного сценария промиса
   * @param {Function} successCb колбек для успешного выполнения промиса
   * @param {Function} rejectCb колбек для неуспешного выполнения промиса
   * @return {CustomPromise} возвращаем наш кастомный промис
   */
  then(successCb, rejectCb) {
    switch (this.__state__) {
      case 'pending':
        if (successCb) this.__success__.push(successCb);
        if (rejectCb) this.__error__.push(rejectCb);
        break;
      case 'fulfilled':
        if (successCb) {
          successCb(this);
          return this;
        }
        if (rejectCb) {
          return this;
        }
        break;
      case 'rejected':
        if (successCb) {
          setTimeout(() => {
            throw new Error(this);
          }, 0 );
          return this;
        }
        if (rejectCb) {
          rejectCb(this);
          return this;
        }
        break;
    }
  };

  /**
   * Обработчик не успешного сценария промиса
   * @param {Function} rejectCb колбек для неуспешного выполнения промиса
   * @return {CustomPromise} возвращаем наш кастомный промис
   */
  catch(rejectCb) {
    return this.then(null, rejectCb);
  };

  /**
   * Запуск колбеков в случае успешного завершения промиса
   * @param {CustomPromise} result наш CustomPromise
   */
  _resolve(result) {
    console.log('see _resolve ' + result);
    this.__success__.forEach((cb) => cb(result));
    this.__state__ = 'fulfilled';
  };

  /**
   * Запуск колбеков в случае не успешного завершения промиса
   * @param {CustomPromise} err наш CustomPromise
   */
  _reject(err) {
    this.__error__.forEach((cb) => cb(result));
    this.__state__ = 'rejected';
  };
};
