angular.module('improved-github-analytics').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/modules/history/history.html',
    "<div class=\"md-padding\" flex layout-sm=\"column\">\n" +
    "    <md-card>\n" +
    "        <md-card-content>\n" +
    "            <h1 class=\"margin-top-50\">Search History</h1>\n" +
    "            <h2>{{vm.repo}}</h2>\n" +
    "            <ul>\n" +
    "                <li class=\" text-left\" ng-repeat=\"item in vm.history\">\n" +
    "                    <p><ng-md-icon icon=\"send\"></ng-md-icon> Date of the search : {{item.date | date:'d MMM yyyy h:mm a'}}   <br>\n" +
    "                    Filter : Search period {{item.age}} from {{item.end | date:'d.MMM.yyyy'}} to {{item.start | date:'d.MMM.yyyy'}}</p>\n" +
    "            \n" +
    "            <div layout=\"row\">\n" +
    "                <div flex>\n" +
    "                <table>\n" +
    "                    <style>\n" +
    "                        table, th , td {\n" +
    "                            border: 1px solid grey;\n" +
    "                            border-collapse: collapse;\n" +
    "                            padding: 5px;\n" +
    "                        }\n" +
    "                        table tr:nth-child(odd) {\n" +
    "                            background-color: #f2f2f2;\n" +
    "                        }\n" +
    "                        table tr:nth-child(even) {\n" +
    "                            background-color: #ffffff;\n" +
    "                        }\n" +
    "                    </style>\n" +
    "                    <tr>\n" +
    "                        <th>Author</th>\n" +
    "                        <th>Opened Issues</th>\n" +
    "                    </tr>\n" +
    "                    <tr ng-repeat=\"y in item.bestOpenedIssuesAuthors\">\n" +
    "                        <td>{{ y.author }}</td>\n" +
    "                        <td>{{ y.openedIssues }}</td>\n" +
    "                    </tr>\n" +
    "                </table>   \n" +
    "                </div>\n" +
    "                <div flex>\n" +
    "                    <table>\n" +
    "                        <style>\n" +
    "                            table, th , td {\n" +
    "                                border: 1px solid grey;\n" +
    "                                border-collapse: collapse;\n" +
    "                                padding: 5px;\n" +
    "                            }\n" +
    "                            table tr:nth-child(odd) {\n" +
    "                                background-color: #f2f2f2;\n" +
    "                            }\n" +
    "                            table tr:nth-child(even) {\n" +
    "                                background-color: #ffffff;\n" +
    "                            }\n" +
    "                        </style> \n" +
    "                        <tr>\n" +
    "                            <th>Author</th>\n" +
    "                            <th>Closed Issues</th>\n" +
    "                        </tr>\n" +
    "                        <tr ng-repeat = \"x in item.bestClosedIssuesAuthors\">\n" +
    "                            <td>{{ x.author }}</td>\n" +
    "                            <td>{{ x.closedIssues }}</td>\n" +
    "                        </tr>\n" +
    "                    </table>\n" +
    "                </div>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "        </md-card-content>\n" +
    "    </md-card>\n" +
    "</div>\n"
  );


  $templateCache.put('app/modules/home/dashboard.html',
    "<div class=\"md-padding\" flex layout-sm=\"column\">\n" +
    "    <md-card class=\"text-left\">\n" +
    "        <md-card-content>\n" +
    "            <h1>Filters</h1>\n" +
    "            <form name=\"filters\">\n" +
    "                <div layout=\"row\" layout-padding>\n" +
    "                    <div flex layout=\"column\">\n" +
    "                        <input id=\"repo\" name=\"repo\" type=\"url\" placeholder=\"Enter a GitHub repository URL i.e. https://github.com/{owner}/{repo}\" ng-model=\"vm.form.repoGitHub.selectedRepo\" ng-required=\"true\">\n" +
    "                        <span class=\"error\" ng-show=\"filters.repo.$error.required\">\n" +
    "                            Error : url required !\n" +
    "                        </span>\n" +
    "                        <span class=\"error\" ng-show=\"filters.repo.$error.url\">\n" +
    "                            Error : Not valid url !\n" +
    "                        </span>\n" +
    "                        <span class=\"error\" ng-show=\"vm.error\">\n" +
    "                            Error : {{vm.error}}\n" +
    "                        </span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div layout=\"column\" layout-padding>\n" +
    "                    <div flex>\n" +
    "                        <label>Search period</label><br>\n" +
    "                        <select name=\"period\" id=\"period\"\n" +
    "                            ng-options=\"option.name for option in vm.form.period.availableOptions track by option.id\"\n" +
    "                            ng-model=\"vm.form.period.selectedOption\">                \n" +
    "                        </select>           \n" +
    "                    </div>                \n" +
    "                    <div flex >\n" +
    "                        <label>Grouping of data</label><br>\n" +
    "                        <select name=\"groupment\" id=\"groupment\"\n" +
    "                            ng-options=\"option.name for option in vm.form.groupment.availableOptions track by option.id\"\n" +
    "                            ng-model=\"vm.form.groupment.selectedOption\">\n" +
    "                        </select>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div layout=\"row\" layout-margin>\n" +
    "                    <button ng-click=\"vm.form.apply()\">Search</button>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "\n" +
    "            <md-divider class=\"margin-top-20\" ></md-divider>\n" +
    "            <!-- Graphiques lineChart-->\n" +
    "            <div layout=\"column\" layout-align=\"center center\">\n" +
    "                <h2>Graphics</h2>\n" +
    "                <p>The health of your project depends on closed issues but also open issues. The open issues show that your project is still very much alive, and that improvements are coming. And closed issues show that your project solves problems or requests received.</p>\n" +
    "                <p> A healthy project is balanced by the number of open and closed issues.</p>\n" +
    "            </div>\n" +
    "            <div layout=\"row\" layout-xs=\"column\" layout-align=\"center center\">\n" +
    "                <div flex>\n" +
    "                    <canvas id=\"line\" class=\"chart chart-line\" chart-data=\"vm.dataLineChartOI\" chart-labels=\"vm.lineChart.labels\" chart-series=\"vm.lineChart.series\" chart-options=\"vm.lineChart.options\" chart-dataset-override=\"vm.lineChart.datasetOverride\"  chart-click=\"vm.lineChart.onClick\" chart-colors=\"vm.lineChart.colors\">\n" +
    "                    </canvas>\n" +
    "                </div>\n" +
    "                <div flex=40>     \n" +
    "                    <h3>Opened Issues</h3>\n" +
    "                    <p>This chart shows the progression of open issues on time.</p>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div layout=\"row\" layout-xs=\"column\" layout-padding  layout-align=\"center center\">\n" +
    "                <div flex=40>     \n" +
    "                    <h3>Closed Issues</h3>\n" +
    "                    <p>This chart shows the progression of closed issues on time.</p>    \n" +
    "                </div>\n" +
    "                <div flex>\n" +
    "                    <canvas id=\"line2\"class=\"chart chart-line\" chart-data=\"vm.dataLineChartCI\" chart-labels=\"vm.lineChart.labels\" chart-series=\"vm.lineChart.series\" chart-options=\"vm.lineChart.options\" chart-dataset-override=\"vm.lineChart.datasetOverride\"  chart-click=\"vm.lineChart.onClick\" chart-colors=\"vm.lineChart.colors\">\n" +
    "                    </canvas>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div layout=\"row\" layout-xs=\"column\" layout-padding  layout-align=\"center center\">\n" +
    "                <div flex>\n" +
    "                    <canvas id=\"line3\" class=\"chart chart-line\" chart-data=\"vm.dataLineChartI\" chart-labels=\"vm.lineChart.labels\" chart-series=\"vm.lineChart.series\" chart-options=\"vm.lineChart.options\" chart-dataset-override=\"vm.lineChart.datasetOverride\"  chart-click=\"vm.lineChart.onClick\" chart-colors=\"vm.lineChart.colors\">\n" +
    "                    </canvas>\n" +
    "                </div>\n" +
    "                <div flex=40>     \n" +
    "                    <h3>Trend of Issues</h3>\n" +
    "                    <p>This chart shows the evolution of issues over time.</p>\n" +
    "                    <p>If the value is positive, this indicates that the number of open issues is greater than X by the number of closed issues.</p>\n" +
    "                    <p>If the value is negative, this indicates that the number of closed issues is greater than X by the number of open issues..</p>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <!-- Graphiques barChart-->\n" +
    "            <div layout=\"column\" layout-align=\"center center\">\n" +
    "                <h2>Podium of hyperactive</h2>\n" +
    "                <p>There is no competition. Opening or closing issues does not mean that you are the best of the team, but who does not want to climb a podium!</p>\n" +
    "                <p>So \"tintintintintin\", rolling drums ....</p>\n" +
    "            </div>\n" +
    "            <div layout=\"row\" layout-xs=\"column\">\n" +
    "                <div flex>\n" +
    "                    <div layout=\"column\" layout-align=\"center center\">\n" +
    "                        <h3>Opened Issues Podium</h3>\n" +
    "                        <canvas id=\"bar\" class=\"chart chart-bar\" chart-data=\"vm.dataBarChartOI\" chart-series=\"vm.seriesBarChartOI\" chart-labels=\"vm.labelsChartOI\" chart-options=\"vm.BarChart.options\", chart-colors=\"vm.BarChart.colors\"></canvas>\n" +
    "                        <table>\n" +
    "                            <style>\n" +
    "                                table, th , td {\n" +
    "                                    border: 1px solid grey;\n" +
    "                                    border-collapse: collapse;\n" +
    "                                    padding: 5px;\n" +
    "                                }\n" +
    "                                table tr:nth-child(odd) {\n" +
    "                                    background-color: #f2f2f2;\n" +
    "                                }\n" +
    "                                table tr:nth-child(even) {\n" +
    "                                    background-color: #ffffff;\n" +
    "                                }\n" +
    "                            </style>\n" +
    "                            <tr>\n" +
    "                                <th>Positon</th>\n" +
    "                                <th>Author</th>\n" +
    "                                <th>Opened Issues</th>\n" +
    "                            </tr>\n" +
    "                            <tr ng-repeat = \"x in vm.tableBestOI\">\n" +
    "                                <td>{{ $index + 1 }}</td>\n" +
    "                                <td>{{ x.author }}</td>\n" +
    "                                <td>{{ x.issues }}</td>\n" +
    "                            </tr>\n" +
    "                        </table>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div flex>\n" +
    "                    <div layout=\"column\" layout-align=\"center center\">\n" +
    "                        <h3>Closed Issues Podium</h3>\n" +
    "                        <canvas id=\"bar\" class=\"chart chart-bar\" chart-data=\"vm.dataBarChartCI\" chart-series=\"vm.seriesBarChartCI\" chart-labels=\"vm.labelsChartCI\" chart-options=\"vm.BarChart.options\", chart-colors=\"vm.BarChart.colors\"></canvas>\n" +
    "                        <table>\n" +
    "                            <style>\n" +
    "                                table, th , td {\n" +
    "                                    border: 1px solid grey;\n" +
    "                                    border-collapse: collapse;\n" +
    "                                    padding: 5px;\n" +
    "                                }\n" +
    "                                table tr:nth-child(odd) {\n" +
    "                                    background-color: #f2f2f2;\n" +
    "                                }\n" +
    "                                table tr:nth-child(even) {\n" +
    "                                    background-color: #ffffff;\n" +
    "                                }\n" +
    "                            </style>\n" +
    "                            <tr>\n" +
    "                                <th>Positon</th>\n" +
    "                                <th>Author</th>\n" +
    "                                <th>Closed Issues</th>\n" +
    "                            </tr>\n" +
    "                            <tr ng-repeat = \"x in vm.tableBestCI\">\n" +
    "                                <td>{{ $index + 1 }}</td>\n" +
    "                                <td>{{ x.author }}</td>\n" +
    "                                <td>{{ x.issues }}</td>\n" +
    "                            </tr>\n" +
    "                        </table>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </md-card-content>\n" +
    "    </md-card>\n" +
    "</div>\n"
  );


  $templateCache.put('app/modules/home/home.html',
    "<md-sidenav layout=\"column\" class=\"md-sidenav-left md-whiteframe-z2\" md-component-id=\"left\" md-is-locked-open=\"$mdMedia('gt-md')\">\n" +
    "    <div ng-controller=\"SidenavCtrl as vm\" ng-cloak>\n" +
    "        <md-toolbar class=\"md-tall md-hue-2\">\n" +
    "            <div layout=\"column\" class=\"md-toolbar-tools-bottom inset\">\n" +
    "                <div layout=\"row\">\n" +
    "                    <div flex=\"80\">\n" +
    "                        <div>Improved GitHub Analytics</div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </md-toolbar>\n" +
    "        <md-list>\n" +
    "            <md-list-item ui-sref=\"home.dashboard\">\n" +
    "                <div class=\"inset\">\n" +
    "                    <ng-md-icon icon=\"apps\"></ng-md-icon>\n" +
    "                </div>\n" +
    "                <p> Dashboard </p>\n" +
    "            </md-list-item>\n" +
    "            <md-list-item ng-repeat=\"item in vm.menu\" ng-click=\"vm.navigateTo('home.' + item.link)\">\n" +
    "                <div class=\"inset\" ng-show=\"item.icon\">\n" +
    "                    <ng-md-icon icon=\"{{item.icon}}\"></ng-md-icon>\n" +
    "                </div>\n" +
    "                <p > {{ item.name }}</p>\n" +
    "            </md-list-item>\n" +
    "            <md-divider></md-divider>\n" +
    "        </md-list>\n" +
    "    </div>\n" +
    "</md-sidenav>\n" +
    "\n" +
    "<div layout=\"column\" class=\"relative\" layout-fill role=\"main\" ng-controller=\"LayoutCtrl as layout\" ng-cloak>\n" +
    "    <md-toolbar ng-show=\"!showSearch\">\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <md-button ng-click=\"layout.toggleSidenav('left')\" hide-gt-md aria-label=\"Menu\">\n" +
    "                <ng-md-icon icon=\"menu\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "            <h3>Improved GitHub Analytics</h3>\n" +
    "            <span flex></span>\n" +
    "           \n" +
    "        </div>\n" +
    "    </md-toolbar>\n" +
    "    \n" +
    "    <md-content layout=\"column\" flex md-scroll-y style=\"background-color:#DCDCDC\">\n" +
    "        <div ui-view></div>\n" +
    "    </md-content>\n" +
    "</div>\n"
  );


  $templateCache.put('app/modules/layouts/main-page/main-page.html',
    "    <md-toolbar ng-show=\"!showSearch\">\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <md-button ng-click=\"layout.toggleSidenav('left')\" hide-gt-md aria-label=\"Menu\">\n" +
    "                <ng-md-icon icon=\"menu\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "            <h3>\n" +
    "                <a href=\"/\">improved-github-analytics</a>\n" +
    "            </h3>\n" +
    "            <span flex></span>\n" +
    "            <md-button aria-label=\"Search\" ng-click=\"showSearch = !showSearch\">\n" +
    "                <ng-md-icon icon=\"search\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "            <md-menu>\n" +
    "                <md-button aria-label=\"Open Settings\" ng-click=\"layout.openMenu($mdOpenMenu, $event)\">\n" +
    "                            <md-icon> more_vert </md-icon>\n" +
    "                </md-button>\n" +
    "                <md-menu-content width=\"4\">\n" +
    "                    <md-menu-item>\n" +
    "                        <md-button ng-click=\"layout.changeProfile($event)\">\n" +
    "                            <md-icon>face</md-icon>\n" +
    "                            Profile\n" +
    "                        </md-button>\n" +
    "                    </md-menu-item>\n" +
    "                    <md-menu-item>\n" +
    "                        <md-button ng-click=\"layout.changePassword()\">\n" +
    "                            <md-icon>lock</md-icon>\n" +
    "                            Password\n" +
    "                        </md-button>\n" +
    "                    </md-menu-item>\n" +
    "                    <md-menu-divider></md-menu-divider>\n" +
    "                    <md-menu-item>\n" +
    "                        <md-button ng-click=\"layout.logOut()\">\n" +
    "                            <md-icon>power_settings_new</md-icon>\n" +
    "                            Logout\n" +
    "                        </md-button>\n" +
    "                    </md-menu-item>\n" +
    "                </md-menu-content>\n" +
    "            </md-menu>\n" +
    "        </div>\n" +
    "    </md-toolbar>\n" +
    "    <md-toolbar class=\"md-hue-1\" ng-show=\"showSearch\">\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <md-button ng-click=\"showSearch = !showSearch\" aria-label=\"Back\">\n" +
    "                <ng-md-icon icon=\"arrow_back\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "            <h3 flex=\"10\">\n" +
    "                Back\n" +
    "            </h3>\n" +
    "            <md-input-container md-theme=\"input\" flex>\n" +
    "                <label>&nbsp;</label>\n" +
    "                <input ng-model=\"search.who\" placeholder=\"Search ...\">\n" +
    "            </md-input-container>\n" +
    "\n" +
    "        </div>\n" +
    "    </md-toolbar>\n" +
    "    <md-content class=\"md-blue-grey-theme\" flex md-scroll-y>\n" +
    "        <ui-view layout=\"column\" layout-fill layout-padding>\n" +
    "\n" +
    "\n" +
    "        </ui-view>\n" +
    "    </md-content>\n"
  );


  $templateCache.put('app/modules/layouts/side-nav/sidenav.html',
    "        <md-toolbar class=\"md-tall md-hue-2\">\n" +
    "            <div layout=\"column\" class=\"md-toolbar-tools-bottom inset\">\n" +
    "                <div layout=\"row\">\n" +
    "                    <div flex=\"20\">\n" +
    "                        <img style=\"width: 36px; height: 36px; border-radius: 50%\"\n" +
    "                             actual-src=\"data:image/jpeg;base64,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\"\n" +
    "                             showloader=\"\" loader-class=\"preload\" loader-src=\"app/assets/images/loader.gif\"\n" +
    "                             src=\"data:image/jpeg;base64,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\">\n" +
    "                    </div>\n" +
    "                    <div flex=\"80\" style=\"margin-top: 10px;font-size: 1em;\">\n" +
    "                        <div>Fernando Monteiro</div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </md-toolbar>\n" +
    "        <md-list>\n" +
    "            <md-list-item ng-repeat=\"item in vm.menu\" ng-click=\"vm.navigateTo(item.link)\" >\n" +
    "                <div class=\"inset\" ng-show=\"item.icon\">\n" +
    "                    <ng-md-icon icon=\"{{item.icon}}\"></ng-md-icon>\n" +
    "                </div>\n" +
    "                <p> {{ item.name }}</p>\n" +
    "            </md-list-item>\n" +
    "            <md-divider></md-divider>\n" +
    "            <md-subheader>Admin</md-subheader>\n" +
    "            <md-list-item ng-repeat=\"item in vm.admin\" ng-click=\"vm.showSettingsBottom($event)\" >\n" +
    "                <div class=\"inset\">\n" +
    "                    <ng-md-icon icon=\"{{item.icon}}\"></ng-md-icon>\n" +
    "                </div>\n" +
    "                <p> {{ item.title }}</p>\n" +
    "            </md-list-item>\n" +
    "        </md-list>\n"
  );

}]);
