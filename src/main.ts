import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // global prefix
  // app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    // transform: true,
  }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const port = process.env.PORT || 3000;
  await app.listen(port).then(()=>{
    console.log(`Application started on port ${port}`);
  });
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
