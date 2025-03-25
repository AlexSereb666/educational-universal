import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const PORT = process.env.PORT || 8000;
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: process.env.URL_FRONTEND || 'http://localhost:3000',
        methods: 'GET,POST,PUT,DELETE,OPTIONS,PATCH',
        allowedHeaders: 'Content-Type, Authorization, Accept, Origin',
        exposedHeaders: ['Content-Disposition'],
        credentials: true,
    });

    app.use(cookieParser());

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: false,
            transformOptions: {
                enableImplicitConversion: false,
            },
        }),
    );

    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
