const timestamp = 1588312016;
const claster   = 58;
const type      = 8;
const user      = 5553663;

if(claster < 10) { claster = '0' + claster.toString(16) }
const input = [timestamp, claster, type, user];

const output = input.map(x => x.toString(16)).join('');
console.log(`New id is: ${output}`);
