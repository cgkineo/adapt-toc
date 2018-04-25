# adapt-drawerMenu

This extension provides a drawer-based menu for Adapt.

There are two modes of operation. In the simple case all content objects are listed as links in the drawer. Any content objects that should not appear in the list can be excluded.

For custom usage, groupings can be defined to create a hierarchy of content objects; for example to reflect a menu/submenu structure. Each group can have a title and there is no limit to the level of group nesting.

See example.json for configuration guidance.

If `adapt-contrib-pageLevelProgress` is enabled at course level (`course.json`) this extension calculates progress by the same method as `adapt-contrib-pageLevelProgress`. This is to ensure consistency of the progress indicators.

### Notes

Some elements of drawerView.js are overridden to allow the position of the drawer to be programmatically specified (left or right).