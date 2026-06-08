# adapt-toc

**Table of Contents** is an extension that provides a drawer-based table of contents for Adapt as an alternative to (or to complement) a traditional menu (e.g. `adapt-contrib-boxMenu`).

There are two modes of operation: simple and custom.

- In the *simple* case, all content objects are listed as links in the drawer. Any content objects that should not appear in the list can be excluded.

- For *custom* usage, groupings can be defined to create a hierarchy of content objects; for example to reflect a menu/submenu structure. Each group can have a title and there is no limit to the level of group nesting.

See [*example.json*](https://github.com/cgkineo/adapt-toc/blob/master/example.json) for configuration guidance.

If `adapt-contrib-pageLevelProgress` is enabled at course level (*course.json*), this extension calculates progress by the same method as `adapt-contrib-pageLevelProgress`. This is to ensure consistency of the progress indicators.

## Settings Overview

**Table of Contents** is configured with the attributes that follow. The extension uses the [Navigation Button API](https://github.com/adaptlearning/adapt_framework/wiki/Navigation#navigation-button-api) (requires Framework 5.30.3+) which supports button labels, ordering, and tooltips.

### Attributes

All configuration options must be added and amended, where appropriate, for all JSON files.

#### *course.json - \_globals.\_extensions*

The following attributes are set within *course.json* under `_globals._extensions`. These control the navigation button appearance and labelling.

**\_toc** (object): The Table of Contents globals object contains the following settings:

>**navigationToc** (string): Aria label for the navigation button. Defaults to `"Open table of contents"`.

>**toc** (string): Aria label to indicate the beginning of the table of contents. Defaults to `"Table of contents"`.

>**tocEnd** (string): Aria label to indicate the end of the table of contents. Defaults to `"You have reached the end of the table of contents."`.

>**tocContentObject** (string): Aria label template for content object completion status. Supports `{{title}}` and `{{percentage}}` placeholders. Defaults to `"{{title}}. You have completed {{percentage}}%."`.

>**optionalContent** (string): Label to indicate optional content. Defaults to `"Optional Content"`.

>**\_navOrder** (number): Determines the order in which the button appears in the navigation bar. Defaults to `0`.

>**\_showLabel** (boolean): Controls whether the navigation button label is displayed. Defaults to `true`.

>**\_iconClasses** (string): CSS class for the navigation button icon. Defaults to `"icon-menu"`.

>**navLabel** (string): The button label text as it appears in the navigation. Defaults to the `navigationToc` aria label if empty.

>**\_navTooltip** (object): The Navigation Tooltip object. Used when tooltips are enabled globally.

>>**\_isEnabled** (boolean): Controls whether the tooltip is enabled on the button. Defaults to `true`.

>>**text** (string): The text of the tooltip. Defaults to `"Table of Contents"`.

#### *course.json*

The following attributes, set within *course.json*, configure the defaults for **Table of Contents**. Add directly to *course.json*.

**\_toc** (object): The Table of Contents object contains the following settings:

>**\_isEnabled** (boolean): Turns on and off the **Table of Contents** extension. Defaults to `true`.

>**\_drawerPosition** (string): The position that the drawer appears. Options include `"auto"`, `"left"`, and `"right"`. Defaults to `"auto"`.

>**\_excludeContentObjects** (array): Optional list of content object `_id` values to be *excluded* from the ToC list. For example, `["co-100"]` or `["co-100", "co-200"]`. To exclude the menu link, use `"course"`.

>**\_grouping** (object): Defines a custom hierarchy of content objects. Contains the following settings:

>>**title** (string): The title text for the group list.

>>**\_ariaLevel** (number): Defines the group list title aria level. Usually set to `1` but can be overridden.

>>**\_classes** (string): CSS class name(s) to be applied to the group's containing `div`. Separate multiple classes with a space.

>>**\_items** (array): The items array contains the list of content objects to be included. Each item can also include a nested `_grouping` object. Items contain the following settings:

>>>**\_classes** (string): CSS class name(s) to be applied to this item's containing `div`. Separate multiple classes with a space.

>>>**\_contentObjects** (array): List of content object IDs to be *included* in the group's item list. For example, `["co-100"]` or `["co-100", "co-200"]`.

### Notes

- In most scenarios it is necessary to specify a start page (see [*example.json*](https://github.com/cgkineo/adapt-toc/blob/master/example.json)).
- It may be necessary to remove (or hide) the back button to prevent Adapt attempting to navigate to `course` level.

## Limitations

No known limitations.

----------------------------

**Author / maintainer:** Mindtools Kineo<br>
**Accessibility support:** WAI AA<br>
**RTL support:** Yes<br>
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, Safari for macOS/iOS/iPadOS, Opera<br>
