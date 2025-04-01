'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  let customer;

  beforeEach(() => {
    customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
  });

  it('should fill the full tank when no amount is provided', () => {
    fillTank(customer, 50);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000 - 32 * 50);
  });

  it('should only fill remain tank capacity if the requested amount exceeds it'
    , () => {
      fillTank(customer, 50, 50);

      expect(customer.vehicle.fuelRemains).toBe(40);
      expect(customer.money).toBe(3000 - 32 * 50);
    });

  it('should only fill what the customer can afford', () => {
    customer.money = 1000;

    fillTank(customer, 50);

    expect(customer.vehicle.fuelRemains).toBe(8 + Math.floor(1000 / 50 * 10)
     / 10);
    expect(customer.money).toBe(1000 - Math.floor(1000 / 50 * 10) / 10 * 50);
  });

  it('should round down the poured amount to the nearest tenth', () => {
    customer.money = 1205;

    fillTank(customer, 50);

    expect(customer.vehicle.fuelRemains).toBe(8 + 24.1);
    expect(customer.money).toBe(1205 - 24.1 * 50);
  });

  it('should not fill if the poured amount is less than 2 liters', () => {
    customer.money = 50;

    fillTank(customer, 50);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(50);
  });

  it('should correctly round the fuel cost to the nearest hundredth', () => {
    customer.money = 1501;

    fillTank(customer, 49.99);

    expect(customer.vehicle.fuelRemains).toBe(8 + 30);
    expect(customer.money).toBe(1501 - (30 * 49.99).toFixed(2));
  });
});
