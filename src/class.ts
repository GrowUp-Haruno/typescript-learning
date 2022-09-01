// class Person {
//   private name: string;
//   private age: number;

//   constructor(initName: string, initAge: number) {
//     this.name = initName;
//     this.age = initAge;
//   }

//   info(this: Person): void {
//     console.log(`name:${this.name}, age:${this.age}`);
//   }

//   incrementAge(this: Person): void {
//     this.age += 1;
//   }
// }

// const jon = new Person('jon',10);

// jon.info();
// jon.incrementAge();
// jon.info();

// // 初期化簡略化
// class Person {
//   static species = 'Homo sapiens';
//   static isAdult(age: number) {
//     if (age > 17) return true;
//     return false;
//   }

//   // NestJSのコンストラクタ定義でよく見られる
//   constructor(protected readonly name: string, protected age: number) {}

//   info(this: Person): void {
//     console.log(`name:${this.name}, age:${this.age}`);
//     this.explainJob();
//   }

//   incrementAge(this: Person): void {
//     this.age += 1;
//   }
// }

// const jon = new Person('jon', 10);

// jon.info();
// jon.incrementAge();
// jon.info();

// // 継承
// class Teacher extends Person {
//   get subject() {
//     if (!this._subject) throw new Error('get:教科が未設定です');
//     return this._subject;
//   }
//   set subject(value) {
//     if (!value) throw new Error('set:教科が未設定です');
//     this._subject = value;
//   }
//   constructor(name: string, age: number, private _subject: string) {
//     super(name, age);
//   }

//   info(this: Teacher): void {
//     console.log(`name:${this.name}, age:${this.age}, subject:${this.subject}`);
//   }
// }

// const sensei = new Teacher('sensei', 36, 'english');

// sensei.info();
// sensei.incrementAge();
// sensei.info();

// console.log(sensei.subject);
// sensei.subject = 'kokugo';
// console.log(sensei.subject);

// console.log(Person.species);
// console.log(Person.isAdult(20));
// console.log(Person.isAdult(17));

// console.log(Teacher.species);
// console.log(Teacher.isAdult(20));
// console.log(Teacher.isAdult(17));

// // Abstractクラス
// abstract class Person {
//   static species = 'Homo sapiens';
//   static isAdult(age: number) {
//     if (age > 17) return true;
//     return false;
//   }

//   // NestJSのコンストラクタ定義でよく見られる
//   constructor(protected readonly name: string, protected age: number) {}

//   info(this: Person): void {
//     console.log(`name:${this.name}, age:${this.age}`);
//     this.explainJob();
//   }

//   incrementAge(this: Person): void {
//     this.age += 1;
//   }

//   // 継承先で定義する関数の概要
//   abstract explainJob(): void;
// }

// // 直接は定義できない
// console.log('static methodは問題なく使える');
// console.log(Person.species);
// console.log(Person.isAdult(20));
// console.log(Person.isAdult(17));

// // 継承
// class Teacher extends Person {
//   get subject() {
//     if (!this._subject) throw new Error('get:教科が未設定です');
//     return this._subject;
//   }
//   set subject(value) {
//     if (!value) throw new Error('set:教科が未設定です');
//     this._subject = value;
//   }
//   constructor(name: string, age: number, private _subject: string) {
//     super(name, age);
//   }

//   explainJob(): void {
//     console.log(`subject:${this.subject}`);
//   }
// }

// const sensei = new Teacher('sensei', 36, 'english');

// sensei.info();

// console.log(sensei.subject);
// sensei.subject = 'kokugo';
// console.log(sensei.subject);

// console.log("継承クラスのstatic methodは問題なく使える");
// console.log(Teacher.species);
// console.log(Teacher.isAdult(20));
// console.log(Teacher.isAdult(17));

// シングルトン・デザインパターン
class Person {
  private static instance: Person;

  static getInstance(name: string, age: number): Person | never {
    if (Person.instance) {
      // すでにインスタンス済の場合はこちらを実行
      throw new Error('すでにインスタンス済です。');
      // return this.instance;
    }
    // 初回インスタンス時はこちらを実行
    Person.instance = new Person(name, age);
    return Person.instance;
  }

  private constructor(private name: string, private age: number) {}

  info(this: Person): void {
    console.log(`name:${this.name}, age:${this.age}`);
  }
}

try {
  // クラス 'Person' のコンストラクターはプライベートであり、クラス宣言内でのみアクセス可能です。ts(2673)
  // const jon = new Person('jon',26)

  const jon = Person.getInstance('jon', 12);
  jon.info();

  // 新たにgetInstanceを実行しても更新されない
  const jobjon = Person.getInstance('jobjon', 22);
  jobjon.info();
} catch (error) {
  if (error instanceof Error) console.log(error.message);
}
