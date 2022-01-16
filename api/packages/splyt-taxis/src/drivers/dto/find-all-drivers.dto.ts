import {
  IsInt, IsLatitude, IsLongitude, IsOptional, Max, Min
} from "class-validator";

/**
 * findAll drivers DTO
 */
export class FindAllDriversDto {
  @IsLatitude()
    latitude: number;

  @IsLongitude()
    longitude: number;

  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
    numberOfVehicles?: number;

  @IsInt()
  @Min(1)
  @Max(7)
  @IsOptional()
    maxEta?: number;
}