<%@ Page Language="C#" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<WebPartPages:AllowFraming ID="AllowFraming" runat="server" />

<html>
<head>
    <link href="../Content/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <script src="../Scripts/jquery-1.9.1.min.js" type="text/javascript"></script>
    <script src="../Scripts/bootstrap.min.js" type="text/javascript"></script>
    
    <title></title>
</head>
<body>
    <div class="container" >
        <div class="row">
            <div class="panel panel-primary">
                <div class="panel-heading"> Stockholm


                    <script>var date = new Date();
                        var d = date.getDate();
                        var day = (d < 10) ? '0' + d : d;
                        var m = date.getMonth() + 1;
                        var month = (m < 10) ? '0' + m : m;
                        var yy = date.getYear();
                        var year = (yy < 1000) ? yy + 1900 : yy;

                        document.write(year + "/" + month + "/" + day);</script>
                     <br />
                  
               </div>
               	<div class="row">
						<div class="col-sm-4">
							<h4>Temperature</h4>
							<p><strong><span id="dataTemperature"></span>&deg;C</strong>
							</p>
						</div>
         
                <div class="panel-body">

                  <ul>
	        
                     <li><canvas id="testCanvas"></canvas></li>
	                </ul>

                </div>
                <div class="panel-footer"></div>
            </div>
        </div>
         </div>


    

      
   
     <link href="../Scripts/WebPartStyle.css" rel="stylesheet" />
    <script src="../fonts/skycons.js" type="text/javascript"></script>
     <script src="../Scripts/WebPartScript.js"></script>

    
</body>
</html>
