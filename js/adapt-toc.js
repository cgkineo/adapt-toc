import Backbone from 'backbone';
import Adapt from 'core/js/adapt';
import navigation from 'core/js/navigation';
import NavigationButtonModel from 'core/js/models/NavigationButtonModel';
import './helpers';
import TocNavigationButtonView from './TocNavigationButtonView';

class Toc extends Backbone.Controller {

  initialize() {
    this.listenTo(Adapt, 'app:dataReady', this.onDataReady);
  }

  onDataReady() {
    const config = Adapt.course.get('_toc');
    if (config?._isEnabled === false) return;

    this.listenTo(Adapt, {
      remove: this.removeNavigationButton,
      'router:menu router:page': this.renderNavigationButton
    });
  }

  static get globalsConfig() {
    return Adapt.course.get('_globals')?._extensions?._toc;
  }

  removeNavigationButton() {
    if (!this._navigationButtonView) return;
    navigation.removeButton(this._navigationButtonView);
    this._navigationButtonView = null;
  }

  renderNavigationButton() {
    this.removeNavigationButton();

    const config = Adapt.course.get('_toc') || {};
    const globalsConfig = Toc.globalsConfig ?? {};
    const {
      navigationToc = 'Open table of contents',
      _navTooltip = {}
    } = globalsConfig;
    const {
      _navOrder = 0,
      _showLabel = null,
      _iconClasses = 'icon-menu',
      navLabel = ''
    } = globalsConfig._navButton ?? {};

    const model = new NavigationButtonModel({
      _id: 'toc',
      _order: _navOrder,
      _showLabel,
      _classes: 'nav__toc-btn toc-navigation',
      _iconClasses,
      _role: 'button',
      ariaLabel: navigationToc,
      text: navLabel || navigationToc,
      _navTooltip,
      _drawerPosition: config._drawerPosition || 'auto'
    });

    this._navigationButtonView = new TocNavigationButtonView({
      model,
      tocConfig: config
    });
    navigation.addButton(this._navigationButtonView);
  }

}

export default (Adapt.toc = new Toc());
