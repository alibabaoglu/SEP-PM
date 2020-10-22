$.mapael.prototype.defaultOptions.map.defaultArea.attrsHover.animDuration = 50;

var lastHoverID = "";
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
                    mouseover: function (em, id) {
                        lastHoverID = id;
                        //console.log(id);
                        setTimeout(function(){ console.log(lastHoverID); if(lastHoverID != ""){cHoverAudio(); }}, 80);
                        //playAudio();
                        //countryHoverSound.play();
                        //cHoverAudio();
                    },
                    mouseout: function (e) {
                        lastHoverID = "";
                        //pauseAudio();
                        //countryHoverSound.pause();
                        //countryHoverSound.currentTime = 0;  
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
                    fill: "#d6958e"

                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Nordamerika</span>"
                }
            },
            "CAM": {
                attrs: {
                    fill: "#ed882f"

                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Zentralamerika</span>"
                }
            },
            "SAM": {
                attrs: {
                    fill: "#cfcd4b"

                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Südamerika</span>"
                }
            },
            "NAS": {
                attrs: {
                    fill: "#61a8d1"

                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Nordasien</span>"
                }

            },
            "WAS": {
                attrs: {
                    fill: "#837ae8"

                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Westasien</span>"
                }
            },
            "CAS": {
                attrs: {
                    fill: "#64cdd1"

                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Zentralasien</span>"
                }
            },
            "SAS": {
                attrs: {
                    fill: " #49bf7c"

                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Südasien</span>"
                }
            },
            "EAS": {
                attrs: {
                    fill: "#348f8f"

                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Ostasien</span>"
                }
            },
            "OZN": {
                attrs: {
                    fill: "#baba3b"

                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Ozeanien</span>"
                }
            },
            "WEU": {
                attrs: {
                    fill: "#e6739f"

                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Westeuropa</span>"
                }
            },
            "NEU": {
                attrs: {
                    fill: "#faa3dd"
                    
                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Nordeuropa</span>"
                }
            },
            "EEU": {
                attrs: {
                    fill: " #B3A3FB"

                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Osteuropa</span>"
                }
            },
            "SEU": {
                attrs: {
                    fill: "#bd4f76"

                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Südeuropa</span>"
                }
            },
            "NAF": {
                attrs: {
                    fill: "#bf4c41"

                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Nordafrika</span>"
                }
            },
            "WAF": {
                attrs: {
                    fill: " #ed5f5a"

                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Westafrika</span>"
                }

            },
            "EAF": {
                attrs: {
                    fill: "#c27899"

                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Ostafrika</span>"
                }

            },
            "CAF": {
                attrs: {
                    fill: "#e86b3a"

                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Zentralafrika</span>"
                }

            },
            "SAF": {
                attrs: {
                    fill: " #f08f3a"

                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Südafrika</span>"
                }

            },
            "SEA": {
                attrs: {
                    fill: "#8bcc52"

                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Südostasien</span>"
                }

            },


        },
    });
});

//const countryHoverSound = new Audio('../audio/cHover.mp3');
var countryHoverSound = document.createElement('audio');
countryHoverSound.src = '../audio/cHover.mp3'
countryHoverSound.volume = 0.2;

var cHovABool = false;
function cHoverAudio(){
if(!cHovABool){
    cHovABool = true;
    countryHoverSound.play();
    
}
cHovABool=false;
    //countryHoverSound.pause();
    //countryHoverSound.currentTime = 0;  
}

function setCompletedRegionColor(id){
   // console.log(id);
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
    //console.log(completeRegionColorShades[correctAnswers[id]]);
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
                    fill: completeRegionColorShades[correctAnswers[allRegIDs[i]]],
                    stroke: completeRegionColorShades[correctAnswers[allRegIDs[i]]]
                },
                attrsHover:{
                    animDuration:10000000
                }
        
            }; 
        }
        
       
        
    }
    $(".container-map").trigger('update', [{ mapOptions: newData }]);

}
