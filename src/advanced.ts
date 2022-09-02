// インターセクション型
// typeエイリアス
type Engineer = {
  name: string;
  role: 'flont' | 'back';
};
type Blogger = {
  name: string;
  follower: number;
};

type EngineerBlogger = Engineer & Blogger;

const jon: EngineerBlogger = {
  name: 'jon',
  role: 'flont',
  follower: 100,
};

// interface
interface EngineerI {
  name: string;
  role: 'front' | 'back';
}
interface BloggerI {
  name: string;
  follower: number;
}

interface EngineerBloggerI extends EngineerI, BloggerI {}

const issac: EngineerBloggerI = {
  name: 'issac',
  role: 'back',
  follower: 20,
};

type NumberBoolean = number | boolean;
type stringNumber = string | number;
type Mix = NumberBoolean & stringNumber;
// number | string | booleanになる

// Typeguard
function toUpperCase(x: string | number): string {
  // この時点のxはstring|number型
  if (typeof x === 'string') {
    // このブロック内のxはstring型
    return x.toUpperCase();
  }
  // 上記のif内部でreturnした場合、xはnumber型で確定
  // returnしなかった場合は、string|number型となる
  return x.toString();
}

type NomadWorker = Engineer | Blogger;

function descrideProfile(nomadWorker: NomadWorker) {
  // この時点で確定しているnomadWorkerのプロパティはnameのみ
  console.log(nomadWorker.name);

  // inを使うことで型を確定できる
  if ('role' in nomadWorker) {
    console.log(nomadWorker.role);
  }
}

class Dog {
  speak() {
    console.log('ワン');
  }
}

class Bird {
  speak() {
    console.log('チュン');
  }

  fly() {
    console.log('飛ぶ');
  }
}

type Pet = Dog | Bird;

function havePet(pet: Pet) {
  // この時点で確定しているnomadWorkerのプロパティはnameのみ
  pet.speak();

  if (pet instanceof Bird) pet.fly();
}

// havePet(new Bird());
// havePet(new Dog());

// タグ付きUnionによるTypeguardのデザインパターン
// 共通のkeyを用意して、それぞれ異なる文字列リテラルを定義することで、等号またはswitch-caseで判別することができる
class Dogtag {
  kind: 'dog' = 'dog';
  speak() {
    console.log('ワン');
  }
}

class Birdtag {
  kind: 'bard' = 'bard';
  speak() {
    console.log('チュン');
  }

  fly() {
    console.log('飛ぶ');
  }
}

type PetTag = Dogtag | Birdtag;

function havePetTag(pet: PetTag) {
  // if (pet.kind === 'dog') pet.speak();
  // if (pet.kind === 'bard') {
  //   pet.fly();
  //   pet.speak();
  // }
  // or
  switch (pet.kind) {
    case 'bard':
      pet.fly();
      pet.speak();
      break;
    default:
      pet.speak();
  }
}

// havePetTag(new Birdtag());
// havePetTag(new Dogtag());

// 型アサーション
// HTMLElement型に対して強制的にHTMLInputElementとするには型アサーションを用いる
// 定義方法は２通り
// const input = document.getElementById('input') as HTMLInputElement;
// const input1 = <HTMLInputElement>document.getElementById('input');
// jsxを扱う場合は前者の方が良い
// ただし、上記の定義方法はgetElementByIdの引数を誤った場合nullになる可能性があるが、
// HTMLInputElementとして扱われているため予期しない不具合が出る可能性がある
// 型アサーションする場合は慎重に扱うこと

// non-null assertion operator
// 「明らかにnullが入ることが無い」と言い切れる場合は"!"をつけることでnullが無い型として扱えるようになる
// const inputNull = document.getElementById('input') as HTMLInputElement | null;
// inputNull!.value;
// 言い切れない場合はTypeguardする
// if (inputNull) inputNull.value;

// インデックスシグネチャ
interface Designer {
  name: string;
  // これがインデックスシグネチャ
  [index: string]: string | number;
  // 型 'number' のプロパティ 'age' は'string' インデックス型 'string' に割り当てることはできません。ts(2411)
  // インデックスシグネチャを用いると他のプロパティもインデックスシグネチャで指定した型しか使えなくなるため、
  // nameやageを扱うにはインデックスシグネチャの方をUnionで指定する必要がある
  age: number;
}

const designer: Designer = {
  name: 'jon',
  age: 20,
};
// 型定義していなくても追加が可能
// ただし、この追加したkeyはエディタ側では認識しない(候補に出てくるのはnameとageのみ)点に注意
designer.role = 'front';

// オーバーロード
// function rightOfLef(x: string | number): string | number {
//   return x;
// }
// 上記の関数は引数と同じ型の値を返すが、そのまま使うとstring | number型と認識してしまう
// 関数の手前に同名の関数名を定義して、引数と戻り値の型を事前に書いておくと認識できるようになる
function rightOfLef(x: string): string;
function rightOfLef(x: number): number;
function rightOfLef(x: string | number): string | number {
  return x;
}

const returnNum = rightOfLef(1);
const returnStr = rightOfLef('hello');

// Optional Chaining
interface DownloadedData {
  id: number;
  user: {
    name?: {
      first: string;
      last: string;
    };
  };
}

const downloadedData: DownloadedData = {
  id: 1,
  user: {},
};
console.log(downloadedData.id);
// 下記を書くと、次のメッセージが返ってくる
// console.log(downloadedData.user.name.last)
// オブジェクトは 'undefined' である可能性があります。ts(2532)
// それでも読み込みたい場合はOptional Chainingを用いる
// 仮にundefinedだった場合はそのままundefinedが返ってくる

console.log(downloadedData.user?.name?.last);
console.log(downloadedData.user?.name?.last);
// ただし、undefinedが出た場合は処理を止めたい場合はTypeguardを用いること

// Nullish Coalescing
const downloadUser = downloadedData.user ?? 'noーuser';
// 三項演算子や短絡評価でも同じことが書けるが、これの最大の利点は空文字(null)でも'noーuser'を返してくれる

// Lookup型
// オブジェクト型メンバーを個別に取り出したい場合、ブラケット記法で取り出すことができる
// サードパーティのライブラリから型を取り出すときに便利
type Id = DownloadedData['id'];
// 直接型定義も可能
const id: DownloadedData['id'] = 1;
// ネストもブラケットを並べるだけで
// ただし、undefined型を含む場合は取得できない
type User = DownloadedData['user']['name'];
// 複数を取り出したい場合はunionで指定する
type IdUser = DownloadedData['id' | 'user'];

// 型の互換性
let target1 = 'hello';
let source1: 'hello' = 'hello';
target1 = source1;

// let target2: 'hello' = 'hello';
// let source2 = 'hello';
// target2 = source2;
// 型 'string' を型 '"hello"' に割り当てることはできません。ts(2322)
// つまり型に互換性が無い

enum Color {
  RED,
  BLUE,
}
let target3 = Color.BLUE;
let source3 = 1;
target3 = source3;
// 上記のようなenum型を定義するとnumber型と互換性がある

let target4: (a: string, b: string) => void = function (a: string, b: string) {
  console.log('a');
};
let source4 = function (a: string) {
  console.log('b');
};
target4 = source4;
target4('a', 'b');
// 第二引数は無視される
// ただし、エディタ上では元のtarget4の型定義が残るため注意が必要
// 戻り値は共にvoidだがどちらかが他の型になった場合はエラーとなる
// これはダメ
// let target4 = function (a: string) {};
// let source4 = function (a: string, b: string) { };
// target4 = source4

class AdvancedPerson {
  name: string = 'jon';
  age: number = 10;
}
class AdvancedPerson2 {
  name: string = 'issac';
  age: number = 30;
}

let target5 = new AdvancedPerson();
let source5 = new AdvancedPerson2();
target5 = source5;
// ただし、privateがついている場合はダメ

// オーバーロードと型定義
function rol(x: string): string;
function rol(x: number): number;
function rol(x: string | number): string | number {
  if (typeof x === 'string') return x;
  return x;
}

// type RoLType = {
//   (x: string): string;
//   (x: number): number;
// };
interface RoLType {
  (x: string): string;
  (x: number): string;
}
const rol2: RoLType = (x: string | number) => {
  if (typeof x === 'string') return x;
  return x.toString();
};

// 関数のUnion型で定義すると引数はインターセクション、戻り値がユニオン型になる
interface FuncA {
  (a: number): number;
}
interface FuncB {
  (a: string): string;
}

// この場合はFuncAとして動く
const unionFunt: FuncA | FuncB = function (a: number) {
  return a;
};

// レストパラメータにタプルや配列を指定
function lestFunc(
  ...args: readonly [number, string, boolean?, ...Array<number | string>]
) {
  console.log(args);
  // readonlyをつけると、args配列に対して読み込み以外の操作ができなくなる
  // args.push();
  // プロパティ 'push' は型 'readonly [number, string, (boolean | undefined)?, ...(string | number)[]]' に存在しません。ts(2339)
}

lestFunc(1, 'hi', true);
lestFunc(1, 'hi');
lestFunc(1, 'hi', false, 1, 2, '1');

// as const(constアサーション)
let milk = 'milk' as const;
// as const適用前はstring型、適用後は"milk"型

let array = [10, 20] as const;
// as const適用前はnumber[]型、適用後はreadonly [10, 20]型
// letをconstに変えた場合は、適用前はnumber[]型、適用後はreadonly [10, 20]型となる
let array2 = [10, 20] as const;
const array3 = [10, 20] as const;
const jobjon: {
  readonly name: 'jobjon';
  readonly age: 12;
} = {
  name: 'jobjon',
  age: 12,
} as const;
// const jobjon: {
//   readonly name: 'jobjon';
//   readonly age: 12;
// } = {
//   name: 'jobjon',
//   age: 12,
// } as const;

// 型定義でtypeofが使える
type jobjon = typeof jobjon;
