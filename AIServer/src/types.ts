export interface GenerateRequest {
  question: string;
  slideNum: number;
}

export interface GenerateResponse {
  html: string;
  insertedAfter: number;
  message: string;
}
