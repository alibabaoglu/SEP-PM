$.mapael.prototype.defaultOptions.map.defaultArea.attrsHover.animDuration = 70;

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
                    stroke:"#F5F5DC"
                    //fill:"url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
                    //fill: "url(https://icon-library.com/images/pattern-icon/pattern-icon-13.jpg)"
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
                        setTimeout(function(){ //console.log(lastHoverID); 
                            if(lastHoverID != ""){cHoverAudio(); }}, 80);
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
                attrsHover: {
                    fill: "#bd6257"
                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Nordamerika</span>"
                }
            },
            "CAM": {
                attrs: {
                    fill: "#ed882f"

                },
                attrsHover: {
                    fill: "#bd6c02"
                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Zentralamerika</span>"
                }
            },
            "SAM": {
                attrs: {
                    fill: "#cfcd4b"

                },
                attrsHover: {
                    fill: "#bfab13"
                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Südamerika</span>"
                }
            },
            "NAS": {
                attrs: {
                    fill: "#61a8d1"

                },
                attrsHover: {
                    fill: "#357dbd"
                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Nordasien</span>"
                }

            },
            "WAS": {
                attrs: {
                    fill: "#837ae8"

                },
                attrsHover: {
                    fill: "#4f43cf"
                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Westasien</span>"
                }
            },
            "CAS": {
                attrs: {
                    fill: "#64cdd1"

                },
                attrsHover: {
                    fill: "#26bdd4"
                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Zentralasien</span>"
                }
            },
            "SAS": {
                attrs: {
                    fill: "#49bf7c"

                },
                attrsHover: {
                    fill: "#1b9166"
                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Südasien</span>"
                }
            },
            "EAS": {
                attrs: {
                    fill: "#348f8f"

                },
                attrsHover: {
                    fill: "#177f8a"
                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Ostasien</span>"
                }
            },
            "OZN": {
                attrs: {
                    fill: "#baba3b"

                },
                attrsHover: {
                    fill: "#b0a013"
                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Ozeanien</span>"
                }
            },
            "WEU": {
                attrs: {
                    fill: "#e6739f"

                },
                attrsHover: {
                    fill: "#d14b71"
                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Westeuropa</span>"
                }
            },
            "NEU": {
                attrs: {
                    fill: "#faa3dd"
                    
                },
                attrsHover: {
                    fill: "#de78b7"
                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Nordeuropa</span>"
                }
            },
            "EEU": {
                attrs: {
                    fill: "#B3A3FB"

                },
                attrsHover: {
                    fill: "#9175eb"
                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Osteuropa</span>"
                }
            },
            "SEU": {
                attrs: {
                    fill: "#bd4f76"

                },
                attrsHover: {
                    fill: "#a3324f"
                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Südeuropa</span>"
                }
            },
            "NAF": {
                attrs: {
                    fill: "#bf4c41"

                },
                attrsHover: {
                    fill: "#a83020"
                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Nordafrika</span>"
                }
            },
            "WAF": {
                attrs: {
                    fill: "#ed5f5a"

                },
                attrsHover: {
                    fill: "#cf382d"
                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Westafrika</span>"
                }

            },
            "EAF": {
                attrs: {
                    fill: "#c27899"

                },
                attrsHover: {
                    fill: "#b84774"
                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Ostafrika</span>"
                }

            },
            "CAF": {
                attrs: {
                    fill: "#e86b3a"

                },
                attrsHover: {
                    fill: "#c24e0f"
                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Zentralafrika</span>"
                }

            },
            "SAF": {
                attrs: {
                    fill: "#f08f3a"

                },
                attrsHover: {
                    fill: "#c76d14"
                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Südafrika</span>"
                }

            },
            "SEA": {
                attrs: {
                    fill: "#8bcc52"

                },
                attrsHover: {
                    fill: "#5aa127"
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
            //fill: completeRegionColorShades[correctAnswers[id]],3
            stroke: completeRegionColorShades[correctAnswers[id]],
            "stroke-width":2
            //"stroke-dasharray":".",
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
                    //fill: completeRegionColorShades[correctAnswers[allRegIDs[i]]],
                    stroke: completeRegionColorShades[correctAnswers[allRegIDs[i]]],
                    "stroke-width":2
                },
                attrsHover:{
                    animDuration:10000000
                }
        
            }; 
        }
        
       
        
    }
    $(".container-map").trigger('update', [{ mapOptions: newData }]);

}
