mapboxgl.accessToken = 'pk.eyJ1IjoiamltZGFsZXkiLCJhIjoiY21oejg1dnprMGtqZjJrcHQyd3h0YTNreCJ9.wjgytEDxDIP6bl7hkHerrA';

const chapters = {
  intro: {
    center: [-87.623177, 41.881832],
    zoom: 10,
    popup: {
      coords: [-87.623177, 41.881832],
      html: `<p style="font-size: 16px; margin: 0;">A group of nine local newsrooms...</p>`
    }
  }
  // Add the rest of your chapters here
};

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/satellite-streets-v12',
  center: chapters['intro'].center,
  zoom: chapters['intro'].zoom
});

// ...rest of your JavaScript
