class Order {
    oderDate;
    total;
    orderId;
    orderProducts=[{}];
    constructor(orderDetails){
        this.oderDate = orderDetails.orderDate;
        this.total = orderDetails.total;
        this.orderId = orderDetails.orderId;
        this.orderProducts = orderDetails.orderProducts;
    }
};
