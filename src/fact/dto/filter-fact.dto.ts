import { IsEnum, IsOptional, IsString } from 'class-validator';
import { AnimalEnum } from '../fact-type.enum';

enum IsVerifiedEnum {
  TRUE = '1',
  FALSE = '0',
}

export class FilterFactDto {
  @IsOptional()
  @IsEnum(AnimalEnum)
  factType: AnimalEnum;

  @IsOptional()
  @IsEnum(IsVerifiedEnum)
  isVerified: IsVerifiedEnum;

  @IsOptional()
  @IsString()
  text: string;
}
