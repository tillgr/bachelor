import * as fs from "fs";
import {convertArrayToCSV} from "convert-array-to-csv";
import * as d3 from 'd3';

let json = JSON.parse(fs.readFileSync('complete.json', 'utf8'));

/**export methods**/
let exportToCsv = function(name, results) {
    /*let CsvString = "";
    /!*results.forEach(function(RowItem, RowIndex) {
        RowItem.forEach(function(ColItem, ColIndex) {
            CsvString += ColItem + ',';
        });
        CsvString += "\r\n";
    });*!/

    results.forEach(item => {
        /!*CsvString += item + ',';*!/
        CsvString += "\r\n";
    });*/
    /*CsvString = encodeURIComponent(CsvString);

    fs.writeFile(`csv/${name}.csv`, CsvString, 'utf8', function (err) {
        if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.');
        } else{
            console.log('It\'s saved!');
        }
    });*/

    let file = results.toString().replace(/,/g, '\n');

    fs.writeFile(`csv/${name}.csv`, file, 'utf8', function (err) {
        if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.');
        } else{
            console.log('It\'s saved!');
        }
    });
}
let exportToCsv2D = function(name, data_normal, data_mix) {
    let CsvString = "";

    let results = transposeArray([data_normal,data_mix])
    /*results.unshift(["normal", "mix"])*/

    let header = ["normal", "mix"];

    /*results.forEach(function(RowItem, RowIndex) {
        RowItem.forEach(function(ColItem, ColIndex) {
            CsvString += ColItem + ',';
        });
        CsvString += "\r\n";
    });*/


    /*CsvString = encodeURIComponent(CsvString);

    fs.writeFile(`csv/${name}.csv`, CsvString, 'utf8', function (err) {
        if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.');
        } else{
            console.log('It\'s saved!');
        }
    });*/

    let file = convertArrayToCSV(results, {
        header,
        separator: ';'
    });
    fs.writeFile(`csv/${name}.csv`, file, 'utf8', function (err) {
        if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.');
        } else{
            console.log('It\'s saved!');
        }
    });
}
let flatten = function (name, data, header) {
    let file = convertArrayToCSV(data, {
        header,
        separator: '' +
            ';'
    });
    fs.writeFile(`csv/${name}.csv`, file, 'utf8', function (err) {
        if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.');
            console.log(err)
        } else{
            console.log('It\'s saved!');
        }
    });
}

/**helpers**/
//1 aus 9
function listToMatrix(list, elementsPerSubArray) {
    let matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
}
function calcMatrixRow(matrix, val){
    let row = 0
    while (true){

        if (matrix[row].includes(val)){
            break;
        }
        row ++;
    }

    return row
}
function transposeArray(array) {
    /*console.log("transposed array")
    console.log(result)*/
    return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
}


/**1 of 9**/
let oneOfNineMix = []; //distances of type
let mixTime = [];   //time for choosing
let oneOfNineMixPretest = [] //subject and knowledge score for the test

let oneOfNineNormal = []; //distances of type
let normalTime = [];    //time for choosing
let oneOfNineNormalPretest = [] //subject and knowledge score for the test

/**perms**/
let perms = []; //chosen glyph positions

let pbDist = [];    //distances for pitch/brightness
let pbTime = []; //time for choosing
let pbPretest = []; //subject and knowledge score for the test

let rsDist = [];    //distances for richness/sharpness
let rsTime = []; //time for choosing
let rsPretest = []; //subject and knowledge score for the test

/**choose fav**/
let chooseFav = []; //chosen glyph names
let chooseFavPretest = []; //subject and knowledge score for the test
//TODO waren personen bei den glyohenarten konsistent? --> plot


/**pretest results**/
let pretest = [];   //results of pretests (audio env.)
function calcPretestData(pretestData) {
    let obj = {};
    for (let item of pretestData){
        obj[item.frequency] = item['result']['db']
    }
    pretest.push(
        Object.entries(obj).sort((a,b) => b[0]-a[0]).map(el => el[1])
    );
}

/**pretest knowledge**/
let mainKnowledge = []; //overall knowledge for all study subjects
function calcKnowledgeData(knowledgeData) {
    let unordered = {};
    let max = 28;

    for (let item of knowledgeData) {
        unordered['knowledge_' + item.knowledge] = item.likert;
        unordered['subject'] = item.subject;
    }

    let temp = 0;
    Object.keys(unordered).forEach(function (key, index) {
        if (key.toString().includes('knowledge')){
            temp = temp + unordered[key];
        }
    })
    unordered['knowledge_score'] = temp/max;

    const ordered = Object.keys(unordered).sort().reduce(
        (obj, key) => {
            obj[key] = unordered[key];
            return obj;
        },
        {}
    );

    return ordered
}


/**Main Loop**/
for (let obj of json) {
    let taskresults = obj['taskresults'];

    let pretestData = obj['subject']['pretestresults'][0]['data']
    calcPretestData(pretestData)

    /*let knowledgeData = obj['subject']['knowledgeresults']
    let knowledge = calcKnowledgeData(knowledgeData)*/
    /*mainKnowledge.push(
        Object.entries(knowledge).map(el => el[1])
    );*/

    /*let knowledgeScore = knowledge['knowledge_score']
    let subject = knowledge['subject']
    let preObject = {knowledgeScore, subject}*/

    for (let result of taskresults){

        //console.log(result)

        //1 aus 9
        let props = ['glyphTypeName', 'displayedSounds', 'selectedGlyphOfSound']
        /*if (props.every(prop => result['data'].hasOwnProperty(prop))){
            //console.log("1 aus 9")
            let selected = +result['data']['selectedGlyphOfSound']
            let real = +result["objects"][0]['id']

            let displayedSounds = result['data']['displayedSounds']
            let glyphTypeName = result['data']['glyphTypeName']


            let x1 = displayedSounds.indexOf(selected) % 3;
            let x2 = displayedSounds.indexOf(real) % 3;

            let matrix = listToMatrix(displayedSounds, 3)
            let y1 = calcMatrixRow(matrix, selected);
            let y2 = calcMatrixRow(matrix, real);

            let distX = Math.abs(x1-x2)
            let distY = Math.abs(y1-y2)
            let dist = distX + distY

            if (glyphTypeName === "D3Glyph"){
                //oneOfNineNormal.push(dist)
                //normalTime.push(Math.round(result.duration))
                oneOfNineNormalPretest.push(preObject);
            }
            else {
                //oneOfNineMix.push(dist)
                //mixTime.push(Math.round(result.duration))
                oneOfNineMixPretest.push(preObject);
            }
        }*/

        // 2er perms
        props = ['permutatedFeatureNames']
        /*if (props.every(prop => result['data'].hasOwnProperty(prop))){
            /!*console.log('perms!')
            console.log(result)*!/

            /!*!//selected object
            let selectedObject = result['data']['selectedFeature'];
            //actual object
            let actualObject = result['objects'][0]['data'];

            //quantize functions
            let permutationSteps = result['data']['permutationSteps'];
            let splits = [...permutationSteps]
            splits.shift()
            let threshStep = d3.scaleThreshold()
                .domain(splits)
                .range(permutationSteps);*!/

            //quantize actual object + calculate distance
            let permutatedFeatureNames = result['data']['permutatedFeatureNames'];
            /!*let obj = {}
            for (let name of permutatedFeatureNames){
                let dist = Math.abs(threshStep(actualObject[name]) - selectedObject[name]);
                obj[name] = dist;
            }*!/
            if (JSON.stringify(permutatedFeatureNames) === "[\"richness\",\"sharpness\"]"){
                //rsDist.push(obj);
                //rsTime.push(Math.round(result.duration))
                rsPretest.push(preObject);
            } else{
                //pbDist.push(obj)
                //pbTime.push(Math.round(result.duration))
                pbPretest.push(preObject);
            }


            //let position = result['data']['selectedPermutationID'];

            //perms.push(position)
        }*/

        //choose fav
        props = ['selectedGlyph','displayedGlyphs']
        /*if (props.every(prop => result['data'].hasOwnProperty(prop))){
            console.log('choose')

            let selected = result['data']['selectedGlyph'];


            chooseFav.push(selected)
            chooseFavPretest.push(preObject);



            //if not empty
            //name eintragen
            console.log(selected)
        }*/



    }
}

/**export section**/
/*exportToCsv2D('oneOfNine', oneOfNineNormal, oneOfNineMix)
exportToCsv('perms', perms)
exportToCsv('chooseFav', chooseFav)*/
/*
flatten('rsDist', rsDist, ["richness", "sharpness"]);
flatten('pbDist', pbDist, ["pitch", "brightness"]);
*/

/*
exportToCsv('pbTime', pbTime)
exportToCsv('rsTime', rsTime)*/

flatten('pretest', pretest, ['50Hz', '250Hz', '570Hz', '1000Hz' ,'1600Hz', '2500Hz', '4000Hz', '7000Hz', '13500Hz'])
//flatten('mainKnowledge', mainKnowledge, ['knowledge_1', 'knowledge_2', 'knowledge_3', 'knowledge_4' ,'knowledge_score', 'subject'])
/*flatten('oneOfNineMixPretest', oneOfNineMixPretest, ['knowledgeScore', 'subject'])
flatten('oneOfNineNormalPretest', oneOfNineNormalPretest, ['knowledgeScore', 'subject'])*/
/*
flatten('rsPretest', rsPretest, ['knowledgeScore', 'subject'])
flatten('pbPretest', pbPretest, ['knowledgeScore', 'subject'])
*/
//flatten('chooseFavPretest', chooseFavPretest, ['knowledgeScore', 'subject'])


