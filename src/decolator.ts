// デコレータ
// 事前に"experimentalDecorators": true,を有効にする

// // 基本系
// function Logging(constructor: Function) {
//   console.log('Logging...');
//   console.log(constructor);
// }

// @Logging
// class UserClass {
//   name = 'jon';
//   constructor() {
//     console.log('User was created!');
//   }
// }

// const user1 = new UserClass();
// const user2 = new UserClass();
// const user3 = new UserClass();

// decolatorファクトリーを用いたい定義方法
// 関数を返す関数を用意するだけ
function Logging(message: string) {
  return function (constructor: Function) {
    console.log('Logging...');
    console.log(message);
    console.log(constructor);
  };
}
function Component(template: string, selector: string) {
  return function (constructor: { new (): object }) {
    const mountedElement = document.querySelector(selector);
    const instance = new constructor();
    if (mountedElement) {
      mountedElement.innerHTML = template;
      // mountedElement.querySelector('h1') = constructor;
    }
  };
}

@Component('<h1>{{main}}</h1>', '#app')
@Logging('hello')
class UserClass {
  name = 'jon';
  constructor() {
    console.log('User was created!');
  }
}
const user1 = new UserClass();
