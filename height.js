var rsHeight = (function(){
	var w = window,
    	d = document,
    	e = d.documentElement,
    	g = d.getElementsByTagName('body')[0],
    	totwidth = w.innerWidth || e.clientWidth || g.clientWidth,
    	totHeight = w.innerHeight|| e.clientHeight|| g.clientHeight;
	
	window.addEventListener('resize', function(){
  		w = window;
    	d = document;
    	e = d.documentElement;
    	g = d.getElementsByTagName('body')[0];
    	totwidth = w.innerWidth || e.clientWidth || g.clientWidth;
    	totHeight = w.innerHeight|| e.clientHeight|| g.clientHeight;
    });
  	
  	var getStyle = function(oElm, strCssRule){
    	var strValue = "";
    	if(document.defaultView && document.defaultView.getComputedStyle){
        	strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
    	} else if(oElm.currentStyle){
        	strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
            	return p1.toUpperCase();
        	});
        	strValue = oElm.currentStyle[strCssRule];
    	}
    	return parseInt(strValue.replace("px", ""));
	}
  
  return{
    fillscreen: function(parent){
      var childElement = parent[0].children;
      var parentPadding = getStyle(parent[0], "padding-top") + getStyle(parent[0], "padding-bottom");
      var parentMargin = getStyle(parent[0], "margin-top") + getStyle(parent[0], "margin-bottom");
      var parentBorder = getStyle(parent[0], "border-top") + getStyle(parent[0], "border-bottom");
      var parentDifference = function(){
      	if ((parentMargin + parentPadding + parentBorder) === 0){
      		return 0;
      	} else {
      		return (parentMargin + parentPadding + parentBorder)/childElement.length
      	};
      };
      var padding = 0;
      var margin = 0;
      var border = 0;
      for( i = 0 , j = childElement.length; i < j ; i++ ){
      	padding = getStyle(childElement[i], "padding-top") + getStyle(childElement[i], "padding-bottom");
      	margin = getStyle(childElement[i], "margin-top") + getStyle(childElement[i], "margin-bottom");
      	border = getStyle(childElement[i], "border-top") + getStyle(childElement[i], "border-bottom");
      	
      	var splits = function(){
      		if (childElement[i].getAttribute('data-height') === null){
      			return (100 / childElement.length)/100;
      		} else {
      			return childElement[i].getAttribute('data-height') / 100
      		}
      	};
      	
      	var totalHeight = function(){
      		if (parent[0].getAttribute('data-parent-height') === null){
      			return totHeight;
      		} else {
      			return totHeight * (parent[0].getAttribute('data-parent-height') / 100);
      		}
      	};
        childElement[i].style.height = (totalHeight()*splits()) - parentDifference() - (padding + margin + border) + "px";
      }
    }
  };
}());
