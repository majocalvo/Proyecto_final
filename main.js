console.log("cargando . . . ");

const $pais = document.getElementById("paises");
const $ciudad = document.getElementById("ciudad");
const $buscar = document.getElementById("buscar");

const $clima_ciudad = document.getElementById("contenedor_clima_ciudad");
const $clima_icono = document.getElementById("contenedor_clima_icono");
const $clima_grados = document.getElementById("contenedor_clima_grados");
const $clima_max = document.getElementById("contenedor_clima_grados_max");
const $clima_min = document.getElementById("contenedor_clima_grados_min");

const url =
  "http://api.openweathermap.org/geo/1.0/direct?q=CIUDAD,IDPAIS&limit=5&appid=1a2dc2b945e2061a5f0e4623164d8983";

const url_lat_lon =
  "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid=1a2dc2b945e2061a5f0e4623164d8983";

const url_icon = "http://openweathermap.org/img/wn/ICONO@2x.png";

function obtenerClima(url_api) {
  let new_url = "";

  if ($pais.value == "" || $ciudad.value == "") {
    new_url = url_api
      .replace("CIUDAD", "Puerto Montt")
      .replace("IDPAIS", "Santiago");
  } else {
    new_url = url_api;
  }

  fetch(new_url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0].local_names.es);
      console.log(data[0].lat + "  lon:" + data[0].lon);

      let new_url_lat_lon = url_lat_lon
        .replace("{lat}", data[0].lat)
        .replace("{lon}", data[0].lon);

      fetch(new_url_lat_lon)
        .then((respuesta) => respuesta.json())
        .then((datos) => {
          $clima_ciudad.innerHTML = "Clima en " + data[0].local_names.es;
          //   $clima_icono.innerHTML = datos.weather[0].icon;
          let nuevo_icono = url_icon.replace("ICONO", datos.weather[0].icon);
          $clima_icono.innerHTML = `<img src="${nuevo_icono}" >`;

          $clima_grados.innerHTML = datos.main.temp + " °";
          $clima_max.innerHTML = "Máx: " + datos.main.temp + " °";
          $clima_min.innerHTML = "Mín: " + datos.main.temp + " °";

        //   console.log(datos);
        //   console.log(nuevo_icono);
        });
    })

    .catch((error) => {
      console.log(error);
      $clima_icono.innerHTML = "Temporalmente sin datos..."
    });
}

obtenerClima(url);

$buscar.addEventListener("click", function () {
  if ($pais.value == "" || $ciudad.value == "") {
    console.log("Ingrese los valores de país y ciudad");
  }

  let url_select = url
    .replace("CIUDAD", $ciudad.value)
    .replace("IDPAIS", $pais.value);

  obtenerClima(url_select);

  console.log("url: " + url);
  console.log("url_selected: " + url_select);
});


//Capturar click en el Link Tours.
const $tours = document.querySelectorAll('.item_box_titulo');
const $selected_tour= document.getElementById("destino_tour");

$tours.forEach(tour => {
    tour.addEventListener('click', function handleClick(event) {
    console.log('box clicked', tour.getAttribute("value"));
    document.getElementById("destino_tour").selectedIndex=tour.getAttribute("value");
    
  });
});
