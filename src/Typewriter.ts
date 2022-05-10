export default class Typewriter {
  #queue = [];
  element: HTMLElement;
  loop: Boolean;
  typingSpeed: Number;
  deletingSpeed: Number;

  constructor(
    element: HTMLElement,
    { loop = false, typingSpeed = 50, deletingSpeed = 50 } = {}
  ) {
    (this.element = element),
      (this.loop = loop),
      (this.typingSpeed = typingSpeed),
      (this.deletingSpeed = deletingSpeed);
  }

  typeString(string: string) {
    //   Add to queue
    this.#queue.push(() => {
      return new Promise((resolve, reject) => {
        //Add string
        resolve();
      });
    });
    return this;
  }

  deleteChars(number: number) {
    return this;
  }

  deleteAll(deleteSpeed = this.deletingSpeed) {
    return this;
  }

  pauseFor(duration: number) {
    return this;
  }

  start() {
    return this;
  }
}
