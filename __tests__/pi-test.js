jest.unmock('../src/new.pi.js');

describe('sum', () => {
  it('adds 1 + 2 to equal 3', () => {
    const sum = require('../src/new.pi.js');
    expect(sum(1, 2)).toBe(3);
  });
});
