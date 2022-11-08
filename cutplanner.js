const source = 6;
const elements = [1, 4, 5, 3, 2, 6, 6, 2, 3, 1, 1];
class Cutter {
  constructor(source, elements) {
    this.source = source;
    this.elements = elements.sort((st, nd) => nd - st);
    if (this.elements.find((item) => item > source))
      throw new Error("Element can't be longer than the source");
  }
  
  #getSlices(elements) {
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
    return result;
  }

  cut() {
    let result = [];
    let elements = this.elements.slice();
    while (elements.length > 0) {
      let slices = this.#getSlices(elements);
      result.push(slices.slice());
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


