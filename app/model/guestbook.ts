export class Guestbook{
    id:number;    
    user_id:number;
    phone:string;
    message:string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
