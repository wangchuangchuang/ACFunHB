/**
 * Created by junjiewan on 15/11/16.
 */
$(function(){
    $(".input-select-list ul li").click(function(){
        $(this).siblings("li").removeClass("selected");
        $(this).addClass("selected");
    });
    $(".input-select-list .determine").click(function(){
        var getVal = $(this).siblings("ul").find(".selected").text();
        $(".buyback-bottom .input-select .val").html(getVal);
        $(this).parent().hide();
    });

    $(".buyback-bottom .input-select em").click(function(){
        $(".input-select-list").show();
    });

    $(".buyback-agreement-content .close").click(function () {
        $(this).parent().hide();
    });

    $(".buyback-bottom .agreement a").click(function () {
        $(".buyback-agreement-content").show();
    })

});