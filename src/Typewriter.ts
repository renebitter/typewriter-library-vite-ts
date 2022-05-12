// QueueItem is a function that returns an empty Promise.
type QueueItem = () => Promise<void>;
export default class Typewriter {
  //# is JS and makes the variable private during runtime.
  //"private varName" is TS and is private only during compile-time.
  #queue: QueueItem[] = [];
  #element: HTMLElement;
  #loop: Boolean;
  #typingSpeed: number;
  #deletingSpeed: number;

  constructor(
    parent: HTMLElement,
    { loop = false, typingSpeed = 50, deletingSpeed = 50 } = {}
  ) {
    (this.#element = document.createElement('div')),
      parent.append(this.#element),
      (this.#loop = loop),
      (this.#typingSpeed = typingSpeed),
      (this.#deletingSpeed = deletingSpeed);
  }

  typeString(string: string) {
    //   Add to queue
    this.#addToQueue((resolve) => {
      let i = 0;

      const interval = setInterval(() => {
        //Add character to the end of element
        this.#element.append(string[i]);
        i++;
        if (i >= string.length) {
          resolve();
          clearInterval(interval);
        }
      }, this.#typingSpeed);
    });

    return this;
  }

  deleteChars(number: number) {
    this.#addToQueue((resolve) => {
      let i = 0;

      const interval = setInterval(() => {
        //Take current innerText, remove last char and add back on
        this.#element.innerText = this.#element.innerText.substring(
          0,
          this.#element.innerText.length - 1
        );
        i++;
        if (i >= number) {
          resolve();
          clearInterval(interval);
        }
      }, this.#deletingSpeed);
    });
    return this;
  }

  deleteAll(deleteSpeed = this.#deletingSpeed) {
    this.#addToQueue((resolve) => {
      const interval = setInterval(() => {
        //Take current innerText, remove last char and add back on
        this.#element.innerText = this.#element.innerText.substring(
          0,
          this.#element.innerText.length - 1
        );
        if (this.#element.innerText.length === 0) {
          resolve();
          clearInterval(interval);
        }
      }, deleteSpeed);
    });

    return this;
  }

  pauseFor(duration: number) {
    this.#addToQueue((resolve) => {
      setTimeout(resolve, duration);
    });
    return this;
  }

  async start() {
    let cb = this.#queue.shift(); // Removes first element of #queue

    while (cb != null) {
      await cb();
      if (this.#loop) this.#queue.push(cb); // Adds back to end of list

      cb = this.#queue.shift(); // Get next element of list
    }

    return this;
  }

  #addToQueue(cb: (resolve: () => void) => void) {
    this.#queue.push(() => {
      return new Promise(cb);
    });
  }
}
