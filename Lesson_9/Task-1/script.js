// eslint-disable require-jsdoc
// eslint-disable-next-line require-jsdoc
const resolveP = new Promise((resolve, reject) =>{
  setTimeout(() => {
    console.log('resolveP Preparing data');
    const backendData = {
      code: 200,
      fio: 'Ипполит Матвеевич Воробьянинов',
    };
    resolve(backendData);
  }, 2000);
});

resolveP.then((data) => {
  console.log('resolveP Get data ', data);
  data.nickName = 'Киса';
  return data;
});

const rejectP = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('rejectP Preparing data');
    const backendData = {
      code: 200,
      fio: 'Ипполит Матвеевич Воробьянинов',
    };
    reject(backendData);
  }, 2000);
});

rejectP.then((data) => {
  console.log('rejectP Get data ', data);
  data.nickName = 'Киса';
  return data;
}).catch((err) => console.log('Err in rejectP'));


const resolveCustomP = new CustomPromise((resolve, reject) => {
  setTimeout(() => {
    console.log('resolveCustomP Preparing data');
    const backendData = {
      code: 200,
      fio: 'Ипполит Матвеевич Воробьянинов',
    };
    resolve(backendData);
  }, 2000);
});

resolveCustomP.then((data) => {
  console.log('resolveCustomP Get data ', data);
  data.nickName = 'Киса';
  return data;
});

const rejectCustomP = new CustomPromise((resolve, reject) => {
  setTimeout(() => {
    console.log('rejectCustomP Preparing data');
    const backendData = {
      code: 200,
      fio: 'Ипполит Матвеевич Воробьянинов',
    };
    reject(backendData);
  }, 2000);
});

rejectCustomP.then((data) => {
  console.log('rejectCustomP Get data ', data);
  data.nickName = 'Киса';
  return data;
});
