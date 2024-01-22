import {CerereDisertatie} from "./Cerere";

export interface Utilizator {
  UserId: number;
  UserName: string;
  UserSurName: string;
  Type: string;
  UserPhone: string | null;
  UserEmail: string | null;
  Cerere: CerereDisertatie[];
}