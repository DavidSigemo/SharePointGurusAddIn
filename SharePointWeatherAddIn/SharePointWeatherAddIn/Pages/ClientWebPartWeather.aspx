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
    <script src="../fonts/skycons.js"></script>
    <title></title>
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="panel panel-primary">
                <div class="panel-heading"></div>
                <div class="panel-body">
                  <ul>
	                     <li class="basecloud"></li>
	                     <li class="icon-showers icon-sunny"></li>
	                     <li class="icon-sun example"></li>
	                </ul>

                </div>
                <div class="panel-footer"></div>
            </div>
        </div>
         </div>


   <%-- <div class="container">
    

      
      <div class="glyph">
        <div class="preview-glyphs">
         <i class="step icon-night size-72"></i>
        </div>
        <div class="preview-scale">
          <span class="step">72</span>
        </div>
        <div class="usage">
        Class Name - 
          <input class="class" type="text" readonly="readonly" onClick="this.select();" value=".icon-night" />
        html code -
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="&amp;#xf100;" />
        unicode - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="\f100" />
        </div>
      </div>
      
      <div class="glyph">
        <div class="preview-glyphs">
          <i class="step icon-sunny size-72"></i>
        </div>
        <div class="preview-scale">
          <span class="step">72</span>
        </div>
        <div class="usage">
        Class Name -
          <input class="class" type="text" readonly="readonly" onClick="this.select();" value=".icon-sunny" />
          html code - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="&amp;#xf101;" />
          unicode - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="\f101" />
        </div>
      </div>
      
      <div class="glyph">
        <div class="preview-glyphs">
          <i class="step icon-frosty size-72"></i>
        </div>
        <div class="preview-scale">
        <span class="step">72</span>
        </div>
        <div class="usage">
        Class Name -
          <input class="class" type="text" readonly="readonly" onClick="this.select();" value=".icon-frosty" />
          html code - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="&amp;#xf102;" />
          unicode - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="\f102" />
        </div>
      </div>
      
      <div class="glyph">
        <div class="preview-glyphs">
         <i class="step icon-windysnow size-72"></i>
        </div>
        <div class="preview-scale">
         <span class="step">72</span>
        </div>
        <div class="usage">
        Class Name -
          <input class="class" type="text" readonly="readonly" onClick="this.select();" value=".icon-windysnow" />
          html code - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="&amp;#xf103;" />
          unicode - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="\f103" />
        </div>
      </div>
      
      <div class="glyph">
        <div class="preview-glyphs">
          <i class="step icon-showers size-72"></i>
        </div>
        <div class="preview-scale">
         <span class="step">72</span>
        </div>
        <div class="usage">
        Class Name -
          <input class="class" type="text" readonly="readonly" onClick="this.select();" value=".icon-showers" />
          html code - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="&amp;#xf104;" />
          unicode - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="\f104" />
        </div>
      </div>
      
      <div class="glyph">
      Class Name -
        <div class="preview-glyphs">
         <i class="step icon-basecloud size-72"></i>
        </div>
        <div class="preview-scale">
         <span class="step">72</span>
        </div>
        <div class="usage">
        Class Name -
          <input class="class" type="text" readonly="readonly" onClick="this.select();" value=".icon-basecloud" />
          html code - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="&amp;#xf105;" />
          unicode - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="\f105" />
        </div>
      </div>
      
      <div class="glyph">
        <div class="preview-glyphs">
          <i class="step icon-cloud size-72"></i>
        </div>
        <div class="preview-scale">
         <span class="step">72</span>
        </div>
        <div class="usage">
        Class Name -
          <input class="class" type="text" readonly="readonly" onClick="this.select();" value=".icon-cloud" />
          html code - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="&amp;#xf106;" />
          unicode - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="\f106" />
        </div>
      </div>
      
      <div class="glyph">
        <div class="preview-glyphs">
       <i class="step icon-rainy size-72"></i>
        </div>
        <div class="preview-scale">
     <span class="step">72</span>
        </div>
        <div class="usage">
        Class Name -
          <input class="class" type="text" readonly="readonly" onClick="this.select();" value=".icon-rainy" />
          html code - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="&amp;#xf107;" />
          unicode - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="\f107" />
        </div>
      </div>
      
      <div class="glyph">
        <div class="preview-glyphs">
          <i class="step icon-mist size-72"></i>
        </div>
        <div class="preview-scale">
          <span class="step">72</span>
        </div>
        <div class="usage">
        Class Name -
          <input class="class" type="text" readonly="readonly" onClick="this.select();" value=".icon-mist" />
          html code - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="&amp;#xf108;" />
          unicode - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="\f108" />
        </div>
      </div>
      
      <div class="glyph">
        <div class="preview-glyphs">
        <i class="step icon-windysnowcloud size-72"></i>
        </div>
        <div class="preview-scale">
          <span class="step">72</span>
        </div>
        <div class="usage">
        Class Name -
          <input class="class" type="text" readonly="readonly" onClick="this.select();" value=".icon-windysnowcloud" />
          html code - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="&amp;#xf109;" />
          unicode - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="\f109" />
        </div>
      </div>
      
      <div class="glyph">
        <div class="preview-glyphs">
         <i class="step icon-drizzle size-72"></i>
        </div>
        <div class="preview-scale">
        <span class="step">72</span>
        </div>
        <div class="usage">
        Class Name -
          <input class="class" type="text" readonly="readonly" onClick="this.select();" value=".icon-drizzle" />
          html code - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="&amp;#xf10a;" />
          unicode - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="\f10a" />
        </div>
      </div>
      
      <div class="glyph">
        <div class="preview-glyphs">
        <i class="step icon-snowy size-72"></i>
        </div>
        <div class="preview-scale">
          <span class="step">72</span>
        </div>
        <div class="usage">
        Class Name -
          <input class="class" type="text" readonly="readonly" onClick="this.select();" value=".icon-snowy" />
          html code - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="&amp;#xf10b;" />
          unicode - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="\f10b" />
        </div>
      </div>
      
      <div class="glyph">
        <div class="preview-glyphs">
          <i class="step icon-sleet size-72"></i>
        </div>
        <div class="preview-scale">
         <span class="step">72</span>
        </div>
        <div class="usage">
        Class Name -
          <input class="class" type="text" readonly="readonly" onClick="this.select();" value=".icon-sleet" />
          html code - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="&amp;#xf10c;" />
          unicode - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="\f10c" />
        </div>
      </div>
      
      <div class="glyph">
        <div class="preview-glyphs">
          <i class="step icon-moon size-72"></i>
        </div>
        <div class="preview-scale">
        <span class="step">72</span>
        </div>
        <div class="usage">
        Class Name -
          <input class="class" type="text" readonly="readonly" onClick="this.select();" value=".icon-moon" />
          html code - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="&amp;#xf10d;" />
          unicode - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="\f10d" />
        </div>
      </div>
      
      <div class="glyph">
        <div class="preview-glyphs">
        <i class="step icon-windyrain size-72"></i>
        </div>
        <div class="preview-scale">
          <span class="step">72</span>
        </div>
        <div class="usage">
        Class Name -
          <input class="class" type="text" readonly="readonly" onClick="this.select();" value=".icon-windyrain" />
          html code - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="&amp;#xf10e;" />
          unicode - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="\f10e" />
        </div>
      </div>
      
      <div class="glyph">
        <div class="preview-glyphs">
         <i class="step icon-hail size-72"></i>
        </div>
        <div class="preview-scale">
       <span class="step">72</span>
        </div>
        <div class="usage">
        Class Name -
          <input class="class" type="text" readonly="readonly" onClick="this.select();" value=".icon-hail" />
          html code - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="&amp;#xf10f;" />
          unicode - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="\f10f" />
        </div>
      </div>
      
      <div class="glyph">
        <div class="preview-glyphs">
         <i class="step icon-sunset size-72"></i>
        </div>
        <div class="preview-scale">
         <span class="step">72</span>
        </div>
        <div class="usage">
        Class Name -
          <input class="class" type="text" readonly="readonly" onClick="this.select();" value=".icon-sunset" />
          html code - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="&amp;#xf110;" />
          unicode - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="\f110" />
        </div>
      </div>
      
      <div class="glyph">
        <div class="preview-glyphs">
       <i class="step icon-windyraincloud size-72"></i>
        </div>
        <div class="preview-scale">
        <span class="step">72</span>
        </div>
        <div class="usage">
        Class Name -
          <input class="class" type="text" readonly="readonly" onClick="this.select();" value=".icon-windyraincloud" />
          html code - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="&amp;#xf111;" />
          unicode - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="\f111" />
        </div>
      </div>
      
      <div class="glyph">
        <div class="preview-glyphs">
         <i class="step icon-sunrise size-72"></i>
        </div>
        <div class="preview-scale">
          <span class="step">72</span>
        </div>
        <div class="usage">
        Class Name -
          <input class="class" type="text" readonly="readonly" onClick="this.select();" value=".icon-sunrise" />
          html code - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="&amp;#xf112;" />
          unicode - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="\f112" />
        </div>
      </div>
      
      <div class="glyph">
        <div class="preview-glyphs">
         <i class="step icon-sun size-72"></i>
        </div>
        <div class="preview-scale">
         <span class="step">72</span>
        </div>
        <div class="usage">
        Class Name -
          <input class="class" type="text" readonly="readonly" onClick="this.select();" value=".icon-sun" />
          html code - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="&amp;#xf113;" />
          unicode - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="\f113" />
        </div>
      </div>
      
      <div class="glyph">
        <div class="preview-glyphs">
       <i class="step icon-thunder size-72"></i>
        </div>
        <div class="preview-scale">
         <span class="step">72</span>
        </div>
        <div class="usage">
        Class Name -
          <input class="class" type="text" readonly="readonly" onClick="this.select();" value=".icon-thunder" />
          html code - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="&amp;#xf114;" />
          unicode - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="\f114" />
        </div>
      </div>
      
      <div class="glyph">
        <div class="preview-glyphs">
         <i class="step icon-windy size-72"></i>
        </div>
        <div class="preview-scale">
         <span class="step">72</span>
        </div>
        <div class="usage">
        Class Name -
          <input class="class" type="text" readonly="readonly" onClick="this.select();" value=".icon-windy" />
          html code - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="&amp;#xf115;" />
          unicode - 
          <input class="point" type="text" readonly="readonly" onClick="this.select();" value="\f115" />
        </div>
      </div>
      

      <div class="footer">
       
      </div>
    </div>--%>


     <link href="../Scripts/WebPartStyle.css" rel="stylesheet" />
     <script src="../Scripts/WebPartScript.js"></script>
    
</body>
</html>
