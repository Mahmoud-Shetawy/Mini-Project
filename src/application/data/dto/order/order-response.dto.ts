export class OrderResponseDto {
  id: number;
  userId: number;
  items: string;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: number;
    name: string;
  };
}
