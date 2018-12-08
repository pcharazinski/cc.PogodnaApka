import { get } from "https";

class Weather {
    constructor() {
        console.log('Weather loaded')
        this.date = new Date();

        // TODO: na wzór tego utworzyć atrybuty które moga się przydać, w zalezności od tego co jest w API ofc
        this.cityName;     // nazwa miasta - kiedy byśmy chcieli zwróć po wyszukaniu przez lon, lat na przykład
        this.countryCode;  // kod kraju ie. GP,JP
        this.sunrise;      // lokalny czas wschodu słońca HH:MM
        this.fromSunrise   // ile czasu minęło od wschodu słońca HH:MM
        this.sunset;      // lokalny czas zachodu słońca HH:MM
        this.toSunset     //  ile czasu zostało do zachodu słońca HH:MM

        this.mainTemp;        // temperatura, K
        this.mainPressure;    // ciśnienie stmosferyczne - nad poziomeme morze lub nad powierzchnią ziemi
        this.mainHumidity;    // wilgotność powietrza, %
        this.mainTempMin;     // minimalna temperatura w danym momencie - różnić się może od głównej temperatury dla dużych miast(opcjonalne)
        this.mainTempMax;     // maksymalna temperatura w danym momencie - różnić się może od głównej temperatury dla dużych miast(opcjonalne)

        this.weatherID;       // id danej pogody
        this.weatherMain;     // grupa parametrow (Rain, Snow, Extreme)
        this.weatherDescription;    // opis pogody in english
        this.weatherIcon;   // 

        this.windSpeed; // prędkość wiatru,  m/s
        this.windDeg;   // kierunek wiatru,  deg(meteorological)[whatever that is]

        this.clouds;    // zachmurzenie , %
        this.rain1h;    // opady deszczu w przeciągu ostatniej 1 godziny
        this.rain3h;    // opady deszczu w przeciągu ostatnich 3 godzin
        this.snow1h;    // opady śniegu w przeciągu ostatniej 1 godziny
        this.snow3h;    // opady śniegu w przeciągu ostatnich 3 godzin

        this.lon;       // szerokość geograficzna
        this.lat;       // długość geogragiczna
    }

    getWeatherByCityName(cityName) {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=86677a0c14bfe5ca97291ba315d620e6`;
        fetch(url).then(r => r.json()).then(data => {
            console.log(data)

            this.cityName = data.name;
            this.countryCode = data.sys.country;

            this.sunrise(data.sys.sunrise); // sets the sunrise (and time past from sunrise) field
            this.sunset(data.sys.sunset);   // sets the sunset (and time left to sunset) field

            this.mainTemp = data.main.temp;
            this.mainPressure = data.main.pressure;
            this.mainHumidity = data.main.humidity;
            this.mainTempMin = data.temp_min;
            this.mainTempMax = data.temp_max;

            this.weatherID = data.weather.id;
            this.weatherMain = data.weather.main;
            this.weatherDescription = data.weather.description;
            this.weatherIcon = data.weather.icon;
            this.windSpeed = data.wind.speed;
            this.windDeg = data.wind.deg;

            this.clouds = data.clouds.all;
            // this.rain1h = data.rain.1h; 
            // this.rain3h = data.rain.3h;
            // this.snow1h = data.snow.1h; 
            // this.snow3h = data.snow.3h; 

            this.lon = data.coord.lon;
            this.lat = data.coord.lat;

        });
    }

    getWeatherByCityID(cityID) {
        let url = `https://api.openweathermap.org/data/2.5/weather?id=2172797&appid=86677a0c14bfe5ca97291ba315d620e6`;
        fetch(url).then(r => r.json()).then(data => console.log(data));
    }

    getweatherByCoordinates(lat, lon) {
        let url = `https://www.api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`;
        fetch(url).then(r => r.json()).then(data => console.log(data));
    }

    query(searchCity = 'Wrocław') { //domyślna lokacja wrocław
        // TODO wykonanie zapytania do API i przypisania odpowiedzi do atrybutów
        this.getWeatherByCityName(searchCity);
    }

    sunrise(sunriseTime) {
        let now = new Date();
        this.sunrise = new Date(sunsetTime * 1000);
        this.fromSunrise = Date(now - this.sunrise).toLocaleTimeString();
       
    }

    sunset(sunsetTime) {
        let now = new Date();
        this.sunset = new Date(sunsetTime * 1000);
        this.toSunSet = Date(sunset - now).toLocaleTimeString();
    }
}

export default Weather;