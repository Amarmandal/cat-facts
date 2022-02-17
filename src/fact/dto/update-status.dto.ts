import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateStatusDto {
  @IsOptional()
  @IsBoolean()
  verified: boolean;

  @IsOptional()
  @IsString()
  feedback: string;

  @IsOptional()
  @IsNumber()
  sentCount: number;
}
