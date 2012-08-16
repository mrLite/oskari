/* This is a packed Oskari bundle (bundle script version Wed Feb 29 2012 07:56:03 GMT+0200 (Suomen normaaliaika)) */ 
Oskari.clazz.define("Oskari.poc.dojo.bundle.LayerSelectionBundleInstance",function(){this.map=null;this.core=null;this.sandbox=null;this.mapmodule=null;this.started=false;this.template=null;this.dojo=null},{__name:"DojoLayerSelection",getName:function(){return this.__name},start:function(){var b=this;if(b.started){return}b.started=true;var a=Oskari.$("sandbox");b.sandbox=a;b.mediator.bundle.require(function(c){b.dojo=c;a.register(b);for(p in b.eventHandlers){a.registerForEventByName(b,p)}b.refresh()})},init:function(){return null},update:function(){},refresh:function(){var o=this;if(!o.dojo){return}var o=this;var d=o.dojo.dojo;var e=o.dojo["dojo/dom-construct"];var g=o.dojo["dojo/dom"];var o=this;var q=g.byId("layerselection");var l=this.template;var s=this.sandbox;var a=s.getRequestBuilder("ChangeMapLayerOpacityRequest");e.empty(q);var h=s.findAllSelectedMapLayers();for(var c=0,k=h.length;c<k;c++){var j=h[c];var f=j.getId();var r=j.getOpacity();var m=e.create("div",{className:"layer",style:{}},q);var i=e.create("p",{className:"layer",innerHTML:j.getName()},m);var b=new o.dojo["dijit/form/HorizontalSlider"]({minimum:0,maximum:100,pageIncrement:20,value:r,intermediateChanges:true,style:"width: 200px;",layer:j,moduleName:o.getName()},m);d.connect(b,"onChange",function(u){var t=this.moduleName;var n=this.layer.getId();s.request(t,a(n,u))});b.startup()}},afterChangeMapLayerOpacityEvent:function(a){},onEvent:function(b){var a=this.eventHandlers[b.getName()];if(!a){return}return a.apply(this,[b])},eventHandlers:{AfterMapLayerAddEvent:function(a){this.refresh()},AfterMapLayerRemoveEvent:function(a){this.refresh()},AfterMapMoveEvent:function(a){},AfterChangeMapLayerOpacityEvent:function(a){if(this.sandbox.getObjectCreator(a)!=this.getName()){this.afterChangeMapLayerOpacityEvent(a)}}},stop:function(){var a=this.sandbox();for(p in this.eventHandlers){a.unregisterFromEventByName(this,p)}this.sandbox.unregister(this);this.started=false}},{protocol:["Oskari.bundle.BundleInstance","Oskari.mapframework.module.Module"]});