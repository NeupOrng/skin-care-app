import { addAccountingFormat } from '@/libraries/helpers/numberHelper'

interface IProduct {
    Name: string,
    Id: number,
    ImagePath: string,
    Description: string,
    Price: number,
    Categories: Array<string>,
    Discount: number
}

class Product implements IProduct {
    Name: string;
    Id: number;
    ImagePath: string;
    Description: string;
    Price: number;
    Discount: number;
    Categories: Array<string>;

    get PriceForDisplay (): string {
      return addAccountingFormat(this.Price)
    }

    get DiscountForDisplay (): string {
      return addAccountingFormat(this.Price - (this.Price * this.Discount / 100))
    }

    constructor (init: IProduct) {
      this.Name = init.Name
      this.Id = init.Id
      this.ImagePath = init.ImagePath
      this.Description = init.Description
      this.Price = init.Price
      this.Discount = init.Discount
      this.Categories = init.Categories
    }
}

class ProductInCart extends Product {
    Amount: number;

    addAmount (amount: number): void {
      this.Amount += amount
    }

    get TotalPrice (): string {
      return addAccountingFormat(Number(this.DiscountForDisplay) * Number(this.Amount))
    }

    substractAmount (amount: number): void {
      this.Amount -= amount
      if (this.Amount < 0) {
        this.Amount = 0
      }
    }

    constructor (init: IProduct, amount = 1) {
      super(init)
      Object.assign(this, init)
      this.Amount = amount
    }
}

export {
  IProduct,
  Product,
  ProductInCart
}
