define([
  'core/js/adapt'
], function(Adapt) {

  var TocView = Backbone.View.extend({

    className: 'toc',

    initialize: function(options) {
      this.cfg = options.cfg;
      this.listenTo(Adapt, 'drawer:closed', this.onDrawerClosed);
      this.listenTo(Adapt, 'remove', this.remove);
      this.render();
      $('.drawer').addClass('has-toc');
    },

    events: {
      'click .toc__item button': 'scrollToPageElement'
    },

    scrollToPageElement: function(event) {
      if (event && event.preventDefault) event.preventDefault();

      var $target = $(event.currentTarget);
      if ($target.is('.is-disabled')) return;

      var selector = '.' + $(event.currentTarget).attr('data-toc-id');
      Adapt.once('drawer:closed', function() {
        Adapt.navigateToElement(selector, { duration:400 });
      });
      Adapt.trigger('drawer:closeDrawer');
    },

    render: function() {
      var data = {
        _grouping:this.getGroups(this.cfg),
        _globals: Adapt.course.get('_globals')
      };
      var template = Handlebars.templates.toc;
      this.$el.html(template(data));
      this.$el.a11y_aria_label(true);
      return this;
    },

    onDrawerClosed: function() {
      Adapt.trigger('drawer:setDrawerDir');
      $('.drawer').removeClass('has-toc');
    },

    remove: function() {
      Adapt.trigger('drawer:setDrawerDir');
      Backbone.View.prototype.remove.apply(this, arguments);
    },
	
    childParentMapping: function(root, map = []) {
      const children = root.getChildren();
		
      children.models.forEach(child => {
        map.push({id: child.get('_id'), parentId: root.get('_id'), obj: child});

        if (child.hasManagedChildren) {
          this.childParentMapping(child, map);
        }
      });
		
      return map;
    },
	
    treeMapping: function(childParentMapping) {
      // source: https://typeofnan.dev/an-easy-way-to-build-a-tree-with-object-references/
      const idMapping = childParentMapping.reduce((acc, el, i) => {
        acc[el.id] = i;
        return acc;
      }, {});
		
      let root;
		
      childParentMapping.forEach((el) => {
        // Handle the root element
        if (el.parentId === null) {
          root = el;
          return;
	}
	// Use our mapping to locate the parent element in our data array
	const parentEl = childParentMapping[idMapping[el.parentId]];
	// Add our current el to its parent's `children` array
	parentEl.children = [...(parentEl.children || []), el];
      });

      return root;
    },

    cleanUp: function(node) {
      if (!node._contentObjects.length > 0) {
        delete node._contentObjects;
      }

      if (!node._grouping._items.length > 0) {
        delete node._grouping;
      }

      delete node.parentId;
      delete node.children;
      delete node.obj;

      return node;
    },
	
    addMeta: function(node, ariaLevel, maxLevel) {
      node.title = node.obj.get('title');
      node._classes = '';
      node._ariaLevel = ariaLevel;

      node._contentObjects = [];
      node._grouping = {"_classes": "", "_items": []};

      typeGroups = ['menu', 'page', 'article', 'block', 'component'];

      if (typeGroups.indexOf(node.obj.getTypeGroup()) > maxLevel) {
        return this.cleanUp(node);
      } else {
        node.children.forEach(child => {
          if ((!child.obj.hasManagedChildren) || typeGroups.indexOf(child.obj.getTypeGroup()) > maxLevel) {
            node._contentObjects.push(child.id);
          } else {
            node._grouping._items.push(Object.assign({}, child, this.addMeta(child, ariaLevel+1, maxLevel)));
          }
        });
      }

      return this.cleanUp(node);
    },
	
    buildGrouping: function(treeMapping, ariaLevel = 1, maxLevel) {
      treeMapping.children.forEach(node => {
        node = this.addMeta(node, ariaLevel, maxLevel);
      });
	  
      return treeMapping;
    },
    
    getGroups: function(config) {
      if (config._grouping) {
        return config._grouping;
      } else if (config._autoGrouping._enabled) {
        map = this.childParentMapping(Adapt.course);
        
        map.push({id: Adapt.course.get('_id'), parentId: null});
        
        // maxLevel: 0 => menu/page; 1 => article; 2 => block; 3 => component
        var preResult = this.buildGrouping(
          this.treeMapping(map),
          ariaLevel = 1,
          maxLevel = config._autoGrouping._maxLevel
        );
        
        var result = [];
        
        preResult.children.forEach(child => {
          if (child._contentObjects || child._grouping) {
              result.push(child);
          } else {
              result.push({"_ariaLevel": 1, "_classes": '', "_contentObjects": [child.id]});
          }
        });
        
        return {
          "_classes": config._classes,
          "_items": result
        };
      } else {
        return {
          "_classes": config._classes,
          "_items": [{'_contentObjects': _.difference(Adapt.contentObjects.pluck('_id'), config._excludeContentObjects)}]
        };
      }
    }
  });

  return TocView;

});
