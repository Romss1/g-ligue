import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateClubRequestDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  name: string;

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  address?: string

  @IsOptional()
  @IsString()
  city?: string
}
