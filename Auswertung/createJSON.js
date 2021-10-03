// file system module to perform file operations
const fs = require('fs');

let json = JSON.parse(fs.readFileSync('complete.json', 'utf8'));

let newArray = [];
json.forEach(obj => {
    let {created_at, updated_at, taskresults, ...studies} = obj;

    newArray.push(studies)
});

console.log(newArray)

/*    obj.filter(function (el)
    {
        return el.age >=6;
    }
);*/
//console.log(newArray);

let jsonContent = JSON.stringify(newArray);

fs.writeFile("studies.json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }

    console.log("JSON file has been saved.");
})
