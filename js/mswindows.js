/* Windows 7/8 integration */
var windowsicon = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + "/img/icon.ico";


var windowsPinModalHTML =
"<div id='windows-pin' class='modal hide fade in'> " +
"    <div class='modal-header'> " +
"        <a class='close' data-dismiss='modal'><i class='icon-remove'></i></a> " +
"        <h3>Windows Integration</h3> " +
"    </div> " +
"    <div class='modal-body'> " +
"        <div class='row-fluid'> " +
"            <div class='span1'> " +
"                <img src='img/windows-os.png' style='float: right; padding-top: 25px; display: block;' /> " +
"                <img src='img/windows-pin.png' style='float: right; padding-top: 15px; display: block;' /> " +
"            </div> " +
"            <div class='span10' style='margin-left: 20px;'> " +
"                <h2>Pin it!</h2> " +
"                <p style='padding-left: 20px;'>A Convenient way to launch and run the app!</p> " +
"            </div> " +
"        </div> " +
"    </div> " +
"    <div class='modal-footer'> " +
"        <a href='javascript:void(0)' onclick='window.external.msAddSiteMode();close();' class='btn' >Pin</a> " +
"        <a href='#' data-dismiss='modal' class='btn' >Close</a> " +
"    </div> " +
"</div>";

try
{
    if (window.external.msIsSiteMode())
    {
        AddJumpList();
    }
    else
    {
        var seenPinMessage = true;
        if ( localStorage.getItem('seenPinMessage') != "true" ) seenPinMessage = false;

        /* Windows Pin Modal */
        include("js/windows-pin.js", function()
        {
            $("#windowspincontainer").append(windowsPinModalHTML);
            $('#windows-pin').modal({
                keyboard: true,
                show: false
            });
            $("#windows-pin").modal();
            localStorage.setItem('seenPinMessage', "true" );
        });

    }
}
catch (e) {}


function AddJumpList() {
    window.external.msSiteModeCreateJumplist('Advanced WebApp Demo');

    window.external.msSiteModeAddJumpListItem('About', function(){$('a[href=#about]').click();}, windowsicon, 'self');

    window.external.msSiteModeAddJumpListItem('Settings', "settings.html", windowsicon, 'self');
    window.external.msSiteModeAddJumpListItem('New Test', "test-setup.html", windowsicon, 'self');

    window.external.msSiteModeShowJumplist();

    $(".main").ready(function(){
        if ($(".main").hasClass("navigation-lock")) window.external.msSiteModeClearJumpList();
    });
}