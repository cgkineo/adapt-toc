import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin, getCourse, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('TOC - v1.0.0 to v1.0.1', async () => {
  // https://github.com/cgkineo/adapt-toc/compare/v1.0.0..v1.0.1
  // Update to use drawer position API and tooltips

  let course, hadTocBefore, drawerPositionBefore;

  whereFromPlugin('TOC - from v1.0.0', { name: 'adapt-toc', version: '<1.0.1' });

  // Captured here rather than inside the mutation, so that neutralising the mutation leaves the
  // check able to fail on its own assertion.
  whereContent('TOC - where course exists', async content => {
    course = getCourse();
    if (!course) return false;
    hadTocBefore = _.has(course, '_toc');
    drawerPositionBefore = course._toc?._drawerPosition;
    return true;
  });

  // _drawerPosition replaces js/drawerViewOverrides.js, which put the TOC drawer on the left for
  // every course (on the right under RTL). The new code falls back to 'auto', which follows the
  // global drawer position instead, so the old behaviour is carried across as 'left' rather than
  // the schema default - core's drawer still flips 'left' to the right under RTL. v1.0.0 read
  // `_toc || {}`, so courses without _toc had the left drawer too and get _toc created.
  //
  // _globals._extensions._toc._navTooltip is deliberately not backfilled: v1.0.0 had no tooltip,
  // so writing its default text would add a hover tooltip a course never had.
  mutateContent('TOC - add course._toc._drawerPosition', async content => {
    if (hadTocBefore && !_.isPlainObject(course._toc)) return true;
    if (drawerPositionBefore !== undefined) return true;
    _.set(course, '_toc._drawerPosition', 'left');
    return true;
  });

  checkContent('TOC - check course._toc._drawerPosition', async content => {
    if (hadTocBefore && !_.isPlainObject(course._toc)) return true;
    const expected = drawerPositionBefore !== undefined ? drawerPositionBefore : 'left';
    if (course._toc?._drawerPosition !== expected) throw new Error('TOC - course._toc._drawerPosition invalid');
    return true;
  });

  updatePlugin('TOC - update to v1.0.1', { name: 'adapt-toc', version: '1.0.1', framework: '>=5.22.9' });

  testSuccessWhere('course with _toc - _drawerPosition carried as left', {
    fromPlugins: [{ name: 'adapt-toc', version: '1.0.0' }],
    content: [
      { _type: 'course', _toc: { _excludeContentObjects: [] } }
    ]
  });

  testSuccessWhere('course without _toc - _toc created with _drawerPosition left', {
    fromPlugins: [{ name: 'adapt-toc', version: '1.0.0' }],
    content: [
      { _type: 'course' }
    ]
  });

  testSuccessWhere('course with an authored _drawerPosition - kept', {
    fromPlugins: [{ name: 'adapt-toc', version: '1.0.0' }],
    content: [
      { _type: 'course', _toc: { _drawerPosition: 'right' } }
    ]
  });

  testSuccessWhere('course with a null _drawerPosition - kept', {
    fromPlugins: [{ name: 'adapt-toc', version: '1.0.0' }],
    content: [
      { _type: 'course', _toc: { _drawerPosition: null } }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-toc', version: '1.0.1' }],
    content: [
      { _type: 'course', _toc: {} }
    ]
  });

  testStopWhere('no course', {
    fromPlugins: [{ name: 'adapt-toc', version: '1.0.0' }],
    content: [
      { _type: 'config' }
    ]
  });
});

describe('TOC - v1.0.1 to v1.1.0', async () => {
  // https://github.com/cgkineo/adapt-toc/compare/v1.0.1..v1.1.0
  // New: Add _isEnabled option (fixes #18)

  let course, isEnabledBefore;

  whereFromPlugin('TOC - from v1.0.1', { name: 'adapt-toc', version: '<1.1.0' });

  whereContent('TOC - where course._toc exists', async content => {
    course = getCourse();
    if (!_.isPlainObject(course?._toc)) return false;
    isEnabledBefore = course._toc._isEnabled;
    return true;
  });

  // js/tocNavigationView.js only returns early on `_isEnabled === false`, so an absent value
  // already renders as enabled - writing the schema default codifies it. Authored values are kept.
  mutateContent('TOC - add course._toc._isEnabled', async content => {
    if (isEnabledBefore !== undefined) return true;
    course._toc._isEnabled = true;
    return true;
  });

  checkContent('TOC - check course._toc._isEnabled', async content => {
    const expected = isEnabledBefore !== undefined ? isEnabledBefore : true;
    if (course._toc._isEnabled !== expected) throw new Error('TOC - course._toc._isEnabled invalid');
    return true;
  });

  updatePlugin('TOC - update to v1.1.0', { name: 'adapt-toc', version: '1.1.0', framework: '>=5.22.9' });

  testSuccessWhere('course with _toc - _isEnabled backfilled', {
    fromPlugins: [{ name: 'adapt-toc', version: '1.0.3' }],
    content: [
      { _type: 'course', _toc: { _drawerPosition: 'auto' } }
    ]
  });

  testSuccessWhere('course with _toc._isEnabled false - kept', {
    fromPlugins: [{ name: 'adapt-toc', version: '1.0.3' }],
    content: [
      { _type: 'course', _toc: { _isEnabled: false } }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-toc', version: '1.1.0' }],
    content: [
      { _type: 'course', _toc: {} }
    ]
  });

  testStopWhere('no course._toc', {
    fromPlugins: [{ name: 'adapt-toc', version: '1.0.3' }],
    content: [
      { _type: 'course' }
    ]
  });
});
