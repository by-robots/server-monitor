const UsageConversion = require('../../app/library/UsageConversion')

/**
 * Describes how to usage conversion object should convert memory to absolute
 * values (for example, 2G) using the pecentage in use and the total amount of
 * memoey available.
 */
describe('Memory percentage to absolute conversions', () => {
  const converter = new UsageConversion()

  it('converts to absolute value', () => {
    expect(converter.getAbsoluteMemoryUsage(50, '4K')).toEqual('2K')
  })

  it('converts to absolute decimal value', () => {
    expect(converter.getAbsoluteMemoryUsage(50, '5M')).toEqual('2.5M')
  })

  it('converts percentages over 100%', () => {
    expect(converter.getAbsoluteMemoryUsage(110, '1G')).toEqual('1.1G')
  })

  it('reduces unit appropriately', () => {
    expect(converter.getAbsoluteMemoryUsage(1, '1P')).toEqual('10.24T')
  })

  it('increases unit appropriately', () => {
    expect(converter.getAbsoluteMemoryUsage(110, '931K')).toEqual('1M')
  })

  it('handles small numbers', () => {
    expect(converter.getAbsoluteMemoryUsage(50, '0.5K')).toEqual('0.25K')
  })
})
