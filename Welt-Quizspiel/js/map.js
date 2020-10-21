$.mapael.prototype.defaultOptions.map.defaultArea.attrsHover.animDuration = 50;

$(function () {
    var x = $(".container-map").mapael({
        map: {
            name: "worldregions_projektion_ohne_antarktis"
            , zoom: {
                enabled: true,
                maxlevel: 10,
                init: {
                    x: 400,
                    y: 300,
                    level: 0
                }
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
                            if(!regionIsCompleted(id)){
                        /*  
                            newData.areas[id] = {
                                attrs: {
                                    fill: "#5ba4ff"
                                }
                            };*/

                            newRegion(id);
                        
                        }
                        else{
                            setCompletedRegionColor(id);
                        }
                        $(".container-map").trigger('update', [{ mapOptions: newData }]);
                    }
                }
            }
        },
        areas: {
            "NAM": {
                attrs: {
                    fill: "#4D824B"

                },
            },
            "CAM": {
                attrs: {
                    fill: "#F2D0FF"

                },
            },
            "SAM": {
                attrs: {
                    fill: "#69C487"

                },
            },
            "NAS": {
                attrs: {
                    fill: "#5675C1"

                },

            },
            "WAS": {
                attrs: {
                    fill: "#F664CD"

                },
            },
            "CAS": {
                attrs: {
                    fill: " #C54A56"

                },
            },
            "SAS": {
                attrs: {
                    fill: " #69C487"

                },
            },
            "EAS": {
                attrs: {
                    fill: " #67CFF0"

                },
            },
            "OZN": {
                attrs: {
                    fill: " #52836E"

                },
            },
            "WEU": {
                attrs: {
                    fill: " #D5EE74"

                },
            },
            "NEU": {
                attrs: {
                    fill: " #B3A3FB"

                },
            },
            "EEU": {
                attrs: {
                    fill: " #42779C"

                },
            },
            "SEU": {
                attrs: {
                    fill: " #42779C"

                },
            },
            "NAF": {
                attrs: {
                    fill: " #4FDEB8"

                },
            },
            "WAF": {
                attrs: {
                    fill: " #743481"

                },

            },
            "EAF": {
                attrs: {
                    fill: " #A33C5A"

                },

            },
            "CAF": {
                attrs: {
                    fill: " #A6FB66"

                },

            },
            "SAF": {
                attrs: {
                    fill: " #5478F0"

                },

            },
            "SEA": {
                attrs: {
                    fill: " #815448"

                },

            },


        },
    });
});

function setCompletedRegionColor(id){
    console.log(id);
    var newData = {
        'areas': {}
    };

    newData.areas[id] = {
        attrs: {
            fill: completeRegionColorShades[correctAnswers[id]]
        },
        attrsHover:{
            animDuration:10000000
        }

    }; 
    console.log(completeRegionColorShades[correctAnswers[id]]);
    $(".container-map").trigger('update', [{ mapOptions: newData }]);
};

function initializeColors(){
    var newData = {
        'areas': {}
    };
    allRegIDs = Object.keys(DATA);
   // console.log(Object.keys(DATA[allRegIDs[i]]));
    for (let i = 0; i < allRegIDs.length; i++) {
        if(Object.keys(DATA[allRegIDs[i]]).length < 1){
            newData.areas[allRegIDs[i]] = {
                attrs: {
                    fill: completeRegionColorShades[correctAnswers[allRegIDs[i]]]
                },
                attrsHover:{
                    animDuration:10000000
                }
        
            }; 
        }
        
       
        
    }
    $(".container-map").trigger('update', [{ mapOptions: newData }]);

}
