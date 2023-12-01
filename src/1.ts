import * as fs from 'fs';

function readFileLines(filename: string): string[] {
  const fileContent = fs.readFileSync(filename, 'utf-8');
  const lines = fileContent.split('\n');
  return lines;
}

const filename = '1.txt';
const lines = readFileLines(filename);

function CollectSum(digits:Record<string, number>) {
  var sum:number = 0
  lines.forEach((element:string, index, array) => {
    var first:number = -1;
    var last:number = 0;

    for(let i:number=0; i<element.length; i+=1) {
      for (const key in digits) {
        if (element.substring(i, i+key.length) === key) {
          if (first==-1)
            first = digits[key];
          last = digits[key];
        }
      }
    }
    if (first != -1)
      sum += first*10+last;
  });
  console.log(sum);
}

const part1dict: Record<string, number> = {
   '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
};
CollectSum(part1dict);

const part2dict: Record<string, number> = {
  '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
  'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9,
};
CollectSum(part2dict);
