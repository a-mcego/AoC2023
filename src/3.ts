import * as fs from 'fs';

function readFileLines(filename: string): string[] {
    const fileContent = fs.readFileSync(filename, 'utf-8');
    const lines = fileContent.split('\n');
    return lines;
}

const filename = '3.txt';
const lines = readFileLines(filename);

interface Point {
    x:number;
    y:number;
}

class ValueMap<K, V> {
    private map = new Map<string, V>();
    private keyToString(key_: K): string { return JSON.stringify(key_); }
    set(key: K, value: V): void { this.map.set(this.keyToString(key), value); }
    get(key: K): V | undefined { return this.map.get(this.keyToString(key)); }
    has(key: K): boolean { return this.map.has(this.keyToString(key)); }

    [Symbol.iterator](): Iterator<[K, V]> {
        const mapIterator = this.map.entries();
        return {
            next(): IteratorResult<[K, V]> {
                const { value, done } = mapIterator.next();
                if (done) {
                    return { value: undefined, done };
                } else {
                    const [keyString, mapValue] = value;
                    return { value: [JSON.parse(keyString) as K, mapValue], done: false};
                }
            }
        };
    }    
}

let symbols = new ValueMap<Point, number>();
let numbers = new ValueMap<Point, number>();
let number_values = new ValueMap<number, number>();

let y:number = 0, number_id = 0;
for (const line of lines) {
    if (line.length == 0)
        continue;
    let collected_number:number = 0, collect_start = -1;
    let x:number = 0;

    let handleCollectEnd = () => { 
        if (collect_start != -1) {
            for(let index=collect_start; index < x; ++index) {
                numbers.set({x:index, y:y} as Point, number_id);
            }
            number_values.set(number_id, collected_number);
            number_id += 1;
        }
        collected_number = 0;
        collect_start = -1;
    }; 
    
    for(const char of line) {
        let charcode = char.charCodeAt(0);
        if (charcode >= 48 && charcode <= 57) {
            collected_number = collected_number*10+charcode-48;
            if (collect_start == -1) {
                collect_start = x;
            }
        } else {
            handleCollectEnd();
            if (char != '.')
                symbols.set({x:x, y:y}, charcode);
        }
        x += 1;
    }
    handleCollectEnd();
    y += 1;
}

let sum_part2 = 0;
let found_numbers_part1 = new Set<number>();
for (const symbol of symbols) {
    let found_numbers_part2 = new Set<number>();
    const data = symbol[1];
    for(let y=-1; y<=1; y+=1) {
        for(let x=-1; x<=1; x+=1) {
            let pt:Point = {x:symbol[0].x+x, y:symbol[0].y+y} as Point;
            if (numbers.has(pt)) {
                found_numbers_part1.add(numbers.get(pt) as number);
                if (data == 42) { //asterisk '*'
                    found_numbers_part2.add(numbers.get(pt) as number);
                }
            }
        
        }
    }
    if (found_numbers_part2.size == 2) {
        let product=1;
        for (let found of found_numbers_part2) {
            product *= number_values.get(found) as number;
        }
        sum_part2 += product;
    }

}

let sum_part1 = 0;
for (let found of found_numbers_part1) {
    sum_part1 += number_values.get(found) as number;
}
console.log("Part 1: " + sum_part1);
console.log("Part 2: " + sum_part2);
