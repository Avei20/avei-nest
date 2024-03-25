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
import { ConfigModule, ConfigService } from '@nestjs/config'
import gemini from './config/gemini'
import { FirestoreModule } from './firestore/firestore.module'
import { FeedbackModule } from './v1/feedback/feedback.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [gemini],
    }),
    FirestoreModule.forRoot({
      import: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get<string>('STAGING') === 'dev'
          ? {
              host: 'localhost',
              port: 8080,
              ssl: false,
            }
          : {
              keyFilename: `src/key/${configService.get<string>(
                'FIRESTORE_KEY_FILENAME',
              )}`,
            },
      inject: [ConfigService],
    }),
    CatsModule,
    FeedbackModule,
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
