/**
 * @class Oskari.mapframework.bundle.myplaces2.view.PlaceForm
 * 
 * Shows a form for my place
 */
Oskari.clazz.define("Oskari.mapframework.bundle.myplaces2.view.PlaceForm",

/**
 * @method create called automatically on construction
 * @static
 */
function(instance) {
    this.instance = instance;
    this.newCategoryId = '-new-';
    this.placeId = undefined;
    this.initialValues = undefined;
    
    var loc = instance.getLocalization('placeform');
    
    this.template = jQuery('<div class="myplacesform">' +
            '<div class="field">' + 
                '<div class="help icon-info" ' + 
                'title="' + loc.tooltip + '"></div>' + 
                '<input type="text" name="placename" placeholder="' + loc.placename.placeholder + '"/>' +
            '</div>' +
            '<div class="field">' +  
                '<textarea name="placedesc" placeholder="' + loc.placedesc.placeholder + '">' +
                '</textarea>' +
            '</div>' +
            '<div class="field">' + 
                '<input type="text" name="placelink" placeholder="' + loc.placelink.placeholder + '"/>' +
            '</div>' +
            '<div class="field">' + 
                '<input type="text" name="imagelink" placeholder="' + loc.imagelink.placeholder + '"/>' +
            '</div>' +
            '<div class="field" id="imagePreview">' +
                '<label>' + loc.imagelink.previewLabel + '</label><br clear="all" />' +
                '<img src=""></img>' +
            '</div>' +
            '<div class="field" id="newLayerForm">' + 
                '<label for="category">' + '<a href="#" class="newLayerLink">' + loc.category.newLayer + '</a>' + loc.category.choose + '</label><br clear="all" />' +
                '<select name="category" autofocus>' +
                '</select>' +
            '</div>' +
        '</div>');
    this.templateOption = jQuery('<option></option>');
    this.categoryForm = undefined;
}, {
    /**
     * @method getForm
     * @param {Oskari.mapframework.bundle.myplaces2.model.MyPlacesCategory[]} categories array containing available categories
     * @return {jQuery} jquery reference for the form 
     */
    getForm : function(categories) {
        var ui = this.template.clone();
        var loc = this.instance.getLocalization('placeform');
        // TODO: if a place is given for editing -> populate fields here
        // populate category options
        if(categories) {
            var selection = ui.find('select[name=category]');
            var option = this.templateOption.clone();
            //option.append(loc.category['new']);
            //option.attr('value', this.newCategoryId);
            //selection.append(option);
            for(var i = 0; i < categories.length; ++i) {
                var cat = categories[i];
                var option = this.templateOption.clone();
                option.append(cat.getName());
                option.attr('value', cat.getId());
                // find another way if we want to keep selection between places
                if(this.initialValues) {
                    if(this.initialValues.place.category == cat.getId()) {
                        option.attr('selected', 'selected');
                    }
                }
                else if(cat.isDefault()) {
                    option.attr('selected', 'selected');
                }
                selection.append(option);
            }
            this._bindCategoryChange();
        }

        this._bindImageUrlChange();
        this._bindCreateNewLayer();
        
        if(this.initialValues) {
            ui.find('input[name=placename]').attr('value', this.initialValues.place.name);
            ui.find('textarea[name=placedesc]').append(this.initialValues.place.desc);
            ui.find('input[name=placelink]').attr('value', this.initialValues.place.link);
            ui.find('input[name=imagelink]').attr('value', this.initialValues.place.imageLink);
        }
        return ui;
    },
    /**
     * @method getValues
     * Returns form values as an object
     * @return {Object} 
     */
    getValues : function() {
        var values = {};
        // infobox will make us lose our reference so search 
        // from document using the form-class
        var onScreenForm = this._getOnScreenForm();
        
        if(onScreenForm.length > 0) {
            // found form on screen
            var placeName = onScreenForm.find('input[name=placename]').val();
            var placeDesc = onScreenForm.find('textarea[name=placedesc]').val();
            var placeLink = onScreenForm.find('input[name=placelink]').val();
            if(placeLink) {
                if(placeLink.indexOf('://') == -1 || placeLink.indexOf('://') > 6) {
                    placeLink = 'http://' + placeLink;
                }
                placeLink = placeLink.replace("<", '');
                placeLink = placeLink.replace(">", '');
            }
            var imageLink = onScreenForm.find('input[name=imagelink]').val();
            var categorySelection = onScreenForm.find('select[name=category]').val();
            values.place = {
                name : placeName,
                desc : placeDesc,
                link : placeLink,
                imageLink: imageLink,
                category : categorySelection
            };
            if(this.placeId) {
                values.place.id = this.placeId;
            }
        }
        if(this.categoryForm) {
           values.category = this.categoryForm.getValues();
        }
        return values;
    },
    /**
     * @method setValues
     * Sets form values from object.
     * @param {Object} data place data as formatted in #getValues() 
     */
    setValues : function(data) {
        this.placeId = data.place.id;
        // infobox will make us lose our reference so search 
        // from document using the form-class
        var onScreenForm = this._getOnScreenForm();
        
        if(onScreenForm.length > 0) {
            // found form on screen
            onScreenForm.find('input[name=placename]').val(data.place.name);
            onScreenForm.find('textarea[name=placedesc]').val(data.place.desc);
            onScreenForm.find('input[name=placelink]').val(data.place.link);
            onScreenForm.find('input[name=imagelink]').val(data.place.imageLink);
            onScreenForm.find('select[name=category]').val(data.place.category);
        }
        
        this.initialValues = data;
    },
    /**
     * @method _bindCategoryChange
     * Binds change listener for category selection.
     * NOTE! THIS IS A WORKAROUND since infobox uses OpenLayers popup which accepts
     * only HTML -> any bindings will be lost
     * @private
     * @param {String} newCategoryId category id for the new category option == when we need to react
     */
    _bindCategoryChange : function() {
        var me = this;
        var onScreenForm = this._getOnScreenForm();
        onScreenForm.find('select[name=category]').live('change', function() {
            // remove category form is initialized
            if(me.categoryForm) {
                me.categoryForm.destroy();
                me.categoryForm = undefined;
            }
        });
    },

    /**
     * Changes the src attribute of the preview image when the user changes the
     * value of the image link field.
     *
     * @method _bindImageUrlChange
     */
    _bindImageUrlChange: function() {
        var me = this;
        var onScreenForm = me._getOnScreenForm();
        onScreenForm.find('input[name=imagelink]').live('change', function() {
            var form = me._getOnScreenForm();
            var src = jQuery(this).val();
            form.find('div#imagePreview').find('img').attr('src', src);
        });
    },

    /**
     * Binds the link for creating a new category.
     *
     * @method _bindCreateNewLayer
     */
    _bindCreateNewLayer: function() {
        var me = this;
        var onScreenForm = me._getOnScreenForm();
        onScreenForm.find('a.newLayerLink').live('click', function(event) {
            var form = me._getOnScreenForm();
            event.preventDefault();
            me.categoryForm = Oskari.clazz.create('Oskari.mapframework.bundle.myplaces2.view.CategoryForm', me.instance);
            form.find('div#newLayerForm').html(me.categoryForm.getForm());
            //add listeners etc.
            me.categoryForm.start();
        });
    },

    /**
     * @method destroy
     * Removes eventlisteners 
     */
    destroy : function() {
        // unbind live bindings
        var onScreenForm = this._getOnScreenForm();
        onScreenForm.find('select[name=category]').die();
        onScreenForm.find('input[name=imagelink]').die();
        onScreenForm.find('a.newLayerLink').die();
        if (this.categoryForm) {
            this.categoryForm.destroy();
            this.categoryForm = undefined;
        }
    },
    /**
     * @method _getOnScreenForm
     * Returns reference to the on screen version shown by OpenLayers 
     * @private
     */
    _getOnScreenForm : function() {
        // unbind live so 
        return jQuery('div.myplacesform');
    }
});
