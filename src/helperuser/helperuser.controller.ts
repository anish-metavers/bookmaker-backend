import { Controller, Post, Body, UseGuards, Req, Put } from '@nestjs/common';
import { HelperuserService } from './helperuser.service';
import {
  CreateHelperuserDto,
  CreatePermissionDto,
  LoginHelperuserDto,
} from './dto/create-helperuser.dto';
import { UpdateHelperuserDto } from './dto/update-helperuser.dto';
import { AuthGuard } from 'guard/auth.guard';

@Controller('/helperuser')
export class HelperuserController {
  constructor(private readonly helperuserService: HelperuserService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  createHelperUser(
    @Req() req: Request,
    @Body() createHelperuserDto: CreateHelperuserDto,
  ) {
    return this.helperuserService.createHelperUser(req, createHelperuserDto);
  }

  @Post('/login')
  loginHelperUser(@Body() loginHelperuser: LoginHelperuserDto) {
    return this.helperuserService.loginHelperUser(loginHelperuser);
  }

  @Post('/permission')
  createHelperUserPermission(@Body() createPermission: CreatePermissionDto) {
    return this.helperuserService.createHelperUserPermission(createPermission);
  }

  //UPDATE PASSWORD BY USERS 
  @Put('/user')
  updatePasswordByUser(@Body() updateHelperuserDto: UpdateHelperuserDto) {
    return this.helperuserService.updatePasswordByUser(updateHelperuserDto);
  }

  //UPDATE PASSWORD BY ADMIN
  @UseGuards(AuthGuard)
  @Put('/admin')
  updatePasswordByAdmin(@Body() updateHelperuserDto: UpdateHelperuserDto) {
    return this.helperuserService.updatePasswordByAdmin(updateHelperuserDto);
  }

  // @Get()
  // findAll() {
  //   return this.helperuserService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.helperuserService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.helperuserService.remove(+id);
  // }
}
