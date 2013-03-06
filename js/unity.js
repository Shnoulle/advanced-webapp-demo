/*
 * Unity Integration
 * -----------------------
 * 
 * This file is subject to the terms and conditions defined in
 * https://github.com/lunarcloud/advanced-webapp-demo/blob/master/LICENSE.md
 */
var Unity = null;
var icon = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + "/img/icon.png";

function setupUnity() {
    try { Unity = external.getUnityObject(1.0); } catch (e) { return; }

    if (Unity) Unity.init({name: "Advanced WebApp Demo",
        homepage: rootUrl,
        iconUrl: icon,
        onInit: unityReady});
}
setupUnity();

function unityReady()
{
    if ($(".main").hasClass("navigation-lock") == false)
    {
        Unity.Launcher.addAction("New Test", function(){ NavigateTo("test-setup.html"); });
        Unity.addAction("/New Test", function(){ NavigateTo("test-setup.html", true); });

        Unity.Launcher.addAction("Settings", function(){ NavigateTo("settings.html", true); });
        Unity.addAction("/Settings", function(){ NavigateTo("settings.html", true); });
    }

    Unity.Launcher.addAction("About", function(){ $('a[href="#about"]').click(); });
    Unity.addAction("/About", function(){ $('a[href="#about"]').click(); });
}

setupUnity();
