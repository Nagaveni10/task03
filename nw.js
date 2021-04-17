var req1 = new XMLHttpRequest();
req1.open('GET', 'https://restcountries.eu/rest/v2/all', true);
req1.send();
req1.onload = function() {
    var nation = JSON.parse(this.response);
    for (var i in nation) {
        try {
            var cname = nation[i].name;
            var latlong = nation[i].latlng;
            if (latlong === 0) throw new Error("Lattitude and Longitude not found");
            weatherdata(cname, ...latlong);
        } catch (e) {
            console.log(cname + ":" + " " + "invalid coordinates");
        }
    }
}
var weatherdata = function(name, lat, lng) {
    //console.log(lat, lng);
    var req2 = new XMLHttpRequest();
    var URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=92c5137812d697f5c5f9e1391bf01a11`
    req2.open('GET', URL, true);
    req2.send();
    req2.onload = function() {
        var data = JSON.parse(this.response);
        console.log(name + ":" + data.main.temp);
    }
}

//aa26b158f47dc9a97ef7202e8a9263a1