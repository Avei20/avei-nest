import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, VersioningType } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Enable Versioning and Versioning Type
  app.enableVersioning({
    type: VersioningType.URI,
  })

  // Enabling CORS
  app.enableCors()

  // Disabling x-powered-by
  app.getHttpAdapter().getInstance().disable('x-powered-by')
  Logger.log(process.env.GEMINI_API_KEY)

  await app.listen(parseInt(process.env.PORT) || 3000)
  Logger.log(`Server start on localhost:${process.env.PORT || 3000}`)
}
bootstrap()
