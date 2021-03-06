describe('Test Suite for PersonalData - Guest user', function() {
    var appSetup = null,
        appConf = null; 
 
    var module = null,
        sandbox = null;

    before(function() {
        // startup the oskari application with publisher bundle, 2 test layers and signed in user
        appSetup = getStartupSequence([
            'openlayers-default-theme', 
            'mapfull', 
            'divmanazer',
            'personaldata'
        ]);
    
        var mapfullConf = getConfigForMapfull();
        // overwrite test wide appConf
        appConf = { 
            "mapfull" : mapfullConf
        };
    });

    var startApplication = function(done) {
        //setup HTML
        jQuery("body").html(getDefaultHTML());  
        // startup Oskari
        setupOskari(appSetup, appConf, function() {
            sandbox = Oskari.$("sandbox");
            module = sandbox.findRegisteredModuleInstance('PersonalData'); 
            done();
        });
    };

    describe('should be localized', function() { 
 
        before(function(done) {
            startApplication(done);
        });

        after(function() {
            teardown();
        }); 

        it("and localization should have same structures for fi, sv and en", function() {
            var result = matchLocalization(module.getName(), ['fi', 'sv', 'en']);
            expect(result).to.be(true);
        });

    });

});