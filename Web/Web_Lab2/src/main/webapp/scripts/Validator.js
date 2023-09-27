export default class Validator{
    constructor(responseCode, message) {
        this.responseCode = responseCode;
        this.message = message;
    }


    validate(xVal, yVal, rVal) {
        const regex = /^-?\d+(\.\d+)?$/;

        if (!regex.test(xVal) || !(-3 < parseFloat(xVal) && parseFloat(xVal) < 5) || (xVal === "")) {
            this.message = "Error in X";
            this.responseCode = 0;
            return;
        }

        if (!regex.test(yVal) || !(-3 <= parseFloat(yVal) && parseFloat(yVal) <= 5) || (yVal === "")) {
            this.message = "Error in Y";
            this.responseCode = 0;
            return;
        }

        if (!(rVal.length === 1)) {
            this.message = "You must choose exactly one R value";
            this.responseCode = 0;
            return;
        }

        this.responseCode = 1;
    }


    getResponseCode(){
        return this.responseCode;
    }
    getMessage(){
        return this.message;
    }
}