// ==UserScript==
// @name         "Stack Moderators" Team Helper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Loads which sites a user moderates from their Teams profile
// @author       Aurora0001
// @match        https://stackoverflow.com/c/moderators/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(".user-details a.who-button { display: none; color: #666; font-size: 0.8em; } .user-details:hover .who-button { display: inline; }");

     // chaneElementType by Andrew Whitaker (https://stackoverflow.com/a/8584217); released under the CC-BY-SA 3.0
     $.fn.changeElementType = function(newType) {
      for (var k=0;k<this.length; k++) {
       var e = this[k];
       var new_element = document.createElement(newType),
        old_attributes = e.attributes,
        new_attributes = new_element.attributes,
        child = e.firstChild;
       for(var i = 0, len = old_attributes.length; i < len; i++) {
        new_attributes.setNamedItem(old_attributes.item(i).cloneNode());
       }
       do {
        new_element.appendChild(e.firstChild);
       }
       while(e.firstChild);
       e.parentNode.replaceChild(new_element, e);
      }
      return this; // for chain... $(this)?  not working with multiple
    }

    var whoButton = $('<a class="who-button">&nbsp;(who?)</a>').click(function() {
        var channelUserAddr = $(this).prev().attr("href");
        var usercard = $(this).parent();
        $(usercard).find("a:nth-child(1)").text("Loading...");
        $.get(channelUserAddr, function(data) {
            var body = $.parseHTML(data);
            var networkProfile = $(body).find(".additional-links a:nth-child(1)").attr("href");
            GM_xmlhttpRequest({
                method: "GET",
                url: networkProfile+"?tab=accounts",
                onload: function(response) {
                    var networkBody = $.parseHTML(response.responseText);
                    var username = $(networkBody).find(".user-details h1").text();
                    var modSites = $(networkBody).find('[title="moderator"]').closest(".account-container").find(".account-icon").parent();
                    $(modSites).find(".account-icon").changeElementType("span");
                    $(usercard).append(modSites);
                    $(usercard).find("a:nth-child(1)").text(username);
                }
            });

        });
    });
    $(".user-details a").after(whoButton);
})();
