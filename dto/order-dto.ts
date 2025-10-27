export class OrderDto {
  status: string
  courierId: number
  customerName: string
  customerPhone: string
  comment: string
  id: number

  constructor(customerName: string, customerPhone: string, comment: string, id: number) {
    this.status = 'OPEN'
    this.courierId = 0
    this.customerName = customerName
    this.customerPhone = customerPhone
    this.comment = comment
    this.id = id
  }

  //method to create a new instance with random data
  static createOpenOrderWithRandomData(): OrderDto {
    return new OrderDto('John Doe', '+123456789', 'Urgent order', Math.floor(Math.random() * 100))
  }

  //low prio order
  static createLowPrioOrderWithRandomData(): OrderDto {
    return new OrderDto(
      'Jimmy Jones',
      '+123456789',
      'Low priority',
      Math.floor(Math.random() * 100),
    )
  }
}
