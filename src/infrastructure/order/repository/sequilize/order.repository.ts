import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";


export default class OrderRepository implements OrderRepositoryInterface {
  
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(order: Order): Promise<void> {
    await OrderItemModel.destroy({
      where: { order_id: order.id }
    });

    const items = order.items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      product_id: item.productId,
      quantity: item.quantity,
      order_id: order.id,
    }));

    await OrderItemModel.bulkCreate(items);

    await OrderModel.update({
      total: order.total(),
      items: items,
    },
    {
      where: {
        id: order.id,
      },
    });
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({ where: { id }, include: ["items"] });
    const orderItems = orderModel.items.map(item => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity));
    return new Order(orderModel.id, orderModel.customer_id, orderItems);
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({include: ["items"]});
    
    const orders = orderModels.map(o => 
      new Order(
        o.id, 
        o.customer_id, 
        o.items.map(i => 
          new OrderItem(
            i.id,
            i.name,
            i.price,
            i.product_id,
            i.quantity
          ))
        )  
    );
    return orders;
  }
}
