const shortid = require("shortid");

class Ticket {
  constructor(user, price) {
    this.id = shortid.generate();
    this.user = user;
    this.price = price;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

module.exports = Ticket;
