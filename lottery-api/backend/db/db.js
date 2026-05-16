const Lottery = require("../models/Lottery.model");

class MyDB {
  constructor() {
    this.lotteries = [];
    this.winners = [];
  }

  /**
   * Create and save a new lottery
   * @param {string} username
   * @param {number} price
   * @returns {Lottery} The created lottery
   */
  create(username, price) {
    const lottery = new Lottery(username, price);
    this.lotteries.push(lottery);
    return lottery;
  }

  /**
   * Create multiple lotteries for a single user
   * @param {string} username
   * @param {number} price
   * @param {number} quantity
   * @returns {Array<Lottery>} Array of created multiple lotteries
   */
  bulkCreate(username, price, quantity) {
    const lotteries = [];

    for (let i = 0; i < quantity; i++) {
      lotteries.push(this.create(username, price));
    }
    return lotteries;
  }

  /**
   * Find all lotteries
   * @returns {Array<Lottery>} Array of all lotteries
   */
  find() {
    return this.lotteries;
  }

  /**
   * Find a lottery by ID
   * @param {string} id
   * @returns {Lottery|null} The found lottery or null if not found
   */
  findById(id) {
    return this.lotteries.find((lottery) => lottery.id === id);
  }

  /**
   * Find lotteries by username
   * @param {string} username
   * @returns {Array<Lottery>} Array of lotteries for the specified username
   */
  findByUsername(username) {
    return this.lotteries.filter((lottery) => lottery.username === username);
  }

  /**
   * Update a lottery by ID
   * @param {string} id
   * @param {{username?: string, price?: number}} lotteryData
   * @returns {Lottery|null} The updated lottery or null if not found
   */
  updateById(id, lotteryData) {
    const lottery = this.findById(id);
    if (lottery) {
      if (lotteryData.username) {
        lottery.username = lotteryData.username;
      }
      if (lotteryData.price) {
        lottery.price = lotteryData.price;
      }
      lottery.updatedAt = new Date();
      return lottery;
    }
    return null;
  }

  /**
   * Update lotteries by username
   * @param {string} username
   * @param {{price?: number}} lotteryData
   * @returns {Array<Lottery>|null} Array of updated lotteries or null if no lotteries found for the username
   */
  updateByUsername(username, lotteryData) {
    const lotteries = this.findByUsername(username);
    if (lotteries.length === 0) {
      return null;
    }
    const updatedLotteries = [];
    lotteries.forEach((lottery) => {
      if (lotteryData.price) {
        lottery.price = lotteryData.price;
      }
      lottery.updatedAt = new Date();
      updatedLotteries.push(lottery);
    });
    return updatedLotteries;
  }

  /**
   * Delete a lottery by ID
   * @param {string} id
   * @returns {Lottery|null} The deleted lottery or null if not found
   */
  deleteById(id) {
    const index = this.lotteries.findIndex((lottery) => lottery.id === id);
    if (index !== -1) {
      return this.lotteries.splice(index, 1)[0];
    }
    return null;
  }

  /**
   * Delete a lottery by username
   * @param {string} username
   * @returns {Lottery|null} The deleted lottery or null if not found
   */
  deleteByUsername(username) {
    const index = this.lotteries.findIndex(
      (lottery) => lottery.username === username,
    );
    if (index !== -1) {
      return this.lotteries.splice(index, 1)[0];
    }
    return null;
  }

  /**
   * Bulk delete lotteries by username
   * @param {string} username
   * @returns {Array<Lottery>} Array of deleted lotteries for the specified username
   */

  bulkDeleteByUsername(username) {
    const deletedLotteries = this.lotteries.filter(
      (lottery) => lottery.username === username,
    );
    this.lotteries = this.lotteries.filter(
      (lottery) => lottery.username !== username,
    );
    return deletedLotteries;
  }

  /**
   * Draw a random lottery
   * @param {number} winnerCount - Number of winners to draw
   * @returns {Array<Lottery>|null} Array of drawn winners or null if no lotteries available
   */
  draw(winnerCount) {
    if (this.lotteries.length === 0) {
      return null;
    }
    const drawnWinners = [];
    for (let i = 0; i < winnerCount; i++) {
      const randomIndex = Math.floor(Math.random() * this.lotteries.length);
      if (!drawnWinners.includes(this.lotteries[randomIndex])) {
        drawnWinners.push(this.lotteries[randomIndex]);
      } else {
        i--;
      }
    }

    // New: Saved the drawn winners in this.winners
    this.winners = drawnWinners;

    return this.winners;
  }

  /**   * Get the names of the drawn winners
   * @returns {Array<string>} Array of winner usernames
   */
  getWinnersNames() {
    // New: Saved the drawn winners in this.winners
    if (this.winners && this.winners.length > 0) {
      return this.winners.map((lottery) => lottery.username);
    }
    return [];
  }

  /**
   *
   * @returns {number} The total sales amount from all lotteries
   */
  getTotalSales() {
    return this.lotteries.reduce((total, lottery) => total + lottery.price, 0);
  }

  /**
   *
   * @returns {number} The total count of lotteries
   */
  count() {
    return this.lotteries.length;
  }

  /**
   *
   * @returns {Object} Lottery statistics
   */
  getStatistics() {
    const totalLotteries = this.count();
    const totalSales = this.getTotalSales();
    const averagePrice = totalLotteries > 0 ? totalSales / totalLotteries : 0;
    const totalWinners = this.winners.length;

    // Calculate price distribution
    const priceDistribution = {};
    this.lotteries.forEach((lottery) => {
      const priceKey = String(lottery.price);
      priceDistribution[priceKey] = (priceDistribution[priceKey] || 0) + 1;
    });

    // Calculate user distribution
    const userDistribution = {};
    this.lotteries.forEach((lottery) => {
      userDistribution[lottery.username] = (userDistribution[lottery.username] || 0) + 1;
    });

    // Calculate date distribution (last 7 days)
    const dateDistribution = {};
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      dateDistribution[dateKey] = 0;
    }
    this.lotteries.forEach((lottery) => {
      const dateKey = new Date(lottery.createdAt).toISOString().split('T')[0];
      if (dateDistribution.hasOwnProperty(dateKey)) {
        dateDistribution[dateKey]++;
      }
    });

    return {
      totalLotteries,
      totalSales,
      totalWinners,
      averagePrice,
      priceDistribution,
      userDistribution,
      dateDistribution,
    };
  }

  // Get Lottery History
  getHistory() {
    return this.lotteries.map((lottery) => ({
      id: lottery.id,
      username: lottery.username,
      price: lottery.price,
      createdAt: lottery.createdAt,
      updatedAt: lottery.updatedAt,
    }));
  }

  // Delete All Lotteries
  deleteAll() {
    const deletedLotteries = [...this.lotteries];
    this.lotteries = [];
    return deletedLotteries;
  }
}
const myDB = new MyDB();

module.exports = myDB;
