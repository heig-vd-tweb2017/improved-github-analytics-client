angular.module('improved-github-analytics').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/modules/analytics/analytics.html',
    "<div class=\"container\">\n" +
    "    <br>\n" +
    "    <div class=\"text-center\">\n" +
    "        <h1>{{ vm.title }}</h1>\n" +
    "    </div>\n" +
    "    <div class=\"well text-left\">\n" +
    "        <div class=\"form-group\">\n" +
    "            <input id=\"search-input\" class=\"form-control\" placeholder=\"Enter a GitHub repository URL i.e. https://github.com/{owner}/{repo}\" type=\"text\">\n" +
    "        </div>\n" +
    "        <p><a ui-sref=\"analytics\" class=\"btn btn-block btn-primary\" role=\"button\">Analyze repository</a></p>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('app/modules/history/history.html',
    "<div class=\"container\">\n" +
    "    <h1>Content from: history page</h1>\n" +
    "</div>\n"
  );


  $templateCache.put('app/modules/home/home.html',
    "<div class=\"container\">\n" +
    "	<br>\n" +
    "	<div class=\"text-center\">\n" +
    "		<h1>{{ vm.title }}</h1>\n" +
    "	</div>\n" +
    "	<div class=\"well text-left\">\n" +
    "		<h2>What is this</h2>\n" +
    "		<p>This project proposes to analyze a GitHub repository, especially on issues management:</p>\n" +
    "		<ul>\n" +
    "			<li>Time analysis of opened issues.</li>\n" +
    "			<li>Time analysis of closed issues.</li>\n" +
    "			<li>Time analysis of the ratio between opened and closed issues.</li>\n" +
    "			<li>Enhancement of the three most active users on opening issues.</li>\n" +
    "			<li>Enhancement of the three most active users on closing issues.</li>\n" +
    "			<li>Enhancement of the number of opened and closed issues.</li>\n" +
    "		</ul>\n" +
    "		<p>These aspects are represented through graphics and tables.</p>\n" +
    "		<p>Some information about the users is deliberately hidden: We only show the 15% of the best users in the tables in parts to avoid any competition. The only objective is mutual help and encouragement.</p>\n" +
    "	</div>\n" +
    "	<div class=\"well text-left\">\n" +
    "		<h2>Why is this</h2>\n" +
    "		<p>We wanted to create this tool to encourage people to improve their product by the following points.</p>\n" +
    "		<p>We think that issues are a good measure to the activity and the progress of a project:</p>\n" +
    "		<ul>\n" +
    "			<li>People who open issues want to see bug fixes and/or new features in the product they use.</li>\n" +
    "			<li>People who close issues fixe bugs and/or add new features to the product they use.</li>\n" +
    "		</ul>\n" +
    "		<p>We think that the number of issues opened and the number of issues closed should be very similar. This proves the activity and continuous integration of the product as people want to see new features and people implement them.</p>\n" +
    "	</div>\n" +
    "	<div class=\"well text-left\">\n" +
    "		<h2>How is this</h2>\n" +
    "		<p>For this project, we used several librairies and technologies.</p>\n" +
    "		<p>Client side:</p>\n" +
    "		<ul>\n" +
    "			<li><a ng-href=\"https://eslint.org/\">ESLint</a> for quality code control.</li>\n" +
    "			<li><a ng-href=\"https://socket.io/\">socket.io</a> to receive and send from/to the client datas in real time.</li>\n" +
    "			<li><a ng-href=\"https://momentjs.com/\">Moment.js</a> to manipulate times in JavaScript.</li>\n" +
    "			<li><a ng-href=\"http://www.chartjs.org/\">Chart.js</a> to generate the charts.</li>\n" +
    "		</ul>\n" +
    "		<p>Server side:</p>\n" +
    "		<ul>\n" +
    "			<li><a ng-href=\"https://eslint.org/\">ESLint</a> for quality code control.</li>\n" +
    "			<li><a ng-href=\"https://nodejs.org/\">Node.js</a> for the server runtime engine.</li>\n" +
    "			<li><a ng-href=\"http://expressjs.com/\">Express</a> for the WEB server.</li>\n" +
    "			<li><a ng-href=\"https://developer.github.com/v4/\">GitHub API</a> to get the data from GitHub.</li>\n" +
    "			<li><a ng-href=\"https://www.npmjs.com/package/node-github-graphql\">Node-Github-GraphQL</a> to query the GitHub API v4 from Node.js.</li>\n" +
    "			<li><a ng-href=\"https://socket.io/\">socket.io</a> to receive and send from/to the client datas in real time.</li>\n" +
    "			<li><a ng-href=\"https://momentjs.com/\">Moment.js</a> to manipulate times in JavaScript.</li>\n" +
    "			<li><a ng-href=\"https://mochajs.org/\">Mocha</a> for the unit tests.</li>\n" +
    "			<li><a ng-href=\"http://chaijs.com/\">Chai</a> as an assertion library used with Mocha.</li>\n" +
    "			<li><a ng-href=\"https://docs.docker.com/compose/\">Docker Compose</a> to deploy and test the application locally.</li>\n" +
    "		</ul>\n" +
    "\n" +
    "		You can find all the sources for this project <a ng-href=\"https://github.com/heig-vd-tweb2017/improved-github-analytics-client\">here</a> as everything is open source !\n" +
    "	</div>\n" +
    "	<div class=\"text-center\">\n" +
    "		<p><a ui-sref=\"analytics\" class=\"btn btn-block btn-primary\" role=\"button\">Enough talk, let's do some analytics !</a></p>\n" +
    "	</div>\n" +
    "</div>\n"
  );


  $templateCache.put('app/modules/layouts/nav-bar/navbar-tpl.html',
    "<nav class=\"navbar navbar-inverse\">\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"navbar-header\">\n" +
    "            <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n" +
    "                <span class=\"sr-only\">Toggle navigation</span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "            </button>\n" +
    "            <a class=\"navbar-brand\" href=\"/#!/\">{{ brand }}</a>\n" +
    "        </div>\n" +
    "        <div id=\"navbar\" class=\"collapse navbar-collapse\">\n" +
    "            <ul class=\"nav navbar-nav\">\n" +
    "                <li ng-repeat=\"item in menus\" ng-class=\"{active:isActive('#/' + item.link)}\">\n" +
    "                    <a ui-sref=\"{{ item.link }}\">{{ item.name }}</a>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div><!--/.nav-collapse -->\n" +
    "    </div>\n" +
    "</nav>\n"
  );


  $templateCache.put('app/modules/layouts/nav-bar/navbar.html',
    "<div ng-controller=\"NavBarCtrl as vm\">\n" +
    "    <nav-bar menus=\"vm.menu\" brand=\"vm.title\"></nav-bar>\n" +
    "</div>\n"
  );

}]);
