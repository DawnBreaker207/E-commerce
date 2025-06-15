import { CustomerType, Gender } from "@/app/core/constants/type";

export interface Customer {
  customerId: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  phone: string;
  avatar: string;
  type: CustomerType
}
