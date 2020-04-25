//global variable
var index = [];

//form popup 
$(".input").click(function () {
    var num = (this.id).slice(5, 6);
    index = (this.id).split('t')[1];
    window.location = 'project'.concat(num, '#popup1');
});

//form submit
$("#my_form").submit(function (event) {
    event.preventDefault(); //prevent default action 
    var post_url = $(this).attr("action"); //get form action url
    var request_method = $(this).attr("method"); //get form GET/POST method
    var form_data = decodeURIComponent($(this).serialize()); //Encode form elements for submission
    var data = [];
    var code = document.getElementById('projectCode').innerText;
    var tag = 'content'.concat(index);

    //data transfromation for ajax (from form data)
    function extract(n) {
        if (n > 5) {
            var res = form_data.substring(
                form_data.indexOf("=") + 1);
            data[5] = (res);
            return
        };
        var res = form_data.substring(
            form_data.indexOf("=") + 1,
            form_data.indexOf("&")
        );
        data.push(res);
        form_data = form_data.slice(form_data.indexOf("&") + 1);
        extract(n + 1);
    }
    extract(0)

    //ajax post
    $.ajax({
        type: request_method,
        url: post_url,
        data: {
            code: code,
            url: data[1],
            sheetname: data[2],
            tabSequence: data[4],
            tag: tag,
            api: data[5],
            range: data[3],
            title: data[0],
        },
    }).done(function (response) { //
        $("#server-results").html(response);
    });

    //alert msg 
    alert('submit successfully!')
    location.href = '#';
    location.reload();

});



