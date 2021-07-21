define([
  'handlebars',
  'core/js/adapt',
  './completionCalculations'
], function(Handlebars, Adapt, completionCalculations){

  function isStringEmpty(str) {
    return !str || (str.trim && str.trim().length == 0) || ($.trim(str).length == 0)
  }

  var helpers = {

    toc__isClickable: function(id, options) {
      var model = Adapt.findById(id);

      if (!model.get('_isLocked') && model.get('_isVisible') && Adapt.location._currentId != id) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    },

    toc__getTitle: function(id, options) {
      var model = Adapt.findById(id);
      var t = model.get('displayTitle');
      if (isStringEmpty(t)) t = model.get('title');
      if (isStringEmpty(t)) t = model.get('_id');
      return t;
    },

    toc__when: function(id, prop, options) {
      var model = Adapt.findById(id);
      if (model.get(prop)) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    },

    toc__completionPercentage: function(id, options) {
      var model = Adapt.findById(id);

      var completionObject = completionCalculations.calculateCompletion(model);

      var completed = completionObject.nonAssessmentCompleted + completionObject.assessmentCompleted + completionObject.subProgressCompleted;
      var total  = completionObject.nonAssessmentTotal + completionObject.assessmentTotal + completionObject.subProgressTotal;

      var percentageComplete = Math.floor((completed / total)*100);

      return percentageComplete;
    },

    toc__completionAria: function(id, options) {
      var model = Adapt.findById(id);

      var completionObject = completionCalculations.calculateCompletion(model);

      var completed = completionObject.nonAssessmentCompleted + completionObject.assessmentCompleted + completionObject.subProgressCompleted;
      var total = completionObject.nonAssessmentTotal + completionObject.assessmentTotal + completionObject.subProgressTotal;

      var percentageComplete = Math.floor((completed / total)*100);

      var lockedStr = model.get('_isLocked') ? Adapt.course.get('_globals')._accessibility._ariaLabels.locked + '. ' : '';
      var tocStrings = Adapt.course.get('_globals')._extensions && Adapt.course.get('_globals')._extensions._toc;
      var template = lockedStr + '{{title}}. You have completed {{percentage}}%.';

      if (tocStrings && tocStrings.tocContentObject) {
        template = lockedStr + tocStrings.tocContentObject;
      }

      return template.replace('{{title}}', helpers.toc__getTitle(id)).replace('{{percentage}}', percentageComplete);
    }
  };

  for (var name in helpers) {
    if (helpers.hasOwnProperty(name)) {
      Handlebars.registerHelper(name, helpers[name]);
    }
  }

  return helpers;

});
