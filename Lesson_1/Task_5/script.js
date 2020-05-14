const vowels = ['a', 'e', 'i', 'o', 'u'];
const isVowel = c => vowels.indexOf(c.toLowerCase()) !== -1;
const consonants= ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'x', 'z', 'w', 'y'];
const isConsonant = c => consonants.indexOf(c.toLowerCase()) !== -1;

const input = prompt('Plz enter some text', 'Mary had a little lamb');
const arr = input.split('');
const vowelsCount = arr.filter(x => isVowel(x)).length;
const consonantsCount = arr.filter(x => !isVowel(x)).length

console.log(`Vowels Count: ${vowelsCount} and Consonants Count: ${consonantsCount}`)
