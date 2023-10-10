import {
  Controller,
  Post,
  Body,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'exception/httpExceptionFilter';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto/create-auth.dto';

@Controller('/auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUP(@Body() createAuthDto: SignupDto) {
    return await this.authService.signUP(createAuthDto);
  }

  @Post('/login')
  logIN(@Body() loginDTO: LoginDto) {
    return this.authService.logIN(loginDTO);
  }
}
