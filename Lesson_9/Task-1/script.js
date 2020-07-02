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
// resolveCustomP.catch(d => console.log('ok'));



// async function f() {
//   console.log('start script!');

//   // const p1 = new CustomPromise((resolve, reject) => {
//   const p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('Ready!');
//     }, 1000);
//   });

//   const p2 = new CustomPromise((resolve, reject) => {
//     setTimeout(() => {
//       reject(new Error('Err!!!'));
//     }, 1000);
//   });
//   // .then((data) => {
//   //   console.log(data);
//   // }).catch((err) => {
//   //   console.log('err');
//   //   return 'azaza';
//   // });

//   const res1 = await p1;
//   // console.log('got promise result: ' + res1);
//   p1.then((r) => console.log(r));

//   // const res2 = await p2;
//   // console.log('got promise result: ' + res2);
// };

// f();

