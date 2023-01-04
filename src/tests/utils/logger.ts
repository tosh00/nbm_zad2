export function testLog(prefix = "") {
  return function(desc = 'test completed!') {
    if (prefix) {
      console.log(`${prefix} - ${desc}`);
    } else {
      console.log(desc);
    }
  } 
}

