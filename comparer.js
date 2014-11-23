var comparer = (function() {

    var maxZoomLevel = 20;

    var addBaseMaps = function() {

        var osm = new OpenLayers.Layer.OSM('osm', null, {
            numZoomLevel: maxZoomLevel
        });

        var baseLayers = [
            new OpenLayers.Layer.XYZ(
                "OpenStreetMap", [
                    "http://otile1.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png",
                    "http://otile2.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png",
                    "http://otile3.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png",
                    "http://otile4.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png"
                ], {
                    attribution: "Data, imagery and map information provided by <a href='http://www.mapquest.com/'  target='_blank'>MapQuest</a>, <a href='http://www.openstreetmap.org/' target='_blank'>Open Street Map</a> and contributors, <a href='http://creativecommons.org/licenses/by-sa/2.0/' target='_blank'>CC-BY-SA</a>  <img src='http://developer.mapquest.com/content/osm/mq_logo.png' border='0'>",
                    transitionEffect: "resize",
                    numZoomLevels: maxZoomLevel
                }
            ),
            new OpenLayers.Layer.XYZ(
                "Imagery", [
                    "http://otile1.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.png",
                    "http://otile2.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.png",
                    "http://otile3.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.png",
                    "http://otile4.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.png"
                ], {
                    attribution: "Tiles Courtesy of <a href='http://open.mapquest.co.uk/' target='_blank'>MapQuest</a>. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency. <img src='http://developer.mapquest.com/content/osm/mq_logo.png' border='0'>",
                    transitionEffect: "resize",
                    numZoomLevels: maxZoomLevel
                }
            ),
            osm,
            new OpenLayers.Layer.XYZ(
                "Imagery2", [
                    "http://ttiles01.mqcdn.com/tiles/1.0.0/vy/sat/${z}/${x}/${y}.png",
                    "http://ttiles02.mqcdn.com/tiles/1.0.0/vy/sat/${z}/${x}/${y}.png",
                    "http://ttiles03.mqcdn.com/tiles/1.0.0/vy/sat/${z}/${x}/${y}.png",
                    "http://ttiles04.mqcdn.com/tiles/1.0.0/vy/sat/${z}/${x}/${y}.png"
                ], {
                    attribution: "Tiles Courtesy of <a href='http://open.mapquest.co.uk/' target='_blank'>MapQuest</a>. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency. <img src='http://developer.mapquest.com/content/osm/mq_logo.png' border='0'>",
                    transitionEffect: "resize",
                    numZoomLevels: maxZoomLevel
                }
            ),
            new OpenLayers.Layer.XYZ(
                "Imagery hyb", [
                    "http://ttiles01.mqcdn.com/tiles/1.0.0/vy/hyb/${z}/${x}/${y}.png",
                    "http://ttiles02.mqcdn.com/tiles/1.0.0/vy/hyb/${z}/${x}/${y}.png",
                    "http://ttiles03.mqcdn.com/tiles/1.0.0/vy/hyb/${z}/${x}/${y}.png",
                    "http://ttiles04.mqcdn.com/tiles/1.0.0/vy/hyb/${z}/${x}/${y}.png"
                ], {
                    attribution: "Tiles Courtesy of <a href='http://open.mapquest.co.uk/' target='_blank'>MapQuest</a>. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency. <img src='http://developer.mapquest.com/content/osm/mq_logo.png' border='0'>",
                    transitionEffect: "resize",
                    numZoomLevels: maxZoomLevel
                }
            )
        ];
        this.addLayers(baseLayers);
    };

    var createMap = function(options) {
        options = options || {};
        return new OpenLayers.Map({
            div: options.div || "map",
            projection: "EPSG:900913",
            layers: options.baseLayers,
            center: options.center || [0, 0],
            zoom: options.zoom || 5
        });
    };

    var addControls = function() {

        var scaleLine = new OpenLayers.Control.ScaleLine();
        var scale = new OpenLayers.Control.Scale();
        var mousePosition = new OpenLayers.Control.MousePosition({
            displayProjection: new OpenLayers.Projection("EPSG:4326")
        });
        var mapControls = [new OpenLayers.Control.LayerSwitcher(), scale, scaleLine, mousePosition];
        this.addControls(mapControls);
    };

    return {
        initSingleMap: function(options) {
            options = options || {
                div: 'map'
            };

            var map = createMap(options);
            addBaseMaps.call(map);
            addControls.call(map);

            map.zoomTo(options.zomm || 5);
            map.panTo(options.center || [0, 0]);
            return map;
        }
    }

})();