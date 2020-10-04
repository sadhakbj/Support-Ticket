import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import 'dotenv/config'
import { AppModule } from './app.module'
import { BadRequestExceptionFilter } from './exceptions/handler'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  app.setGlobalPrefix('api')
  const config = app.get(ConfigService)
  app.useGlobalFilters(new BadRequestExceptionFilter())
  await app.listen(config.get('APP_PORT') || 3000)
  console.log(`App is running on port: ${config.get('APP_PORT')}`)
}
bootstrap()
