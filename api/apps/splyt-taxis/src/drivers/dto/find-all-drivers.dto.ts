import {
  IsInt, IsLatitude, IsLongitude, IsOptional
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
  @IsOptional()
    numberOfVehicles?: number;
}