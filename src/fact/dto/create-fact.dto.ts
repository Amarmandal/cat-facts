import { IsEnum, IsNotEmpty } from 'class-validator';
import { AnimalEnum } from '../fact-type.enum';

export class CreateFactDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  @IsEnum(AnimalEnum)
  animalType: AnimalEnum;
}
