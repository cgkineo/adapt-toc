# TOC

This extension provides a drawer-based table of contents for Adapt as an alternative to (or complement) a traditional menu (for example `adapt-contrib-boxMenu`).

There are two modes of operation. In the simple case all content objects are listed as links in the drawer. Any content objects that should not appear in the list can be excluded.

For custom usage, groupings can be defined to create a hierarchy of content objects; for example to reflect a menu/submenu structure. Each group can have a title and there is no limit to the level of group nesting.

See example.json for configuration guidance.

If `adapt-contrib-pageLevelProgress` is enabled at course level (`course.json`) this extension calculates progress by the same method as `adapt-contrib-pageLevelProgress`. This is to ensure consistency of the progress indicators.

## Settings Overview

**ToC** is configured with the attributes that follow.

## Attributes

Add to _course.json_ under _\_globals.\_extensions_.

#### \_toc_ (object):
The Table of Contents object

##### \navigationToc (string):
Aria label for the navigation button

##### \toc (string):
Aria label to indicate the beginning of the table of contents

##### \tocEnd (string):
Aria label to indicate the end of the table of contents

##### \tocContentObject (string):
Aria label to indicate completion

##### \optionalContent (string):
Label to indicate optional content

##### \_navTooltip (object):
The tooltip object. Used when tooltips are enabled globally

###### \_isEnabled (boolean):
Enables tooltips on the button

###### \text (string):
The text of the tooltip

Add the following directly to _course.json_.

### *course.json*
The following attributes, set within *course.json*, configure the defaults for **ToC**.

#### \_toc (object):
The toc object contains the following settings:

##### \_drawerPosition (string);
The position that the button appears in the drawer. Position options include 'auto', 'left', and 'right'. Defaults to 'auto'

##### \_excludeContentObjects (array);
Optional list of content object ids to be excluded from the toc list e.g. ["co-100"] or ["co-100", "co-200"]

##### \_grouping (object):
The grouping object contains the following settings:

####### title (string):
The title text for the group list.

####### \_ariaLevel (number):
Define the group list title aria level. Usually this will be set to `1` but if

###### \_classes (string):
CSS class name(s) to be applied to this groups containing `div`. The class(es) must be predefined in one of the Less files. Separate multiple classes with a space.

###### \_items (array):
The items array contains the list of content objects to be included. Can also include the `_grouping` object for nested items.

####### \_classes (string):
CSS class name(s) to be applied to this items containing `div`. The class(es) must be predefined in one of the Less files. Separate multiple classes with a space.

####### \_contentObjects (array):
List of content object ids to be included in the groups item list e.g. ["co-100"] or ["co-100", "co-200"]

### Notes

- In most scenarios it is necessary to specify a start page (see `example.json`).
- It may be necessary to remove (or hide) the back button (`.navigation-back-button`) to prevent Adapt attempting to navigate to `course` level.