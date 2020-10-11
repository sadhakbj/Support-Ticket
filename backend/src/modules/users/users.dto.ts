import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional } from 'class-validator'

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty()
  email: string

  @IsOptional()
  @ApiProperty()
  image: string

  @IsOptional()
  @ApiProperty()
  bio: string
}
