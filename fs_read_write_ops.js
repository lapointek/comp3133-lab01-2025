const fs = require("fs");
const csv = require("csv-parser");

// check if file exists
const inputFile = "input_countries.csv";
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

fs.createReadStream(inputFile)
    // piping data from input_countries.csv to CSV parser.
    .pipe(csv())
    // log each row
    .on("data", (row) => {
        console.log(row);
    })
    // log when csv file is finished processing
    .on("end", () => {
        console.log("CSV file successfully proccessed");
    });
