/* This is a packed Oskari bundle (bundle script version Fri Feb 10 2012 08:05:55 GMT+0200 (Suomen normaaliaika)) */ 
Oskari.clazz.define("Oskari.mapframework.bundle.KPIBundleInstance",function(){this.map=null},{getMapModule:function(){return this.mapModule},createModulesAndUi:function(j){var k=false;var h=true;var c=true;var d=true;var b=Oskari.clazz.create("Oskari.mapframework.ui.module.common.MapModule","Main",k,h,c,d);this.mapModule=b;var a=j.register(b);var e=[];e.push("Oskari.mapframework.mapmodule.LayersPlugin");e.push("Oskari.mapframework.mapmodule.WmsLayerPlugin");e.push("Oskari.mapframework.mapmodule.ControlsPlugin");for(var f=0;f<e.length;f++){var g=Oskari.clazz.create(e[f]);b.registerPlugin(g)}a.addControl(new OpenLayers.Control.TouchNavigation({dragPanOptions:{enableKinetic:true}}));a.render("map-div");this.map=a},start:function(){var g=this;var d=Oskari.clazz.create("Oskari.mapframework.complexbundle.NlsFiLayerConfig");this.layers=d;var f=d.create();var e=f;Oskari.$("startup",f);var c="fi";var h=[];h.push(Oskari.clazz.create("Oskari.mapframework.service.LanguageService",c));h.push(Oskari.clazz.create("Oskari.mapframework.service.MapLayerService",null));var i=[];var a=g;var b=Oskari.clazz.create("Oskari.mapframework.core.Core");this.core=b;b.init(a,h,i,f.layers,c,null,false);b.processRequest(b.getRequestBuilder("AddMapLayerRequest")("base_27",true,true));b.processRequest(b.getRequestBuilder("MapMoveRequest")(545108,6863352,3,false))},update:function(){},stop:function(){alert("Stopped!")}},{protocol:["Oskari.bundle.BundleInstance"]});