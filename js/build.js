$(function() {

    //initialize date picker
    $('input[name="datetimes"]').daterangepicker({
        timePicker: true,
        startDate: moment().startOf('hour'),
        endDate: moment().startOf('hour').add(32, 'hour'),
        locale: {
            format: 'MM/DD/YYYY h:mm'
        },
        showDropdowns: true,
        drops: "down"
    });

    // initialize graph object
    var datagraph = {
        title: "Mobile Banking",
        description: "",
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
    var newData = []
    var amounts = []
   
    //pass data to graph object
    d3.json('data/newdata.json', function(data) {
        
        for(var i = 0; i < data.length; i++) {
            
            row = data[i]
            var date = new Date (row.date)
            newData.push({"date":date,"value":row.value})
            amounts.push(row.value)
        }
        // console.log(newData)
        datagraph.data = newData 
        MG.data_graphic(datagraph);

        var results = document.querySelector("#results");
        var amount = getTotals(amounts)
        results.innerHTML = "KSHS" + " " + addCommas(amount);

    });
 

    $('input[name="datetimes"]').on('apply.daterangepicker', function(ev, picker) {

        var fromTime = new Date(picker.startDate.format('MM/DD/YYYY h:mm')).getTime();
        var toTime = new Date(picker.endDate.format('MM/DD/YYYY h:mm')).getTime();
        // console.log(picker.startDate.format('M/DD/Y hh:mm A'));
        // console.log(picker.endDate.format('M/DD/Y hh:mm A'));

        var filteredDates = [];
        filteredAmounts = []
        var row, datepick;

        for(var i = 0; i < newData.length; i++) { 

            console.log(newData[i])

            row = newData[i]
            datepick = row.date
            
            console.log(datepick);

            if (datepick.getTime() >= fromTime && datepick.getTime() <= toTime) {
                filteredDates.push({"date":datepick,"value":row.value})
                filteredAmounts.push(row.value)
            }
        }
        var results = document.querySelector("#results");
        var totalAmount = getTotals(filteredAmounts)
        results.innerHTML = "KSHS" + " " + addCommas(totalAmount);

        delete datagraph.xax_formart
        delete datagraph.yax_format
        datagraph.data = filteredDates
        MG.data_graphic(datagraph);
    });

    function getTotals(data) {
        var total = 0;
        for(var i = 0 ; i < data.length; i++){
          total = total + data[i]/1;
        }
        return total.toFixed(0)
    }

    function addCommas(nStr) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

});

