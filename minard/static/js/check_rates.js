function linspace(min, max, N) {
    var a = [];
    for (var i=0; i < N; i++) {
        a[i] = min + (max-min)*i/(N-1);
    }
    return a;
}

var xsnoed1 = ["#4876ff","#32cd32","#ffff00","#ffa500"],
    xsnoed2 = ["#3a5fcd","#2e8b57","#cd9b1d","#ffa500"];

var color_scales = {};
color_scales.xsnoed1 = xsnoed1;
color_scales.xsnoed2 = xsnoed2;
for (var key in colorbrewer) {
    color_scales[key] = colorbrewer[key][5];
}

color_scales = d3.entries(color_scales);

var color_scale_cmos = d3.scale.linear()
    .domain(linspace(0,20000,20))
    .range(color_scales[12].value);

var color_scale_base = d3.scale.linear()
    .domain(linspace(60,120,5))
    .range(color_scales[12].value);

var crate = crate_view();
var crate_cmos = crate_view().scale(color_scale_cmos);
var crate_base = crate_view().scale(color_scale_base);

var card_cmos = card_view().scale(color_scale_cmos).format(my_si_format);
var card_base = card_view().scale(color_scale_base).format(base_format);

function setup() {

    // set up crate view
    d3.select("#crateY").datum([]).call(crate);

 
    // set up crate view
    d3.select("#crateX").datum([]).call(crate);

    // Default values
    update('cmos', 0);
    update('base', 0);
    update_crate('cmos', 0, 0);
    update_crate('base', 0, 0);
}

function update(dtype, run_number) {
    $.getJSON($SCRIPT_ROOT + '/query_polling', 
              { type: dtype, run: run_number }).done(function(result) {

        values = result.values;

        if(dtype == "cmos"){
            d3.select('#crateY').datum(values).call(crate_cmos);
        }
        else if(dtype == "base"){
            d3.select('#crateX').datum(values).call(crate_base);
        }
    });
}

function update_crate(dtype, run_number, c) {
    $.getJSON($SCRIPT_ROOT + '/query_polling_crate',
              { type: dtype, run: run_number, crate: c }).done(function(result) {

        values = result.values;

        if(dtype == "cmos"){
            d3.select('#card1').datum(values).call(card_cmos);
        }
        else if(dtype == "base"){
            d3.select('#card2').datum(values).call(card_base);
        }
    });
}

