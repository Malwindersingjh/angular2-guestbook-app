export class States{
    id:number;    
    name:string;
    abbreviation:string;
    capital:string;
    mostpopulouscity:string;
    population:number;
    squaremiles:number;
    timezone1:string;   
    timezone2:string; 
    dst:number; 
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
