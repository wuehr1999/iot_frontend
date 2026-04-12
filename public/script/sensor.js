function update() {
    const http = new XMLHttpRequest();
    console.log(window.location.hostname);
    http.open(
        'GET', String('http://' + window.location.hostname + ':5000/api/v1/temperature')
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
   console.log(data) 
   for(var d in data) {
       var datetime = []
       for(t in data[d].time) {
           var timestamp = new Date(data[d].time[t] * 1000)
           datetime.push(timestamp.toISOString())
       }
       dataset.push({
	       name: data[d].dev_id,
           x: datetime,
           y: data[d].celsius,
           type: 'scatter'
       });
   }
   Plotly.newPlot('plot', dataset, layout);
}
