import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FilmModule } from './film/film.module';
import { PersonModule } from './person/person.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    FilmModule,
    PersonModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
