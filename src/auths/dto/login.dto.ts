import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class LoginDTO {
  @ApiProperty()
  readonly username: string;

  @MinLength(5)
  @ApiProperty()
  @MinLength(5)
  readonly password: string;
}
