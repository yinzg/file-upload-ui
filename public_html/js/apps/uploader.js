var uploader = function ($) {

    /**
     * 获取文件大小并转换成KB或MB
     * @param {type} byteSize:文件原始大小
     * @returns {String}:文件换算单位后的大小
     */
    var dealFileSize = function (byteSize) {
        var fileSize = Math.round(byteSize / 1024);
        var suffix = 'KB';
        if (fileSize > 1000) {
            fileSize = Math.round(byteSize / 1000);
            suffix = 'MB';
        }
        return fileSize.toString() + suffix;
    };

    /**
     *验证文件类型是否匹配
     * @param {type} type
     */
    var dealFileType = function (type) {

    };

    /**
     * 选择文件事件
     */
    $("#image_file2").change(function () {
        var file = document.getElementById('image_file2').files;
        var fileName = file[0].name;
        var fileType = file[0].type;
        var fileSize = file[0].size;
        var width = $('.file-select-view').width();

        $('.fileName').trigger('GET-FILESIZE', {size: fileSize});
        $('.fileName').trigger('GET-FILETYPE', {type: fileType});

        $('.process-view').css('display', 'block');
        $('.file-cancle').css('display', 'block');
        $('.process-bar').css('width', width);
        $('.fileName').text(fileName + "(" + fileSize + ")");
    });


    $('#image_file2').click(function () {
        $.ajax({
            type: 'get',
            url: 'resp.json',
            success: function (data, textStatus, jqXHR) {
                if (textStatus === 'success') {
                    console.log('upload success')
                }
            }
        });
    });
    $('.upload').click(function () {
        console.log($('#image_file2').val())
        $('.process-bar').css('background-color', 'green');
    });
    $('.file-cancle').click(function () {
        $('.process-view').css('display', 'none');
    });

    $('.fileName').bind('GET-FILESIZE', function (evt, param) {
        console.log('get file size:' + param.size);
        var showFileSize = dealFileSize(param.size);
    });
    $('.fileName').bind('GET-FILETYPE', function (evt, param) {
        console.log('get file type:' + param.type);
        var showFileSize = dealFileSize(param.type);
    });

    return{
    };
}(jQuery);


