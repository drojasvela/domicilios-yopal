var apiKey = "keyieOwATKOFQswlE";
var urlRestaurants = "https://api.airtable.com/v0/appOPS9QgLsqAcPBI/restaurants?api_key=" + apiKey;


var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    imgPlaceholder: 'http://placekitten.com/g/80/80',
    loadingPlaces: true,
    loadingError: false,
    restaurants: []
  },
  created: function () {
	this.getImage();
  },
  methods: {
  	getImage: function () {
		axios.get(urlRestaurants, { timeout : 10000 })
			.then(function(res) {
				console.clear();
				// vm.asteroids = res.data.near_earth_objects.slice(0, 100);
				console.log(res.data.records);
				app.restaurants = res.data.records;
				app.loadingPlaces = false;
			}).catch(function(err) {
				console.log(err);
				app.loadingPlaces = false;
				app.loadingError = true;
			})
	}
  }
});