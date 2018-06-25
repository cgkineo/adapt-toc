# TOC

This extension provides a drawer-based table of contents for Adapt as an alternative to (or complement) a traditional menu (for example `adapt-contrib-boxMenu`).

There are two modes of operation. In the simple case all content objects are listed as links in the drawer. Any content objects that should not appear in the list can be excluded.

For custom usage, groupings can be defined to create a hierarchy of content objects; for example to reflect a menu/submenu structure. Each group can have a title and there is no limit to the level of group nesting.

See example.json for configuration guidance.

If `adapt-contrib-pageLevelProgress` is enabled at course level (`course.json`) this extension calculates progress by the same method as `adapt-contrib-pageLevelProgress`. This is to ensure consistency of the progress indicators.

### Notes

- The plugin requires a minimum Adapt framework version of `2.0.8` (this version introduced support for courses that do not use traditional menus).
- Some elements of `drawerView.js` are overridden to allow the position of the drawer to be programmatically specified (left or right).
- In most scenarios it is necessary to specify a start page (see `example.json`).
- It may be necessary to remove (or hide) the back button (`.navigation-back-button`) to prevent Adapt attempting to navigate to `course` level.
