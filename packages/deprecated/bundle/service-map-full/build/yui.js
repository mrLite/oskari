/* This is a packed Oskari bundle (bundle script version Thu May 31 2012 12:23:19 GMT+0300 (Suomen kesäaika)) */ 
Oskari.clazz.define("Oskari.mapframework.service.OgcSearchService",function(b,a){this._TILE_SIZE_IN_PIXELS=256;this._componentName="WfsRequestTiler";this._mapPollingInterval=100;this._gridPollingInterval=200;this._simultaneousPngRequest=4;this._wfsMapUpdateRequests={};this._wfsMapHighlightRequest=null;this._gridQuery=null;this._wfsGridUpdateRequest=null;this._tileCount=16;this._core=a;this._doMapLayerReArrange=false;this.endpointUrl=b},{__qname:"Oskari.mapframework.service.OgcSearchService",getQName:function(){return this.__qname},__name:"OgcSearchService",getName:function(){return this.__name},processGetFeaturesJsonFlowForTableFormat:function(k,h,e,d,c,a,f,j,g){var l=k.getId();var b="&flow_pm_wfsLayerId="+l+"&flow_pm_bbox_min_x="+e+"&flow_pm_bbox_min_y="+d+"&flow_pm_bbox_max_x="+c+"&flow_pm_bbox_max_y="+a+"&flow_pm_map_width="+f+"&flow_pm_map_heigh="+j+"&flow_pm_map_wfs_query_id="+g+"&actionKey=QUERY_FIND_RAW_DATA_TO_TABLE";this._gridQuery=jQuery.ajax({dataType:"json",type:"POST",url:this.endpointUrl+b,data:b,success:h})},processGetFeatureTypeIdsJsonForTableFormat:function(d,e,b,c){var a=d+"&flow_pm_map_width="+b+"&flow_pm_map_heigh="+c+"&actionKey=GET_HIGHLIGHT_WFS_FEATURE_IMAGE_BY_POINT";jQuery.ajax({dataType:"json",type:"POST",url:this.endpointUrl+a,data:a,success:e})},processGetFeaturesPngImageForMapFormat:function(k,h,e,d,c,a,f,j,g){var l=k.getId();var b=Oskari.$().startup.globalMapPngUrl+"&flow_pm_wfsLayerId="+l+"&flow_pm_bbox_min_x="+e+"&flow_pm_bbox_min_y="+d+"&flow_pm_bbox_max_x="+c+"&flow_pm_bbox_max_y="+a+"&flow_pm_map_width="+f+"&flow_pm_map_heigh="+j+"&flow_pm_zoom_level="+g+"&actionKey=GET_PNG_MAP";h(b)},processGetHighlightWFSFeatureImageUrl:function(g,j,e,d,c,a,f,h){if(g!==null&&j!==null){var b=Oskari.$().startup.globalMapPngUrl+"&flow_pm_wfsLayerId="+g+"&wfsFeatureId="+j+"&flow_pm_bbox_min_x="+e+"&flow_pm_bbox_min_y="+d+"&flow_pm_bbox_max_x="+c+"&flow_pm_bbox_max_y="+a+"&flow_pm_map_width="+f+"&flow_pm_map_heigh="+h+"&actionKey=GET_HIGHLIGHT_WFS_FEATURE_IMAGE";return b}else{throw"Cannot do processGetHighlightWFSFeatureImageUrl because wfsLayerId or wfsFeatureId is null."}},scheduleMapLayerRearrangeAfterWfsMapTilesAreReady:function(){this._doMapLayerReArrange=true},removeWFsLayerRequests:function(a){var c=a.getId();if(this._wfsMapUpdateRequests[c]!==null){var b=this._wfsMapUpdateRequests[c];this._wfsMapUpdateRequests[c]=null;delete b}},removeWFSLayerGridRequests:function(a){if(this._gridQuery){this._gridQuery.abort()}this._wfsGridUpdateRequest=null},removeWFSMapHighlightRequest:function(){this._wfsMapHighlightRequest=null},scheduleWFSMapLayerUpdate:function(g,l,e,h,b){var a=g.getId();var k=this._wfsMapUpdateRequests[a];if(k!==null){this._wfsMapUpdateRequests[a]=null;delete k}this._wfsMapUpdateRequests[a]=[];var c=this.splitBbox(l,e,h,this._TILE_SIZE_IN_PIXELS);this._tileCount=c.length;var j=Oskari.clazz.builder("Oskari.mapframework.domain.WfsTileRequest");for(var d=0;d<c.length;d++){var f=j(g,c[d],e,h,b,d);this._wfsMapUpdateRequests[a].push(f)}this._doMapLayerReArrange=true},scheduleWFSGridUpdate:function(f,e,a,d,b){this._wfsGridUpdateRequest=Oskari.clazz.create("Oskari.mapframework.domain.WfsGridScheduledRequest",f,e,a,d,b);var c=this;setTimeout(function(){c.processGridQueue()},this._gridPollingInterval)},scheduleWFSMapHighlightUpdate:function(a){this._wfsMapHighlightRequest=a;this.processHighlightQueue()},splitBbox:function(f,c,b,a){var e=this._core.getMap();var g=[];if(e){var d=e.getTileQueue();if(d){g=d.getQueue()}else{}}else{}return g},processMapQueue:function(){var j=function(b){var l="WFS_LAYER_IMAGE_"+e.getMapLayer().getId()+"_"+e.getSequenceNumber();var m=d.getEventBuilder("AfterWfsGetFeaturesPngImageForMapEvent")(e.getMapLayer(),b,e.getBbox(),l);d.copyObjectCreatorToFrom(m,e);d.dispatch(m)};this._core.printDebug("[OGCSearchService.processMapQueue] Looping this._wfsMapUpdateRequests...");for(var c in this._wfsMapUpdateRequests){var g=this._wfsMapUpdateRequests[c];if(g!==null&&g.length>0){this._core.printDebug("[OGCSearchService.processMapQueue] Got requestArray of size "+g.length+" for id "+c);var e=g[0];
this._core.printDebug("[OGCSearchService.processMapQueue] Creating request for '"+e.getMapLayer().getName()+"'");var d=this._core;var k=e.getBbox();var f=d._map._zoom;this._core.printDebug("[OGCSearchService.processMapQueue] Calling processGetFeaturesPngImageForMapFormat with");this._core.printDebug("     request.getMapLayer() : "+e.getMapLayer().getName());this._core.printDebug("          bbox.bounds.left : "+k.bounds.left);this._core.printDebug("        bbox.bounds.bottom : "+k.bounds.bottom);this._core.printDebug("         bbox.bounds.right : "+k.bounds.right);this._core.printDebug("           bbox.bounds.top : "+k.bounds.top);this._core.printDebug("      _TILE_SIZE_IN_PIXELS : "+this._TILE_SIZE_IN_PIXELS);this._core.printDebug("                   mapZoom : "+f);this.processGetFeaturesPngImageForMapFormat(e.getMapLayer(),j,k.bounds.left,k.bounds.bottom,k.bounds.right,k.bounds.top,this._TILE_SIZE_IN_PIXELS,this._TILE_SIZE_IN_PIXELS,f);this._core.printDebug("[OGCSearchService.processMapQueue] removing handled element");g.splice(0,1);if(g.length===0){delete g;this._core.printDebug("[OGCSearchService.processMapQueue] deleting empty requestArray")}return}}this._core.printDebug("[OGCSearchService.processMapQueue] _doMapLayerReArrange is "+this._doMapLayerReArrange);if(this._doMapLayerReArrange){var h=this._core.getRequestBuilder("RearrangeSelectedMapLayerRequest");var a=h();this._core.processRequest(a);this._doMapLayerReArrange=false}},processGridQueue:function(){var b=this._wfsGridUpdateRequest;var a=this._core;if(b==null){return}if(this._gridQuery){this._gridQuery.abort()}try{a.actionInProgressWfsGrid();var c=function(d){if(d.error=="true"){a.printWarn("Error while querying data to table.")}if(a.getLatestWfsTableQueryId()==parseInt(d.wfsQueryId)||d.error=="true"){if(a.isMapLayerAlreadyHighlighted(b.getMapLayer().getId())){var e=a.getEventBuilder("AfterWfsGetFeaturesJsonFlowForTableFormatEvent")(b.getMapLayer(),d,b.getBbox());a.copyObjectCreatorToFrom(e,b);a.dispatch(e)}else{a.printWarn("WFS feature response json layer ("+b.getMapLayer().getName()+") not match of highlighted layer --> Skipping response.");a.processRequest(a.getRequestBuilder("ActionReadyRequest")("WFS_GRID",false))}}else{a.printWarn("WFS GetFeaturesJsonFlowForTableFormat response id not match to latest wfs query id --> Skipping response.")}};this.processGetFeaturesJsonFlowForTableFormat(b.getMapLayer(),c,b.getBbox().left,b.getBbox().bottom,b.getBbox().right,b.getBbox().top,b.getMapWidth(),b.getMapHeight(),a.generateWfsTableQueryId())}finally{this._wfsGridUpdateRequest=null}},processHighlightQueue:function(){var d=this._wfsMapHighlightRequest;if(d===null){return}try{var e=d.getWFSFeatureId();var g=this._core.findMapLayerFromAllAvailable(d.getMapLayerId());if(!g.isLayerOfType("WFS")){throw"Trying to highlight feature from layer that is not WFS layer!"}var c=Oskari.$().sandbox._core;var j=c._map.getBbox();var f=c._map.getWidth();var h=c._map.getHeight();var b=this.processGetHighlightWFSFeatureImageUrl(g.getId(),e,j.left,j.bottom,j.right,j.top,f,h);var a=this._core.getEventBuilder("AfterWfsGetFeaturesPngImageForMapEvent")(g,b,this._core._map.getBbox(),"HIGHLIGHTED_FEATURE");this._core.copyObjectCreatorToFrom(a,d);this._core.dispatch(a)}finally{this._wfsMapHighlightRequest=null}},startPollers:function(){for(i=0;i<this._tileCount;i++){this.processMapQueue()}}},{protocol:["Oskari.mapframework.service.Service"]});Oskari.clazz.define("Oskari.mapframework.service.NetServiceCenterService",function(a){this._endpoint=a},{__qname:"Oskari.mapframework.service.NetServiceCenterService",getQName:function(){return this.__qname},__name:"NetServiceCenterService",getName:function(){return this.__name},doRequest:function(c,b,d){var e="";if(b!=null){for(var a in b){e+="&"+a+"="+encodeURIComponent(b[a])}}jQuery.ajax({dataType:"json",type:"POST",url:this._endpoint+"&actionKey="+c+e,data:"actionKey="+c+e,complete:d})}},{protocol:["Oskari.mapframework.service.Service"]});