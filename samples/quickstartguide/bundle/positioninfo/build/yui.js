/* This is a packed Oskari bundle (bundle script version Thu May 31 2012 11:32:12 GMT+0300 (Suomen kesäaika)) */ 
Oskari.clazz.define("Oskari.mapframework.bundle.PositionInfoInstance",function(a){this.name="positioninfoModule";this.mediator=null;this.sandbox=null;this.ui=null},{start:function(){if(this.mediator.getState()=="started"){return}this.libs={ext:Oskari.$("Ext")};this.facade=Oskari.$("UI.facade");var a=this.facade.appendExtensionModule(this,this.name,this.eventHandlers,this,"W",{fi:{title:"positioninfo"},sv:{title:"?"},en:{title:"positioninfo"}});this.def=a;this.mediator.setState("started");return this},init:function(a){this.sandbox=a;var b=Oskari.clazz.create("Oskari.mapframework.bundle.PositionInfoUI",this.libs);this.ui=b;b.create();return b.get()},update:function(d,a,c,e){d.alert("RECEIVED update notification @BUNDLE_INSTANCE: "+e)},stop:function(){this.facade.removeExtensionModule(this,this.name,this.eventHandlers,this,this.def);this.def=null;this.mediator.setState("stopped");return this},onEvent:function(a){return this.eventHandlers[a.getName()].apply(this,[a])},eventHandlers:{MouseHoverEvent:function(a){var c=a.getLat();var b=a.getLon();this.ui.updateLocationInfo(c,b)},AfterMapMoveEvent:function(a){var c=a.getCenterY();var b=a.getCenterX();this.ui.updateLocationInfo(c,b);this.mediator.manager.alert("AfterMapMoveEvent "+c+","+b+" @Oskari.mapframework.bundle.PositionInfoInstance "+a.getName())}},getName:function(){return this.__name},__name:"Oskari.mapframework.bundle.PositionInfoInstance"},{protocol:["Oskari.bundle.BundleInstance","Oskari.mapframework.module.Module","Oskari.mapframework.bundle.extension.Extension","Oskari.mapframework.bundle.extension.EventListener"]});Oskari.clazz.define("Oskari.mapframework.bundle.PositionInfoUI",function(a){this.libs=a;this.form=null;this.ui=null},{get:function(){return this.form},create:function(){var a=this.libs.ext;var d=a.create("Ext.form.field.Text",{fieldLabel:"N",name:"fldN"});var c=a.create("Ext.form.field.Text",{fieldLabel:"E",name:"fldE"});this.ui={N:d,E:c};var b=new a.create("Ext.form.Panel",{title:"Simple Form with FieldSets",labelWidth:75,frame:true,bodyStyle:"padding:5px 5px 0",layout:"column",defaults:{bodyPadding:4},items:[{xtype:"fieldset",columnWidth:1,title:"Fieldset 1",collapsible:true,defaultType:"textfield",defaults:{anchor:"100%"},layout:"anchor",items:[d,c]}]});this.form=b;return b},updateLocationInfo:function(b,a){if(!this.ui){return}this.ui.E.setValue(a);this.ui.N.setValue(b)}});