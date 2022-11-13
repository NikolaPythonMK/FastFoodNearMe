class Pipe{
    constructor() {
        this.filters = [];
    }

    addFilter(filter){;
        this.filters.push(filter);
    }

    runFilters(input){
        for(let i = 0; i < this.filters.length; i++){
            input = this.filters[i](input);
        }
        return input;
    }
}

module.exports = {
    Pipe: Pipe
}