import { PartialType } from '@nestjs/mapped-types';
import { CreateHelperuserDto } from './create-helperuser.dto';

export class UpdateHelperuserDto extends PartialType(CreateHelperuserDto) {
  userid: string;
  password: string;
}
