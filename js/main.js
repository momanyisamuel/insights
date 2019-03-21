$(function() {
    $('input[name="datetimes"]').daterangepicker({
      timePicker: true,
      startDate: moment().startOf('hour'),
      endDate: moment().startOf('hour').add(32, 'hour'),
      locale: {
        format: 'M/DD hh:mm A'
      }
    });

    var datagraph = {
        title: "Mobile Banking",
        description: "Amount over time period",
        chart_type:'point',
        full_width: true,
        height: 300,
        right: 40,
        x_extended_ticks: true,
        target: document.getElementById('confidence_band'),
        x_accessor: 'date',
        y_accessor: 'value',
        interpolate: 'linear'
    }

    $('input[name="datetimes"]').daterangepicker();

    $('input[name="datetimes"]').on('apply.daterangepicker', function(ev, picker) {
    
    var data = [
        {
          "date": "3/13/19 10:37 AM",
          "value": 200000
        },
        {
          "date": "3/13/19 11:56 AM",
          "value": 70000
        },
        {
          "date": "3/13/19 10:14 AM",
          "value": 70000
        },
        {
          "date": "3/13/19 10:37 AM",
          "value": 69200
        },
        {
          "date": "3/13/19 10:57 AM",
          "value": 60000
        },
        {
          "date": "3/13/19 11:48 AM",
          "value": 50000
        },
        {
          "date": "3/13/19 10:54 AM",
          "value": 50000
        }
    ];
    var fromTime = new Date(picker.startDate.format('YYYY-MM-DD')).getTime();
    var toTime = new Date(picker.endDate.format('YYYY-MM-DD')).getTime();
    console.log(picker.startDate.format('YYYY-MM-DD'));
    console.log(picker.endDate.format('YYYY-MM-DD'));

    var filteredDates = [];
    var row, date;

    for(var i = 0; i < data.length; i++) {

        row = data[i];
        date = new Date(row.date);
        
        if (date.getTime() >= fromTime && date.getTime() <= toTime) {
            filteredDates.push(row.date);
        }
    }

    var results = document.querySelector("#results");
    results.innerHTML = JSON.stringify(filteredDates);

    });

  });


    // d3.json('../data/newdata.json', function(data) {
    //     console.log(data)
    //     var newdata = []

    //     for(var i =0; i < data.length; i++) {

    //         // console.log(data[i].eventreceivetime)
    //         var date = MG.convert.date(data[i], 'date')
    //         // var date = new Date (data[i].eventreceivetime)
    //         // var dateString = date.getUTCFullYear() +"-"+ (date.getUTCMonth()+1) +"-"+ date.getUTCDate() + " " + date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();
    //         // console.log(dateString)
    //         newdata.push({"date":date,"amount":data[i].amount})
    //         // console.log(data[i])   
    //     }
    //     // newdata.sort(function compare(a, b) {
    //     //     var dateA = new Date(a.date);
    //     //     var dateB = new Date(b.date);
    //     //     return dateA - dateB;
    //     // });
    //     console.log(newdata)

    //     // console.log(newdata)
    //     // data = MG.convert.date(data, 'date');
    //     // console.log(data[2].eventreceivetime)
    //     // MG.data_graphic({
    //     //     title: "Line Chart",
    //     //     description: "This is an example of a graphic with a confidence band and extended x-axis ticks enabled.",
    //     //     data: newdata,
    //     //     format: 'percentage',
    //     //     width: 600,
    //     //     height: 200,
    //     //     right: 40,
    //     //     area: false,
    //     //     target: '#confidence_band',
    //     //     show_secondary_x_label: false,
    //     //     show_confidence_band: ['amount', 'date'],
    //     //     x_extended_ticks: true
    //     // });
        
    //     MG.data_graphic({
    //         title: "Line Chart",
    //         description: "This is a simple line chart. You can remove the area portion by adding area: false to the arguments list.",
    //         data: newdata,
    //         width: 800,
    //         height: 400,
    //         right: 40,
    //         target: document.getElementById('confidence_band'),
    //         x_accessor: 'date',
    //         y_accessor: `amount`
    //     });
    // });


    d3.json('data/newdata.json', function(data) {
        var newData = []
        for(var i = 0; i < data.length; i++) {
            console.log(data[i])
            // var date = MG.convert.date(data[i], 'date', '%Y/%m/%d %H:%M %p');
            
            var date = new Date (data[i].date)
            newData.push({"date":date,"value":data[i].value})
        }
        console.log(newData)
        MG.data_graphic({
            title: "Preserving the aspect ratio",
            description: "You can automatically set the width or height of a data graphic to fit its parent element. When done the graphic will rescale to fit the size of the parent element while preserving its aspect ratio.",
            data: newData,
            chart_type:'point',
            full_width: true,
            height: 300,
            right: 40,
            x_extended_ticks: true,
            target: document.getElementById('confidence_band'),
            x_accessor: 'date',
            y_accessor: 'value',
            interpolate: 'linear'
        });
    });