import { PaginationDto } from "./PaginationDto";

export interface UtilizatorFilterDto extends PaginationDto{
    Name: string
    Surname: string
}