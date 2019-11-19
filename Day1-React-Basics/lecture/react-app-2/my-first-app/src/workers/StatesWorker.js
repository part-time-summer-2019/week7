
export default class StatesWorker {

    states = [];
    constructor() {
        this.states = [
            {id: 'NY', name: 'New York'},
            {id: 'NJ', name: 'New Jersey'},
            {id: 'CT', name: 'Connecticut'}
        ]
    }

    getStates() {
        return this.states;
    }
}