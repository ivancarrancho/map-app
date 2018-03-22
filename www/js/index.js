
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

var x = 0;
var y = 0;
$('.coordinates').append($('<div class="data"><input required class="x'+ x +' app-x" type="number" step="any" placeholder="X"><input required class="y' + y + ' app-y" type="number" step="any" placeholder="Y"></div>'));
$('.new').on('click', function (){
    x++;
    y++;
    $('.coordinates').append($('<div class="data"><input required class="x'+ x +' app-x" type="number" step="any" placeholder="X"><input required class="y' + y + ' app-y" type="number" step="any" placeholder="Y"></div>'));
    if ($('.app-x').length == 3) {
        $('.calculate').removeClass('hide');
    }
});

$(".coordinates_form").submit(function(e) {
    e.preventDefault();
    var aux = 0;
    var x_arr = []
    var y_arr = []
    for (var i = $('.app-x').length; i > 0; i--) {
        data_x = $('.x'+aux).val();
        data_y = $('.y'+aux).val();

        if (!data_x == NaN || !data_x == '') {
            x_arr.push(parseFloat(data_x));
            y_arr.push(parseFloat(data_y));
            aux++;
        }
    }
    calculate(x_arr, y_arr)
});
    function calculate(x_arr, y_arr) {
        var total_x = 0;
        var total_y = 0;
        var total_z = 0;
        var a = 0;
        var b = 1;
        console.log(y_arr.length)
        for (var i = x_arr.length; i > 1; i--) {
            total_x = (x_arr[a] * y_arr[b]) + total_x
            console.log('multx ' + x_arr[a] * y_arr[b] + ' ' + a + ' ' + b);
            a++;
            b++;
        }
        total_x = (x_arr[a] * y_arr[0]) + total_x
        console.log('multx ' + x_arr[a] * y_arr[0] + ' ' + a + ' ' + 0);

        a = 1;
        b = 0;
        for (var i = y_arr.length; i > 1; i--) {
            total_y = (x_arr[a] * y_arr[b]) + total_y
            console.log('multy ' + x_arr[a] * y_arr[b] + ' ' + a + ' ' + b);
            a++;
            b++;
        }
        total_y = (x_arr[0] * y_arr[b]) + total_y
        console.log('multy ' + x_arr[0] * y_arr[b] + ' ' + 0 + ' ' + b + ' ' + x_arr[0] +' '+' '+ y_arr[b]);
        console.log(total_x + ' ' + total_y)
        total_z = (total_x - total_y) / 2
        $('.hide').removeClass('hide');
        $('.result').text(total_z + ' Kms 2').removeClass('hide');
    }