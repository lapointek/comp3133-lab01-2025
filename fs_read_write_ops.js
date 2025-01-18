const fs = require("fs");
const csv = require("csv-parser");

// check if file exists
const inputFile = "input_countries.csv";
let canTxt = "Canada";
let usaTxt = "United States";
let canOutput = "Canada.txt";
let inputFileExists = fs.existsSync("input_countries.csv");
let canTxtExists = fs.existsSync("canada.txt");
let usaTxtExists = fs.existsSync("usa.txt");

if (!inputFileExists) {
    console.log(`${inputFile} does not exist`);
}

if (canTxtExists) {
    fs.unlink("canada.txt", (err) => {
        if (err) {
            console.log(`Error: ${err}`);
        } else {
            console.log("canada.txt file successfully deleted");
        }
    });
}

if (usaTxtExists) {
    fs.unlink("usa.txt", (err) => {
        if (err) {
            console.log(`Error: ${err}`);
        } else {
            console.log("usa.txt file successfully deleted");
        }
    });
}

let filteredData = [];
fs.createReadStream(inputFile)
    // piping data from input_countries.csv to CSV parser.
    .pipe(csv())
    // log each row
    .on("data", (row) => {
        // retrieves all values of current row as array
        const rowValues = Object.values(row);
        // check if value in current row contain the search term
        if (rowValues.some((value) => value.includes(canTxt))) {
            filteredData.push(row);
        }
    })
    // log when csv file is finished processing
    .on("end", () => {
        // Create CSV header by retrieving keys from the first object in input_countries.txt
        // The keys are joined into string separated by commas and a newline character is appended.
        const csvHeader = Object.keys(filteredData[0]).join(",") + "\n";
        // Maps each row object to a string joined by
        // commas and combines all rows into a single string and separated by a newline
        const csvRows = filteredData
            .map((row) => Object.values(row).join(","))
            .join("\n");
        // Write CSV content including the header and filtered rows to Canada.txt
        fs.writeFileSync(canOutput, csvHeader + csvRows);
        console.log("CSV file successfully proccessed");
    });
