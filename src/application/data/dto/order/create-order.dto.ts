import { IsString, IsNumber, Min, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  items: string;

  @IsNumber()
  @Min(0)
  totalAmount: number;
}
