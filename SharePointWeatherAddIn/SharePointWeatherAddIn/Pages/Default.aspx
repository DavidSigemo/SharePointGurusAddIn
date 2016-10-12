﻿<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="../Scripts/highcharts.js"></script>
    <meta name="WebPartPageExpansion" content="full" />
    <link href="../Content/bootstrap.min.css" rel="stylesheet" />
    <link rel="Stylesheet" type="text/css" href="../Content/AppPartStyle.css" />
    <script type="text/javascript" src="../Scripts/bootstrap.min.js"></script>
    <script type="text/javascript" src="../Scripts/AppPartScript.js"></script>

</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server"></asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <div id="container" class="col-md-12">
        <ul id="appTabs" class="nav nav-tabs">
            <li id="graphTab" class="active"><a id="graphTabActive" href="#">Vädergraf</a></li>
            <li id="dataTab"><a id="dataTabActive" href="#">Väderdata</a></li>
        </ul>
        <br/>
        <div class="tabContent">
            <div class="container">
                <div id="chart"></div>
            </div>
        </div>
    </div>
</asp:Content>
