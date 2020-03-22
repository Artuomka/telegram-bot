class ResponseStringifier {
    constructor() {
        this.responseStringify = (res) => {
            return ("Ближайший магазин Varus находится по адресу \n" + res.destinition_adress +
                "\nна расстоянии в " + res.distanceTxt + " от вас " +
                "\nдорога к нему на автомобиле займет примерно " + res.duration_in_traffic.text
            );
        }
    }
}

module.exports = ResponseStringifier;
