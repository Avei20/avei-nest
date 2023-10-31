import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CatsController } from './cats/cats.controller'
import { AdminController } from './admin/admin.controller'
import { AccountController } from './account/account.controller'
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
  controllers: [
    AppController,
    CatsController,
    AdminController,
    AccountController,
  ],
  providers: [AppService, CatsService],
})
export class AppModule {}
