/* Main clientside Javascript file */

/* Slider display function and variables */
var PriceRange = document.getElementById('PriceRange');
var CurrentRange = document.getElementById('PriceRangeHeader');

CurrentRange.innerHTML = PriceRange.value;

PriceRange.oninput = function() {
    CurrentRange.innerHTML = this.value;
}