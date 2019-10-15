// 引入css样式
import '../css/reset.css';
import '../css/list.css';
import '../webfont/iconfont.css';
import '../css/meituanIndex.css';

import $ from 'jquery';
window.$ = $;

function getData() {
    var url = 'http://localhost:1111/api/list.json';
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: url,
        success: function (data) {
            addList(data);
        },
        error: function () {
            alert('error');
        }
    });
}
getData();

function addList(data) {
    var str = '';
    data.list.forEach(function (ele, index) {
        str += '<li class="foodspic">\
                    <a href = "http://localhost:1111/detail.html?id=' + ele.id + '" class="clearfix">\
                        <img src="'+ ele.info.imgurl + '" alt="">\
                        <dl>\
                            <dt>'+ ele.info.name + '</dt>\
                            <dd>\
                                <p class="foodtitle">'+ ele.info.des + '</p>\
                                <p class="price">\
                                    <span><strong>'+ ele.info.price + '</strong><i>元</i></span>\
                                    <span>'+ ele.info.newUser + '</span>\
                                    <span>'+ ele.info.sale + '</span>\
                                </p>\
                            </dd>\
                        </dl>\
                    </a>\
                </li>'
    });
    $('.guess-foodlist .list').html(str);
}

// 回到顶部
$(window).on('scroll', function () {
    var top = $(window).scrollTop();
    if (top > 500) {
        $('#gotop').slideDown();
    } else {
        $('#gotop').slideUp();
    }
});

// 点击跳转
$('#gotop').click(function () {
    $('html,body').animate({scrollTop: 0},800,'swing',function () {
        console.log('ok');
    });
});