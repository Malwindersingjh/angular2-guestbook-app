export class Event{
    id:number;
    video_url:string; 

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
