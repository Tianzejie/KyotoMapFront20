$(document).ready(function(){


$("#tyaExample").click(function(){
    $.get('https://kyoto-map-20.herokuapp.com/locations/',function(data,status){
      alert("The jpname, description, latitude of the first location returned is:")
      alert("jpname: "+data[0].jpname+" description: "+data[0].description+" latitude: "+data[0].lat);
      alert("Only the category of the first location locations is...")
      alert(data[0].category);
      alert("The jpname, description, latitude of the second location returned is:")
      alert("jpname: "+data[1].jpname+" description: "+data[1].description+" latitude: "+data[1].lat);
    });
  });

$("#nature").click(function(){
  $.get('https://kyoto-map-20.herokuapp.com/locations/',function(data,status){
    alert("The jpname, description, latitude of the first location returned is:")
    alert("jpname: "+data[0].jpname+" description: "+data[0].description+" latitude: "+data[0].lat);
    alert("Only the category of the first location locations is...")
    alert(data[0].category);
    alert("The jpname, description, latitude of the second location returned is:")
    alert("jpname: "+data[1].jpname+" description: "+data[1].description+" latitude: "+data[1].lat);
  });
});


});





function initMap() {
    const garden = { lat: 35.023138536118545, lng: 135.76386160876868 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: garden,
    });


    $.get('https://kyoto-map-20.herokuapp.com/locations/',function(data,status){

      var locations=new Array();
      for (var i=0;i<data.length;i++){
        var t_lat=parseFloat(data[i].lon);
        var t_lng=parseFloat(data[i].lat);
        locations.push({lat:t_lat, lng:t_lng, description:data[i].description, name:data[i].jpname});
      }
      const image ="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

      for (var i=0;i<locations.length;i++){
        const location=locations[i];

        marker=new google.maps.Marker({

          position:{lat:location.lat,lng:location.lng},
          map,
          icon:image,
        });

        const contentString =
          '<div id="content">' +
          '<div id="siteNotice">' +
          "</div>" +
          '<h1 id="firstHeading" class="firstHeading">'+location.name+'</h1>' +
          '<div id="bodyContent">' +
          "<p>"+ location.description+"</p>"
          "</div>" +
          "</div>";
        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });

        marker.addListener("click", () => {
          infowindow.open(map, marker);
        });
      };
      });
  }
