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
      aboutData: [],
      TeamData: [],
      apiURL: 'https://directus.thegovlab.com/experiential-learning',
    }
  },

  created: function created() {
    this.fetchTopic();
    this.fetchAbout();
    this.fetchTeamData();
  },
  methods: {

    fetchTopic() {
      self = this;
      const client = new DirectusSDK({
        url: "https://directus.thegovlab.com/",
        project: "experiential-learning",
        storage: window.localStorage
      });

      client.getItems(
  'topics',
  {
    fields: ['*.*']
  }
).then(data => {
  console.log(data)
  self.topicData = data.data;
})
.catch(error => console.error(error));
    },
    fetchAbout() {
      self = this;
      const client = new DirectusSDK({
        url: "https://directus.thegovlab.com/",
        project: "experiential-learning",
        storage: window.localStorage
      });

      client.getItems(
  'about',
  {
    fields: ['*.*']
  }
).then(data => {
  console.log(data)
  self.aboutData = data.data;
  
})
.catch(error => console.error(error));
    },
    fetchTeamData() {
      self = this;
      const client = new DirectusSDK({
        url: "https://directus.thegovlab.com/",
        project: "experiential-learning",
        storage: window.localStorage
      });

      client.getItems(
  'people',
  {
    fields: ['*.*'],
  }
).then(data => {
  console.log(data)
  self.TeamData = data.data;
  
})
.catch(error => console.error(error));
    }
}
});


