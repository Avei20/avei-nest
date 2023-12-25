import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CatsController } from './cats/cats.controller'
import { AdminController } from './admin/admin.controller'
import { AccountController } from './account/account.controller'
import { CatsService } from './cats/cats.service'
import { CatsModule } from './cats/cats.module'
import { ChatGateway } from './v1/chat/chat.gateway'
import { GeminiModule } from './gemini/gemini.module'
import { ChatModule } from './v1/chat/chat.module'
import { ConfigModule } from '@nestjs/config'
import gemini from './config/gemini'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [gemini],
    }),
    CatsModule,
    GeminiModule,
    ChatModule,
  ],
  controllers: [
    AppController,
    CatsController,
    AdminController,
    AccountController,
  ],
  providers: [AppService, CatsService, ChatGateway],
})
export class AppModule {}
