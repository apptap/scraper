define(function($) {
  function Product() {
    this.price                  = null;
    this.title                  = null;
    this.xpath                  = null;
    this.xp_image_long          = '';
    this.xp_image_short         = '';
    this.product_quantity_xpath = '';
    this.xp_price_long          = '';
    this.xp_price_short         = '';
    this.buylink                = null;
    this.buylink_xpath          = null;
    this.images                 = [];
    this.that                   = this;
  }

  Product.prototype = {
  }

  return Product;
});

