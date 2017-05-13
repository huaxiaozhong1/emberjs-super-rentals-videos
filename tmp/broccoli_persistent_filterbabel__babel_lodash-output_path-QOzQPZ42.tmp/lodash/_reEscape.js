define("lodash/_reEscape", ["exports"], function (exports) {
  /** Used to match template delimiters. */
  var reEscape = /<%-([\s\S]+?)%>/g;

  exports["default"] = reEscape;
});