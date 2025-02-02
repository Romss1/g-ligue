import { IsBoolean, IsDate, IsDefined, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length, Max, Min } from "class-validator";

export class CreateLeagueDTO {
    @IsNotEmpty()
    @IsString()
    @Length(3, 30)
    name: string

    @IsOptional()
    @IsString()
    description?: string

    @IsDefined()
    @IsBoolean()
    isAuthorizedMidSeasonRegistration: boolean = true

    @IsDefined()
    @IsNumber()
    @IsPositive()
    @Min(3)
    @Max(6)
    numberOfPlayerByDivision: number = 5

    @IsDefined()
    @IsDate()
    startDate: Date

    @IsDefined()
    @IsDate()
    endDate: Date
}