<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Scrollytelling Map</title>
<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
<link href="https://api.mapbox.com/mapbox-gl-js/v3.17.0-beta.1/mapbox-gl.css" rel="stylesheet">
<script src="https://api.mapbox.com/mapbox-gl-js/v3.17.0-beta.1/mapbox-gl.js"></script>
<style>
body { margin: 0; padding: 0; }
#map {
    position: fixed;
    width: 50%;
}
#features {
    width: 50%;
    margin-left: 50%;
    font-family: sans-serif;
    overflow-y: scroll;
    background-color: #fafafa;
}
section {
    padding: 25px 50px;
    line-height: 25px;
    border-bottom: 1px solid #ddd;
    opacity: 0.25;
    font-size: 13px;
}
section.active {
    opacity: 1;
}
section:last-child {
    border-bottom: none;
    margin-bottom: 200px;
}
video {
    width: 100%;
    max-width: 400px;
}
</style>
</head>
<body>

<div id="map"></div>
<div id="features">
    <section id="intro" class="active">
        <h3>Introduction</h3>
        <p>A group of nine local newsrooms...</p>
    </section>
    <section id="location1">
        <h3>Location 1</h3>
        <video controls>
            <source src="https://packaged-media.redd.it/qcb53pjykxsf1/pb/m2-res_854p.mp4?m=DASHPlaylist.mpd&v=1&e=1763420400&s=17003f923494513d7caf39eea64a2e1443fa4e44" type="video/mp4">
        </video>
        <p>October 3 <br> Agents deployed one tear gas canister</p>
    </section>
    <section id="location2">
        <h3>Location 2</h3>
        <video controls>
            <source src="https://v.redd.it/nl2xxqp44btf1/DASH_360.mp4" type="video/mp4">
        </video>
        <p>October 4 <br> Agents deployed 12 tear gas canisters and shot pepper balls 3 times</p>
    </section>
</div>

<script>
mapboxgl.accessToken = 'pk.eyJ1IjoiamltZGFsZXkiLCJhIjoiY21oeHIzanN1MDRjZzJqcHYzOTI2ZHhnMiJ9.92tczXH-1swPAun1FrlfGw';

const chapters = {
    'intro': {
        center: [-87.623177, 41.881832],
        zoom: 10,
        pitch: 0
    },
    'location1': {
        center: [-87.7157113005473, 41.91737635704838],
        zoom: 15,
        pitch: 45
    },
    'location2': {
        center: [-87.70444, 41.82259],
        zoom: 15,
        pitch: 45
    }
};

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    center: chapters['intro'].center,
    zoom: chapters['intro'].zoom
});

let activeChapterName = 'intro';
function setActiveChapter(chapterName) {
    if (chapterName === activeChapterName) return;

    map.flyTo(chapters[chapterName]);

    document.getElementById(chapterName).classList.add('active');
    document.getElementById(activeChapterName).classList.remove('active');

    activeChapterName = chapterName;
}

function isElementOnScreen(id) {
    const element = document.getElementById(id);
    const bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
}

window.onscroll = () => {
    for (const chapterName in chapters) {
        if (isElementOnScreen(chapterName)) {
            setActiveChapter(chapterName);
            break;
        }
    }
};
</script>

</body>
</html>
