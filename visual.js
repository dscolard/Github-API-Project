var results = "results.json"


var total=30;
var i = 0;
var py=0;
var java = 0;
var noData = 0;
var hs = 0;
var other = 0;

for(i; i<total; i++){
	if(JSON.stringify(results.items[i].language)===JSON.stringify("Python")){
		py = py+1;
	}
	else if(JSON.stringify(results.items[i].language)===JSON.stringify("Java")){
		java = java+1;
	}
	else if(results.items[i].language===null){
		noData=noData+1;
	}
	else if(JSON.stringify(results.items[i].language)===JSON.stringify("Haskell")){
		hs=hs+1;
	} 
	else other = other+1;
}

	var w = 800,                        //width
	h = 800,                            //height
	r = 300,                            //radius
	color = d3.scale.category20c();     //builtin range of colors


	data = [{"label":"Python", "value":py}, 
	        {"label":"Java", "value":java}, 
	        {"label":"Haskell", "value":hs},
	        {"label":"Other","value":other},
	        {"label":"Null","value":noData}];



  ////////////////////////////////////////////
  //             Pie Chart                 //
  //////////////////////////////////////////
	    
	var vis = d3.select("body")
	    .append("svg:svg")            
	    .data([data])                   
	        .attr("width", w)          
	        .attr("height", h)
	    .append("svg:g")         
	        .attr("transform", "translate(" + (r+50) + "," + (r+50) + ")")    
	var arc = d3.svg.arc()            
	    .outerRadius(r);
	var pie = d3.layout.pie()         
	    .value(function(d) { return d.value; });    
	var arcs = vis.selectAll("g.slice")   
	    .data(pie)                         
	    .enter()                          
	        .append("svg:g")               
	            .attr("class", "slice");   
	    arcs.append("svg:path")
	            .attr("fill", function(d, i) { return color(i); } )
	            .attr("d", arc);                                   
	    arcs.append("svg:text")                                    
	            .attr("transform", function(d) {               
	         
	            d.innerRadius = 0;
	            d.outerRadius = r;
	            return "translate(" + arc.centroid(d) + ")";     
	        })
	        .attr("text-anchor", "middle")                      
	        .text(function(d, i) { return data[i].label; });      


  ////////////////////////////////////////////
  //             Bar Chart                 //
  //////////////////////////////////////////
      
    py = Math.round((py/total)*100)
    java = Math.round((java/total)*100)
    hs = Math.round((hs/total)*100)
    noData = Math.round((noData/total)*100)
    other = Math.round((other/total)*100)

    data = [{"label":"Python", "value":py}, 
          {"label":"Java", "value":java}, 
          {"label":"Haskell", "value":hs},
          {"label":"Other","value":other},
          {"label":"Null","value":noData}];


    var data_max = 80,
    num_ticks = 5,
    left_margin = 60,
    right_margin = 60,
    top_margin = 30,
    bottom_margin = 0;
    var w = 500,                        //width
        h = 500,                        //height
        color = function(id) { return '#00b3dc' };
    var x = d3.scale.linear()
        .domain([0, data_max])
        .range([0, w - ( left_margin + right_margin ) ]),
        y = d3.scale.ordinal()
        .domain(d3.range(data.length))
        .rangeBands([bottom_margin, h - top_margin], .5);
    var chart_top = h - y.rangeBand()/2 - top_margin;
    var chart_bottom = bottom_margin + y.rangeBand()/2;
    var chart_left = left_margin;
    var chart_right = w - right_margin;
    /*
     *  Setup the SVG element and position it
     */
    var vis = d3.select("body")
        .append("svg:svg")
            .attr("width", w)
            .attr("height", h)
        .append("svg:g")
            .attr("id", "barchart")
            .attr("class", "barchart")
    //Ticks
    var rules = vis.selectAll("g.rule")
        .data(x.ticks(num_ticks))
    .enter()
        .append("svg:g")
        .attr("transform", function(d)
                {
                return "translate(" + (chart_left + x(d)) + ")";});
    rules.append("svg:line")
        .attr("class", "tick")
        .attr("y1", chart_top)
        .attr("y2", chart_top + 4)
        .attr("stroke", "black");
    rules.append("svg:text")
        .attr("class", "tick_label")
        .attr("text-anchor", "middle")
        .attr("y", chart_top)
        .text(function(d)
        {
        return d;
        });
    var bbox = vis.selectAll(".tick_label").node().getBBox();
    vis.selectAll(".tick_label")
    .attr("transform", function(d)
            {
            return "translate(0," + (bbox.height) + ")";
            });
    var bars = vis.selectAll("g.bar")
        .data(data)
    .enter()
        .append("svg:g")
            .attr("class", "bar")
            .attr("transform", function(d, i) { 
                    return "translate(0, " + y(i) + ")"; });
    bars.append("svg:rect")
        .attr("x", right_margin)
        .attr("width", function(d) {
                return (x(d.value));
                })
        .attr("height", y.rangeBand())
        .attr("fill", color(0))
        .attr("stroke", color(0));
    //Labels
    var labels = vis.selectAll("g.bar")
        .append("svg:text")
            .attr("class", "label")
            .attr("x", 0)
            .attr("text-anchor", "right")
            .text(function(d) {
                    return d.label;
                    });
    var bbox = labels.node().getBBox();
    vis.selectAll(".label")
        .attr("transform", function(d) {
                return "translate(0, " + (y.rangeBand()/2 + bbox.height/4) + ")";
                });
    labels = vis.selectAll("g.bar")
        .append("svg:text")
        .attr("class", "value")
        .attr("x", function(d)
                {
                return x(d.value) + right_margin + 10;
                })
        .attr("text-anchor", "left")
        .text(function(d)
        {
        return "" + d.value + "%";
        });
    bbox = labels.node().getBBox();
    vis.selectAll(".value")
        .attr("transform", function(d)
        {
            return "translate(0, " + (y.rangeBand()/2 + bbox.height/4) + ")";
        });
    //Axes
    vis.append("svg:line")
        .attr("class", "axes")
        .attr("x1", chart_left)
        .attr("x2", chart_left)
        .attr("y1", chart_bottom)
        .attr("y2", chart_top)
        .attr("stroke", "black");
     vis.append("svg:line")
        .attr("class", "axes")
        .attr("x1", chart_left)
        .attr("x2", chart_right)
        .attr("y1", chart_top)
        .attr("y2", chart_top)
        .attr("stroke", "black");




