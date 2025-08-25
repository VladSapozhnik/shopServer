import { PartialType } from '@nestjs/mapped-types';
import { CreateBasketDeviceDto } from './create-basket-device.dto';

export class UpdateBasketDeviceDto extends PartialType(CreateBasketDeviceDto) {}
