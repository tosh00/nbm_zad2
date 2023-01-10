export function greenString(str: String) { return `\x1b[32m${str}\x1b[0m`; }
export function greenBg(str: String) { return `\x1b[42m${str}\x1b[0m`; }
export function redString(str: String) { return `\x1b[31m${str}\x1b[0m`; }
export function redBg(str: String) { return `\x1b[41m${str}\x1b[0m`; }

export function testLog(prefix = "") {
  return function(desc = 'test completed!') {
    if (prefix) {
      console.log(`\u{1F7E2} ${greenString(prefix)} - ${desc}`);
    } else {
      console.log(desc);
    }
  } 
}
