export class Queue {
  constructor() {
    this.queue = {};
    this.tail = 0;
    this.head = 0;
  }

  enqueue(element) {
    this.queue[this.tail++] = element;
  }

  dequeue() {
    if (this.tail === this.head) return undefined;

    var element = this.queue[this.head];
    delete this.queue[this.head++];
    return element;
  }

  count() {
    return Object.keys(this.queue).length;
  }
}
