/* Test Results specific functions */

function logNewResults(results)
{
    return results;
}

function openResults(filename)
{
    var results = [[3,7,9,10,40,60,38,24,15]];
    
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

/* File operations */

function createResultsFolder()
{
    fs.root.getDirectory('ResultsData', {create: true}, function(dirEntry) {
        console.log('You have just created the ' + dirEntry.name + ' directory.');
    }, errorHandler);
}

function getResultsFiles()
{
    fs.root.getDirectory('ResultsData', {}, function(dirEntry){
        var dirReader = dirEntry.createReader();
        dirReader.readEntries(function(entries) {
        for(var i = 0; i < entries.length; i++) {
            var entry = entries[i];
            if (entry.isDirectory){
                console.log('Directory: ' + entry.fullPath);
            }
            else if (entry.isFile){
                console.log('File: ' + entry.fullPath);
            }
        }
        }, errorHandler);
    }, errorHandler);
}

var currentFile = null;
var currentFileContents = null;

function createResultFile()
{
    var milliseconds = (new Date).getTime();
    fs.root.getFile('results-' + milliseconds + '.csv', {create: true, exclusive: true}, function(fileEntry) {
        console.log('A file ' + fileEntry.name + ' was created successfully.');
        currentFile = fileEntry;
    }, errorHandler);
}

function readFile(filename)
{
    fs.root.getFile(filename, {create: false, exclusive: true}, function(fileEntry) {
        console.log('A file ' + fileEntry.name + ' was created successfully.');
        currentFile = fileEntry;
    }, errorHandler);
}

function writeToFile(fileEntry, text)
{
    fileEntry.createWriter(function(fileWriter) {
        fileWriter.seek(fileWriter.length);
        window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder;
        var bb = new BlobBuilder();
        bb.append(text);
        fileWriter.write(bb.getBlob('text/plain'));
    }, errorHandler);
}

function readFile(fileEntry)
{
    fileEntry.file(function(file) {
        var reader = new FileReader();
        reader.onloadend = function(e) {
            currentFileContents = this.result;
        };
        reader.readAsText(file);
    }, errorHandler);
}
