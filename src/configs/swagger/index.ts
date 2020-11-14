import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { CreateUserDto } from "@types";

export const Swagger = (app) => {
  const options = new DocumentBuilder()
    .setTitle("API TEST")
    .setDescription("Run api here :)")
    .setVersion("1.0")
    .addBearerAuth({ type: "http", scheme: "bearer", in: "header" })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);
};
