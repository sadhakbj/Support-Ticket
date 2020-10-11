import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import 'dotenv/config'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './exceptions/httpexception.filter'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.setGlobalPrefix('api')

  const config = app.get(ConfigService)
  const options = new DocumentBuilder()
    .setTitle(config.get('APP_NAME'))
    .setDescription('API Documentation for support ticket system.')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options, {
    include: [AuthModule, UsersModule],
  })
  SwaggerModule.setup('api/docs', app, document)

  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(config.get('APP_PORT') || 3000)
  console.log(`App is running on port: ${config.get('APP_PORT')}`)
}
bootstrap()
