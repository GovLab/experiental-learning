////////////////////////////////////////
// reload page after Forward and back
///////////////////////////////////////

const TYPE_BACK_FORWARD = 2;

function isReloadedPage() {
  return performance.navigation.type === TYPE_BACK_FORWARD;
}

function main() {
  if (isReloadedPage()) {
    window.location.reload();
  }
}
main();

////////////////////////////////////////////////////////////
///// TEAM  API REQUEST ` `
////////////////////////////////////////////////////////////


Vue.use(VueMeta);

new Vue({
    
  el: '#home-page',
    
  data () {
  
    return {
      topicData: [],
      apiURL: 'https://directus.thegovlab.com/new-measures',

    }
  },

  created: function created() {
    this.topicslug=window.location.href.split('/');
    this.topicslug = this.topicslug[this.topicslug.length - 1];
    console.log(this.topicslug);
    this.fetchIndex();
  },
  methods: {

    fetchIndex() {
      self = this;
      const client = new DirectusSDK({
        url: "https://directus.thegovlab.com/",
        project: "new-measures",
        storage: window.localStorage
      });

      client.getItems(
  'topics',
  {
    filter: {
      slug: self.topicslug
    },
    fields: ['*.*']
  }
).then(data => {
  self.topicData = data.data;

})
.catch(error => console.error(error));
}
}
});


