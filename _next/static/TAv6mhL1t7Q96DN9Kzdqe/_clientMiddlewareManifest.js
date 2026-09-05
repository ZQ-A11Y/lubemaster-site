self.__MIDDLEWARE_MATCHERS = [
  {
    "regexp": "^\\/lubemaster-site(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next|api|static|.*\\..*).*))(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$",
    "originalSource": "/((?!_next|api|static|.*\\..*).*)"
  }
];self.__MIDDLEWARE_MATCHERS_CB && self.__MIDDLEWARE_MATCHERS_CB()