module.exports = class UsageConversion {
  /**
   * Returns an object relating unit suffixes (M, G etc.) to a factor that can
   * be used to convert a value in kilobytes to the respective unit.
   *
   * @return {Object}
   */
  sizes () {
    return {
      'P': Math.pow(1024, 4),
      'T': Math.pow(1024, 3),
      'G': Math.pow(1024, 2),
      'M': 1024,
      'K': 1
    }
  }

  /**
   * Convert a storage based resource from percentage in use to it's absolute
   * value.
   *
   * @param {Number} percentage The percentage of the resource in use.
   * @param {String} total      The total amount of resource available, suffixed
   *                            with the unit (K, M, G, T, P).
   *
   * @return {String} The absolute value in use, suffixed with a letter
   *                  representing the unit (K, M, G, T, P).
   */
  convertStorageUsage (percentage, total) {
    const unit = total.split('').pop()
    const amount = parseFloat(total.replace(unit, '')) * this.sizes()[unit]
    let absolute = amount / 100 * percentage
    let strSuffix = 'K'

    for (const suffix in this.sizes()) {
      if (absolute > this.sizes()[suffix]) {
        // parseFloat removes insignificant trailing zeroes.
        absolute = parseFloat((absolute / this.sizes()[suffix]).toFixed(2))
        strSuffix = suffix
      }
    }

    return `${absolute}${strSuffix}`
  }

  /**
   * Get memory usage as an absolute value.
   *
   * @param {Number} percentage The percentage of the resource in use.
   * @param {String} total      The total amount of resource available.
   *
   * @return {String}
   */
  getAbsoluteMemoryUsage (percentage, total) {
    return this.convertStorageUsage(percentage, total)
  }
}
