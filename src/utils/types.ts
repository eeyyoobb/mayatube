
// types.ts
export interface Quiz {
  id: string;
  title: string;
  description?: string;
  // Add other properties as needed
}

export interface User {
  _id: string;
  isLogged: boolean;
  name?: string;
  experience?: number;
}

export interface LoadingState {
  isLoading: boolean;
}

  