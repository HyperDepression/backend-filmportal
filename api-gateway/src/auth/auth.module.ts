import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from "./auth.controller";

@Module({
    controllers: [AuthController],
    providers: [],
    imports: [
        ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
		}),
        ClientsModule.register([
            {
                name: 'USER_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RMQ_URL],
                    queue: 'auth_queue'
                },
            },
        ])
    ]
})
export class AuthModule { }