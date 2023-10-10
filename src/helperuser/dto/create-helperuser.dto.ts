export class CreateHelperuserDto {
  name: string;
  userid: string;
  password: string;
  accountLock: boolean;
}

export class LoginHelperuserDto {
  userid: string;
  password: string;
}

export class CreatePermissionDto {
  userid: string;
  eventid: string;
}
