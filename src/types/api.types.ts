
export enum HttpStatus{
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVICE_ERROR = 500,
  CONFLICT = 409
}

export type SuccessApiResponse<T=any>={ success: true, message?: string, data?:T}
export type ErrorApiResponse= { success: false, message: string, status: HttpStatus, code:string, details?:any}
export type ApiResponse = SuccessApiResponse | ErrorApiResponse