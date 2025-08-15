class WsCallBackManager {
  constructor() {
    this.callback = null;
  }

  setCallBack(callbackFn) {
    console.log("Setting callback function");
    this.callback = callbackFn;
  }

  unSetCallBack() {
    console.log("Unsetting callback function");
    this.callback = null;
  }

  executeCallBack(data) {
    console.log("Trying to execute the callback");
    if (this.callback) {
      console.log("Executing the callback");
      this.callback(data);
    }
  }
}

export const wsCallBackManager = new WsCallBackManager();