import { NestFactory } from '@nestjs/core'
import 'dotenv/config'
import { AppModule } from './app.module'
import { BadRequestExceptionFilter } from './exceptions/handler'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  app.setGlobalPrefix('api')
  app.useGlobalFilters(new BadRequestExceptionFilter())
  await app.listen(process.env.APP_PORT || 3000)
}
bootstrap()
