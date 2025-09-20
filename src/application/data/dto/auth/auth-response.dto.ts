export class AuthResponseDto {
  user: {
    id: number;
    email: string;
  };
  token: string;
}
