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
      articleData: [],
      filterData: [],
      js_type: [
        { code: '', name: 'All' },
        { code: 'academic-publication', name: 'Academic Publication' },
        { code: 'project', name: 'Project' },
        { code: 'news-article', name: 'News Article' },
      ],
      apiURL: 'https://directus.thegovlab.com/experts-database',
    }
  },

  created: function created() {
    this.fetchArticles();
  },
  methods: {

    fetchArticles() {
      self = this;
      const client = new DirectusSDK({
        url: "https://directus.thegovlab.com/",
        project: "experts-database",
        storage: window.localStorage
      });

      client.getItems(
  'resources',
  {
    fields: ['*.*']
  }
).then(data => {
  console.log(data)
  self.articleData = data.data;
  self.filterData = self.articleData;
})
.catch(error => console.error(error));
    },
    searchItems() {

      squery = document.getElementById('search-text').value;
      let searchData = self.articleData.filter(items => (items.title.toLowerCase().includes(squery.toLowerCase()) || items.abstract.toLowerCase().includes(squery.toLowerCase()) ||items.authors.toLowerCase().includes(squery.toLowerCase())));
      self.filterData = searchData;
    },
    ResetItems() {
      self.filterData = self.articleData;
    
      document.getElementById("form-1").selectedIndex = 0;

    },
    changeFilter(event) {

  
      var element = document.body.querySelectorAll("select");
      this.selectedType = element[0].value;
      console.log(this.selectedType);
      //Region Filter
      if (this.selectedType == '')
      
        self.filtered_type = self.articleData;
      else {
        let filtered_by_type = self.articleData.filter(function (e) {
          console.log(e);
          return e.type.some(reg_element => reg_element == self.selectedType);
        });
        self.filtered_type = filtered_by_type;
      }

      self.filterData = self.filtered_type;
    }

}
});


