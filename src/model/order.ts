import { ISell, Sell } from './sell'

interface IOrder {
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
  'sell': Array<ISell>
}

class Order implements IOrder {
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
  'sell': Array<Sell>;
  constructor (init: IOrder) {
    Object.assign(this, init)
    this.sell = init.sell.map((item) => new Sell(item))
  }
}

export {
  IOrder,
  Order
}
