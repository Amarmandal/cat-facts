import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateRecipientDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsNumber()
  phoneNumber: number;
}
