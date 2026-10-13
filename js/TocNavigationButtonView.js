import Adapt from 'core/js/adapt';
import NavigationButtonView from 'core/js/views/NavigationButtonView';
import tooltips from 'core/js/tooltips';
import TocView from './tocView';

class TocNavigationButtonView extends NavigationButtonView {

  attributes() {
    return {
      ...super.attributes(),
      'data-tooltip-id': this.model.get('_id'),
      'aria-haspopup': 'dialog'
    };
  }

  initialize(options) {
    super.initialize(options);
    this.tocConfig = options.tocConfig;
    this.setupEventListeners();
    this.render();
    tooltips.register({
      _id: this.model.get('_id'),
      ...this.model.get('_navTooltip') || {}
    });
  }

  setupEventListeners() {
    this.listenTo(Adapt, {
      remove: this.remove
    });
  }

  events() {
    return {
      click: 'onClick'
    };
  }

  onClick(event) {
    if (event) event.preventDefault();
    const position = this.model.get('_drawerPosition') || 'auto';
    Adapt.drawer.openCustomView(new TocView({ cfg: this.tocConfig }).$el, false, position);
  }

  static get template() {
    return 'tocNavigationButton.jsx';
  }

}

export default TocNavigationButtonView;
