
   "use strict";
$(window).load(function() {

    
    // Mobile menu
    $(".mobile-menu ul.menu > li.menu-item-has-children").each(function(index) {
	
        var menuItemId = "mobile-menu-submenu-item-" + index;
        $('<button class="dropdown-toggle collapsed" data-toggle="collapse" data-target="#' + menuItemId + '"></button>').insertAfter($(this).children("a"));
        
        $(this).children("ul").prop("id", menuItemId);
        $(this).children("ul").addClass("collapse");

        $("#" + menuItemId).on("show.bs.collapse", function() {
		
            $(this).parent().addClass("open");
        });
        $("#" + menuItemId).on("hidden.bs.collapse", function() {
		
            $(this).parent().removeClass("open");
        });
    });

    // third level menu position to left
    function fixPositionSubmenu() {
	
        $("#main-menu .menu li.menu-item-has-children > ul, .ribbon ul.menu.mini").each(function(e) {
		
            if ($(this).closest(".megamenu").length > 0) {
                return;
            }
            var leftPos = $(this).parent().offset().left + $(this).parent().width();
            if (leftPos + $(this).width() > $("body").width()) {
                $(this).addClass("left");
            } else {
                $(this).removeClass("left");
            }
        });
    }
    fixPositionSubmenu(); 
});

// mega menu
var megamenu_items_per_column = 6;
function fixPositionMegaMenu(parentObj) {

    if (typeof parentObj == "undefined") {
        parentObj = "";
    } else {
        parentObj += " ";
    }
    $(parentObj + ".megamenu-menu").each(function() {
	
        var paddingLeftStr = $(this).closest(".container").css("padding-left");
        var paddingLeft = parseInt(paddingLeftStr, 10);
        var offsetX = $(this).offset().left - $(this).closest(".container").offset().left - paddingLeft;
        if (offsetX == 0) { return; }
        $(this).children(".megamenu-wrapper").css("left", "-" + offsetX + "px");
        $(this).children(".megamenu-wrapper").css("width", $(this).closest(".container").width() + "px");
        if (typeof $(this).children(".megamenu-wrapper").data("items-per-column") != "undefined") {
            megamenu_items_per_column = parseInt($(this).children(".megamenu-wrapper").data("items-per-column"), 10);
        }
        //$(this).children(".megamenu-wrapper").show();
        var columns_arr = new Array();
        var sum_columns = 0;
        $(this).find(".megamenu > li").each(function() {
		
            var each_columns = Math.ceil($(this).find("li > a").length / megamenu_items_per_column);
            if (each_columns == 0) {
                each_columns = 1;
            }
            columns_arr.push(each_columns);
            sum_columns += each_columns;
        });
        $(this).find(".megamenu > li").each(function(index) {
		
            $(this).css("width", (columns_arr[index] / sum_columns * 100) + "%");
            $(this).addClass("megamenu-columns-" + columns_arr[index]);
        });

        $(this).find(".megamenu > li.menu-item-has-children").each(function(index) {
		
            if ($(this).children(".sub-menu").length < 1) {
                $(this).append("<ul class='sub-menu'></ul>");
                for (var j = 0; j < columns_arr[index]; j++) {
                    $(this).children(".sub-menu").append("<li><ul></ul></li>")
                }
                var lastIndex = $(this).children("ul").eq(0).children("li").length - 1;
                $(this).children("ul").eq(0).children("li").each(function(i) {
				
                    var parentIndex = Math.floor(i / megamenu_items_per_column);
                    $(this).closest("li.menu-item-has-children").children(".sub-menu").children("li").eq(parentIndex).children("ul").append($(this).clone());
                    if (i == lastIndex) {
                        $(this).closest(".menu-item-has-children").children("ul").eq(0).remove();
                    }
                });
            }
        });
        $(this).children(".megamenu-wrapper").show();
    });
}
fixPositionMegaMenu();

// menu position to top
$("#footer #main-menu .menu >  li.menu-item-has-children").each(function(e) {

    var height = $(this).children("ul, .megamenu-wrapper").height();
    $(this).children("ul, .megamenu-wrapper").css("top", "-" + height + "px");
});



// THIS SCRIPT DETECTS THE ACTIVE ELEMENT AND ADDS ACTIVE CLASS (This should be removed in the php version.)
$(document).ready(function(){
	
    var pathname = window.location.pathname,
        page = pathname.split(/[/ ]+/).pop(),
        menuItems = $('#main-menu a, #mobile-primary-menu a');
    menuItems.each(function(){
	"use strict";
        var mi = $(this),
            miHrefs = mi.attr("href"),
            miParents = mi.parents('li');
        if(page == miHrefs) {
            miParents.addClass("active").siblings().removeClass('active');
        }
    });
});