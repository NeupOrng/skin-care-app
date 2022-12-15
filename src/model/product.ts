import { addAccountingFormat } from '@/libraries/helpers/numberHelper'
import { IImage, ImageDto } from './image'

interface IProduct {
  id: number,
  'name_en': string,
  'name_kh': string,
  description: string,
  stock: number,
  discount: number,
  'sub_name': string,
  price: number,
  'product_type_id': number,
  'best_selling': number,
  'created_at': string,
  'updated_at': string,
  'status_id': number,
  'product_image': Array<IImage>
}

class Product implements IProduct {
  id = -1;
  'name_en' = '';
  'name_kh' = '';
  description = '';
  stock = 0;
  discount = 0;
  'sub_name' = '';
  price = 0;
  'product_type_id' = 0;
  'best_selling' = 0;
  'created_at' = '';
  'updated_at' = '';
  'status_id' = 0;
  'product_image': Array<IImage> = [];

  get 'price_for_display' (): string {
    return addAccountingFormat(this.price)
  }

  get 'discount_for_display' (): string {
    return addAccountingFormat(this.price - (this.price * this.discount / 100))
  }

  constructor (init: IProduct) {
    Object.assign(this, init)
    this.product_image = init.product_image.map((item) => new ImageDto(item))
  }
}

class ProductInCart extends Product {
  amount: number;
  'is_editing': boolean;
  'amount_model': number;

  addAmount (amount: number): void {
    this.amount += amount
  }

  get 'total_price' (): string {
    return addAccountingFormat(Number(this.discount_for_display) * Number(this.amount))
  }

  updateAmount (): void {
    this.amount = this.amount_model
  }

  cancelEditAmount (): void {
    this.amount_model = this.amount
  }

  substractAmount (amount: number): void {
    this.amount -= amount
    if (this.amount < 0) {
      this.amount = 0
    }
  }

  constructor (init: IProduct, amount = 1) {
    super(init)
    Object.assign(this, init)
    this.amount = amount
    this.is_editing = false
    this.amount_model = amount
  }
}

export {
  IProduct,
  Product,
  ProductInCart
}
