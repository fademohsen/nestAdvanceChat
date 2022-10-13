import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';
import { UnitModule } from './unit/unit.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import config from './config/key';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig  } from '@nestjs/apollo';
import { join } from "path";
import { RolesGuard } from './auth/roles.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { CaslModule } from './casl/casl.module';
import { AppGateway } from './app.gateway';
import { ChatService } from './users/chat.service';
import { MessageModule } from './message/message.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      playground: true,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
    }),
    ItemsModule, UnitModule, MongooseModule.forRoot(config.mongoUrl),
    AuthModule, UsersModule, CaslModule, MessageModule, RoomModule
  ],
  controllers: [AppController],
  providers: [AppService  , {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }, AppGateway,ChatService],
})
export class AppModule { }
