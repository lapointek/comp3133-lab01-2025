const fs = require("fs");

// check if file exists
let fileExists = fs.existsSync("input_countries.csv");

if (!fileExists) {
    console.log("input_countries.csv does not exist");
}

let canTxtExists = fs.existsSync("canada.txt");
let usaTxtExists = fs.existsSync("usa.txt");

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
