import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateLeagueDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(64)
  name: string;

  @IsOptional()
  @MinLength(3)
  @MaxLength(256)
  description: string;

  @IsBoolean()
  @IsDefined()
  isAuthorizedMidSeasonRegistration: boolean;

  @IsInt()
  @Min(4)
  @IsDefined()
  numberOfPlayerByDivision: number;

  @IsDefined()
  @IsDateString()
  // @Transform(({ value }) => new Date(value))
  startDate: Date;

  @IsDefined()
  @IsDateString()
  // @Transform(({ value }) => new Date(value))
  endDate: Date;
}
