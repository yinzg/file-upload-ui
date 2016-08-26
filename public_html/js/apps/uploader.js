$(".fileName").bind("GET-FILESIZE", function () {

});
function fileSelected2() {
    var file = document.getElementById("image_file2").files;
    var fileName = file[0].name;
    var fileType = file[0].type;
    var fileSize = file[0].size;
    var width = $(".file-select-view").width();
    console.log(fileName)
    console.log(fileType)
    console.log(fileSize)

    $(".process-view").css("display", "block");
    $(".file-cancle").css("display", "block");
    $(".process-bar").css("width", width);
    $(".fileName").text(fileName);
}

$("#image_file2").click(function () {
    $.ajax({
        type: 'get',
        url: "resp.json",
        success: function (data, textStatus, jqXHR) {
            if (textStatus === "success") {

                console.log("upload success")
            }
        }
    });
});

$(".upload").click(function () {
    console.log($("#image_file2").val())
    $(".process-bar").css("background-color", "green");
});
$(".file-cancle").click(function () {
    $(".process-view").css("display", "none");
});