class CSVParser {
    static fromString(string) {
        return new CSVParser(string)
    }

    constructor(string) {
        this.string = string
        this.rows = this.string.trim().split("\n").map((row) => row.trim().split(','))
    }


    get numRows() {
        return this.rows.length
    }

    get maxColumns() {
        return this.rows.reduce((longestRow, currentRow) => longestRow > currentRow.length ? longestRow : currentRow.length)
    }

    map(callback) {
        let returnValue = []
        for (let j = 0; j < this.rows.length; j++) {
            for (let i = 0; i < this.rows[j].length; i++) {
               returnValue.push(callback(this.rows[j][i], {x: i, y: j}))
            }
        }
        return returnValue
    }
}

export default CSVParser