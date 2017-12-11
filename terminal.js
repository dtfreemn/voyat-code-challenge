class Terminal {
  constructor(PricingInfo) {
    this.prices = PricingInfo
    this.cart = {}
  }

  prices() {
    return this.prices
  }

  scan(item) {
    if (!this.cart[item]) {
      this.cart[item] = 1
    } else {
      this.cart[item] += 1
    }
  }

  total() {
    let total = 0
    Object.keys(this.cart).forEach(key => {
      if (!this.prices[key].volume) {
        total += this.prices[key].price * this.cart[key]
      } else {
        if (this.cart[key] >= this.prices[key].volume.quantity) {
          total += (this.prices[key].volume.price * Math.floor(this.cart[key]/this.prices[key].volume.quantity)) + (this.prices[key].price * (this.cart[key] % this.prices[key].volume.quantity))
        } else {
          total += this.prices[key].price * this.cart[key]
        }
      }
    })
    this.cart = {}
    return "$" + total.toFixed(2)
  }
}


let priceReference = {
  A: {price: 2, volume: {quantity: 4, price: 7}},
  B: {price: 12},
  C: {price: 1.25, volume: {quantity: 6, price: 6}},
  D: {price: .15}
}
function tester(testString) {
  let splitTest = testString.split('')
  let t = new Terminal(priceReference)
  
  splitTest.forEach(item => t.scan(item))
  return t.total()
}

exports.tester = {
  tester: tester
}