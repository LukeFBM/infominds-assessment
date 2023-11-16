export interface EmployeeListQuery {
    id: number;
    firstName: string;
    lastName: string; 
    address: string;
    email: string;
    phone: string;
  }

 export interface EmployeeListFilter {
    firstName: string, 
    lastName: string
  }

  export interface SupplierListQuery {
    id: number;
    name: string;
    address: string;
    email: string;
    phone: string;
  }