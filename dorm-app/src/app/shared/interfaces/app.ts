export interface RegisterRequest {
    user: {
      username: string;
      password: string;
      firstName: string;
      lastName: string;
      email: string;
      vat: string;
      genderType: string; // Enum: MALE, FEMALE
      role: string;   // Enum: STUDENT, WARDEN
    };
  }
  
  export interface LoginRequest {
    username: string;
    password: string;
}
  

export interface Room {
  roomId: number | null;
  roomName: string;
  roomCapacity: number;
  available: boolean;
}

export interface User {
  userId : number
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  email: string
}

export interface Student {
  id: number;
  uuid: string;
  user: User ;
  room: Room;
}

export interface StudentUpdate {
  user: {
    email: string
  }
}

export interface ErrorMessage {
  code: string;
  description: string
}
  