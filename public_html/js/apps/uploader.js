var uploader = function ($) {

    var showFileSize;
    var fileCache = {};

    /**
     * 获取文件大小并转换成KB或MB
     * @param {type} byteSize:文件原始大小
     * @returns {String}:文件换算单位后的大小
     */
    var convertFileSize = function (byteSize) {
        var fileSize = (byteSize / 1024).toFixed(2);
        var unit = 'KB';
        if (fileSize > 1024) {
            fileSize = (fileSize / 1024).toFixed(2);
            unit = 'MB';
        }
        return {
            size: fileSize,
            unit: unit
        };
    };

    /**
     *验证文件类型是否匹配
     * @param {type} type
     */
    var isRequiredTypeImage = function (type) {
        switch (type) {
            case 'image/jpeg':
            case 'image/jpg':
            case 'image/png':
            case 'image/bmp':
                return true;
            default:
                return false;
        }
    };

    /**
     * 选择文件事件
     */
    $("#image_file2").change(function () {
        fileCache = document.getElementById('image_file2').files;
        var fileName = fileCache[0].name;
        var fileType = fileCache[0].type;
        var fileSize = fileCache[0].size;

        $('.file-name').trigger('GET-FILESIZE', {size: fileSize});
        $('.file-name').trigger('GET-FILETYPE', {type: fileType});
        var panelStyle = {
            'display': 'block',
            'border': 'solid 1px #E5E5E5',
            'padding': '10px'
        };
        $('.file-info-panel').css(panelStyle);
        $('.file-cancle').append('<a href="javascript:void(0)"></a>');
        $('.file-cancle').addClass('file-close');

        $('.file-name').text(fileName + "(" + showFileSize.size.toString() + showFileSize.unit + ")");
    });

    /**
     * 点击上传按钮事件
     */
    $('.upload').click(function () {
        if ($.isEmptyObject(fileCache)) {
            $('.file-name').trigger('NOT-SELECTED-FILE');
        } else {
            $.ajax({
                type: 'get',
                url: 'resp.json',
                success: function (data, textStatus, jqXHR) {
                    if (textStatus === 'success') {
                        var width = $('.file-select-view').width() - 20;
                        var barStyle = {
                            'width': width,
                            'background-color': 'green',
                            'transition': 'background-color 2s ease,width 2s ease',
                            '-webkit-transition': 'background-color 2s ease,width 2s ease'
                        };
                        $('.process-bar').css(barStyle);
                        setTimeout(function () {
                            $('.upload-status').text("上传完成！");
                            console.log('upload success');
                        }, 2000);

                        setTimeout(function () {
//                            $(".file-info-panel").fadeOut(300);
                            $('.file-cancle').trigger('CLOSE-FILE-INFO-PANEL');
                            var barStyle = {
                                'background-color': '#E5E5E5',
                                'width': 0
                            };
                            $('.process-bar').css(barStyle);
                            $('.upload-status').text('');
                        }, 3000);
                    }
                }
            });
            fileCache = {};
        }
    });

    /**
     * 点击文件信息窗口关闭按钮事件
     */
    $('.file-cancle').click(function () {
        $('.file-cancle').trigger('CLOSE-FILE-INFO-PANEL');
    });

    /**
     * 添加自定义事件：关闭文件信息窗口
     */
    $('.file-cancle').bind('CLOSE-FILE-INFO-PANEL', function () {
        $('.file-info-panel').fadeOut(500);
    });

    /**
     * 添加自定义事件：是否选择文件
     */
    $('.file-name').bind('NOT-SELECTED-FILE', function () {
        alert("请选择文件后点击上传！");
    });

    /**
     * 添加自定义事件：换算文件大小单位，并判断文件是否大于指定大小
     */
    $('.file-name').bind('GET-FILESIZE', function (evt, param) {
        console.log('get file size:' + param.size);
        var fileSize = convertFileSize(param.size);
        showFileSize = fileSize;
        if (fileSize.unit === 'MB' && fileSize.size > 5) {
            alert("图片大小超过5M！");
        }
    });

    /**
     * 添加自定义事件：匹配文件类型
     */
    $('.file-name').bind('GET-FILETYPE', function (evt, param) {
        console.log('get file type:' + param.type);
        if (!isRequiredTypeImage(param.type)) {
            fileCache = {};
            alert("请上传jpeg、jpg、png、bmp格式的图片！");
        }
    });

}(jQuery);


