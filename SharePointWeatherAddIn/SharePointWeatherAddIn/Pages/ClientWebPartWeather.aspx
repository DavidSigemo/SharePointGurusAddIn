<%@ Page Language="C#" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<WebPartPages:AllowFraming ID="AllowFraming" runat="server" />

<html>
<head>
    <link href="../Content/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jquery-1.9.1.min.js" type="text/javascript"></script>
    <script src="../Scripts/bootstrap.min.js" type="text/javascript"></script>
    <script src="../fonts/skycons.js"></script>
    <title></title>
</head>
<body>
    <div class="container" style="height: 800px; width: 500px;">
        <div class="row">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <div>
                        <div class="clock"></div>
                        <div id="Date"></div>

                        <div id="hours" style="float: left;"></div>
                        <div id="point" style="float: left;">:</div>
                        <div id="min" style="float: left;"></div>
                        <div id="point" style="float: left;">:</div>
                        <div id="sec"></div>



                    </div>

                </div>

                <div class="panel-body">

                    <canvas id="testCanvas" class="img"></canvas>
                    <div class="col-sm-12">
                        <span>
                            <h3 id="dataLocation"></h3>

                        </span>
                        <h5 id="dataWeatherText"></h5>
                    </div>

                    <div class="col-sm-4">
                        <h4>Temperature</h4>
                        <p>
                            <strong><span id="dataTemperature"></span>°C</strong>
                        </p>
                    </div>
                    <div class="col-sm-4">
                        <h4>Wind speed</h4>
                        <p><strong><span id="dataWindSpeed"></span> m/s</strong></p>
                    </div>
                    <div class="col-sm-4">
                        <h4>Wind direction</h4>
                        <strong>
                            <p id="dataWindDirection"></p>
                        </strong>
                        <p id="dataWindDirectionDetailedWrapper">(<span id="dataWindDirectionDetailed"></span>°)</p>
                    </div>

                </div>

                <div class="panel-footer" style="height: 200px; width: 100%; padding: 0px;">
                    <div class="box2">
                        <br>
                        <div id="Date1"></div>
                    </div>
                    <div class="box2">
                        <br>
                        <div id="Date2"></div>
                    </div>
                    <div class="box2">
                        <br>
                        <div id="Date3"></div>
                    </div>
                    <div class="box2">
                        <br>
                        <div id="Date4"></div>
                    </div>
                    <div class="box2">
                        <br>
                        <div id="Date5"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>





    <link href="../Scripts/WebPartStyle.css" rel="stylesheet" />
    <script src="../fonts/skycons.js" type="text/javascript"></script>
    <script src="../Scripts/WebPartScript.js"></script>


</body>
</html>
