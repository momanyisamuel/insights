data = ["batman","thor","superman","spiderman","ironman"];

table = d3.select("#content").append("table").property("border","1px");
d3.selectAll(".myCheckbox").on("change",update);
update();

function update(){
    var choices = [];
    d3.selectAll(".myCheckbox").each(function(d){
      cb = d3.select(this);
      if(cb.property("checked")){
        choices.push(cb.property("value"));
      }
    });
  
    if(choices.length > 0){
      newData = data.filter(function(d,i){return choices.includes(d);});
    } else {
      newData = data;     
    } 
    
    newRows = table.selectAll("tr")
        .data(newData,function(d){return d;});
    newRows.enter()
      .append("tr")
      .append("td")
      .text(function(d){return d;});    
    newRows.exit()
      .remove();      
}