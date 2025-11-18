mapboxgl.accessToken = 'pk.eyJ1IjoiamltZGFsZXkiLCJhIjoiY21oeHIzanN1MDRjZzJqcHYzOTI2ZHhnMiJ9.92tczXH-1swPAun1FrlfGw';

const chapters = {
    'intro': {
        center: [-87.623177, 41.881832],
        zoom: 10,
        pitch: 0,
        description: 'A group of nine Chicago newsrooms and independent journalists reviewed dozens of videos and photos of federal immigration agents’ use of tear gas and pepper spray during Operation Midway Blitz. <br> <br> Our investigation found that agents used chemical weapons on protesters at least 49 times across 18 incidents since October 1. <br><br> At least 30 such instances occured after a judge placed restrictions on agents’ use of tear gas and pepper spray.
    },
    'location1': {
        center: [-87.7157113005473, 41.91737635704838],
        zoom: 15,
        pitch: 45,
        description: 'October 3 <br> Agents deployed one tear gas canister'
    },
    'location2': {
        center: [-87.70444, 41.82259],
        zoom: 15,
        pitch: 45,
        description: 'October 4 <br> Agents deployed 12 tear gas canisters and shot pepper balls 3 times'
    }
};

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    center: chapters['intro'].center,
    zoom: chapters['intro'].zoom
});

// Add markers with popups for each location
map.on('load', () => {
    // Location 1 marker
    const popup1 = new mapboxgl.Popup()
        .setHTML(chapters['location1'].description);
    
    new mapboxgl.Marker()
        .setLngLat(chapters['location1'].center)
        .setPopup(popup1)
        .addTo(map);
    
    // Location 2 marker
    const popup2 = new mapboxgl.Popup()
        .setHTML(chapters['location2'].description);
    
    new mapboxgl.Marker()
        .setLngLat(chapters['location2'].center)
        .setPopup(popup2)
        .addTo(map);
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
