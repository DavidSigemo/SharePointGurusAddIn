<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="../Scripts/highcharts.js"></script>
    <script type="text/javascript" src="../fonts/skycons.js"></script>
    <script type="text/javascript" src="../Scripts/js.cookie.js"></script>
    <script type="text/javascript" src="../Scripts/moment.min.js"></script>
    <meta name="WebPartPageExpansion" content="full" />
    <link href="../Content/bootstrap.min.css" rel="stylesheet" />
    <link rel="Stylesheet" type="text/css" href="../Content/AppPartStyle.css" />
    <script type="text/javascript" src="../Scripts/bootstrap.min.js"></script>
    

</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server"></asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <div id="weatherPageContent" class="col-md-12">
        <ul id="appTabs" class="nav nav-tabs">
            <li id="dataTab" class="active"><a id="dataTabActive" href="#">Weatherdata</a></li>
            <li id="graphTab"><a id="graphTabActive" href="#">Weathergraph</a></li>
            <li id="otherTab"><a id="otherTabActive" href="#">Settings & Other</a></li>
        </ul>
        <br />
        <div>
            <label for="dataLocationInput">
                Enter a location
            <input type="text" id="dataLocationInput" name="dataLocationInput" class="form-control" placeholder="e.g. Stockholm.." title="" />
            </label>
            <button id="dataLocationSearch" type="button" class="btn btn-primary">Search</button>

        </div>
        <div id="tabContent">
            <div id="dataContent" class="container-fluid">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12">
                            <span>
                                <h3 id="dataLocation"></h3>
                                <canvas id="dataWeatherIcon"></canvas>
                            </span>
                            <h5 id="dataWeatherText"></h5>
                        </div>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col-sm-4">
                            <h4>Temperature</h4>
                            <p>
                                <strong><span id="dataTemperature"></span></strong>
                            </p>
                        </div>
                        <div class="col-sm-4">
                            <h4>Ozone</h4>
                            <strong>
                                <p><span id="dataOzone"></span>DU</p>
                            </strong>
                        </div>
                        <div class="col-sm-4">
                            <h4>Wind speed</h4>
                            <p><strong><span id="dataWindSpeed"></span>m/s</strong></p>
                        </div>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col-sm-4">
                            <h4>Humidity</h4>
                            <p><strong><span id="dataHumidity"></span>%</strong></p>
                        </div>
                        <div class="col-sm-4">
                            <h4>Pressure</h4>
                            <p><strong><span id="dataPressure"></span>hPa</strong></p>
                        </div>
                        <div class="col-sm-4">
                            <h4>Wind direction</h4>
                            <strong>
                                <p id="dataWindDirection"></p>
                            </strong>
                            <p id="dataWindDirectionDetailedWrapper">(<span id="dataWindDirectionDetailed"></span>&deg;)</p>
                            <img id="windDirArrowImg" src="../Images/WindDirArrow.png" alt="Wind Direction"/>
                        </div>
                    </div>
                </div>
            </div>
            <div id="graphContent" class="container-fluid">
                <div class="container-fluid" id="highchart-tempDay"></div>
                <div class="container-fluid" id="highchart-MaxMin"></div>
            </div>
            <div id="otherContent" class="container">
                <div id="settingsHeader" class="row">
                    <div class="col-sm-12">
                        <h4>Settings</h4>
                    </div>
                </div>
                <div id="settingsBody" class="row">
                    <div class="col-sm-12">
                        <label for="defaultLocationInput">
                            Default Location 
                            <input type="text" id="defaultLocationInput" name="defaultLocationInput" class="form-control" value="" placeholder="e.g. Stockholm.." title="" />
                        </label>
                    </div>
                    <div class="col-sm-12">
                        <label for="tempUnitInput">
                            Temperature unit 
                            <select id="tempUnitInput" name="tempUnitInput" class="form-control" title="">
                                <option value="C">Celsius</option>
                                <option value="F">Fahrenheit</option>
                            </select>
                        </label>
                    </div>
                    <div class="col-sm-12">
                        <button type="button" id="saveSettingsButton" class="btn btn-primary">Save settings</button>
                    </div>
                </div>
                <hr />
                <div id="otherHeader" class="row">
                    <div class="col-sm-12">
                        <h4>Other</h4>
                    </div>
                </div>
                <div id="otherBody" class="row">
                    <div class="col-sm-12">
                        <p>This weather AddIn was developed by David, Chro & Rozhna</p>
                        <p>To report an issue, click <a href="https://github.com/DavidSigemo/SharePointGurusAddIn/issues">here</a></p>
                        <p>For information about the AddIn and how to use it please see the <a href="https://github.com/DavidSigemo/SharePointGurusAddIn/blob/master/SharePointWeatherAddIn/SharePointWeatherAddIn/Documentation/changelog.txt">manual</a></p>
                        <p><a href="https://github.com/DavidSigemo/SharePointGurusAddIn">Contact us</a></p>
                        <p>V1.0</p>
                    </div>
                </div>
            </div>
    </div>
    </div>
    <script type="text/javascript" src="../Scripts/AppPartScript.js"></script>
</asp:Content>
