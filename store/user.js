export default {
  data: {
    coupons: {
      pageNo: 1,
      list: []
    }
  },

  a() {
    this.data.coupons.pageNo = 2;
  },

  methods: {
    test() {
      console.log(this);
    }

  }
};