var is_touch_device = !!('ontouchstart' in window);

/* Check Local Storage for the animation style */
var animationStyle = "slideLeft";
var temp_AnimateInOpposite = false;
if (localStorage)
{
    if ( localStorage.getItem('animationStyle') != null ) animationStyle = localStorage.getItem('animationStyle');
    if ( localStorage.getItem('temp_AnimateInOpposite') == "true" ) temp_AnimateInOpposite = true;
    localStorage.setItem('temp_AnimateInOpposite', "false" );
}

var filesystemapisupport = false;
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
if (window.requestFileSystem)
{
    window.requestFileSystem(window.TEMPORARY, 5*1024*1024, function(fs){
        console.log('Filesystem API support!');
        filesystemapisupport = true;
    }, function(){
        console.log('No Filesystem API support');
    });
}
else
{
        console.log('No Filesystem API support');
}


/* About Modal */
include("js/about.js", function()
{
    $("#aboutcontainer").append(aboutModalHTML);
    $('#aboutdialog').modal({
        keyboard: true,
        show: false
    });
});


$(window).bind("unload", function() { }); // need this to fix firefox back() issue
$(document).ready(function()
{
    /* disable context menu */
    $(document).bind("contextmenu",function(e){
        return false;
    });

    /* if not an internal link, add the transition ability */
    $("a").each(function(){
        if (!isEmpty($(this).attr('href')))
        {
            if ($(this).attr('href')[0] != '#')
            {
                $(this).addClass("transition");
            }
        }
    });

    /* Animate In */
    if ( (temp_AnimateInOpposite && animationStyle == "slideLeft" ) || (!temp_AnimateInOpposite && animationStyle == "slideRight" ) )
    {
        $(".main").width($(".main").width());
        $(".main").css("display", "block");
        var originalMargin = $(".main").css("margin-left");
        $(".main").css("margin-left", -$(document).width() );
        $(".main").animate({ 'margin-left': originalMargin }, 500, "", function(){ $(".main").css("margin-left", ""); });
    }
    else if ( (temp_AnimateInOpposite && animationStyle == "slideRight") || (!temp_AnimateInOpposite && animationStyle == "slideLeft" ) )
    {
        $(".main").width($(".main").width());
        $(".main").css("display", "block");
        var originalMargin = $(".main").css("margin-left");
        $(".main").css("margin-left", $(document).width());
        $(".main").animate({ 'margin-left': originalMargin }, 500, "", function(){ $(".main").css("margin-left", ""); });
    }
    else if ( (temp_AnimateInOpposite && animationStyle == "slideDown") || (!temp_AnimateInOpposite && animationStyle == "slideUp"))
    {
        $(".main").width($(".main").width());
        $(".main").css("display", "block");
        var originalMargin = $(".main").css("margin-top");
        $(".main").css("margin-top", $(document).width() );
        $(".main").animate({ 'margin-top': originalMargin }, 500, "", function(){ $(".main").css("margin-top", ""); });
    }
    else if ( (temp_AnimateInOpposite && animationStyle == "slideUp") || (!temp_AnimateInOpposite && animationStyle == "slideDown"))
    {
        $(".main").width($(".main").width());
        $(".main").css("display", "block");
        var originalMargin = $(".main").css("margin-top");
        $(".main").css("margin-top", -$(document).width() );
        $(".main").animate({ 'margin-top': originalMargin }, 500, "", function(){ $(".main").css("margin-top", ""); });

    }
    else if (animationStyle == "fade")
    {
        $(".main").fadeIn(500);

    }
    else
    {
        $(".main").css("display", "block");
    }

    $(".main").width("auto");

    $("a.transition").click(function(event){
        event.preventDefault();

        if ($(this).hasClass("back"))
        {
            NavigateTo("#back");
        }
        else if ($(this).hasClass("oppositeAnimation"))
        {
            NavigateTo(this.href, true);
        }
        else
        {
            NavigateTo(this.href);
        }
    });

    $('form').submit(function (event) {
        var form = this;
        event.preventDefault();
        var delay = 500; // milliseconds
        if ($(this).hasClass("oppositeAnimation"))
        {
            delay = NavigateTo(null, true);
        }
        else
        {
            delay = NavigateTo();
        }
        setTimeout(function () {
            form.submit();
        }, delay); // in milliseconds
    });
});

function isEmpty(obj) {
    if (typeof obj == 'undefined' || obj === null || obj === '') return true;
    if (typeof obj == 'number' && isNaN(obj)) return true;
    if (obj instanceof Date && isNaN(Number(obj))) return true;
    return false;
}

function redirectPage(url, delay) {
    if (url == null) return;
    if (url == "#back")
    {
        console.log("going back...");
        setTimeout("window.history.back()", delay);
    }
    else
    {
        console.log("going to " + url);
        setTimeout("window.location =  '" + url + "'", delay);
    }
}

function NavigateTo(url, oppositeAnimation)
{
    var delay = 500; // milliseconds
    if (oppositeAnimation)
    {
        if (localStorage)
        localStorage.setItem('temp_AnimateInOpposite', "true" );
    }

    $(".main").width($(".main").width());

    if ((!oppositeAnimation && animationStyle == "slideRight") || (oppositeAnimation && animationStyle == "slideLeft") )
    {
        $(".main").animate({ 'margin-left': $(document).width() }, delay, "", redirectPage(url, delay) );
    }
    else if ((!oppositeAnimation && animationStyle == "slideLeft") || (oppositeAnimation && animationStyle == "slideRight") )
    {
        $(".main").animate({ 'margin-left': -$(document).width() }, delay, "", redirectPage(url, delay) );
    }
    else if ((!oppositeAnimation && animationStyle == "slideUp") || (oppositeAnimation && animationStyle == "slideDown") )
    {
        $(".main").animate({ 'margin-top': -$(document).height() }, delay, "", redirectPage(url, delay) );
    }
    else if ((!oppositeAnimation && animationStyle == "slideDown") || (oppositeAnimation && animationStyle == "slideUp") )
    {
        $(".main").animate({ 'margin-top': $(document).height() }, delay, "", redirectPage(url, delay) );
    }
    else if (animationStyle == "fade")
    {
        delay = delay / 2;
        $(".main").fadeOut(delay, redirectPage(url, delay));
    }
    else
    {
        redirectPage(url);
    }

    return delay;
}

var gritterConfigured = false;

function notify(title, message)
{
    if (!message)
    {
        message = title;
        title = "Advanced Web App";
    }

    if (Unity)
    {
        Unity.Notification.showNotification(title, message, null);
    } else {
        try {
            if (window.webkitNotifications.checkPermission() != 0) window.webkitNotifications.requestPermission();
            window.webkitNotifications.createNotification(icon, title, message).show();
        } catch (e) {
            try {
                if (window.notifications.checkPermission() != 0) window.notifications.requestPermission();
                window.notifications.createNotification(icon, title, message).show();
            } catch (e) {
                if ($(window).width() > 480)
                {
                    if (!jQuery) jQuery = $;
                    if (!gritterConfigured)
                    {
                        $.extend($.gritter.options, {
                            class_name: 'gritter-dark', // for light notifications (can be added directly to $.gritter.add too)
                            position: 'bottom-right', // possibilities: bottom-left, bottom-right, top-left, top-right
                            fade_in_speed: 100, // how fast notifications fade in (string or int)
                            fade_out_speed: 100, // how fast the notices fade out
                            time: 3000 // hang on the screen for...
                        });
                        gritterConfigured = true;
                    }
                    $.gritter.add({
                            title: title,
                            text: message,
                            image: icon,
                            sticky: false,
                            time: '10000'
                        });
                }
                else
                {
                    alert(message);
                }
            }
        }
    }
}
