import { IImage, ImageDto } from './image'

interface IProfile {
  'id': number,
  'email': string,
  'fullname': string,
  'phone_number': string,
  'facebook': string,
  'location': string,
  'lat': number,
  'lng': number,
  'updated_at': string,
  'status_id': number,
}

class Profile implements IProfile {
  'id': number;
  'email': string;
  'fullname': string;
  'phone_number': string;
  'facebook': string;
  'location': string;
  'lat': number;
  'lng': number;
  'updated_at': string;
  'status_id': number;
  constructor (init: IProfile) {
    Object.assign(this, init)
  }
}

export {
  IProfile,
  Profile
}
