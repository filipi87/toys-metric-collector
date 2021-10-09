class Exception extends Error {

    private statusCode

    constructor(statusCode:number, ...params:any[]) {
      // Pass remaining arguments (including vendor specific ones) to parent constructor
      super(...params);
      this.statusCode = statusCode
    }

  }

  export { Exception }