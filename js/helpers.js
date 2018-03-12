define([
    'handlebars',
    'core/js/adapt',
    './completionCalculations'
], function(Handlebars, Adapt, completionCalculations){

    function isStringEmpty(str) {
        return !str || (str.trim && str.trim().length == 0) || ($.trim(str).length == 0)
    }

    var helpers = {

        drawerMenu__isClickable: function(id, options) {
            var model = Adapt.findById(id);

            if (model.get('_isVisible') && Adapt.location._currentId != id) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        },

        drawerMenu__getTitle: function(id, options) {
            var model = Adapt.findById(id);
            var t = model.get('displayTitle');
            if (isStringEmpty(t)) t = model.get('title');
            if (isStringEmpty(t)) t = model.get('_id');
            return t;
        },

        drawerMenu__when: function(id, prop, options) {
            var model = Adapt.findById(id);
            if (model.get(prop)) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        },

        drawerMenu__completionPercentage: function(id, options) {
            var model = Adapt.findById(id);
            
            var completionObject = completionCalculations.calculateCompletion(model);

            var completed = completionObject.nonAssessmentCompleted + completionObject.assessmentCompleted + completionObject.subProgressCompleted;
            var total  = completionObject.nonAssessmentTotal + completionObject.assessmentTotal + completionObject.subProgressTotal;

            var percentageComplete = Math.floor((completed / total)*100);

            return percentageComplete;
        },

        drawerMenu__completionAria: function(id, options) {
            var model = Adapt.findById(id);
            
            var completionObject = completionCalculations.calculateCompletion(model);

            var completed = completionObject.nonAssessmentCompleted + completionObject.assessmentCompleted + completionObject.subProgressCompleted;
            var total  = completionObject.nonAssessmentTotal + completionObject.assessmentTotal + completionObject.subProgressTotal;

            var percentageComplete = Math.floor((completed / total)*100);

            var strings = Adapt.course.get('_globals')._extensions && Adapt.course.get('_globals')._extensions._drawerMenu;

            return strings && strings.drawerMenuIndicatorBar ? (strings.drawerMenuIndicatorBar +  ' ' +  percentageComplete + '%') : (percentageComplete + '%');
        }
    };

    for (var name in helpers) {
        if (helpers.hasOwnProperty(name)) {
             Handlebars.registerHelper(name, helpers[name]);
        }
    }

    return helpers;

});