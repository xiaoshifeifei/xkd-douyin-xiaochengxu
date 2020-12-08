export const link = Behavior({
  properties: {
    url: String,
    linkType: {
      type: String,
      value: 'navigateTo'
    }
  },
  methods: {
    jumpLink(urlKey = 'url') {
      const url = this.data[urlKey];

      if (url) {
        tt[this.data.linkType]({
          url
        });
      }
    }

  }
});