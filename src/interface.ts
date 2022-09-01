interface Nameable {
  name: string;
}

interface Human extends Nameable {
  readonly age: number;
  info(message?: string): void;
}

interface Develop {
  role: string;
}

// const human: Human = {
//   name: 'Jon',
//   age: 12,
//   info(message) {
//     console.log(`name:${this.name}, age:${this.age}, message:${message}`);
//   },
// };

// human.info('hellow');

class Developer implements Human, Develop {
  constructor(public name: string, public age: number, public role: string) {}
  info(message = 'Hello') {
    console.log(`name:${this.name}, age:${this.age}, message:${message}`);
  }
  // static変数やメソッドはimplementsの適用外
  static id: number;
}

// 構造的部分型
console.log('Developで型定義した場合、アクセスできるのはroleのみ');
const user: Develop = new Developer('Issac', 26, 'electro');
console.log(user.role);
// 読み取り専用プロパティであるため、'age' に代入することはできません。ts(2540)
// user2.age += 1;

console.log('Humanで型定義した場合、アクセスできるのはage, name, info');
const user2: Human = new Developer('Issac', 26, 'electro');
console.log(user2.age);
console.log(user2.name);
user2.info('Hellow');
user2.info();

console.log('HumanとDevelopで型定義した場合、全てアクセスできる');
const user3: Human & Develop = new Developer('Issac', 26, 'electro');
console.log(user3.age);
console.log(user3.name);
user3.info('Hellow');
console.log(user3.role);
