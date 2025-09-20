import {
    IsString,
    IsEmail,
    IsOptional,
    IsNumber,
    IsEnum,
    Length,
    Min,
    IsNotEmpty,
} from "class-validator";

export class CreateOrderDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    items: string;

    @IsNumber()
    @Min(0)
    totalAmount: number;
}
