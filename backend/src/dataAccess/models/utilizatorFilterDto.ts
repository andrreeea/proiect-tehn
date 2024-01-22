import paginationDto from "./paginationDto";

export default class utilizatorFilterDto extends paginationDto{
    Name!: string | null
    Surname!: string | null  

    constructor(obj : Partial<utilizatorFilterDto>){
        super();        
        Object.assign(this, obj);
        this.setTakeAndSkip(this.take, this.skip)       
    }
}