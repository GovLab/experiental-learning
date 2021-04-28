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
      expertData: [],
      na_count: 0,
      sa_count: 0,
      af_count: 0,
      apiURL: 'https://directus.thegovlab.com/experiential-learning',
    }
  },

  created: function created() {
    this.fetchTopic();
    this.fetchAbout();
    this.fetchTeamData();
    this.fetchMapExperts();
  },
  methods: {
    fetchMapExperts(){
      self = this;
      const client = new DirectusSDK({
        url: "https://directus.thegovlab.com/",
        project: "experts-database",
        storage: window.localStorage
      });

      client.getItems(
        'experts',
        {
          sort: 'last_name',
          fields: ['*.*']
        }
      ).then(data => {
        console.log(data)
        self.expertData = data.data;
        self.euData = self.expertData.filter(items => items.region == "eu");
        self.eu_count = self.euData.length;
        self.saData = self.expertData.filter(items => items.region == "sa");
        self.sa_count = self.saData.length;
        self.naData = self.expertData.filter(items => items.region == "na");
        self.na_count = self.naData.length;
        self.afData = self.expertData.filter(items => items.region == "afr");
        self.af_count = self.afData.length;
        self.asData = self.expertData.filter(items => items.region == "as");
        self.as_count = self.asData.length;
        self.ocaData = self.expertData.filter(items => items.region == "oca");
        self.oca_count = self.ocaData.length;
        this.fetchMap(self.eu_count,self.sa_count,self.na_count,self.af_count,self.as_count,self.oca_count);
      })
        .catch(error => console.error(error));
    },
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
    },
    fetchMap(eu_count,sa_count,na_count,af_count,as_count,oca_count) {
      self = this;
      self.europe_count = eu_count;
      self.asia_count = as_count;
      self.northamerica_count = na_count;
      self.southamerica_count= sa_count;
      self.africa_count = af_count;
      self.oceania_count = oca_count;

  /**
 * ---------------------------------------

 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end
  
      // Create map instance
      var chart = am4core.create("chartdiv", am4maps.MapChart);
      chart.geodata = am4geodata_continentsLow;
      chart.projection = new am4maps.projections.Miller();

      // Colors
      var color1 = chart.colors.getIndex(0);

      chart.homeGeoPoint = {
        latitude: 50,
        longitude: 0
      }
      chart.homeZoomLevel = 0.75;
      chart.minZoomLevel = 0.75;
      chart.maxZoomLevel = 0.75;
      chart.seriesContainer.draggable = false;
      chart.seriesContainer.resizable = false;
      // Create map polygon series
      var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.exclude = ["antarctica"];
      polygonSeries.useGeodata = true;

      // Configure series
      var polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.fill = am4core.color("#f8f8f810");
      polygonTemplate.stroke = am4core.color("#2c4758");


      // Pins
      var imageSeries = chart.series.push(new am4maps.MapImageSeries());
      var imageTemplate = imageSeries.mapImages.template;
      imageTemplate.propertyFields.longitude = "longitude";
      imageTemplate.propertyFields.latitude = "latitude";
      imageTemplate.nonScaling = true;

      // Creating a pin bullet
      var pin = imageTemplate.createChild(am4plugins_bullets.PinBullet);

      // Configuring pin appearance
      pin.background.fill = am4core.color("#FFAA00");
      pin.background.pointerBaseWidth = 1;
      pin.background.pointerLength = 250;
      pin.background.propertyFields.pointerLength = "length";
      pin.circle.fill = am4core.color("#FFAA00");
      pin.label = new am4core.Label();
      pin.label.text = "{value}";
      pin.label.fill = am4core.color("#ffffff");

      var label = pin.createChild(am4core.Label);
      // label.text = "{title}";
      label.fontWeight = "bold";
      label.propertyFields.dy = "length";
      label.verticalCenter = "middle";
      label.fill = color1;
      label.adapter.add("dy", function (dy) {
        return (20 + dy) * -1;
      });

      // Creating a "heat rule" to modify "radius" of the bullet based
      // on value in data
      imageSeries.heatRules.push({
        "target": pin.background,
        "property": "radius",
        "min": 20,
        "max": 30,
        "dataField": "value"
      });

      imageSeries.heatRules.push({
        "target": label,
        "property": "dx",
        "min": 30,
        "max": 40,
        "dataField": "value"
      });

      imageSeries.heatRules.push({
        "target": label,
        "property": "paddingBottom",
        "min": 0,
        "max": 10,
        "dataField": "value"
      });

      // Pin data
      imageSeries.data = [{
        "latitude": 40,
        "longitude": -101,
        "value": self.northamerica_count,
        "title": "North\nAmerica",
        "length": 150
      }, {
        "latitude": 0,
        "longitude": 25,
        "value": self.africa_count,
        "title": "Africa",
        "length": 40
      }, {
        "latitude": 43,
        "longitude": 5,
        "value": self.europe_count,
        "title": "European\nUnion",
        "length": 100
      }, {
        "latitude": -20,
        "longitude": -60,
        "value": self.southamerica_count,
        "title": "South\nAmerica",
        "length": 100
      }, {
        "latitude": -20,
        "longitude": 140,
        "value": self.oceania_count,
        "title": "Oceania",
        "length": 100
      }, {
        "latitude": 40,
        "longitude": 95,
        "value": self.asia_count,
        "title": "Asia",
        "length": 80
      }];
    }
}
});


