$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Did you fill in the form properly?");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


function submitForm() {
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var msg_subject = $("#msg_subject").val();
    var message = $("#message").val();


    $.ajax({
        type: "POST",
        url: "https://prod-18.australiasoutheast.logic.azure.com:443/workflows/5ce213cf65654eaab7e917e42dd04ab0/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=TsgSV3atFiFIlAmHuGhNW2c1Ox0Y_jwyhInkudgsUtk",
        contentType: "application/json",
        data: JSON.stringify({ name: name, email: email, msg_subject: msg_subject, message: message }),
        dataType: "text",
        success: function (text) {
            formSuccess();
        },
        error: function (err) {
            formError();
            submitMSG(false, text);
        }
    });
}

function formSuccess() {
    $("#contactForm")[0].reset();
    submitMSG(true, "Message sent, we'll be in touch")
}

function formError() {
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass();
    });
}

function submitMSG(valid, msg) {
    if (valid) {
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}