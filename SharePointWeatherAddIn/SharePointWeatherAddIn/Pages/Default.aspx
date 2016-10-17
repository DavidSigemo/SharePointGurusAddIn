<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="../Scripts/highcharts.js"></script>
    <script type="text/javascript" src="../fonts/skycons.js"></script>
    <meta name="WebPartPageExpansion" content="full" />
    <link href="../Content/bootstrap.min.css" rel="stylesheet" />
    <link rel="Stylesheet" type="text/css" href="../Content/AppPartStyle.css" />
    <script type="text/javascript" src="../Scripts/bootstrap.min.js"></script>
    

</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server"></asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
<div id="weatherPageContent" class="col-md-12">
		<ul id="appTabs" class="nav nav-tabs">
			<li id="dataTab" class="active"><a id="dataTabActive" href="#">Väderdata</a></li>
			<li id="graphTab"><a id="graphTabActive" href="#">Vädergraf</a></li>
		</ul>
		<br />
		<div>
			<label for="dataLocationInput"> Enter a location
            <input type="text"  id="dataLocationInput" name="dataLocationInput" class="form-control" placeholder="e.g. Stockholm.." title="" />
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
					<div class="row">
						<div class="col-sm-4">
							<h4>Temperature</h4>
							<p><strong><span id="dataTemperature"></span>&deg;C</strong>
							</p>
						</div>
						<div class="col-sm-4">
							<h4>Ozone</h4>
                            <strong><p id="dataOzone"></p></strong>
						</div>
						<div class="col-sm-4">
							<h4>Wind speed</h4>
							<p><strong><span id="dataWindSpeed"></span> m/s</strong></p>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-4">
							<h4>Humidity</h4>
							<p><strong><span id="dataHumidity"></span>%</strong></p>
						</div>
						<div class="col-sm-4">
							<h4>Pressure</h4>
							<p><strong><span id="dataPressure"></span> hPa</strong></p>
						</div>
						<div class="col-sm-4">
							<h4>Wind direction</h4>
							<strong><p id="dataWindDirection"></p></strong>
							<p><span id="dataWindDirectionDetailed"></span>&deg;</p>
						</div>
					</div>
				</div>
			</div>
			<div id="graphContent" class="container-fluid">
				<div class="container-fluid" id="highchart"></div>
			</div>
		</div>
	</div>

    <script type="text/javascript" src="../Scripts/AppPartScript.js"></script>
</asp:Content>
