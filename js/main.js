var apiKey = "keyieOwATKOFQswlE";
var urlRestaurants = "https://api.airtable.com/v0/appOPS9QgLsqAcPBI/restaurants?api_key=" + apiKey;


var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    imgPlaceholder: 'http://placekitten.com/g/80/80',
    todayDay: 0,
    loadingPlaces: true,
    loadingError: false,
    restaurants: []
  },
  created: function () {
  	this.getDay();
	this.getImage();
  },
  methods: {
  	getDay: function () {
  		var day = new Date();
  		this.todayDay = day.getDay();
  	},
  	getImage: function () {
		axios.get(urlRestaurants, { timeout : 10000 })
			.then(function(res) {
				app.restaurants = res.data.records;
				app.loadingPlaces = false;
			}).catch(function(err) {
				app.loadingPlaces = false;
				app.loadingError = true;
			})
	},
	trackGa: function(name) {
		ga('send', 'event', {
			eventCategory: 'Restaurants',
		    eventAction: 'Call',
		    eventLabel: name
		});
	}
  },
  filters : {
  	phone : function(phone){
  		return phone.replace(/[^0-9]/g, '')
                .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  	}
  }
});