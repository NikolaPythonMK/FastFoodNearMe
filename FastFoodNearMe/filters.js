function filterBySmoking(restaurants){ 
    return Array.from(restaurants).filter(i => i.tags.smoking != undefined);
}

function filterByDelivery(restaurants){  
    return Array.from(restaurants).filter(i => i.tags.delivery == "yes");
}

function filterByOutdoorSeating(restaurants){
    return Array.from(restaurants).filter(i => i.tags.outdoor_seating == "yes");
}

module.exports = {
    filterBySmoking: filterBySmoking,
    filterByDelivery: filterByDelivery,
    filterByOutdoorSeating: filterByOutdoorSeating
}