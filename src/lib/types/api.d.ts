declare type DataBaseFields = {
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
  
  declare type Metadata = {
    currentPage: number;
    limit: number;
    totalPages: number;
    totalItems: number;
  };
  
  declare type ErrorResponse = {
    error: string;
  };
  
  declare type SuccessfulResponse<T> = {
    message: string;
  } & T;
  
  declare type PaginatedResponse<T> = {
    metadata: Metadata;
  } & T;
  
  interface User {
    addresses: [];
    createdAt: string;
    email: string;
    firstName: string;
    gender: "male" | "female";
    lastName: string;
    passwordResetCode: string;
    passwordResetExpires: string;
    photo: string;
    resetCodeVerified: boolean;
    role: string;
    wishlist: [];
    _id: string;
  }
  
  interface Payload {
    message: string;
    user: User;
  }
  
  declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse;
  