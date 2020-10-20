$.mapael.prototype.defaultOptions.map.defaultArea.attrsHover.animDuration = 50;
$(function () {
    var x = $(".container").mapael({
        map: {
            name: "worldregions_projektion_ohne_antarktis"
            , zoom: {
                enabled: true
            },
            defaultArea: {
                attrs: {
                    fill: "#f4f4e8"
                }
                , text: {
                    attrs: {
                        "fill": "black",
                        "font-size": 14,
                        "font-weight": "bold"
                    },
                    attrsHover: {
                        fill: "#000"
                    }

                }
                , eventHandlers: {
                    mouseover: function (e) {
                        playAudio();
                    },
                    mouseout: function (e) {
                        pauseAudio();
                    },
                    click: function (e, id, mapElem, textElem) {
                        var newData = {
                            'areas': {}
                        };
                        if (!(mapElem.originalAttrs.fill == "#5ba4ff")) {

                            newData.areas[id] = {
                                attrs: {
                                    fill: "#5ba4ff"
                                }
                            };
                            newRegion(id);

                        }
                        $(".container").trigger('update', [{ mapOptions: newData }]);
                    }
                }
            }
        },
        areas: {
            "NAM": {
                attrs: {
                    fill: "#9EC7F3"

                },
                text: {
                    margin: { x: -50, y: 50 },
                    content: "North America",
                },
            },
            "CAM": {
                attrs: {
                    fill: "#FFFFD0"

                },

                text: {
                    margin: { x: 0, y: 0 },
                    content: "Central America",
                },
            },
            "SAM": {

                text: {
                    margin: { x: 0, y: 0 },
                    content: "South America",
                },

            },
            "NAM": {
                attrs: {
                    fill: "#9EC7F3"

                },
                text: {
                    margin: { x: -50, y: 50 },
                    content: "North America",
                },
            },
            "NAM": {
                attrs: {
                    fill: "#9EC7F3"

                },
                text: {
                    margin: { x: -50, y: 50 },
                    content: "North America",
                },
            },
        },
    });
});