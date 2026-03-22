function update() {
    const http = new XMLHttpRequest();
    console.log(window.location.hostname);
    http.open(
        'GET', String('http://' + window.location.hostname + ':5000/temperature')
    );
    http.setRequestHeader("Access-Control-Allow-Origin", "*")
    http.send();
    http.onload = () => updateData(JSON.parse(http.responseText));
}

function updateData(data) {
   var datasets = [];
   
   var layout = {
       showlegend: true,
       title: { text: 'Temperature' },
       yaxis: {
       title: { text: "Celsius" }
       }
   };
  
   var dataset = []
   
   for(var d in data) {
       dataset.push({
	       name: data[d].dev_id,
               y: data[d].celsius,
               type: 'scatter'
       });
   }
   Plotly.newPlot('plot', dataset, layout);
}
