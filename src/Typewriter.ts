type QueueItem = () => Promise<void>; // QueueItem is a function that returns an empty Promise.

export default class Typewriter {
  //# is JS and makes the variable private during runtime.
  //"private varName" is TS and is private only during compile-time.
  #queue: QueueItem[] = [];
  element: HTMLElement;
  loop: Boolean;
  typingSpeed: number;
  deletingSpeed: number;

  constructor(
    parent: HTMLElement,
    { loop = false, typingSpeed = 50, deletingSpeed = 50 } = {}
  ) {
    (this.element = document.createElement('div')),
      this.element.classList.add('whitespace'),
      parent.append(this.element),
      (this.loop = loop),
      (this.typingSpeed = typingSpeed),
      (this.deletingSpeed = deletingSpeed);
  }

  typeString(string: string) {
    //   Add to queue
    this.#addToQueue((resolve) => {
      let i = 0;

      const interval = setInterval(() => {
        //Add string
        this.element.append(string[i]);
        i++;
        if (i >= string.length) {
          resolve();
          clearInterval(interval);
        }
      }, this.typingSpeed);
    });

    //   Add to queue
    // this.#queue.push(() => {
    //   return new Promise((resolve) => {
    //     let i = 0;

    //     const interval = setInterval(() => {
    //       //Add string
    //       this.element.append(string[i]);
    //       i++;
    //       if (i >= string.length) {
    //         resolve();
    //         clearInterval(interval);
    //       }
    //     }, this.typingSpeed);
    //   });
    // });
    return this;
  }

  deleteChars(number: number) {
    this.#addToQueue((resolve) => {
      let i = 0;

      const interval = setInterval(() => {
        //Take current innerText, remove last char and add back on
        this.element.innerText = this.element.innerText.substring(
          0,
          this.element.innerText.length - 1
        );
        i++;
        if (i >= number) {
          resolve();
          clearInterval(interval);
        }
      }, this.deletingSpeed);
    });
    return this;
  }

  deleteAll(deleteSpeed = this.deletingSpeed) {
    console.log(deleteSpeed);
    return this;
  }

  pauseFor(duration: number) {
    console.log(duration);
    return this;
  }

  async start() {
    for (let cb of this.#queue) {
      await cb();
    }
    //can`t await inside a forEach
    // this.#queue.forEach(cb => {

    // })
    return this;
  }

  #addToQueue(cb: (resolve: () => void) => void) {
    this.#queue.push(() => {
      return new Promise(cb);
    });
  }
}
