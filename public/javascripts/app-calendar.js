
$.get("/user", function (data, status) {

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


    var calendarEl = document.getElementById('calendar');
    var myData = [];


    for (i = 5; i < 100; i++) {
        //find in between substring
        name = "name".concat(i).concat('>(.*)</td>');
        from = "from".concat(i).concat('>(.*)</td>');
        to = "to".concat(i).concat('>(.*)</td>');

        var nameStr = data.match(name);
        var fromStr = data.match(from);
        var toStr = data.match(to);
        if (nameStr !== null) {
            var obj = {
                title: nameStr[1],
                start: fromStr[1],
                end: toStr[1],
                color: getRandomColor()
            };
            myData.push(obj);
        };
    }
    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['interaction', 'dayGrid'],
        editable: true,
        events: myData
    });
    calendar.render();
});


