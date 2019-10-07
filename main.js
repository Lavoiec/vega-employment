
var width = window.innerWidth;
var vegaChart = {

    "data": {
        "url": "data.json"
    },
    "hconcat": [{
        "width": width * 0.3,
        "height": 400,
        "selection": {
            "brush": {
                "type": "interval",
                "encodings": ["y"]
            }
        },
        "mark": {
            "type": "point",
            "tooltip": {
                "content": "data"
            }
        },
        "tooltip": { "content": "data" },
        "encoding": {
            "x": {
                "field": "Date",
                "type": "nominal"
            },
            "size": {
                "field": "Persons",
                "type": "quantitative"
            },
            "y": {
                "field": "Sector",
                "type": "nominal",
                "scale": {
                    "rangeStep": 12
                }
            }
        },
        "config": {
            "line": {
                "point": true
            },
            "scale": {
                "useUnaggregatedDomain": true
            }
        }
    },
    {
        "width": width * 0.45,
        "height": 400,
        "mark": "bar",
        "selection": {
            "hover": {
                "type": "single",
                "on": "mouseover",
                "empty": "none"
            }
        },
        "encoding": {
            "x": {
                "bin": {},
                "field": "Persons",
                "type": "quantitative"
            },
            "y": {
                "aggregate": "count",
                "field": "*",
                "type": "quantitative"
            },
            "color": {
                "condition": {
                    "selection": "hover",
                    "color": "#2A4E6C"
                },
                "value": "steelblue"
            }
        },
        "config": {
            "line": {
                "point": true
            },
            "scale": {
                "useUnaggregatedDomain": true
            }
        },
        "transform": [
            { "filter": { "selection": "brush" } }
        ]
    }

    ]
};



vegaEmbed("#vis1", vegaChart, opts = { "renderer": "svg" }).then(function () {

    let inflate = 2;
    var circles = d3.select(".mark-symbol.role-mark.concat_0_marks")
        .selectAll("path")
        .on("mouseover", function () {
            var strokeWidth = d3.select(this).style("stroke-width");
            var strokeInt = extractNumber(strokeWidth);
            d3.select(this)
                .style("stroke-width", function () {
                    return inflate * strokeInt;
                })
        })
        .on("mouseout", function () {
            var strokeWidth = d3.select(this).style("stroke-width");
            var strokeInt = extractNumber(strokeWidth);
            d3.select(this)
                .style("stroke-width", function () { return strokeInt / inflate; });
        });
    
    // NAICS codes
    var request = new XMLHttpRequest();
    request.open('GET', "naics.json");
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        var naics = request.response;
        console.log(naics);
        naics.forEach(function(d) {
            console.log(d)
        })
        // want to create an object that merges the description with the 

        // allowing mouseover on text labels
        // for reference "mark-text role-axis-label"
        yAxis = document.querySelector('.mark-group.role-axis')
        axisText = document.querySelectorAll(".charts.mark-text.role-axis-label");
        document.querySelector(".charts").appendChild(yAxis);
        yAxisNodes = axisText[1].children;

        var yAxisDescriptions = Array();
        

        for (i=0; i<yAxisNodes.length; i++)  {
           var node = yAxisNodes[i];
           node.style.zIndex = 100;
           node.style.position = 'absolute';
            console.log(node.innerHTML);
             for (j=0; j<naics.length; j++) {
               var naicsObj = naics[j];
                if (node.innerHTML === naicsObj.title) {   
                    yAxisDescriptions.push(naicsObj.definition);

                } else{
                    yAxisDescriptions.push("coming soon");
                }
            }
            node.onmouseover = appendDescription;
            node.onmouseout = removeDescription;
        }


    }
}

);

function appendDescription() {
            console.log("i work");
            var textDiv = document.querySelector("#explanation");
            var description = document.createElement('p');
            description.textContent = yAxisDescriptions[i];
            textDiv.appendChild(description);
} 

function removeDescription() {
    var textDiv = document.querySelector("#explanation");
    textDiv.removeChildren();
}

function extractNumber(string) {
    theNumber = string.match("[0-9]+")[0]
    return Number(theNumber)

}
