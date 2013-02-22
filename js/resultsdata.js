/* Test Results specific functions */

function createRandomResults()
{
    return [[Math.floor(Math.random()*7),
            Math.floor(Math.random()*13),
            Math.floor(Math.random()*18),
            Math.floor(Math.random()*30),
            Math.floor(Math.random()*50),
            Math.floor(Math.random()*80),
            Math.floor(Math.random()*90),
            Math.floor(Math.random()*70),
            Math.floor(Math.random()*60),
            Math.floor(Math.random()*30)
            ]];
}

function logNewResults(results)
{
    /* Temporary */
    createResultsFolder(function(){
        currentFile = null;
        createResultFile(function(){
            var csv = "";
            for(var i = 0; i < results.length; i++) 
            {
                for(var j = 0; j < results[i].length; j++) 
                {
                    csv += results[i][j];
                    if ((j + 1) != results[i].length) csv += ",";
                }
                if ((i + 1) != results.length) csv += "\n";
            }
            writeToFile(currentFile, csv);
        });
    });
}

function openResults(results)
{
    return $.jqplot('chart1', results, {
        series:[{showMarker:false}],
        axes:{
            xaxis:{
                label:'Time (m)'
            },
            yaxis:{
                label:'Moves'
            }
        }
    });
}

function exportCurrentResults()
{
    exportFileContents(currentFile.name, currentFileContents);
}


/* File operations */

function createResultsFolder(callback)
{
    setupFileSystemAPI();
    fs.root.getDirectory('ResultsData', {create: true}, function(dirEntry) {
        console.log('You have just created the ' + dirEntry.name + ' directory.');
        callback();
    }, errorHandler);
}

var resultFiles = null;

function getResultsFiles(resultsCallback)
{
    setupFileSystemAPI(function(){
        fs.root.getDirectory('ResultsData', {}, function(dirEntry){
            var dirReader = dirEntry.createReader();
            var results = [];
            dirReader.readEntries(function(entries) {
            for(var i = 0; i < entries.length; i++) {
                var entry = entries[i];
                if (entry.isDirectory){
                    //don't care
                }
                else if (entry.isFile){
                    results.push(entry);
                }
            }
            resultFiles = results;
            if (typeof(resultsCallback) != "undefined" && resultsCallback != null) resultsCallback();
            }, errorHandler);
        }, errorHandler);
    });
}

var currentFile = null;
var currentFileContents = null;

function createResultFile(callback)
{
    setupFileSystemAPI();
    var milliseconds = (new Date).getTime();
    fs.root.getFile('ResultsData/results-' + milliseconds + '.csv', {create: true, exclusive: true}, function(fileEntry) {
        console.log('A file ' + fileEntry.name + ' was created successfully.');
        currentFile = fileEntry;
        callback();
    }, errorHandler);
}

function getFile(filename)
{
    setupFileSystemAPI();
    fs.root.getFile(filename, {create: false, exclusive: true}, function(fileEntry) {
        console.log('A file ' + fileEntry.name + ' was created successfully.');
        currentFile = fileEntry;
    }, errorHandler);
}

function writeToFile(fileEntry, text, callback)
{
    setupFileSystemAPI();
    fileEntry.createWriter(function(fileWriter) {
        fileWriter.seek(fileWriter.length);
        var blob = new Blob([text], {type: 'text/plain'});
        fileWriter.write(blob);
        readFile(currentFile);
        if (!!callback) callback();
    }, errorHandler);
}

function exportFileContents(name, contents)
{
    setupFileSystemAPI();
    var blob = new Blob([contents], {type: "text/plain;charset=utf-8"});
    saveAs(blob, name);
}

var readFileCallback;
function readFile(fileEntry, callback)
{
    readFileCallback = callback;
    currentFile = fileEntry;
    setupFileSystemAPI(function(){
        currentFile.file(function(file) {
            var reader = new FileReader();
            reader.onloadend = function(e) {
                currentFileContents = this.result;
            };
            reader.readAsText(file);
            if (typeof(callback) != "undefined" && callback != null) readFileCallback();
        }, errorHandler);
    });
}

function errorHandler(err)
{
    switch (err.code)
    {
        case FileError.NOT_FOUND_ERR:
            console.log("Error: File Not Found");
            break;
        case FileError.SECURITY_ERR:
            console.log("Error: Security Error");
            break;
        case FileError.ABORT_ERR:
            console.log("Error: Aborted");
            break;
        case FileError.NOT_READABLE_ERR:
            console.log("Error: Not Readable");
            break;
        case FileError.ENCODING_ERR:
            console.log("Error: Encoding Issues");
            break;
        case FileError.NO_MODIFICATION_ALLOWED_ERR:
            console.log("Error: Not Allowed to Modify");
            break;
        case FileError.INVALID_STATE_ERR:
            console.log("Error: Invalid State");
            break;
        case FileError.SYNTAX_ERR:
            console.log("Error: Syntax");
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            console.log("Error: Invalid Modification");
            break;
        case FileError.QUOTA_EXCEEDED_ERR:
            console.log("Error: Quota Exceeded");
            break;
        case FileError.TYPE_MISMATCH_ERR:
            console.log("Error: Type Mismatch");
            break;
    }
}
