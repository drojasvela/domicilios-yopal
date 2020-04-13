var apiKey = "keyieOwATKOFQswlE";
var urlRestaurants = "https://api.airtable.com/v0/appOPS9QgLsqAcPBI/restaurants?sort%5B0%5D%5Bfield%5D=name&sort%5B0%5D%5Bdirection%5D=asc&api_key=" + apiKey;


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
	this.getPlaces();
  },
  methods: {
  	getDay: function () {
  		switch (new Date().getDay()) {
		  case 0:
		    this.todayDay = "Domingo";
		    break;
		  case 1:
		    this.todayDay = "Lunes";
		    break;
		  case 2:
		     this.todayDay = "Martes";
		    break;
		  case 3:
		    this.todayDay = "Miercoles";
		    break;
		  case 4:
		    this.todayDay = "Jueves";
		    break;
		  case 5:
		    this.todayDay = "Viernes";
		    break;
		  case 6:
		    this.todayDay = "Sábado";
		}
  	},
  	getPlaces: function () {
		axios.get(urlRestaurants, { timeout : 10000 })
			.then(function(res) {
				app.restaurants = res.data.records;
				app.loadingPlaces = false;
				app.restaurants.forEach(function(item){
					if (item.fields.image && item.fields.image[0].thumbnails.large.url) {
						item.imageUrl = item.fields.image[0].thumbnails.large.url;
					}

					if (item.fields.open_days) {
						var place = item;
						item.fields.open_days.forEach(function(item) {
							if (item == app.todayDay) {
								place.open = true;
							} else {
								place.open = false;
							}
						});
					}
				});
			}).catch(function(err) {
				app.loadingPlaces = false;
				app.loadingError = true;
			})
	},
	trackGa: function(category, action, name) {
		gtag('event','click',{'event_category': category,'event_label': action, 'value': name });
	}
  },
  filters : {
  	phone : function(phone){
  		return phone.replace(/[^0-9]/g, '')
                .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  	}
  }
});