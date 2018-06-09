/* Trying out map search */


var zipCode = document.getElementById('ZipInput').value;
var zipRange = document.getElementById('MilesFrom');
var zipRangeCurrent = document.getElementById('RangeFromZip');


zipRangeCurrent.innerHTML = zipRange.value;

zipRange.oninput = function() {
    zipRangeCurrent.innerHTML = this.value;
}