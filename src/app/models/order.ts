export class Order {
  datePlaced: number;
  items: any[];

  constructor(public userId: string, public shipping: any, items: any[]) {
    this.datePlaced = new Date().getTime();

    this.items = items.map(item => {
      return {
        product: {
          title: item.product.title,
          imageUrl: item.product.imageUrl,
          price: item.product.price
        },
        quantity: item.quantity,
        totalPrice: item.product.price * item.quantity
      };
    });
  }
}
