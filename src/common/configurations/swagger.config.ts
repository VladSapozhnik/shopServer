import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Shop API')
    .setDescription('The Shop API description')
    .setVersion('1.0')
    .setContact(
      'Vlad Sapozhnik GitHub',
      'https://github.com/VladSapozhnik/shopServer',
      'vladbars2@gmail.com',
    )
    .addBearerAuth()
    .build();
}
