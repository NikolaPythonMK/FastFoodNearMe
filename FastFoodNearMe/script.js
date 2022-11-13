const restaurants = require("./restaurants.js").restaurants.elements;
const filters = require("./filters.js");
const Pipe = require("./pipe.js").Pipe;
let pipe = new Pipe();


pipe.addFilter(filters.filterByDelivery);
console.log(pipe.runFilters(restaurants));

