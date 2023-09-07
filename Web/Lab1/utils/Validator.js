export default class Validator{
    constructor(responseCode, message) {
        this.responseCode = responseCode;
        this.message = message;
    }
    validate(xVal, yVal, rVal){
        if (!(-3 <= xVal && xVal <= 5)){
            this.message = "Error in X";
            this.responseCode = 0;
        } else if (!(-5 <= yVal && yVal <= 5)){
            this.message = "Error in Y";
            this.responseCode = 0;
        } else if (!(rVal.length === 1)){
            this.message = "You must choose exactly one R value";
            this.responseCode = 0;
        } else {
           this.responseCode = 1;
        }
    }

    getResponseCode(){
        return this.responseCode;
    }
    getMessage(){
        return this.message;
    }
}