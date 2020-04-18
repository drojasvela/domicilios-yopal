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
    showFilters: false,
    restaurants: [],
    availableFilters: [],
    activeFilters: []
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
		    this.todayDay = "Miércoles";
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

  		var filters = "";
  		var filtersAreActive = this.activeFilters.length > 0;
  		var url = urlRestaurants;

  		this.loadingPlaces = true;

  		if (filtersAreActive) {

	  		this.activeFilters.forEach(function(item, index, array) {
	  			if (index === array.length - 1){
	  				filters = filters + 'FIND(%22' + item + '%22%2Ccategories)';
	  			} else {
	  				filters = filters + 'FIND(%22' + item + '%22%2Ccategories)%2C';
	  			}

	  			app.trackGa('Restaurants', 'filter', item, 1);
	  		});

	  		url = urlRestaurants + "&filterByFormula=OR(" + filters + ")";

  		}

		axios.get(url, { timeout : 10000 })
			.then(function(res) {
				app.restaurants = res.data.records;
				app.loadingPlaces = false;
				app.restaurants.forEach(function(item){
					if (item.fields.image && item.fields.image[0].thumbnails.large.url) {
						item.imageUrl = item.fields.image[0].thumbnails.large.url;
					}

					if (item.fields.open_days) {
						var place = item;
						place.open = item.fields.open_days.includes(app.todayDay);
					}
				});
				if (!filtersAreActive) {
					app.loadFilters();
				}
			}).catch(function(err) {
				app.loadingPlaces = false;
				app.loadingError = true;
			})
	},
	loadFilters: function () {
		this.restaurants.forEach(function(item){
			if (item.fields.categories) {
				item.fields.categories.map(function(item){
					if (!app.availableFilters.includes(item)) {
						app.availableFilters.push(item);
					}
				})
			}
		});

		this.showFilters = true;
	},
	trackGa: function(category, action, label, value) {
		gtag('event', action, {'event_category': category,'event_label': label, 'value': value });
	}
  },
  watch: {
  	activeFilters: function () {
  		this.getPlaces();
  	}
  },
  filters : {
  	phone : function(phone){
  		return phone.replace(/[^0-9]/g, '')
                .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  	}
  }
});