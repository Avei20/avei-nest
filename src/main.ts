import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, VersioningType } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

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

  // Generating Swagger Docs
  const options = new DocumentBuilder()
    .setTitle('Gemini API')
    .setDescription('Gemini API')
    .setVersion('1.0')
    .addTag('Gemini')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)

  // Starting server
  await app.listen(parseInt(process.env.PORT) || 3000)
  Logger.log(`Server start on localhost:${process.env.PORT || 3000}`)
}
bootstrap()
