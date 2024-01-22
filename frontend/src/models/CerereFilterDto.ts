import { PaginationDto } from "./PaginationDto";

export interface CerereFilterDto extends PaginationDto{
    Id: number
    Detail: string
    Stare:string
}