// cut planner
const source = 6;
const elements = [5, 3, 2, 2, 3, 1, 1];
class Cutter {
  constructor(source, elements) {
    this.source = source;
    this.elements = elements.sort((st, nd) => nd - st);
    if (this.elements.find((item) => item > source))
      throw new Error("Element must be a shorter than the source");
  }
  getSlices(elements) {
    let result = [];
    result.remains = [];
    let length = 0;
    for (let elem of elements) {
      if (length + elem > this.source) {
        result.remains.push(elem);
        continue;
      }
      length += elem;
      result.push(elem);
    }
    //console.log(`result.remains - ${result.remains}`);
    return result;
  }
  cut() {
    let result = [];
    let elements = this.elements.slice();
    while (elements.length > 0) {
      //console.log(`elements.length - ${elements.length}`);
      let slices = this.getSlices(elements);
      //console.log(`remains - ${slices.remains}`);
      result.push(slices.slice());
      //console.log(`result - ${result}`);
      elements = slices.remains.slice();
    }
    return result;
  }
}
let cutResult = new Cutter(source, elements).cut();
console.log(`You need ${cutResult.length} source(s):`);
cutResult.forEach((item, index) => {
  console.log(`cutting source #${index + 1} - ${item}`);
});
