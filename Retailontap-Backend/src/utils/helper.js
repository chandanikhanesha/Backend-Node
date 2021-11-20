class Helper {    
    static sortJsonArray(property, order) {
        var sortOrder = 1;
        if (order === "DESC") {
            sortOrder = -1;
        }
        return function (a, b) {
            if (a[property] < b[property]) {
                return -1 * sortOrder;
            } else if (a[property] > b[property]) {
                return 1 * sortOrder;
            } else {
                return 0 * sortOrder;
            }
        }
    }
}

export default Helper;