import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsString()
  items?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalAmount?: number;
}
