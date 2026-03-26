import Backbone from 'backbone';
import Adapt from 'core/js/adapt';
import navigation from 'core/js/navigation';
import NavigationButtonModel from 'core/js/models/NavigationButtonModel';
import './helpers';
import TocNavigationButtonView from './TocNavigationButtonView';

class Toc extends Backbone.Controller {

  initialize() {
    this.listenTo(Adapt, 'adapt:start', this.onAdaptStart);
  }

  onAdaptStart() {
    const config = Adapt.course.get('_toc');
    if (config?._isEnabled === false) return;

    this.renderNavigationButton();
  }

  static get globalsConfig() {
    return Adapt.course.get('_globals')?._extensions?._toc;
  }

  renderNavigationButton() {
    const config = Adapt.course.get('_toc') || {};
    const globalsConfig = Toc.globalsConfig ?? {};
    const {
      _navOrder = 0,
      _showLabel = null,
      navLabel = '',
      navigationToc = 'Open table of contents',
      _navTooltip = {}
    } = globalsConfig;

    const model = new NavigationButtonModel({
      _id: 'toc',
      _order: _navOrder,
      _showLabel,
      _classes: 'btn-icon nav__btn nav__toc-btn toc-navigation',
      _iconClasses: 'icon-menu',
      _role: 'button',
      ariaLabel: navigationToc,
      text: navLabel || navigationToc,
      _navTooltip,
      _drawerPosition: config._drawerPosition || 'auto'
    });

    navigation.addButton(new TocNavigationButtonView({
      model,
      tocConfig: config
    }));
  }

}

export default (Adapt.toc = new Toc());
