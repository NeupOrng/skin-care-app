
interface ISell {
  'id': number,
  'user_id': number,
  'total': number,
  'location': string,
  'description': string,
  'lat': string,
  'lng': string,
  'updated_at': string,
  'status_id': number,
}

class Sell implements ISell {
  'id': number;
  'user_id': number;
  'total': number;
  'location': string;
  'description': string;
  'lat': string;
  'lng': string;
  'updated_at': string;
  'status_id': number;
  constructor (init: ISell) {
    Object.assign(this, init)
  }
}

export {
  ISell,
  Sell
}
