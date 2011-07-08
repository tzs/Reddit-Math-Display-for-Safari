function gotSetting(evt) {
    if ( evt.name == "settingsArray" ) {
        var settings = evt.message;
        var renderer = settings[0];
        var reddits = settings[1];
        var mathjax = settings[2];
        var textheworld = settings[3];

        var want = false;
        if ( reddits == 1 ) {
            if ( document.location.pathname.indexOf("/r/math") == 0 ) {
                want = true;
            }
        } else if ( reddits == 2 ) {
            if ( document.location.pathname.indexOf("math") > 0 ) {
                want = true;
            }
        } else {
            want = true;
        }

        if ( ! want ) {
            return;
        }

        if ( renderer == 1 ) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = mathjax;
            var config = "MathJax.Hub.Config({" +
                         "  tex2jax: {" +
                         "    inlineMath: [ ['[;', ';]' ] ]," +
                         '    skipTags: ["script","noscript","style","textarea"]' +
                         "  }" +
                         "});" +
                         "MathJax.Hub.Startup.onload();";
            script.text = config;
            document.getElementsByTagName("head")[0].appendChild(script);
        } else if ( renderer == 2 ) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = textheworld;
            document.getElementsByTagName("head")[0].appendChild(script);
        }
    }
}

safari.self.addEventListener("message", gotSetting, false);
safari.self.tab.dispatchMessage("getSettings", "renderer");
