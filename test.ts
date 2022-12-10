class Test {
  private _a = 2;
  public get a() {
    return this._a
  }
  public set a(val: number) { this.a = val }

  getA() {
    return { a: this.a }
  }
}
const printA = new Test() // { _a: 2 } ​​​​​
console.log(printA.getA()) // { a: 2 }
printA.a = 4
console.log(printA.getA()); // { a: 4 }
