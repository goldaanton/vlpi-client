export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface Exercise {
  name: string;
  description: string;
  moduleId: number;
}