class CSVParser {
    static fromString(string) {
        return new CSVParser(string)
    }

    constructor(string) {
        this.string = string
    }

    map(callback) {
        let returnValue = []
        let lines = this.string.trim().split("\n").map((row) => row.trim().split(','))
        for (let j = 0; j < lines.length; j++) {
            for (let i = 0; i < lines[j].length; i++) {
               returnValue.push(callback(lines[j][i], {x: i, y: j}))
            }
        }
        return returnValue
    }
}

export default CSVParser