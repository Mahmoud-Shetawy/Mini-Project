import {NestFactory} from "@nestjs/core";
import {OrdersModule} from "./domain/orders/orders.module";
// import {AppModule} from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(OrdersModule);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
