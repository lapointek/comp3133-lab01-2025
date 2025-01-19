const fs = require("fs");
const csv = require("csv-parser");

// check if file exists
const inputFile = "input_countries.csv";
let canTxt = "Canada";
let usaTxt = "United States";
let canOutput = "Canada.txt";
let usaOutput = "United States.txt";
let inputFileExists = fs.existsSync("input_countries.csv");
let canTxtExists = fs.existsSync("Canada.txt");
let usaTxtExists = fs.existsSync("United States.txt");

if (!inputFileExists) {
    console.log(`${inputFile} does not exist`);
}

// Check if Canada.txt exists if so delete file
if (canTxtExists) {
    fs.unlink("Canada.txt", (err) => {
        if (err) {
            console.log(`Error: ${err}`);
        } else {
            console.log("Canada.txt file successfully deleted");
        }
    });
}

// Check if United States.txt exists if so delete file
if (usaTxtExists) {
    fs.unlink("United States.txt", (err) => {
        if (err) {
            console.log(`Error: ${err}`);
        } else {
            console.log("United States.txt file successfully deleted");
        }
    });
}

// Create Canada.txt
let canFilteredData = [];
fs.createReadStream(inputFile)
    // piping data from input_countries.csv to CSV parser.
    .pipe(csv())
    // log each row
    .on("data", (row) => {
        // retrieves all values of current row as array
        const rowValues = Object.values(row);
        // check if value in the current row contains the search term
        if (rowValues.some((value) => value.includes(canTxt))) {
            canFilteredData.push(row);
        }
    })
    // Process at the end of the file
    .on("end", () => {
        // Create CSV header by retrieving keys from the first object in input_countries.txt
        // The keys are joined into string separated by commas and a newline character is appended.
        const csvHeader = Object.keys(canFilteredData[0]).join(",") + "\n";
        // Maps each row object to a string joined by
        // commas and combines all rows into a single string and separated by a newline
        const csvRows = canFilteredData
            .map((row) => Object.values(row).join(","))
            .join("\n");
        // Write CSV content including the header and filtered rows to Canada.txt
        fs.writeFileSync(canOutput, csvHeader + csvRows);
        // log when CSV file is finished
        console.log("CSV file successfully proccessed");
    });

// Create United States.txt
let usaFilteredData = [];
fs.createReadStream(inputFile)
    // piping data from input_countries.csv to CSV parser.
    .pipe(csv())
    // log each row
    .on("data", (row) => {
        // retrieves all values of current row as array
        const rowValues = Object.values(row);
        // check if value in the current row contains the search term
        if (rowValues.some((value) => value.includes(usaTxt))) {
            usaFilteredData.push(row);
        }
    })
    // Process at the end of the file
    .on("end", () => {
        // Create CSV header by retrieving keys from the first object in input_countries.txt
        // The keys are joined into string separated by commas and a newline character is appended.
        const csvHeader = Object.keys(usaFilteredData[0]).join(",") + "\n";
        // Maps each row object to a string joined by
        // commas and combines all rows into a single string and separated by a newline
        const csvRows = usaFilteredData
            .map((row) => Object.values(row).join(","))
            .join("\n");
        // Write CSV content including the header and filtered rows to Canada.txt
        fs.writeFileSync(usaOutput, csvHeader + csvRows);
        // log when CSV file is finished
        console.log("CSV file successfully proccessed");
    });
