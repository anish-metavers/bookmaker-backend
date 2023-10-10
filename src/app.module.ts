import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BookmakerOddsModule } from './bookmaker-odds/bookmaker-odds.module';
// import { PermissionModule } from './permission/permission.module';
import { UserModule } from './adminuser/user.module';
import { HelperuserModule } from './helperuser/helperuser.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    BookmakerOddsModule,
    UserModule,
    HelperuserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
