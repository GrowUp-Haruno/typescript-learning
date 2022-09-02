// ジェネリクス
function copy<T>(value: T): T {
  return value;
}

console.log(copy<string>('a'));
// function copy<string>(value: string): string
console.log(copy<number>(1));
// function copy<number>(value: number): number
// ジェネリクスを指定しなくても型推論してくれる
console.log(copy('a'));
// function copy<"a">(value: "a"): "a"
console.log(copy(1));
// function copy<"a">(value: "a"): "a"

// Reactで使う場合はコンマを入れること<T,>

// extends
function copyExtends<T extends { name: string }>(value: T): T {
  return value;
}

console.log(copyExtends<{ name: string }>({ name: 'jon' }));

// keyof
type K = keyof { name: string; age: number };
// type K = 'name' | 'age';

// classに対してジェネリクス
class LightDatabase<T extends string | number | boolean> {
  private data: T[] = [];
  add(item: T) {
    this.data.push(item);
  }
  remove(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }
  get() {
    return this.data;
  }
}

const stringLightDatabase = new LightDatabase<string>();

stringLightDatabase.add('apple');
stringLightDatabase.add('banana');
stringLightDatabase.add('grale');
console.log(stringLightDatabase.get());
stringLightDatabase.remove('apple');
console.log(stringLightDatabase.get());

// interfaceでジェネリクス
interface ObjType<T extends string | number | boolean> {
  id: number;
  data: T[];
}
const obj: ObjType<string> = {
  id: 1,
  data: ['a', 'b'],
};

// Utility型
interface Todo {
  title: string;
  text: string;
}
type Todoable = Partial<Todo>;
// type Todoable = {
//   title?: string | undefined;
//   text?: string | undefined;
// };

type TodoReadonly = Readonly<Todo>;
// type TodoReadonly = {
//   readonly title: string;
//   readonly text: string;
// };

const fetchData: Promise<string> = new Promise((resolve) => {
  setTimeout(() => {
    resolve('hello');
  }, 3000);
});

fetchData.then((data) => {
  data.toUpperCase();
});

// デフォルトの型
interface ResoponseData<T = string> {
  data: T;
  status: number;
}
// ジェネリクスを指定しなかった場合は自動的にstring型として扱う
const responseData: ResoponseData = {
  data: 'test',
  status: 1,
};
// ジェネリクスを指定した場合はそれに従う
const responseData2: ResoponseData<number> = {
  data: 1,
  status: 1,
};

// Mapped Types
// 型のループ
// 文字列または数値リテラルのUnion型でインデックスシグネチャのように書くと、
// 各リテラルをイテレートして型定義してくれる
type MappedTypes = {
  [P in 'tomato' | 'ninjin' | 'kabocha']: string;
};
// type MappedTypes = {
//   tomato: string;
//   ninjin: string;
//   kabocha: string;
// };

interface Vegetables {
  tomato: string;
  ninjin: string;
  kabocha: string;
}
// keyofと組み合わせることも可能
type MappedTypes2 = {
  [P in keyof Vegetables]: string;
};
// type MappedTypes2 = {
//   tomato: string;
//   ninjin: string;
//   kabocha: string;
// };

// readonlyやoptionalも定義可能
type MappedTypes3 = {
  readonly [P in keyof Vegetables]?: string;
};
// type MappedTypes3 = {
//   readonly tomato?: string | undefined;
//   readonly ninjin?: string | undefined;
//   readonly kabocha?: string | undefined;
// };

// -readonly -?と書いた場合、readonlyとoptionalが解除される
interface Vegit {
  readonly tomato?: string;
  readonly ninjin?: string;
  readonly kabocha?: string;
}
type MappedTypes4 = {
  -readonly [P in keyof Vegetables]-?: string;
};
// type MappedTypes4 = {
//   tomato: string;
//   ninjin: string;
//   kabocha: string;
// };

// Conditional Types
// 型の条件分岐
type ConditionalType1 = 'tomato' extends string ? number : boolean;
type ConditionalType2 = string extends 'tomato' ? number : boolean;

// inferはextendsで指定したプロパティが存在する場合型推論した結果を返し、そうでなければbooleanを返している
type ConditionalTypeInfer = { name: 'tomato' } extends { name: infer R }
  ? R
  : boolean;
type ConditionalTypeInfer2 = { name: 'tomato' } extends { name: infer R }
  ? R
  : boolean;

type DistrivutiveConditionalType<T> = T extends 'tomato' ? number : boolean;
let temp: DistrivutiveConditionalType<'tomato' | 'pumpkin'>;
let temp2: NonNullable<string>;
