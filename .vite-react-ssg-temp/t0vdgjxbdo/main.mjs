var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b;
import { ViteReactSSG } from "vite-react-ssg";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import React__default, { Component, createContext, useContext, useState, forwardRef, useCallback, useEffect, lazy, Suspense } from "react";
import { Link as Link$1, NavLink, useParams, useLocation, useNavigate, Navigate, Outlet } from "react-router-dom";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import { ChevronDown, X, Menu, MapPin, Phone, Mail, Home, ArrowLeft, CalendarIcon, Gavel, Lightbulb, Palette, BookOpen, Scale, FileText, Calculator, Loader2, AlertTriangle, Cookie, Info } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { createClient } from "@supabase/supabase-js";
import * as ToastPrimitives from "@radix-ui/react-toast";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DOMPurify from "dompurify";
var TAG_NAMES = /* @__PURE__ */ ((TAG_NAMES2) => {
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["FRAGMENT"] = "Symbol(react.fragment)";
  return TAG_NAMES2;
})(TAG_NAMES || {});
var SEO_PRIORITY_TAGS = {
  link: { rel: ["amphtml", "canonical", "alternate"] },
  script: { type: ["application/ld+json"] },
  meta: {
    charset: "",
    name: ["generator", "robots", "description"],
    property: [
      "og:type",
      "og:title",
      "og:url",
      "og:image",
      "og:image:alt",
      "og:description",
      "twitter:url",
      "twitter:title",
      "twitter:description",
      "twitter:image",
      "twitter:image:alt",
      "twitter:card",
      "twitter:site"
    ]
  }
};
var VALID_TAG_NAMES = Object.values(TAG_NAMES);
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HTML_TAG_MAP = Object.entries(REACT_TAG_MAP).reduce(
  (carry, [key, value]) => {
    carry[value] = key;
    return carry;
  },
  {}
);
var HELMET_ATTRIBUTE = "data-rh";
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate",
  PRIORITIZE_SEO_TAGS: "prioritizeSeoTags"
};
var getInnermostProperty = (propsList, property) => {
  for (let i = propsList.length - 1; i >= 0; i -= 1) {
    const props = propsList[i];
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      return props[property];
    }
  }
  return null;
};
var getTitleFromPropsList = (propsList) => {
  let innermostTitle = getInnermostProperty(
    propsList,
    "title"
    /* TITLE */
  );
  const innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
  if (Array.isArray(innermostTitle)) {
    innermostTitle = innermostTitle.join("");
  }
  if (innermostTemplate && innermostTitle) {
    return innermostTemplate.replace(/%s/g, () => innermostTitle);
  }
  const innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = (propsList) => getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || (() => {
});
var getAttributesFromPropsList = (tagType, propsList) => propsList.filter((props) => typeof props[tagType] !== "undefined").map((props) => props[tagType]).reduce((tagAttrs, current) => ({ ...tagAttrs, ...current }), {});
var getBaseTagFromPropsList = (primaryAttributes, propsList) => propsList.filter((props) => typeof props[
  "base"
  /* BASE */
] !== "undefined").map((props) => props[
  "base"
  /* BASE */
]).reverse().reduce((innermostBaseTag, tag) => {
  if (!innermostBaseTag.length) {
    const keys = Object.keys(tag);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const lowerCaseAttributeKey = attributeKey.toLowerCase();
      if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
        return innermostBaseTag.concat(tag);
      }
    }
  }
  return innermostBaseTag;
}, []);
var warn = (msg) => console && typeof console.warn === "function" && console.warn(msg);
var getTagsFromPropsList = (tagName, primaryAttributes, propsList) => {
  const approvedSeenTags = {};
  return propsList.filter((props) => {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn(
        `Helmet: ${tagName} should be of type "Array". Instead found type "${typeof props[tagName]}"`
      );
    }
    return false;
  }).map((props) => props[tagName]).reverse().reduce((approvedTags, instanceTags) => {
    const instanceSeenTags = {};
    instanceTags.filter((tag) => {
      let primaryAttributeKey;
      const keys2 = Object.keys(tag);
      for (let i = 0; i < keys2.length; i += 1) {
        const attributeKey = keys2[i];
        const lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === "rel" && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === "rel" && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === "innerHTML" || attributeKey === "cssText" || attributeKey === "itemprop")) {
          primaryAttributeKey = attributeKey;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      const value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach((tag) => approvedTags.push(tag));
    const keys = Object.keys(instanceSeenTags);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const tagUnion = {
        ...approvedSeenTags[attributeKey],
        ...instanceSeenTags[attributeKey]
      };
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getAnyTrueFromPropsList = (propsList, checkedTag) => {
  if (Array.isArray(propsList) && propsList.length) {
    for (let index = 0; index < propsList.length; index += 1) {
      const prop = propsList[index];
      if (prop[checkedTag]) {
        return true;
      }
    }
  }
  return false;
};
var reducePropsToState = (propsList) => ({
  baseTag: getBaseTagFromPropsList([
    "href"
    /* HREF */
  ], propsList),
  bodyAttributes: getAttributesFromPropsList("bodyAttributes", propsList),
  defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
  encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
  htmlAttributes: getAttributesFromPropsList("htmlAttributes", propsList),
  linkTags: getTagsFromPropsList(
    "link",
    [
      "rel",
      "href"
      /* HREF */
    ],
    propsList
  ),
  metaTags: getTagsFromPropsList(
    "meta",
    [
      "name",
      "charset",
      "http-equiv",
      "property",
      "itemprop"
      /* ITEM_PROP */
    ],
    propsList
  ),
  noscriptTags: getTagsFromPropsList("noscript", [
    "innerHTML"
    /* INNER_HTML */
  ], propsList),
  onChangeClientState: getOnChangeClientState(propsList),
  scriptTags: getTagsFromPropsList(
    "script",
    [
      "src",
      "innerHTML"
      /* INNER_HTML */
    ],
    propsList
  ),
  styleTags: getTagsFromPropsList("style", [
    "cssText"
    /* CSS_TEXT */
  ], propsList),
  title: getTitleFromPropsList(propsList),
  titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
  prioritizeSeoTags: getAnyTrueFromPropsList(propsList, HELMET_PROPS.PRIORITIZE_SEO_TAGS)
});
var flattenArray = (possibleArray) => Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
var checkIfPropsMatch = (props, toMatch) => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i += 1) {
    if (toMatch[keys[i]] && toMatch[keys[i]].includes(props[keys[i]])) {
      return true;
    }
  }
  return false;
};
var prioritizer = (elementsList, propsToMatch) => {
  if (Array.isArray(elementsList)) {
    return elementsList.reduce(
      (acc, elementAttrs) => {
        if (checkIfPropsMatch(elementAttrs, propsToMatch)) {
          acc.priority.push(elementAttrs);
        } else {
          acc.default.push(elementAttrs);
        }
        return acc;
      },
      { priority: [], default: [] }
    );
  }
  return { default: elementsList, priority: [] };
};
var without = (obj, key) => {
  return {
    ...obj,
    [key]: void 0
  };
};
var SELF_CLOSING_TAGS = [
  "noscript",
  "script",
  "style"
  /* STYLE */
];
var encodeSpecialCharacters = (str, encode = true) => {
  if (encode === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var generateElementAttributesAsString = (attributes) => Object.keys(attributes).reduce((str, key) => {
  const attr = typeof attributes[key] !== "undefined" ? `${key}="${attributes[key]}"` : `${key}`;
  return str ? `${str} ${attr}` : attr;
}, "");
var generateTitleAsString = (type, title, attributes, encode) => {
  const attributeString = generateElementAttributesAsString(attributes);
  const flattenedTitle = flattenArray(title);
  return attributeString ? `<${type} ${HELMET_ATTRIBUTE}="true" ${attributeString}>${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>` : `<${type} ${HELMET_ATTRIBUTE}="true">${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>`;
};
var generateTagsAsString = (type, tags, encode = true) => tags.reduce((str, t2) => {
  const tag = t2;
  const attributeHtml = Object.keys(tag).filter(
    (attribute) => !(attribute === "innerHTML" || attribute === "cssText")
  ).reduce((string, attribute) => {
    const attr = typeof tag[attribute] === "undefined" ? attribute : `${attribute}="${encodeSpecialCharacters(tag[attribute], encode)}"`;
    return string ? `${string} ${attr}` : attr;
  }, "");
  const tagContent = tag.innerHTML || tag.cssText || "";
  const isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
  return `${str}<${type} ${HELMET_ATTRIBUTE}="true" ${attributeHtml}${isSelfClosing ? `/>` : `>${tagContent}</${type}>`}`;
}, "");
var convertElementAttributesToReactProps = (attributes, initProps = {}) => Object.keys(attributes).reduce((obj, key) => {
  const mapped = REACT_TAG_MAP[key];
  obj[mapped || key] = attributes[key];
  return obj;
}, initProps);
var generateTitleAsReactComponent = (_type, title, attributes) => {
  const initProps = {
    key: title,
    [HELMET_ATTRIBUTE]: true
  };
  const props = convertElementAttributesToReactProps(attributes, initProps);
  return [React__default.createElement("title", props, title)];
};
var generateTagsAsReactComponent = (type, tags) => tags.map((tag, i) => {
  const mappedTag = {
    key: i,
    [HELMET_ATTRIBUTE]: true
  };
  Object.keys(tag).forEach((attribute) => {
    const mapped = REACT_TAG_MAP[attribute];
    const mappedAttribute = mapped || attribute;
    if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
      const content = tag.innerHTML || tag.cssText;
      mappedTag.dangerouslySetInnerHTML = { __html: content };
    } else {
      mappedTag[mappedAttribute] = tag[attribute];
    }
  });
  return React__default.createElement(type, mappedTag);
});
var getMethodsForTag = (type, tags, encode = true) => {
  switch (type) {
    case "title":
      return {
        toComponent: () => generateTitleAsReactComponent(type, tags.title, tags.titleAttributes),
        toString: () => generateTitleAsString(type, tags.title, tags.titleAttributes, encode)
      };
    case "bodyAttributes":
    case "htmlAttributes":
      return {
        toComponent: () => convertElementAttributesToReactProps(tags),
        toString: () => generateElementAttributesAsString(tags)
      };
    default:
      return {
        toComponent: () => generateTagsAsReactComponent(type, tags),
        toString: () => generateTagsAsString(type, tags, encode)
      };
  }
};
var getPriorityMethods = ({ metaTags, linkTags, scriptTags, encode }) => {
  const meta = prioritizer(metaTags, SEO_PRIORITY_TAGS.meta);
  const link = prioritizer(linkTags, SEO_PRIORITY_TAGS.link);
  const script = prioritizer(scriptTags, SEO_PRIORITY_TAGS.script);
  const priorityMethods = {
    toComponent: () => [
      ...generateTagsAsReactComponent("meta", meta.priority),
      ...generateTagsAsReactComponent("link", link.priority),
      ...generateTagsAsReactComponent("script", script.priority)
    ],
    toString: () => (
      // generate all the tags as strings and concatenate them
      `${getMethodsForTag("meta", meta.priority, encode)} ${getMethodsForTag(
        "link",
        link.priority,
        encode
      )} ${getMethodsForTag("script", script.priority, encode)}`
    )
  };
  return {
    priorityMethods,
    metaTags: meta.default,
    linkTags: link.default,
    scriptTags: script.default
  };
};
var mapStateOnServer = (props) => {
  const {
    baseTag,
    bodyAttributes,
    encode = true,
    htmlAttributes,
    noscriptTags,
    styleTags,
    title = "",
    titleAttributes,
    prioritizeSeoTags
  } = props;
  let { linkTags, metaTags, scriptTags } = props;
  let priorityMethods = {
    toComponent: () => [],
    toString: () => ""
  };
  if (prioritizeSeoTags) {
    ({ priorityMethods, linkTags, metaTags, scriptTags } = getPriorityMethods(props));
  }
  return {
    priority: priorityMethods,
    base: getMethodsForTag("base", baseTag, encode),
    bodyAttributes: getMethodsForTag("bodyAttributes", bodyAttributes, encode),
    htmlAttributes: getMethodsForTag("htmlAttributes", htmlAttributes, encode),
    link: getMethodsForTag("link", linkTags, encode),
    meta: getMethodsForTag("meta", metaTags, encode),
    noscript: getMethodsForTag("noscript", noscriptTags, encode),
    script: getMethodsForTag("script", scriptTags, encode),
    style: getMethodsForTag("style", styleTags, encode),
    title: getMethodsForTag("title", { title, titleAttributes }, encode)
  };
};
var server_default = mapStateOnServer;
var instances = [];
var isDocument = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var HelmetData = class {
  constructor(context, canUseDOM) {
    __publicField(this, "instances", []);
    __publicField(this, "canUseDOM", isDocument);
    __publicField(this, "context");
    __publicField(this, "value", {
      setHelmet: (serverState) => {
        this.context.helmet = serverState;
      },
      helmetInstances: {
        get: () => this.canUseDOM ? instances : this.instances,
        add: (instance) => {
          (this.canUseDOM ? instances : this.instances).push(instance);
        },
        remove: (instance) => {
          const index = (this.canUseDOM ? instances : this.instances).indexOf(instance);
          (this.canUseDOM ? instances : this.instances).splice(index, 1);
        }
      }
    });
    this.context = context;
    this.canUseDOM = canUseDOM || false;
    if (!canUseDOM) {
      context.helmet = server_default({
        baseTag: [],
        bodyAttributes: {},
        encodeSpecialCharacters: true,
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
  }
};
var major = parseInt(React__default.version.split(".")[0], 10);
var isReact19 = major >= 19;
var defaultValue = {};
var Context = React__default.createContext(defaultValue);
var HelmetProvider = (_a = class extends Component {
  constructor(props) {
    super(props);
    __publicField(this, "helmetData");
    if (isReact19) {
      this.helmetData = null;
    } else {
      this.helmetData = new HelmetData(this.props.context || {}, _a.canUseDOM);
    }
  }
  render() {
    if (isReact19) {
      return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, this.props.children);
    }
    return /* @__PURE__ */ React__default.createElement(Context.Provider, { value: this.helmetData.value }, this.props.children);
  }
}, __publicField(_a, "canUseDOM", isDocument), _a);
var updateTags = (type, tags) => {
  const headElement = document.head || document.querySelector(
    "head"
    /* HEAD */
  );
  const tagNodes = headElement.querySelectorAll(`${type}[${HELMET_ATTRIBUTE}]`);
  const oldTags = [].slice.call(tagNodes);
  const newTags = [];
  let indexToDelete;
  if (tags && tags.length) {
    tags.forEach((tag) => {
      const newElement = document.createElement(type);
      for (const attribute in tag) {
        if (Object.prototype.hasOwnProperty.call(tag, attribute)) {
          if (attribute === "innerHTML") {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === "cssText") {
            const cssText = tag.cssText;
            newElement.appendChild(document.createTextNode(cssText));
          } else {
            const attr = attribute;
            const value = typeof tag[attr] === "undefined" ? "" : tag[attr];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(HELMET_ATTRIBUTE, "true");
      if (oldTags.some((existingTag, index) => {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach((tag) => {
    var _a2;
    return (_a2 = tag.parentNode) == null ? void 0 : _a2.removeChild(tag);
  });
  newTags.forEach((tag) => headElement.appendChild(tag));
  return {
    oldTags,
    newTags
  };
};
var updateAttributes = (tagName, attributes) => {
  const elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  const helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  const helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  const attributesToRemove = [...helmetAttributes];
  const attributeKeys = Object.keys(attributes);
  for (const attribute of attributeKeys) {
    const value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    const indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (let i = attributesToRemove.length - 1; i >= 0; i -= 1) {
    elementTag.removeAttribute(attributesToRemove[i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTitle = (title, attributes) => {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }
  updateAttributes("title", attributes);
};
var commitTagChanges = (newState, cb) => {
  const {
    baseTag,
    bodyAttributes,
    htmlAttributes,
    linkTags,
    metaTags,
    noscriptTags,
    onChangeClientState,
    scriptTags,
    styleTags,
    title,
    titleAttributes
  } = newState;
  updateAttributes("body", bodyAttributes);
  updateAttributes("html", htmlAttributes);
  updateTitle(title, titleAttributes);
  const tagUpdates = {
    baseTag: updateTags("base", baseTag),
    linkTags: updateTags("link", linkTags),
    metaTags: updateTags("meta", metaTags),
    noscriptTags: updateTags("noscript", noscriptTags),
    scriptTags: updateTags("script", scriptTags),
    styleTags: updateTags("style", styleTags)
  };
  const addedTags = {};
  const removedTags = {};
  Object.keys(tagUpdates).forEach((tagType) => {
    const { newTags, oldTags } = tagUpdates[tagType];
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  if (cb) {
    cb();
  }
  onChangeClientState(newState, addedTags, removedTags);
};
var _helmetCallback = null;
var handleStateChangeOnClient = (newState) => {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(() => {
      commitTagChanges(newState, () => {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var client_default = handleStateChangeOnClient;
var HelmetDispatcher = class extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "rendered", false);
  }
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props);
  }
  componentDidUpdate() {
    this.emitChange();
  }
  componentWillUnmount() {
    const { helmetInstances } = this.props.context;
    helmetInstances.remove(this);
    this.emitChange();
  }
  emitChange() {
    const { helmetInstances, setHelmet } = this.props.context;
    let serverState = null;
    const state = reducePropsToState(
      helmetInstances.get().map((instance) => {
        const { context: _context, ...props } = instance.props;
        return props;
      })
    );
    if (HelmetProvider.canUseDOM) {
      client_default(state);
    } else if (server_default) {
      serverState = server_default(state);
    }
    setHelmet(serverState);
  }
  // componentWillMount will be deprecated
  // for SSR, initialize on first render
  // constructor is also unsafe in StrictMode
  init() {
    if (this.rendered) {
      return;
    }
    this.rendered = true;
    const { helmetInstances } = this.props.context;
    helmetInstances.add(this);
    this.emitChange();
  }
  render() {
    this.init();
    return null;
  }
};
var react19Instances = [];
var toHtmlAttributes = (props) => {
  const result = {};
  for (const key of Object.keys(props)) {
    result[HTML_TAG_MAP[key] || key] = props[key];
  }
  return result;
};
var toReactProps = (attrs) => {
  const result = {};
  for (const key of Object.keys(attrs)) {
    const mapped = REACT_TAG_MAP[key];
    result[mapped || key] = attrs[key];
  }
  return result;
};
var applyAttributes = (tagName, attributes) => {
  if (!isDocument)
    return;
  const el = document.getElementsByTagName(tagName)[0];
  if (!el)
    return;
  const managedAttr = "data-rh-managed";
  const prev = el.getAttribute(managedAttr);
  const prevKeys = prev ? prev.split(",") : [];
  const nextKeys = Object.keys(attributes);
  for (const key of prevKeys) {
    if (!nextKeys.includes(key)) {
      el.removeAttribute(key);
    }
  }
  for (const key of nextKeys) {
    const value = attributes[key];
    if (value === void 0 || value === null || value === false) {
      el.removeAttribute(key);
    } else if (value === true) {
      el.setAttribute(key, "");
    } else {
      el.setAttribute(key, String(value));
    }
  }
  if (nextKeys.length > 0) {
    el.setAttribute(managedAttr, nextKeys.join(","));
  } else {
    el.removeAttribute(managedAttr);
  }
};
var syncAllAttributes = () => {
  const htmlAttrs = {};
  const bodyAttrs = {};
  for (const instance of react19Instances) {
    const { htmlAttributes, bodyAttributes } = instance.props;
    if (htmlAttributes) {
      Object.assign(htmlAttrs, toHtmlAttributes(htmlAttributes));
    }
    if (bodyAttributes) {
      Object.assign(bodyAttrs, toHtmlAttributes(bodyAttributes));
    }
  }
  applyAttributes("html", htmlAttrs);
  applyAttributes("body", bodyAttrs);
};
var React19Dispatcher = class extends Component {
  componentDidMount() {
    react19Instances.push(this);
    syncAllAttributes();
  }
  componentDidUpdate() {
    syncAllAttributes();
  }
  componentWillUnmount() {
    const index = react19Instances.indexOf(this);
    if (index !== -1) {
      react19Instances.splice(index, 1);
    }
    syncAllAttributes();
  }
  resolveTitle() {
    const { title, titleTemplate, defaultTitle } = this.props;
    if (title && titleTemplate) {
      return titleTemplate.replace(/%s/g, () => Array.isArray(title) ? title.join("") : title);
    }
    return title || defaultTitle || void 0;
  }
  renderTitle() {
    const title = this.resolveTitle();
    if (title === void 0)
      return null;
    const titleAttributes = this.props.titleAttributes || {};
    return React__default.createElement("title", toReactProps(titleAttributes), title);
  }
  renderBase() {
    const { base } = this.props;
    if (!base)
      return null;
    return React__default.createElement("base", toReactProps(base));
  }
  renderMeta() {
    const { meta } = this.props;
    if (!meta || !Array.isArray(meta))
      return null;
    return meta.map(
      (attrs, i) => React__default.createElement("meta", {
        key: i,
        ...toReactProps(attrs)
      })
    );
  }
  renderLink() {
    const { link } = this.props;
    if (!link || !Array.isArray(link))
      return null;
    return link.map(
      (attrs, i) => React__default.createElement("link", {
        key: i,
        ...toReactProps(attrs)
      })
    );
  }
  renderScript() {
    const { script } = this.props;
    if (!script || !Array.isArray(script))
      return null;
    return script.map((attrs, i) => {
      const { innerHTML, ...rest } = attrs;
      const props = toReactProps(rest);
      if (innerHTML) {
        props.dangerouslySetInnerHTML = { __html: innerHTML };
      }
      return React__default.createElement("script", { key: i, ...props });
    });
  }
  renderStyle() {
    const { style } = this.props;
    if (!style || !Array.isArray(style))
      return null;
    return style.map((attrs, i) => {
      const { cssText, ...rest } = attrs;
      const props = toReactProps(rest);
      if (cssText) {
        props.dangerouslySetInnerHTML = { __html: cssText };
      }
      return React__default.createElement("style", { key: i, ...props });
    });
  }
  renderNoscript() {
    const { noscript } = this.props;
    if (!noscript || !Array.isArray(noscript))
      return null;
    return noscript.map((attrs, i) => {
      const { innerHTML, ...rest } = attrs;
      const props = toReactProps(rest);
      if (innerHTML) {
        props.dangerouslySetInnerHTML = { __html: innerHTML };
      }
      return React__default.createElement("noscript", { key: i, ...props });
    });
  }
  render() {
    return React__default.createElement(
      React__default.Fragment,
      null,
      this.renderTitle(),
      this.renderBase(),
      this.renderMeta(),
      this.renderLink(),
      this.renderScript(),
      this.renderStyle(),
      this.renderNoscript()
    );
  }
};
var Helmet = (_b = class extends Component {
  shouldComponentUpdate(nextProps) {
    return !fastCompare(without(this.props, "helmetData"), without(nextProps, "helmetData"));
  }
  mapNestedChildrenToProps(child, nestedChildren) {
    if (!nestedChildren) {
      return null;
    }
    switch (child.type) {
      case "script":
      case "noscript":
        return {
          innerHTML: nestedChildren
        };
      case "style":
        return {
          cssText: nestedChildren
        };
      default:
        throw new Error(
          `<${child.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`
        );
    }
  }
  flattenArrayTypeChildren(child, arrayTypeChildren, newChildProps, nestedChildren) {
    return {
      ...arrayTypeChildren,
      [child.type]: [
        ...arrayTypeChildren[child.type] || [],
        {
          ...newChildProps,
          ...this.mapNestedChildrenToProps(child, nestedChildren)
        }
      ]
    };
  }
  mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren) {
    switch (child.type) {
      case "title":
        return {
          ...newProps,
          [child.type]: nestedChildren,
          titleAttributes: { ...newChildProps }
        };
      case "body":
        return {
          ...newProps,
          bodyAttributes: { ...newChildProps }
        };
      case "html":
        return {
          ...newProps,
          htmlAttributes: { ...newChildProps }
        };
      default:
        return {
          ...newProps,
          [child.type]: { ...newChildProps }
        };
    }
  }
  mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
    let newFlattenedProps = { ...newProps };
    Object.keys(arrayTypeChildren).forEach((arrayChildName) => {
      newFlattenedProps = {
        ...newFlattenedProps,
        [arrayChildName]: arrayTypeChildren[arrayChildName]
      };
    });
    return newFlattenedProps;
  }
  warnOnInvalidChildren(child, nestedChildren) {
    invariant(
      VALID_TAG_NAMES.some((name) => child.type === name),
      typeof child.type === "function" ? `You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.` : `Only elements types ${VALID_TAG_NAMES.join(
        ", "
      )} are allowed. Helmet does not support rendering <${child.type}> elements. Refer to our API for more information.`
    );
    invariant(
      !nestedChildren || typeof nestedChildren === "string" || Array.isArray(nestedChildren) && !nestedChildren.some((nestedChild) => typeof nestedChild !== "string"),
      `Helmet expects a string as a child of <${child.type}>. Did you forget to wrap your children in braces? ( <${child.type}>{\`\`}</${child.type}> ) Refer to our API for more information.`
    );
    return true;
  }
  mapChildrenToProps(children, newProps) {
    let arrayTypeChildren = {};
    React__default.Children.forEach(children, (child) => {
      if (!child || !child.props) {
        return;
      }
      const { children: nestedChildren, ...childProps } = child.props;
      const newChildProps = Object.keys(childProps).reduce((obj, key) => {
        obj[HTML_TAG_MAP[key] || key] = childProps[key];
        return obj;
      }, {});
      let { type } = child;
      if (typeof type === "symbol") {
        type = type.toString();
      } else {
        this.warnOnInvalidChildren(child, nestedChildren);
      }
      switch (type) {
        case "Symbol(react.fragment)":
          newProps = this.mapChildrenToProps(nestedChildren, newProps);
          break;
        case "link":
        case "meta":
        case "noscript":
        case "script":
        case "style":
          arrayTypeChildren = this.flattenArrayTypeChildren(
            child,
            arrayTypeChildren,
            newChildProps,
            nestedChildren
          );
          break;
        default:
          newProps = this.mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren);
          break;
      }
    });
    return this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
  }
  render() {
    const { children, ...props } = this.props;
    let newProps = { ...props };
    let { helmetData } = props;
    if (children) {
      newProps = this.mapChildrenToProps(children, newProps);
    }
    if (helmetData && !(helmetData instanceof HelmetData)) {
      const data = helmetData;
      helmetData = new HelmetData(data.context, true);
      delete newProps.helmetData;
    }
    if (isReact19) {
      return /* @__PURE__ */ React__default.createElement(React19Dispatcher, { ...newProps });
    }
    return helmetData ? /* @__PURE__ */ React__default.createElement(HelmetDispatcher, { ...newProps, context: helmetData.value }) : /* @__PURE__ */ React__default.createElement(Context.Consumer, null, (context) => /* @__PURE__ */ React__default.createElement(HelmetDispatcher, { ...newProps, context }));
  }
}, __publicField(_b, "defaultProps", {
  defer: true,
  encodeSpecialCharacters: true,
  prioritizeSeoTags: false
}), _b);
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(({ className, variant, size, asChild = false, href, ...props }, ref) => {
  const classes = cn(buttonVariants({ variant, size, className }));
  if (asChild) {
    return /* @__PURE__ */ jsx(Slot, { className: classes, ref, ...props });
  }
  if (href) {
    return /* @__PURE__ */ jsx(
      "a",
      {
        href,
        className: classes,
        ref,
        ...props
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: classes,
      ref,
      ...props
    }
  );
});
Button.displayName = "Button";
const en = {
  seo: {
    home: {
      title: "European Arbitration Chamber (EAC) | Resolving Disputes",
      description: "The European Arbitration Chamber (EAC) — international non-profit association founded in Belgium in 2008 for commercial arbitration, mediation and art expertise."
    },
    eac: {
      title: "About the European Arbitration Chamber (EAC)",
      description: "Discover the EAC — an international non-profit association founded in Belgium in 2008 by arbitration and mediation professionals from Belgium, France and Ukraine."
    },
    council: {
      title: "Members of the EAC Council",
      description: "Meet the international arbitrators, mediators and legal experts who form the governing council of the European Arbitration Chamber (EAC)."
    },
    news: {
      title: "News & Updates | EAC",
      description: "Stay informed with the latest news, conferences, partnerships and arbitration developments from the European Arbitration Chamber (EAC) worldwide."
    },
    icac: {
      title: "About the ICAC under the EAC",
      description: "The International Commercial Arbitration Court (ICAC) under the EAC is an independent permanent arbitration court operating under the Belgian Judicial Code."
    },
    rules: {
      title: "ICAC Rules | EAC",
      description: "ICAC Arbitration Rules — official version in force since 11 November 2020. Approved by the EAC Council and applicable to all proceedings going forward."
    },
    fees: {
      title: "Fee Regulations | EAC",
      description: "ICAC Provisions on Arbitration Costs — official fee regulations in force since 11 November 2020, approved by the European Arbitration Chamber Council."
    },
    calculator: {
      title: "Arbitration Cost Calculator | EAC",
      description: "Calculate the ICAC arbitration fee for your case based on the value of the dispute, in accordance with the official Provisions on Arbitration Costs."
    },
    clause: {
      title: "Arbitration Clause | EAC",
      description: "Official model arbitration clause recommended by the ICAC under the EAC for inclusion in your international commercial contracts and agreements."
    },
    icje: {
      title: "ICE: Expert Examination | EAC",
      description: "The International Center of Expertise (ICE) under the European Arbitration Chamber provides independent expert examination services across many industries."
    },
    areas: {
      title: "ICE — Main Areas of Expert Research | EAC",
      description: "Explore the main areas of expert research provided by the International Center of Expertise (ICE) under the EAC — across art, finance, technical and legal fields."
    },
    authentication: {
      title: "Art Authentication | EAC",
      description: "Professional art authentication by the ICE under the EAC — verifying originality, authorship and provenance of artworks for collectors, museums and galleries."
    },
    appraisal: {
      title: "Art Appraisal | EAC",
      description: "Independent art appraisal and market value assessment of artworks by the International Center of Expertise (ICE) under the European Arbitration Chamber."
    },
    artPassport: {
      title: "Art Passport & Authorization | EAC",
      description: "ICE under the EAC issues official art passports — certifying the unique physical characteristics, authorship and provenance of each work of art."
    },
    gallery: {
      title: "Art Gallery | EAC",
      description: "Explore authenticated artworks with expert analysis, provenance documentation and detailed appraisal records, curated by the European Arbitration Chamber."
    },
    benefits: {
      title: "5 Reasons to Become an EAC Member",
      description: "Career growth, exclusive training and events, valuable resources, international visibility and accreditation as an arbitrator — discover the benefits of EAC membership."
    },
    join: {
      title: "Membership in the EAC",
      description: "Learn how to become an associated member of the European Arbitration Chamber — application steps, requirements and benefits for arbitrators and legal professionals."
    },
    conductCode: {
      title: "Code of Conduct | EAC",
      description: "The EAC Code of Conduct sets the ethical and professional standards expected of every member of the European Arbitration Chamber and its arbitration panels."
    },
    contacts: {
      title: "Contact Us | EAC",
      description: "Reach out to the European Arbitration Chamber for arbitration, mediation, expertise or membership inquiries — Brussels, Belgium. We respond within two business days."
    },
    about: {
      title: "About Us | EAC",
      description: "Discover the mission, vision and values behind the European Arbitration Chamber — an international non-profit association advancing arbitration since 2008."
    }
  },
  language: {
    english: "EN",
    french: "FR",
    russian: "RU"
  },
  menu: {
    eac: "EAC",
    about: "About Us",
    council: "EAC Council",
    news: "News",
    events: "Event Calendar",
    arbitration: "Arbitration",
    icac: "About the ICAC under the EAC",
    rules: "ICAC Rules",
    fees: "ICAC Provisions on Arbitration Costs",
    calculator: "Cost Calculator",
    clause: "Arbitration Clause",
    arbitrators: "List of Arbitrators",
    resources: "Legal Resources",
    expertise: "Expertise",
    icje: "About the ICE at the EAC",
    expertiseFields: "Fields of Expertise",
    "art-expertise": "Art expertise",
    authentication: "Art Authentication",
    appraisal: "Art Appraisal",
    passport: "Art Passport",
    register: "International Register of Artworks",
    gallery: "Gallery",
    training: "Training",
    qualification: "Qualification Course for Arbitrators",
    membership: "Membership",
    join: "How to Join",
    benefits: "Membership Benefits",
    conductCode: "Code of Conduct",
    contacts: "Contacts",
    sections: "Menu",
    home: "Main page"
  },
  footer: {
    about: "Resolving disputes, advancing arbitration.",
    quickLinks: "Quick Links",
    services: "Our Services",
    contactUs: "Contact Us",
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Services",
    cookies: "Cookies Policy"
  },
  home: {
    heroTitle: "European Arbitration Chamber",
    heroDescription: "Resolving disputes, advancing arbitration.",
    heroBtn: "About EAC",
    quickLinks: {
      rulesTitle: "Arbitration Rules",
      rulesDescription: "Everything you need to know before starting arbitration proceedings in the ICAC",
      rulesBtn: "View Rules",
      clauseTitle: "Model Arbitration Clause",
      clauseDescription: "ICAC arbitration clause for inclusion in the contract",
      clauseBtn: "View Clauses",
      calculatorTitle: "Cost Calculator",
      calculatorDescription: "Estimate arbitration costs based on dispute value",
      calculatorBtn: "Calculate Costs"
    },
    services: {
      sectionTitle: "Dispute Resolution & Expertise",
      arbitrationTitle: "ARBITRATION",
      arbitrationDesc: "Efficient resolution of commercial disputes by experienced arbitrators. ICAC arbitration procedure is designed to offer a prompt, impartial, and cost-efficient alternative to litigation.",
      expertiseTitle: "EXPERTISE",
      expertiseDesc: "Expert examinations by qualified specialists to provide accurate and reliable insights. Our expertise ensures thorough analysis and objective opinions to assist in resolving complex technical or specialized disputes.",
      artTitle: "ART EXPERTISE",
      artDesc: "Expert examination, authentication, and valuation of works of art conducted by experienced professionals. Reliable and accurate assessments for collectors, galleries, and institutions.",
      membershipTitle: "MEMBERSHIP",
      membershipDesc: "Become a member of the European Arbitration Chamber as an arbitrator, expert, or business partner. We unite specialists from diverse fields across the globe, providing access to valuable opportunities and a global network."
    },
    latestNews: "Latest News",
    viewAllNews: "View All News",
    readMore: "Read More"
  },
  contacts: {
    title: "Contact Us",
    information: "Address and Email",
    addressTitle: "Address",
    addressName: 'International non-profit association "European Arbitration Chamber" ',
    address: "Belgium, Brussels, B-1050, Avenue Louise, 146",
    phone: "Phone",
    email: "Email",
    emailPlaceholder: "Your Email",
    sendMessage: "Contact Form",
    name: "Name",
    namePlaceholder: "Your Name",
    subject: "Subject",
    subjectPlaceholder: "type name of the subject",
    message: "Message",
    messagePlaceholder: "Type your message",
    send: "Send",
    location: "Our location"
  },
  aboutEAC: {
    title: "About The European Arbitration Chamber (EAC)",
    intro: "The European Arbitration Chamber (EAC) is an international non-profit association founded in Belgium in 2008 by professionals in commercial arbitration and mediation from Belgium, France, and Ukraine.",
    missionText: "EAC's mission is to promote and develop commercial arbitration, mediation, judicial expertise, and the Alternative Dispute Resolution (ADR) system globally, providing businesses with effective and reliable dispute resolution mechanisms.",
    historyText: "The EAC operates in full compliance with the Law of the Kingdom of Belgium on Non-Profit Associations, International Non-Profit Associations, and Foundations of June 27, 1921.",
    representativesText: "Today, the EAC unites representatives from 35 countries, including arbitrators, mediators, judicial experts and business professionals.",
    keyAreasTitle: "Key Areas of Activity",
    keyAreas: {
      commercial: "Commercial Arbitration – resolving cross-border business disputes through international arbitration.",
      judicial: "Judicial Expertise – providing expert assessments for legal and arbitration proceedings.",
      education: "Training & Education – offering specialized courses and programs in ADR, arbitration, and mediation."
    }
  },
  council: {
    title: "Members of the EAC Council",
    members: {
      pampukha: {
        name: "Hennadii PAMPUKHA",
        position: "President of the EAC and member of the EAC Council",
        description: `President of the EAC and member of the EAC Council, Vice-President of International Commercial Arbitration Court under the European Court of Arbitration, international arbitrator, judicial expert certified by the Ministry of Justice of Ukraine, founding partner of the Expert Legal Group "Independent Institute of Judicial expertise" (Ukraine), Chairman of the Board of the All-Ukrainian Chamber of Experts, Managing Partner of Attorney's Association "Princip" (Ukraine), Board member of I.I.expertise (Estonia).`
      },
      moja: {
        name: "Andrea MOJA",
        position: "Member of the EAC Council",
        description: "Member of the EAC Council, Professor of European Law and Trusts at Brescia University, member of STEP Italy's scientific committee, Senior partner of the Law Firm S.L.C. – Studio Legale Commerciale (Italy) with over 25 years' experience in trust and corporate law, successions and wealth planning, tax, international cross-border transactions and major international commercial disputes, international arbitrator of International Commercial Arbitration Court under the European Court of Arbitration."
      },
      marcinkowski: {
        name: "Ryszard MARCINKOWSKI",
        position: "Member of the EAC Council",
        description: 'Member of the EAC Council, Senior partner of Law office "Marcinkowski Marcinkowska Trzeciak", advocate with over 32 years experience, Vice Dean of the Bar Association of Lodz (Poland), international arbitrator of International Commercial Arbitration Court under the European Court of Arbitration. He is a lecturer in the field of civil law, including in the aspect of civil appeal.'
      },
      billiet: {
        name: "Johan BILLIET",
        position: "President of the International Commercial Arbitration Court under the European Arbitration Chamber",
        description: "Since 2011, the President of ICAC is Johan Billiet, international arbitrator, mediator, lawyer at the Brussels Bar, founding partner of Billiet & Co., author of various books, including the manual of the Vrije Universiteit Brussel (VUB) on International Investment Arbitration."
      },
      laycock: {
        name: "Patrick LAYCOCK",
        position: "Head of the International Centre for Judicial and ADR expertise under the European Arbitration Chamber",
        description: "Mr. Laycock is an art historian and serves as a scientific adviser to the Brussels Art Laboratory. He is recognized and endorsed by several esteemed organizations, including the European Arbitration Chamber, Chambre Belge des Experts chargés de Missions Judiciaires et d'Arbitrages, Chambre d'Arbitrage et de Médiation d'Experts Techniques et Juridiques, and the Court of First Instance of Brussels. Mr. Laycock is a lifelong member of the Siam Society under Royal Patronage in Bangkok and holds the position of President at the Institut Belge des Hautes Etudes Chinoises within the Musée Royal d'Art et d'Histoire."
      }
    }
  },
  arbitration: {
    icac: {
      title: "About the ICAC under the EAC",
      intro: "The International Commercial Arbitration Court under the European Arbitration Chamber (the ICAC) is an independent permanent arbitration court, operating under its Rules, Articles 1676-1723 of the Belgian Judicial Code and Statute of the European Arbitration Chamber.",
      secretariat: "The Secretariat of the ICAC is located in Brussels, having also its representative offices in Italy, Poland, Georgia, Ukraine, the UAE and other countries.",
      competenceTitle: "The competence of the ICAC includes the resolution of disputes arising in the course of international trade and other types of economic relations, including but not limited to:",
      competenceList: {
        sale: "contracts for the sale or supply of goods;",
        services: "performance of work and provision of services;",
        exchange: "exchange of goods and/or services;",
        finance: "financial transactions;",
        insurance: "insurance and related matters."
      },
      featuresTitle: "Features of the ICAC under the EAC:",
      features: {
        multinationalTitle: "A Diverse and Multinational Panel of Arbitrators",
        multinationalDesc: "The ICAC under the EAC brings together leading experts in international arbitration from 35 jurisdictions. Accredited arbitrators include practicing lawyers with expertise in international trade, investment, contract and corporate law, logistics, intellectual property, information technology, and other business-related areas. Disputes are resolved by arbitrators selected by the parties and appointed by the President of the ICAC from the recommended panel of arbitrators.",
        principlesTitle: "ICAC Principles",
        principlesDesc: "The ICAC under the EAC is guided by the standards of independence, impartiality and integrity as paramount and crucial features for its proper functioning.",
        flexibilityTitle: "Flexible arbitration procedure",
        flexibilityDesc: "The parties have autonomy regarding the choice of substantive and procedural law governing the dispute, as well as the language of the proceedings, the place of the hearings, the number of arbitrators and the format of the arbitration (traditional arbitration or expedited online procedure of arbitration).",
        techTitle: "Use of Advanced Technologies",
        techDesc: "Disputes can be resolved online, significantly reducing legal costs and saving time.",
        timingTitle: "Optimal timing and cost",
        timingDesc: "The accelerated process of dispute resolution and the fixed amount of the arbitration fee make the dispute resolution procedure not only quick and cost-efficient.",
        finalityTitle: "Final and binding arbitral award",
        finalityDesc: "In accordance with the ICAC Rules the arbitral award is final and binding for the parties. The dispute resolution procedure in the ICAC under the EAC does not provide an appeal."
      }
    },
    rules: {
      title: "The Rules of the ICAC under the EAC",
      description: 'A new version of the ICAC Rules entered into force on November 11, 2020. This version was approved by the Council of the International non-profit association "European Arbitration Chamber". It applies to all proceedings that commenced after November 10, 2020 or will commence in the future. Of all the language versions of the ICAC Arbitration Rules, the English version is considered prevailing.',
      downloadLabel: "You can download the ICAC Rules here:",
      translationLabel: "Translation:",
      englishBtn: "ICAC Arbitration Rules in English 2020",
      russianBtn: "ICAC Arbitration Rules in Russian 2020"
    },
    fees: {
      title: "Fee Regulations",
      description: 'A new version of the ICAC Provisions on Arbitration Costs entered into force on November 11, 2020. This version was approved by the Council of the International non-profit association "European Arbitration Chamber". It applies to all proceedings that commenced after November 10, 2020 or will commence in the future. Of all the language versions of the ICAC Provisions on Arbitration Costs, the English version is considered prevailing.',
      downloadLabel: "You can download the ICAC Provisions on Arbitration Costs here:",
      translationLabel: "Translation:",
      englishBtn: "ICAC Provisions on Arbitration Costs as of 11.11.2020 in English",
      russianBtn: "ICAC Provisions on Arbitration Costs as of 11.11.2020 in Russian"
    },
    calculator: {
      title: "Cost Calculator",
      description: "The arbitration fee is payable by the parties for each claim submitted to the International Commercial Arbitration Court under the European Arbitration Chamber to cover the costs of arbitration. The fee amount is calculated in accordance with the Provisions on Arbitration Costs of the ICAC under the EAC.",
      registrationFeeTitle: "The registration fee is a fixed payment made by the claimant when submitting the Request for Arbitration. The current amount is:",
      registrationFee: {
        excludingVat: "EUR 1,000.00 (excluding VAT)",
        includingVat: "EUR 1,210.00 (including 21% VAT, if applicable)"
      },
      currencyConversion: "To determine the arbitration fee, the amount in dispute (if not expressed in EUR) must be converted into euros using the exchange rate of the National Bank of Belgium on the date the Request for Arbitration is filed.",
      exchangeRateLink: "Exchange rates",
      exchangeRateUrl: "https://www.nbb.be/en/about-national-bank/eurosystem/exchange-rates",
      amount: "Amount in dispute (EUR)",
      submitBtn: "Calculate",
      composition: "Composition of the arbitral tribunal",
      oneArbitrator: "1 arbitrator",
      threeArbitrators: "3 arbitrators",
      costs: "Arbitration costs:",
      fee: "Arbitration fee:",
      vat: "VAT (21%):",
      total: "Total amount:",
      estimate: "* This is an estimate. The final fee may vary based on specific case details.",
      inclVAT: "(incl. VAT)",
      exclVAT: "(excl. VAT)"
    },
    clause: {
      title: "Arbitration Clause",
      future: {
        title: "Future disputes",
        description: "The parties, entering the contract and wishing that the disputes that may arise in the future are referred to the Arbitration Court according to the ICAC Rules, are recommended to include the following arbitration clause (words or blanks in square brackets should be removed or filled out correspondently) into the contract:",
        clause1: `"Any dispute arising out of or in connection with this contract, including any question regarding its existence, validity or termination, shall be referred to and finally resolved by the International Commercial Arbitration Court under the European Arbitration Chamber (Belgium, Brussels, Avenue Louise, 146) according to the Rules of this ICAC, which, as a result of referring to it, is considered as the part of this clause.`,
        clause2: "The number of arbitrators shall be- [one / three].",
        clause3: "The seat, or legal place, of arbitration shall be [city and/or country].",
        clause4: "The language to be used in the arbitral proceedings shall be [___].",
        clause5: 'The governing law of the contract shall be the substantive law of [country]."',
        note: `In the event that the parties involved are not natural persons of Belgian nationality or legal persons, having its registered office in Belgium, within the meaning of Article 1718 of the Belgian Judicial Code, they may also stipulate the following: "The parties expressly exclude any application for setting aside the Arbitral Award".`
      },
      existing: {
        title: "Existing disputes",
        description: "If there is a dispute between the parties by the contract, and at that, there is no agreement about the dispute settlement by the proceeding between the parties, or if the parties wish to change the existing clause for the case of dispute settlement so that it provides the dispute settlement in the ICAC, the following clause is recommended for these parties (words or blanks in square brackets should be removed or filled out correspondently):",
        clause1: `"Dispute having arisen between the parties concerning [ ], the parties hereby agree that the dispute shall be referred to and finally resolved by the International Commercial Arbitration Court under the European Arbitration Chamber (Belgium, Brussels, Avenue Louise, 146), according to the Rules of this ICAC.`,
        clause2: "The number of arbitrators shall be- [one / three].",
        clause3: "The seat, or legal place, of arbitration shall be [city and/or country].",
        clause4: "The language to be used in the arbitral proceedings shall be [___].",
        clause5: 'The governing law of the contract shall be the substantive law of [country]."',
        note: `In the event that the parties involved are not natural persons of Belgian nationality or legal persons, having its registered office in Belgium, within the meaning of Article 1718 of the Belgian Judicial Code, they may also stipulate the following: "The parties expressly exclude any application for setting aside the Arbitral Award".`
      }
    }
  },
  expertise: {
    icje: {
      title: "ICE: EXPERT EXAMINATION",
      description1: "The International Center of Expertise under the European Arbitration Chamber (the ICE under the EAC) operates as a separate department within the European Arbitration Chamber and carries out its activities in accordance with the Statute of the European Arbitration Chamber.",
      description2: {
        text: "The ICE conducts expert examinations:",
        examinations: [
          "upon the request of international arbitration courts (without jurisdictional limitations).",
          "Upon the request of state courts for legal proceedings.",
          "Upon the request of lawyers, legal entities, and individuals seeking professional assessments."
        ],
        footer: "Our team of certified experts ensures accuracy, reliability, and compliance with international standards in all expert evaluations. Contact us to learn more or request an expert examination."
      }
    },
    fields: {
      title: "ICE – Main Areas of Expert Research",
      description1: "The International Center of Expertise under the European Arbitration Chamber (the ICE under the EAC) provides a wide range of expert research and examination services across various industries, including:",
      areas: [
        "Construction and Technical Expertise",
        "Land and Cadastral Expertise",
        "Electrical Engineering Expertise",
        "Transport Analysis",
        "Economic and Financial Expertise",
        "Environmental Expertise",
        "Commodity and Product Valuation Expertise",
        "Intellectual Property Expertise",
        "Art Expertise",
        "Linguistic Expertise",
        "Handwriting (Graphological) Expertise",
        "Document Technical Examination",
        "Psychological Expertise"
      ],
      subtitle: "Expert Examinations Conducted by ICE",
      description2: "ICE provides expert examinations:",
      providedFor: [
        "At the request of international arbitration courts (without jurisdictional limitations).",
        "At the request of state courts for legal proceedings.",
        "On behalf of lawyers, legal entities, and individuals seeking professional assessments.",
        "In accordance with other legal and procedural requirements."
      ],
      finalNote: "Our team of certified experts ensures accuracy, reliability, and compliance with international standards in all expert evaluations. Contact us to learn more or request an expert examination."
    }
  },
  artExpertise: {
    authentication: {
      title: "Art Authentication",
      p1: "Ensuring the authenticity of a work of art is crucial for collectors, investors, museums, and galleries. International Center of Expertise under the European Arbitration Chamber (the ICE under the EAC) under the European Arbitration Chamber provides professional art authentication services to verify the originality, authorship, and provenance of artworks.",
      p2: "Art authentication is a detailed examination conducted by experts to determine whether a piece of art is genuine.",
      processTitle: "This process involves:",
      processList: [
        "Attribution Analysis – Confirming the artist's identity and assessing stylistic and technical characteristics.",
        "Material Examination – Analyzing pigments, canvas, paper, and other materials to verify consistency with the claimed period.",
        "Provenance Research – Investigating the artwork's ownership history and tracing its origins.",
        "Comparative Analysis – Cross-referencing the artwork with documented pieces from the same artist or period."
      ],
      importanceTitle: "Why is Art Authentication Important?",
      importanceList: [
        "Protects against forgeries and misattributions.",
        "Increases an artwork's value and marketability.",
        "Provides legal and financial security for transactions, insurance, and inheritance matters.",
        "Ensures compliance with international regulations for exhibitions and sales."
      ],
      certificateTitle: "Certification of Authenticity",
      certificateText: "Upon successful verification, the ICE issues a Certificate of Authenticity, which serves as official documentation of the artwork's legitimacy. This certificate can be used for sales, exhibitions, insurance, and legal purposes.",
      closingText: "For more information or to request an art authentication service, contact us today."
    },
    appraisal: {
      title: "ART APPRAISAL",
      intro1: "To determine the market value of artworks, a thorough art examination and appraisal process is conducted.",
      intro2: "Art expertise involves assessing the authenticity and artistic value of a work, while appraisal determines its market value.",
      factorsTitle: "A professional evaluation of an artwork takes into account various factors, including:",
      evaluationFactors: [
        "Its characteristics and year of creation",
        "The reputation and significance of the artist",
        "The quality of the work based on socio-cultural value indices",
        "The artwork's history and provenance"
      ],
      summary: "This comprehensive analysis establishes the overall value of the artwork, helps forecast its future worth, and assesses potential financial losses in case of total loss.",
      stagesTitle: "Stages of Art Appraisal",
      stagesList: [
        "Art expertise and attribution – Verification of authenticity and authorship",
        "Market value estimation – Assessment of its financial worth",
        "Authorization and certification – Issuance of a unique passport for the artwork"
      ],
      conclusion: "This structured approach ensures an accurate and credible valuation, essential for collectors, investors, insurers, and the art market.",
      contactNote: "For more information or to request an art authentication service, contact us today."
    },
    passport: {
      title: "AUTHORIZATION OF WORKS OF ART",
      intro: "Experts at the International Center of Expertise under the European Arbitration Chamber (the ICE under the EAC) provide services for the authorization and certification of artworks. This process results in the issuance of a passport for the artwork, certifying its unique physical characteristics and features.",
      eligibleObjectsTitle: "Objects eligible for authorization and certification include:",
      eligibleObjects: [
        "Paintings",
        "Sculpture",
        "Photographic works",
        "Works of applied art (decorative weaving, ceramics, carving, foundry, art glass, jewelry, etc).",
        "Illustrations, maps, drawings, sketches, and plastic works",
        "Literary works, including fiction, journalism, scientific, technical, and other writings (books, brochures, articles, etc.)",
        "Musical instruments",
        "Numismatic objects",
        "Antiques and other collectible items."
      ],
      certificationTitle: "What is the certification of an art object?",
      certificationDesc: "Certification is an official verification of an artwork's key attributes, including its authorship, period of creation, history of ownership, past restorations, value, provenance, and its connection to historical and cultural events.",
      passportContentTitle: "What information does the passport of an artwork contain?",
      passportContentIntro: "The passport includes the following details:",
      passportFields: [
        "A photograph of the artwork",
        "Title of the artwork",
        "Artist's name and year of creation",
        "Dimensions",
        "Technique and materials used"
      ],
      whyImportantTitle: "Why is the authorization and certification of an artwork important?",
      whyImportantIntro: "A passport of an artwork provides several advantages, including the ability to:",
      advantages: [
        "Present the artwork (painting, sculpture, ceramics, etc.) in international art markets",
        "Exhibit the artwork in international exhibitions and expositions",
        "Verify its authenticity upon return from an exhibition",
        "Simplify the insurance process and minimize insurance risks",
        "Facilitate the purchase and sale of the artwork without requiring additional authentication"
      ],
      finalNote: "An exclusive authorization method ensures that confidential identification data about the artwork is securely stored in the ICE data center. If necessary, specialists can authenticate the piece and issue a corresponding certificate upon the owner's request.",
      consultation: "For more detailed information on the authorization of works of art, please contact the Secretariat of the EAС."
    }
  },
  gallery: {
    title: "Art Gallery",
    description: "Explore authenticated artworks with expert analysis. Each piece in our collection has been carefully verified and documented by our team of specialists.",
    searchPlaceholder: "Search by title or artist...",
    allYears: "All Years",
    clearFilters: "Clear Filters",
    noImage: "No Image Available",
    noResults: "No artworks match your search criteria.",
    noPaintings: "No artworks are currently available in the gallery.",
    backToGallery: "Back to Gallery",
    backToPainting: "Back to Painting",
    error: "Error",
    paintingNotFound: "Painting not found or not available.",
    expertAccess: "Expert Access",
    expertAccessDescription: "This artwork has been professionally authenticated and documented. Access to detailed technical analysis and expert reports is available through secure QR codes.",
    qrCodeInfo: "Authorized personnel can scan QR codes to access detailed authentication reports, technical analysis, and provenance documentation.",
    invalidToken: "Invalid or expired access token.",
    accessDenied: "Access Denied",
    secureAccess: "Secure Access Granted",
    technicalAnalysis: "Technical Analysis",
    expertiseReport: "Expert Report",
    certificates: "Certificates",
    documents: "Documents",
    certificate: "Certificate",
    document: "Document",
    viewDocument: "View Document"
  },
  membership: {
    benefits: {
      title: "5 Reasons to Become an EAC Member",
      reasons: [
        {
          title: "Career Growth & Networking",
          description: "Expand your professional network, enhance your reputation in international arbitration communities, and open doors to new career opportunities."
        },
        {
          title: "Exclusive Training & Events",
          description: "Access essential business services and participate in seminars, training sessions, masterclasses, round tables, and congresses organized by EAC and its partners—often at discounted rates."
        },
        {
          title: "Valuable Insights & Resources",
          description: "Stay informed with timely updates on key decisions, procedural developments, and industry trends that impact your arbitration practice."
        },
        {
          title: "Visibility & Promotion",
          description: "EAC members can publish corporate news and showcase their professional profiles on the EAC website, increasing their visibility in the arbitration community."
        },
        {
          title: "Accreditation as an Arbitrator",
          description: "Gain the opportunity to take a qualification course for arbitrators and obtain accreditation as an international arbitrator of ICAC upon successfully completing the course and exam."
        }
      ]
    },
    join: {
      title: "Membership in the European Arbitration Chamber",
      description: "If you would like to become an associated member of the European Arbitration Chamber, follow these steps:",
      steps: [
        {
          title: "Submit an application",
          description: "by filling out the online membership request form."
        },
        {
          title: "Verification process",
          description: "The EAC Secretariat will review your application and assess your eligibility."
        },
        {
          title: "Complete your membership",
          description: "by paying the annual fee after successful verification."
        }
      ],
      fee: "The annual membership fee is 301.29 EUR (VAT included).",
      formPrompt: "To request membership, please complete the form here:",
      formLink: "https://docs.google.com/forms/d/e/1FAIpQLSdI-Ic0-JOrRDbQO3VQqMqipTM-qrhjKM9WQiBv02ytqKD8_A/viewform",
      followUp: "The EAC Secretariat will reach out to you with further instructions."
    },
    code: {
      title: "Code of Conduct",
      intro: "The European Arbitration Chamber (EAC) has established this Code of Conduct to ensure its members uphold the highest ethical and professional standards. All members are expected to adhere to these principles with strict observance.",
      obligations: {
        title: "Obligations",
        description: "Each member of the EAC is committed to:",
        list: [
          "Upholding Legal Standards – Promote the observance of international law, as well as national legislation relevant to arbitration and dispute resolution.",
          "Advancing Alternative Dispute Resolution (ADR) – Support the growth and integration of ADR and international arbitration within global business practices.",
          "Fostering Institutional Collaboration – Develop constructive relationships with authorities and international organizations to uphold justice, the rule of law, and a favorable global business climate.",
          "Engaging with the EAC Community – Collaborate with fellow EAC members and representatives to further the development of ADR on both national and international levels.",
          "Active Participation – Take part in official events, conferences, and activities organized by or in partnership with the EAC.",
          "Promoting ADR Awareness – Contribute to the dissemination of professional knowledge about ADR systems worldwide.",
          "Compliance with EAC Regulations – Adhere strictly to the principles and requirements outlined in the EAC's Articles of Association."
        ]
      },
      responsibilities: {
        title: "Responsibilities",
        description: "Each member is personally responsible for:",
        list: [
          "Integrity & Ethical Conduct – Act with honesty, fairness, and respect for human rights, in alignment with the principles of the UN Declaration of Human Rights. Avoid all forms of discrimination based on race, gender, religion, or political beliefs.",
          "Commitment to Society – Consider societal interests by acting loyally and honestly in accordance with EAC policies.",
          "Professional Respect – Refrain from harming, defaming, or recklessly undermining the professional reputation of others.",
          "Respect for Property Rights – Uphold intellectual property rights and other property-related legal protections.",
          "Confidentiality – Maintain strict confidentiality regarding any privileged information encountered during professional duties.",
          "Competence & Objectivity – Accept only work they are qualified to perform and provide professional opinions with the highest degree of objectivity."
        ]
      },
      sanctions: {
        title: "Sanctions for Non-Compliance",
        description: "Failure to adhere to this Code of Conduct, if substantiated by the European Arbitration Chamber, may result in immediate revocation of membership."
      }
    }
  },
  common: {
    backToNews: "Back to News",
    loading: "Loading...",
    login: "Login",
    register: "Register",
    email: "Email",
    password: "Password",
    fullName: "Full Name",
    confirmPassword: "Confirm Password",
    signingIn: "Signing in...",
    creatingAccount: "Creating account...",
    passwordsDoNotMatch: "Passwords do not match",
    registrationSuccess: "Registration successful! Please check your email for verification.",
    galleryManagementPanel: "Access your gallery management panel"
  }
};
const fr = {
  seo: {
    home: {
      title: "Chambre Européenne d’Arbitrage (CEA) | Litiges",
      description: "La CEA — association internationale sans but lucratif fondée en Belgique en 2008 — propose arbitrage commercial, médiation, expertise et authentification d’œuvres d’art."
    },
    eac: {
      title: "À propos de la Chambre Européenne d’Arbitrage (CEA)",
      description: "Découvrez la CEA, association internationale sans but lucratif fondée en Belgique en 2008 par des professionnels de l’arbitrage commercial et de la médiation."
    },
    council: {
      title: "Membres du Conseil de la CEA",
      description: "Rencontrez les arbitres internationaux, médiateurs et experts juridiques qui composent le Conseil de la Chambre Européenne d’Arbitrage (CEA)."
    },
    news: {
      title: "Actualités et mises à jour | CEA",
      description: "Restez informé des dernières actualités, conférences, partenariats et développements en matière d’arbitrage de la Chambre Européenne d’Arbitrage."
    },
    icac: {
      title: "À propos du TAIC auprès de la CEA",
      description: "Le Tribunal d’arbitrage international de commerce (TAIC) auprès de la CEA est un tribunal arbitral indépendant et permanent régi par le Code judiciaire belge."
    },
    rules: {
      title: "Règlement d’arbitrage du TAIC | CEA",
      description: "Règlement d’arbitrage du TAIC — version officielle en vigueur depuis le 11 novembre 2020, approuvée par le Conseil de la Chambre Européenne d’Arbitrage."
    },
    fees: {
      title: "Règlement des frais | CEA",
      description: "Dispositions sur les frais d’arbitrage du TAIC — version officielle en vigueur depuis le 11 novembre 2020, approuvée par le Conseil de la CEA."
    },
    calculator: {
      title: "Calculateur de coûts d’arbitrage | CEA",
      description: "Calculez les frais d’arbitrage du TAIC pour votre dossier en fonction de la valeur du litige, selon les Dispositions officielles sur les frais d’arbitrage."
    },
    clause: {
      title: "Clause compromissoire type | TAIC",
      description: "Clause compromissoire type recommandée par le TAIC auprès de la CEA, à inclure dans vos contrats commerciaux internationaux et vos accords juridiques."
    },
    icje: {
      title: "Expertise au CEI | CEA",
      description: "Le Centre Expertise International (CEI) sous la CEA fournit des services d’expertise indépendants couvrant de nombreux secteurs juridiques et techniques."
    },
    areas: {
      title: "CEI — Zones de recherche d’expertise | CEA",
      description: "Découvrez les principaux domaines de recherche d’expertise du Centre Expertise International (CEI) sous la CEA — art, finance, technique et juridique."
    },
    authentication: {
      title: "Authentification d’art | CEA",
      description: "Authentification professionnelle d’œuvres d’art par le CEI sous la CEA — vérification de l’originalité, de l’auteur et de la provenance pour collectionneurs et musées."
    },
    appraisal: {
      title: "Évaluation d’œuvres d’art | CEA",
      description: "Évaluation indépendante d’œuvres d’art et estimation de leur valeur marchande par le Centre Expertise International (CEI) sous la Chambre Européenne d’Arbitrage."
    },
    artPassport: {
      title: "Autorisation des œuvres d’art | CEA",
      description: "Le CEI sous la CEA délivre des passeports officiels d’œuvres d’art certifiant les caractéristiques physiques uniques, l’auteur et la provenance de chaque œuvre."
    },
    benefits: {
      title: "5 raisons de devenir membre de la CEA",
      description: "Accréditation d’arbitre, opportunités de carrière, formation continue, échange d’informations et visibilité internationale — découvrez les avantages d’adhérer à la CEA."
    },
    join: {
      title: "Adhésion à la CEA",
      description: "Découvrez comment devenir membre associé de la Chambre Européenne d’Arbitrage — étapes d’adhésion, conditions et avantages pour arbitres et juristes."
    },
    conductCode: {
      title: "Code de conduite de la CEA",
      description: "Le Code de conduite de la CEA fixe les normes éthiques et professionnelles que doivent respecter tous les membres de la Chambre Européenne d’Arbitrage."
    },
    contacts: {
      title: "Contactez-nous | CEA",
      description: "Contactez la Chambre Européenne d’Arbitrage pour toute question d’arbitrage, médiation, expertise ou adhésion — Bruxelles, Belgique. Réponse sous deux jours ouvrés."
    },
    about: {
      title: "À propos de nous | CEA",
      description: "Découvrez la mission, la vision et les valeurs de la Chambre Européenne d’Arbitrage — association internationale sans but lucratif active depuis 2008."
    }
  },
  language: {
    english: "EN",
    french: "FR",
    russian: "RU"
  },
  menu: {
    sections: "Menu",
    home: "Page d’accueil",
    eac: "CAE",
    about: "À propos de nous",
    council: "Conseil de la CEA",
    news: "Actualités",
    events: "Calendrier des événements",
    arbitration: "Arbitrage",
    icac: "À propos du TAIC auprès de la CEA",
    rules: "Le Règlement du TAIC",
    fees: "Frais d’arbitrage",
    calculator: "Calculateur de coûts",
    clause: "Clause d’arbitrage",
    arbitrators: "Liste des arbitres",
    resources: "Ressources juridiques",
    expertise: "Expertise",
    icje: "À propos de CEI de la CEA",
    expertiseFields: "Domaines d'expertise",
    "art-expertise": "Expertise en art",
    authentication: "Authentification d'art",
    appraisal: "Évaluation d'art",
    passport: "Passeport d'art",
    register: "Registre international des œuvres d’art",
    training: "Formation",
    qualification: "Cours de qualification pour arbitres",
    membership: "Adhésion",
    join: "Comment adhérer",
    benefits: "Avantages de l’adhésion",
    conductCode: "Code de conduite",
    contacts: "Contacts"
  },
  footer: {
    about: "Résolution des litiges, promotion de l’arbitrage.",
    quickLinks: "Liens rapides",
    services: "Nos services",
    contactUs: "Contactez-nous",
    rights: "Tous droits réservés.",
    privacy: "Politique de confidentialité",
    terms: "Conditions d’utilisation",
    cookies: "Politique de cookies"
  },
  home: {
    heroTitle: "Chambre Européenne d’Arbitrage",
    heroDescription: "Résolution des litiges, promotion de l’arbitrage.",
    heroBtn: "En savoir plus",
    quickLinks: {
      rulesTitle: "Règlement d’arbitrage",
      rulesDescription: "Toutes les informations essentielles avant de commencer une procédure d'arbitrage auprès de la TAIC.",
      rulesBtn: "Voir le règlement",
      clauseTitle: "Clause Type d’Arbitrage",
      clauseDescription: "Clause d'arbitrage standard de la TAIC à inclure dans votre contrat.",
      clauseBtn: "Voir la Clause",
      calculatorTitle: "Calculateur de Coût",
      calculatorDescription: "Estimez les coûts d'arbitrage en fonction de la valeur du litige.",
      calculatorBtn: "Calculer les Coûts"
    },
    services: {
      sectionTitle: "Résolution des litiges & Expertise",
      arbitrationTitle: "ARBITRAGE",
      arbitrationDesc: "Résolution rapide et efficace des litiges commerciaux grâce à des arbitres expérimentés. La procédure d'arbitrage TAIC offre une alternative impartiale, économique et accélérée aux procédures judiciaires traditionnelles.",
      expertiseTitle: "EXPERTISE",
      expertiseDesc: "Évaluations d'experts menées par des spécialistes qualifiés, garantissant des analyses précises et fiables. Notre expertise assure des opinions impartiales et détaillées pour résoudre les litiges techniques ou complexes, en toute objectivité.",
      artTitle: "EXPERTISE EN ART",
      artDesc: "Authentification, examen et évaluation des œuvres d'art par des experts reconnus. Nos évaluations précises et fiables sont conçues pour les collectionneurs, les galeries et les institutions, assurant une expertise de confiance pour chaque œuvre.",
      membershipTitle: "ADHÉSION",
      membershipDesc: "Devenez membre de la Chambre Européenne d'Arbitrage en tant qu'arbitre, expert ou partenaire commercial. Rejoignez un réseau mondial de spécialistes issus de divers domaines, et accédez à des opportunités précieuses et à des connexions professionnelles internationales."
    },
    latestNews: "Dernières actualités",
    viewAllNews: "Voir toutes les actualités",
    readMore: "Lire plus"
  },
  contacts: {
    title: "Contactez-nous",
    information: "Adresse et e-mail",
    addressTitle: "Address",
    addressName: "Association internationale à but non lucratif “Chambre arbitrale européenne” ",
    address: "Belgique, Bruxelles, B-1050, Avenue Louise, 146",
    phone: "Téléphone",
    email: "E-mail",
    emailPlaceholder: "Votre e-mail",
    sendMessage: "Formulaire de contact",
    name: "Nom",
    namePlaceholder: "Votre nom",
    subject: "Sujet",
    subjectPlaceholder: "Entrez le sujet",
    message: "Message",
    messagePlaceholder: "Tapez votre message",
    send: "Envoyer",
    location: "Notre localisation"
  },
  aboutEAC: {
    title: "À propos de la Chambre Européenne d’Arbitrage (CEA)",
    intro: "L'association internationale sans but lucratif Chambre Européenne d'Arbitrage (CEA) a été fondée en Belgique en 2008 à l’initiative de professionnels de l’arbitrage commercial et de la médiation provenant de Belgique, de France et d’Ukraine.",
    missionText: "La mission de la CEA est de promouvoir le développement des modes alternatifs de résolution des conflits, de rassembler les professionnels du secteur et de régler de manière efficace et rapide les litiges transfrontaliers liés aux activités commerciales, par le biais de l’arbitrage et de l’expertise internationaux.",
    historyText: "La CEA exerce ses activités conformément à loi du 27 juin 1921 sur les associations sans but lucratif, les associations internationales sans but lucratif et les fondations",
    representativesText: "Aujourd’hui, la CEA regroupe des représentants de 35 pays à travers le monde – arbitres, médiateurs, experts judiciaires, chefs d’entreprise, personnalités publiques et étudiants – œuvrant ensemble pour le développement de l’arbitrage commercial, de la médiation, de l’expertise judiciaire et, plus largement, du système de règlement alternatif des différends (ADR).",
    keyAreasTitle: "Domaines Clés d’Activité",
    keyAreas: {
      commercial: "Arbitrage commercial – résolution des litiges commerciaux transfrontaliers par le biais de l’arbitrage international.",
      judicial: "Expertise judiciaire – réalisation d’expertises destinées aux procédures judiciaires et arbitrales.",
      education: "Formation et perfectionnement – organisation de cours et de programmes de qualification dans les domaines de l’ADR, de l’arbitrage, de l’expertise et de la médiation."
    }
  },
  council: {
    title: "Membres du Conseil de la CEA",
    members: {
      pampukha: {
        name: "Hennadii PAMPUKHA",
        position: "Président de la CEA et membre du Conseil de la CEA",
        description: "Président de la CEA et membre du Conseil de la CEA, vice-président de la Cour d’Arbitrage Commercial International auprès de la Cour Européenne d’Arbitrage, arbitre international, expert judiciaire certifié par le Ministère de la Justice d’Ukraine, associé fondateur du groupe juridique d’experts « Institut Indépendant d’Expertise Judiciaire » (Ukraine), président du conseil de la Chambre Nationale des Experts d’Ukraine, associé directeur de l’Association d’Avocats « Princip » (Ukraine), membre du conseil d’administration de I.I.expertise (Estonie)."
      },
      moja: {
        name: "Andrea MOJA",
        position: "Membre du Conseil de la CEA",
        description: "Membre du Conseil de la CEA, professeur de droit européen et des trusts à l’Université de Brescia, membre du comité scientifique de STEP Italie, associé principal du cabinet juridique S.L.C. – Studio Legale Commerciale (Italie) avec plus de 25 ans d’expérience dans le droit des trusts, des successions, la planification patrimoniale, les litiges commerciaux internationaux majeurs et les transactions transfrontalières. Arbitre international de la Cour d’Arbitrage Commercial International."
      },
      marcinkowski: {
        name: "Ryszard MARCINKOWSKI",
        position: "Membre du Conseil de la CEA",
        description: "Membre du Conseil de la CEA, associé principal du cabinet « Marcinkowski Marcinkowska Trzeciak », avocat avec plus de 32 ans d’expérience, vice-doyen de l’Ordre des Avocats de Łódź (Pologne), arbitre international de la Cour d’Arbitrage Commercial International. Il enseigne le droit civil, notamment en matière de recours civils."
      },
      billiet: {
        name: "Johan BILLIET",
        position: "Président du Tribunal d’arbitrage international de commerce auprès de la CEA",
        description: "Depuis 2011, Johan Billiet est président de la CIAC, arbitre international, médiateur, avocat au barreau de Bruxelles, fondateur du cabinet Billiet & Co., auteur de plusieurs ouvrages, dont un manuel de l’Université Libre de Bruxelles (VUB) sur l’arbitrage en matière d’investissement international."
      },
      laycock: {
        name: "Patrick LAYCOCK",
        position: "Président du Centre Expertise International sous la Chambre Européenne d'Arbitrage (le CEI sous la CEA)",
        description: "M. Laycock est historien de l’art et conseiller scientifique au laboratoire d’art de Bruxelles. Il est reconnu et soutenu par plusieurs institutions de renom, dont la Chambre Européenne d’Arbitrage, la Chambre Belge des Experts Judiciaires, la Chambre d’Arbitrage et de Médiation des Experts Techniques et Juridiques, et le tribunal de première instance de Bruxelles. Il est membre à vie de la Siam Society sous patronage royal (Bangkok) et président de l’Institut Belge des Hautes Études Chinoises au Musée Royal d’Art et d’Histoire."
      }
    }
  },
  arbitration: {
    icac: {
      title: "À propos du  TAIC auprès la CEA",
      intro: `Le Tribunal d'arbitrage international de commerce auprès de la Chambre Européenne d'Arbitrage (ci-après, "TAIC auprès de la CEA") est un tribunal arbitral indépendant et permanent, qui exerce ses activités conformément au Code judiciaire de Belgique (articles 1676-1722), aux statuts de la Chambre Européenne d'Arbitrage et à son propre Règlement.`,
      secretariat: "Le secrétariat central du TAIC auprès de la CEA est situé à Bruxelles, avec des représentations en Italie, en République tchèque, en Pologne, en Arménie, en Géorgie, en Ukraine et aux Émirats arabes unis.",
      competenceTitle: "Le TAIC examine les différends liés à l'exécution de relations commerciales internationales ou autres types de relations économiques extérieures, concernant notamment:",
      competenceList: {
        sale: "la vente (livraison) de biens;",
        services: "l'exécution de travaux, la fourniture de services;",
        exchange: "l'échange de biens et/ou de services;",
        finance: "les opérations de crédit et de règlement;",
        insurance: " l'assurance, etc."
      },
      featuresTitle: "PARTICULARITÉS DU TAIC AUPRÈS DE LA CEA:",
      features: {
        multinationalTitle: "Un large panel multinational d’arbitres",
        multinationalDesc: `Le Tribunal d'arbitrage international de commerce auprès de la Chambre Européenne d'Arbitrage (ci-après, "TAIC auprès de la CEA") dispose d’un panel d’arbitres issus de 35 juridictions à travers le monde. Ces arbitres sont spécialisés en droit international, en investissements, en droit commercial et des sociétés, en propriété intellectuelle, en technologies de l’information, en commerce international, etc. Les litiges portés devant le TAIC auprès de la CEA sont examinés par des arbitres choisis par les parties ou nommés par le Président du TAIC parmi les membres du panel ayant prêté serment et n’ayant aucun conflit d’intérêts.`,
        principlesTitle: "Principes de la CIAC",
        principlesDesc: "Le TAIC auprès de la CEA considère les principes d’indépendance, d’impartialité et de bonne foi comme fondamentaux et essentiels pour son bon fonctionnement.",
        flexibilityTitle: "Procédure arbitrale flexible",
        flexibilityDesc: "Les parties disposent d’une autonomie dans le choix du droit matériel et procédural applicable au litige, ainsi que de la langue de la procédure, du lieu des audiences, des candidats arbitres et de leur nombre, et du format de la procédure arbitrale (arbitrage traditionnel avec audiences ou procédure simplifiée en ligne).",
        techTitle: "Utilisation de technologies avancées",
        techDesc: "Les litiges peuvent être examinés en ligne, ce qui permet de réduire considérablement les coûts et le temps de procédure.",
        timingTitle: "SDélais et coûts optimisés",
        timingDesc: "La procédure accélérée de règlement des litiges et le montant fixe des frais d’arbitrage rendent la procédure devant le TAIC rapide et rentable.",
        finalityTitle: "Caractère définitif et obligatoire de la sentence arbitrale",
        finalityDesc: "Conformément au Règlement du TAIC, la sentence arbitrale est définitive et obligatoire pour les parties dès sa date de prononcé. La procédure de règlement des litiges devant le TAIC auprès de la CEA ne prévoit pas de recours en appel."
      }
    },
    rules: {
      title: "LE RÈGLEMENT D'ARBITRAGE DU TAIC",
      description: "Une nouvelle version du Règlement du TAIC est entrée en vigueur le 11 novembre 2020. Cette version a été approuvée par le Conseil de la Chambre Européenne d’Arbitrage. Elle s’applique à toutes les procédures entamées après le 10 novembre 2020 ou qui seront engagées à l’avenir. Parmi toutes les versions linguistiques du Règlement d’arbitrage du TAIC, la version anglaise fait foi.",
      downloadLabel: "Vous pouvez télécharger le Règlement du TAIC ici:",
      translationLabel: "Traduction :",
      englishBtn: "Règlement d’arbitrage du TAIC en anglais – 2020",
      russianBtn: "Règlement d’arbitrage du TAIC en russe – 2020"
    },
    fees: {
      title: "Règlement des Frais",
      description: "Une nouvelle version des Dispositions sur les Frais d’Arbitrage de la CIAC est entrée en vigueur le 11 novembre 2020. Cette version a été approuvée par le Conseil de l’association internationale sans but lucratif « Chambre Européenne d’Arbitrage ». Elle s’applique à toutes les procédures commencées après le 10 novembre 2020 ou à venir. Parmi toutes les versions linguistiques, la version anglaise prévaut.",
      downloadLabel: "Vous pouvez télécharger les Dispositions sur les Frais d’Arbitrage ici :",
      translationLabel: "Traduction :",
      englishBtn: "Dispositions sur les Frais d’Arbitrage (11.11.2020) – Anglais",
      russianBtn: "Dispositions sur les Frais d’Arbitrage (11.11.2020) – Russe"
    },
    calculator: {
      title: "Calculateur de Coûts",
      description: "Les frais d’arbitrage sont payés par les parties pour chaque demande acceptée à l’examen par le Tribunal d'arbitrage international de commerce auprès de la Chambre Européenne d’Arbitrage (Bruxelles, Belgique) (ci-après – TAIC), afin de couvrir les frais liés à l’organisation et au déroulement de la procédure arbitrale. Le montant des frais d’arbitrage est calculé conformément aux Dispositions relatives aux frais d’arbitrage du TAIC.",
      registrationFeeTitle: "Le droit d’enregistrement est un paiement fixe dû par le demandeur lors du dépôt de la Demande d’arbitrage auprès du TAIC, et s’élève à:",
      registrationFee: {
        excludingVat: "1 000,00 EUR (hors TVA)",
        includingVat: "1 210,00 EUR (TVA de 21 % incluse, si applicable)."
      },
      currencyConversion: "Pour déterminer le montant des frais d’arbitrage dans chaque affaire, la valeur du litige (si elle n’est pas exprimée en euros) est convertie en euros selon le taux de change de la Banque nationale de Belgique en vigueur à la date de dépôt de la demande.",
      exchangeRateLink: "Taux de change",
      exchangeRateUrl: "https://www.nbb.be/en/about-national-bank/eurosystem/exchange-rates",
      amount: "Montant du litige (EUR)",
      submitBtn: "Calculer",
      composition: "Composition du tribunal arbitral",
      oneArbitrator: "1 arbitre",
      threeArbitrators: "3 arbitres",
      costs: "Frais d’arbitrage:",
      fee: "Frais d’arbitrage",
      vat: "TVA (21 %)",
      total: "Montant total",
      estimate: "* Le montant final des frais d’arbitrage peut varier en fonction des spécificités de l’affaire.",
      inclVAT: "(hors TVA)",
      exclVAT: "(TVA incluse)"
    },
    clause: {
      title: "Typique clause compromissoire au Tribunal d’arbitrage international de commerce auprès de la Chambre Européenne d’Arbitrage",
      future: {
        title: "Litiges futurs",
        description: "Les parties concluant le contrat et souhaitant que les litiges pouvant survenir à l'avenir soient soumis au Tribunal arbitral conformément au Règlement du TAIC, sont invitées à inclure la clause compromissoire suivante dans le contrat (les mots ou espaces entre crochets doivent être supprimés ou complétés en conséquence):",
        clause1: `"Tout litige découlant du présent contrat ou en relation avec celui-ci, y compris toute question relative à son existence, sa validité ou sa résiliation, sera soumis et définitivement tranché par le Tribunal d’arbitrage international de commerce auprès de la Chambre Européenne d’Arbitrage (Belgique, Bruxelles, Avenue Louise 146), conformément au Règlement de ce TAIC, lequel, en vertu de cette référence, est réputé faire partie intégrante de la présente clause.`,
        clause2: "Le nombre d’arbitres sera de [un / trois].",
        clause3: "Le siège, ou lieu juridique, de l’arbitrage sera [ville et/ou pays].",
        clause4: "La langue utilisée dans la procédure arbitrale sera le [___].",
        clause5: 'La loi applicable au contrat sera le droit substantiel de [pays]."',
        note: `Dans le cas où les parties ne sont ni des personnes physiques de nationalité belge ni des personnes morales ayant leur siège social en Belgique, au sens de l’article 1718 du Code judiciaire belge, elles peuvent également stipuler ce qui suit: “Les parties excluent expressément toute demande en annulation de la sentence arbitrale».`
      },
      existing: {
        title: "Litiges existants",
        description: "S’il existe un litige entre les parties lié au contrat, sans qu’un accord ait été conclu quant au mode de règlement du différend, ou si les parties souhaitent modifier la clause existante afin de prévoir le règlement du litige par le TAIC, la clause suivante est recommandée (les mots ou espaces entre crochets doivent être supprimés ou complétés en conséquence):",
        clause1: `"Un litige étant survenu entre les parties concernant [ ], les parties conviennent par les présentes que ce litige sera soumis et définitivement tranché par le Tribunal d’arbitrage international de commerce auprès de la Chambre Européenne d’Arbitrage (Belgique, Bruxelles, Avenue Louise 146), conformément au Règlement de ce TAIC.`,
        clause2: "Le nombre d’arbitres sera de [un / trois].",
        clause3: "Le siège, ou lieu juridique, de l’arbitrage sera [ville et/ou pays]",
        clause4: "La langue utilisée dans la procédure arbitrale sera le [___].",
        clause5: 'La loi applicable au contrat sera le droit substantiel de [pays]."',
        note: `Dans le cas où les parties ne sont ni des personnes physiques de nationalité belge ni des personnes morales ayant leur siège social en Belgique, au sens de l’article 1718 du Code judiciaire belge, elles peuvent également stipuler ce qui suit: “Les parties excluent expressément toute demande en annulation de la sentence arbitrale”.`
      }
    }
  },
  expertise: {
    icje: {
      title: "Expertise au CEI",
      description1: "Au sein de la Chambre Européenne d'Arbitrage, le Centre Expertise International sous la Chambre Européenne d'Arbitrage (le CEI sous la CEA) fonctionne en tant que département distinct, exerçant ses activités conformément aux statuts de la Chambre Européenne d'Arbitrage.",
      description2: {
        text: "Le CEI réalise des expertises judiciaires:",
        examinations: [
          "par ordonnance  des tribunaux d'arbitrage internationaux (sans limitations de juridiction);",
          "par ordonnance des juridictions étatiques dans le cadre de la procédure judiciaire;",
          "à la demande d'avocats, de personnes morales et de particuliers."
        ],
        footer: "Notre équipe d'experts accrédités, travaillant selon des normes internationales, garantit la précision, la fiabilité et la conformité aux exigences légales. Nous sommes prêts à fournir des expertises judiciaires de qualité pour résoudre vos besoins."
      }
    },
    fields: {
      title: "CEI – PRINCIPALES ZONES DE RECHERCHE D'EXPERTISE",
      description1: "Le Centre Expertise International et de Résolution des Conflits (CEI) offre une large gamme de services d'expertise et d'examen dans divers secteurs, notamment:",
      areas: [
        "Expertise technique en construction;",
        "Expertise foncière et cadastrale;",
        "Expertise en ingénierie électrique;",
        "Expertise en transport et analyse de traces (tracologie);",
        "Expertise économique et financière;",
        "Expertise environnementale;",
        "Expertise en évaluation des marchandises et des produits;",
        "Expertise en propriété intellectuelle;",
        "Expertise en œuvres d'art et biens culturels;",
        "Expertise linguistique (linguistique judiciaire);",
        "Expertise en écriture manuscrite (graphologie);",
        "Expertise technique des documents;",
        "Expertise psychologique."
      ],
      subtitle: "Expertises réalisées par le CIJE",
      description2: "Le CIJE réalise des expertises :",
      providedFor: [
        "À la demande de tribunaux arbitraux internationaux (sans limitations juridictionnelles).",
        "À la demande de juridictions étatiques.",
        "À la demande d’avocats, de personnes morales ou de particuliers.",
        "Conformément à d'autres exigences légales ou procédurales."
      ],
      finalNote: "Notre équipe d’experts certifiés garantit l’exactitude, la fiabilité et la conformité aux normes internationales. Contactez-nous pour en savoir plus ou demander une expertise."
    }
  },
  artExpertise: {
    authentication: {
      title: "Authentification d'Art",
      p1: "Assurer l'authenticité d'une œuvre d'art est crucial pour les collectionneurs, investisseurs, musées et galeries. Le Centre Expertise International et de Résolution des Conflits (CEI) sous la Chambre Européenne d'Arbitrage fournit des services professionnels d'authentification d'art pour vérifier l'originalité, l'auteur et la provenance des œuvres.",
      p2: "L'authentification d'art est un examen détaillé réalisé par des experts afin de déterminer si une œuvre est authentique.",
      processTitle: "Ce processus inclut:",
      processList: [
        "Analyse d'Attribution – Confirmation de l'identité de l'artiste et évaluation des caractéristiques stylistiques et techniques.",
        "Examen des Matériaux – Analyse des pigments, toiles, papiers et autres matériaux pour vérifier la cohérence avec la période revendiquée.",
        "Recherche de Provenance – Enquête sur l'historique de propriété de l'œuvre et traçage de ses origines.",
        "Analyse Comparative – Croisement de l'œuvre avec des pièces documentées de l'artiste ou de la période concernée."
      ],
      importanceTitle: "Pourquoi l'Authentification d'Art est-elle Importante?",
      importanceList: [
        "Protège contre les contrefaçons et les erreurs d'attribution.",
        "Augmente la valeur et la commercialisation d'une œuvre.",
        "Fournit une sécurité juridique et financière pour les transactions, les assurances et les questions successorales.",
        "Assure la conformité avec les réglementations internationales pour les expositions et les ventes."
      ],
      certificateTitle: "Certification d'Authenticité",
      certificateText: "Après vérification réussie, CEI délivre un Certificat d'Authenticité, qui sert de document officiel attestant de la légitimité de l'œuvre. Ce certificat peut être utilisé pour les ventes, les expositions, les assurances et les démarches juridiques.",
      closingText: "Pour plus d'informations ou pour demander un service d'authentification d'art, contactez-nous dès aujourd'hui."
    },
    appraisal: {
      title: "ÉVALUATION D’ŒUVRES D’ART",
      intro1: "Pour déterminer la valeur marchande d’une œuvre d’art, un processus complet d’examen et d’évaluation est mené.",
      intro2: "L’expertise artistique consiste à évaluer l’authenticité et la valeur artistique d’une œuvre, tandis que l’évaluation détermine sa valeur marchande.",
      factorsTitle: "L’évaluation professionnelle prend en compte plusieurs facteurs, notamment :",
      evaluationFactors: [
        "Ses caractéristiques et son année de création",
        "La réputation et l’importance de l’artiste",
        "La qualité de l’œuvre selon des indices de valeur socioculturels",
        "L’historique et la provenance de l’œuvre"
      ],
      summary: "Cette analyse approfondie permet d’établir la valeur globale de l’œuvre, d’en prévoir l’évolution future et d’évaluer les pertes financières potentielles en cas de perte totale.",
      stagesTitle: "Étapes de l’évaluation artistique",
      stagesList: [
        "Expertise artistique et attribution – Vérification de l’authenticité et de l’auteur",
        "Estimation de la valeur marchande – Évaluation de la valeur financière",
        "Autorisation et certification – Délivrance d’un passeport unique pour l’œuvre"
      ],
      conclusion: "Cette approche structurée garantit une évaluation précise et crédible, essentielle pour les collectionneurs, investisseurs, assureurs et le marché de l’art.",
      contactNote: "Pour plus d’informations ou pour demander un service d’authentification d’art, contactez-nous dès aujourd'hui."
    },
    passport: {
      title: "AUTORISATION DES ŒUVRES D'ART",
      intro: "Les experts du Le Centre Expertise International sous la Chambre Européenne d'Arbitrage (le CEI sous la CEA) fournissent des services d’autorisation et de certification des œuvres d’art. Ce processus aboutit à la délivrance d’un passeport pour l’œuvre, certifiant ses caractéristiques physiques uniques.",
      eligibleObjectsTitle: "Objets pouvant être autorisés et certifiés :",
      eligibleObjects: [
        "Peintures",
        "Sculptures",
        "Œuvres photographiques",
        "Œuvres d’art appliqué (tissage décoratif, céramique, sculpture sur bois, fonderie, verre artistique, bijoux, etc.)",
        "Illustrations, cartes, dessins, croquis et œuvres plastiques",
        "Œuvres littéraires, y compris la fiction, le journalisme, les écrits scientifiques, techniques et autres (livres, brochures, articles, etc.)",
        "Instruments de musique",
        "Objets numismatiques",
        "Antiquités et autres objets de collection"
      ],
      certificationTitle: "Qu’est-ce que la certification d’un objet d’art ?",
      certificationDesc: "La certification est une vérification officielle des caractéristiques essentielles de l’œuvre, incluant son auteur, sa période de création, son historique de propriété, les restaurations effectuées, sa valeur, sa provenance et son lien avec des événements historiques ou culturels.",
      passportContentTitle: "Quelles informations contient le passeport d'une œuvre d'art ?",
      passportContentIntro: "Le passeport comprend les informations suivantes :",
      passportFields: [
        "Une photographie de l’œuvre",
        "Titre de l’œuvre",
        "Nom de l’artiste et année de création",
        "Dimensions",
        "Technique et matériaux utilisés"
      ],
      whyImportantTitle: "Pourquoi l’autorisation et la certification d’une œuvre d’art sont-elles importantes ?",
      whyImportantIntro: "Le passeport d’une œuvre d’art offre plusieurs avantages, notamment la possibilité de :",
      advantages: [
        "Présenter l’œuvre (peinture, sculpture, céramique, etc.) sur les marchés internationaux de l’art",
        "Exposer l’œuvre lors d’expositions et salons internationaux",
        "Vérifier son authenticité après une exposition",
        "Simplifier les démarches d’assurance et réduire les risques",
        "Faciliter l’achat et la vente de l’œuvre sans nécessiter de nouvelle authentification"
      ],
      finalNote: "Une méthode d’autorisation exclusive garantit que les données d’identification confidentielles de l’œuvre sont stockées en toute sécurité dans le centre de données de CEI. Si nécessaire, les spécialistes peuvent authentifier l’œuvre et délivrer un certificat à la demande du propriétaire.",
      consultation: "Pour des informations plus détaillées sur l'autorisation des œuvres d'art, veuillez contacter le Secrétariat de la CEA."
    }
  },
  gallery: {
    title: "Galerie d'Art",
    description: "Explorez les œuvres d'art authentifiées avec analyse d'expert. Chaque pièce de notre collection a été soigneusement vérifiée et documentée par notre équipe de spécialistes.",
    searchPlaceholder: "Rechercher par titre ou artiste...",
    allYears: "Toutes les Années",
    clearFilters: "Effacer les Filtres",
    noImage: "Aucune Image Disponible",
    noResults: "Aucune œuvre d'art ne correspond à vos critères de recherche.",
    noPaintings: "Aucune œuvre d'art n'est actuellement disponible dans la galerie.",
    backToGallery: "Retour à la Galerie",
    backToPainting: "Retour à la Peinture",
    error: "Erreur",
    paintingNotFound: "Peinture non trouvée ou non disponible.",
    expertAccess: "Accès Expert",
    expertAccessDescription: "Cette œuvre d'art a été professionnellement authentifiée et documentée. L'accès à l'analyse technique détaillée et aux rapports d'experts est disponible via des codes QR sécurisés.",
    qrCodeInfo: "Le personnel autorisé peut scanner les codes QR pour accéder aux rapports d'authentification détaillés, analyse technique, et documentation de provenance.",
    invalidToken: "Token d'accès invalide ou expiré.",
    accessDenied: "Accès Refusé",
    secureAccess: "Accès Sécurisé Accordé",
    technicalAnalysis: "Analyse Technique",
    expertiseReport: "Rapport d'Expertise",
    certificates: "Certificats",
    documents: "Documents",
    certificate: "Certificat",
    document: "Document",
    viewDocument: "Voir le Document"
  },
  membership: {
    benefits: {
      title: "5 RAISONS DE DEVENIR MEMBRE DE LA CEA:",
      reasons: [
        {
          title: "Accréditation d'arbitre.",
          description: "Possibilité de suivre une formation qualifiante pour les arbitres et, à l'issue de l'examen, d'obtenir l'accréditation d'arbitre TAIC."
        },
        {
          title: "Opportunités de carrière.",
          description: "Réseautage, organisation de stages professionnels pour les membres de la CEA et élargissement de la base de clients grâce à la coopération entre les membres de la CEA."
        },
        {
          title: "Améliorer les qualifications professionnelles.",
          description: "Les membres de la CEA peuvent participer à des séminaires, formations, ateliers, tables rondes et congrès organisés par la CEA et ses partenaires, à des conditions préférentielles."
        },
        {
          title: "Échange d'informations professionnelles dans le domaine du droit international et de l'arbitrage.",
          description: "Revue électronique de la CEA, envoi de nouvelles analytiques, accès à la littérature professionnelle de la CEA et à la jurisprudence du CCI sous la CEA."
        },
        {
          title: "Opportunités publicitaires.",
          description: "Les membres de la CEA peuvent publier leurs informations professionnelles sur le site web de la CEA ainsi que dans les publications périodiques de la CEA."
        }
      ]
    },
    join: {
      title: "Adhésion à la Chambre Européenne d’Arbitrage",
      description: "Si vous souhaitez devenir membre associé de la Chambre Européenne d’Arbitrage, suivez ces étapes:",
      steps: [
        {
          title: "Soumettez votre candidature",
          description: "en remplissant le formulaire de demande d'adhésion en ligne."
        },
        {
          title: "Procédure de vérification",
          description: "le Secrétariat de la CAE examinera votre candidature et évaluera votre éligibilité."
        },
        {
          title: "Finalisez votre adhésio",
          description: "en payant la cotisation annuelle après vérification."
        }
      ],
      fee: "La cotisation annuelle s'élève à 301,29 EUR (TVA incluse).",
      formPrompt: "Pour demander l'adhésion, veuillez remplir le formulaire ici:",
      formLink: "https://docs.google.com/forms/d/e/1FAIpQLSdI-Ic0-JOrRDbQO3VQqMqipTM-qrhjKM9WQiBv02ytqKD8_A/viewform",
      followUp: "Le Secrétariat de la CEA vous contactera pour vous fournir des instructions supplémentaires."
    },
    code: {
      title: "Code de conduite de la CEA",
      intro: "La Chambre Européenne d'Arbitrage (CEA) a établi ce Code de conduite pour garantir que ses membres respectent les plus hauts standards éthiques et professionnels. Tous les membres sont tenus de respecter strictement ces principes.",
      obligations: {
        title: "Obligations",
        description: "Chaque membre de la CEA s'engage à:",
        list: [
          "Respecter les normes juridiques – Promouvoir l’observation du droit international et des législations nationales pertinentes à l’arbitrage et aux modes alternatifs de règlement des conflits (MARC).",
          "Promouvoir les modes alternatifs de règlement des conflits (MARC) – Soutenir le développement et l’intégration des MARC et de l’arbitrage international dans les pratiques commerciales mondiales.",
          "Favoriser la collaboration institutionnelle – Développer des relations constructives avec les autorités et les organisations internationales pour soutenir la justice, l’état de droit et un climat favorable aux affaires mondiales.",
          "Participer activement à la communauté de la CEA – Collaborer avec les membres de la CEA pour faire progresser les MARC au niveau national et international.",
          "Participer activement – Prendre part aux événements officiels, conférences et activités organisées par la CEA.",
          "Promouvoir la sensibilisation aux MARC – Contribuer à la diffusion des connaissances professionnelles sur les systèmes MARC à l’échelle mondiale.",
          "Respecter les règlements de la CEA – Se conformer strictement aux principes et exigences énoncés dans les statuts de la CEA."
        ]
      },
      responsibilities: {
        title: "Responsabilités",
        description: "Chaque membre est personnellement responsable de:",
        list: [
          "Intégrité et conduite éthique – Agir avec honnêteté, équité et respect des droits humains, en alignement avec la Déclaration universelle des droits de l'homme. Éviter toute forme de discrimination.",
          "Engagement envers la société – Agir loyalement et honnêtement selon les politiques de la CEA.",
          "Respect professionnel – S'abstenir de nuire à la réputation professionnelle d'autrui.",
          "Respect des droits de propriété – Respecter les droits de propriété intellectuelle et autres protections légales liées à la propriété.",
          "Confidentialité – Maintenir la stricte confidentialité concernant toute information privilégiée obtenue dans le cadre de l’exercice professionnel.",
          "Compétence et objectivité – N’accepter que des missions pour lesquelles ils sont qualifiés et fournir des avis professionnels avec le plus haut degré d'objectivité."
        ]
      },
      sanctions: {
        title: "Sanctions pour non-conformité",
        description: "Le non-respect de ce Code de déontologie, s'il est confirmé par la CEA, peut entraîner la révocation immédiate de l’adhésion."
      }
    }
  },
  common: {
    backToNews: "Retour aux Actualités",
    loading: "Chargement...",
    login: "Connexion",
    register: "S'inscrire",
    email: "E-mail",
    password: "Mot de passe",
    fullName: "Nom complet",
    confirmPassword: "Confirmer le mot de passe",
    signingIn: "Connexion...",
    creatingAccount: "Création du compte...",
    passwordsDoNotMatch: "Les mots de passe ne correspondent pas",
    registrationSuccess: "Inscription réussie ! Vérifiez votre e-mail.",
    galleryManagementPanel: "Accédez à votre panneau de gestion"
  }
};
const ru = {
  seo: {
    home: {
      title: "Европейская Арбитражная Палата (ЕАП)",
      description: "Европейская Арбитражная Палата (ЕАП) — международная некоммерческая ассоциация, основанная в Бельгии в 2008 году: арбитраж, медиация и экспертиза произведений искусства."
    },
    eac: {
      title: "О Европейской Арбитражной Палате (ЕАП)",
      description: "Узнайте о ЕАП — международной некоммерческой ассоциации, основанной в Бельгии в 2008 году профессионалами в области коммерческого арбитража и медиации."
    },
    council: {
      title: "Члены совета ЕАП",
      description: "Познакомьтесь с международными арбитрами, медиаторами и юристами, входящими в состав Совета Европейской Арбитражной Палаты (ЕАП)."
    },
    news: {
      title: "Новости и обновления | ЕАП",
      description: "Следите за последними новостями, конференциями, партнёрствами и развитием арбитражной практики Европейской Арбитражной Палаты (ЕАП) по всему миру."
    },
    icac: {
      title: "О МКАС при ЕАП",
      description: "МКАС при ЕАП — независимый постоянно действующий арбитражный суд, осуществляющий свою деятельность в соответствии с Судебным кодексом Бельгии и Регламентом ЕАП."
    },
    rules: {
      title: "Регламент МКАС при ЕАП",
      description: "Арбитражный регламент МКАС — официальная редакция, вступившая в силу 11 ноября 2020 года и утверждённая Советом Европейской Арбитражной Палаты."
    },
    fees: {
      title: "Положение о сборах МКАС | ЕАП",
      description: "Положение об арбитражных сборах МКАС — официальная редакция, действующая с 11 ноября 2020 года, утверждённая Советом Европейской Арбитражной Палаты."
    },
    calculator: {
      title: "Калькулятор стоимости арбитража | ЕАП",
      description: "Рассчитайте арбитражный сбор МКАС при ЕАП по вашему делу в зависимости от цены иска, согласно официальному Положению об арбитражных сборах."
    },
    clause: {
      title: "Типовая арбитражная оговорка МКАС | ЕАП",
      description: "Официальная типовая арбитражная оговорка МКАС при ЕАП, рекомендованная для включения в международные коммерческие контракты и юридические соглашения."
    },
    icje: {
      title: "Экспертиза в МЦЭ | ЕАП",
      description: "Международный центр экспертизы (МЦЭ) при ЕАП оказывает независимые экспертные услуги во многих отраслях, действуя в соответствии с Уставом ЕАП."
    },
    areas: {
      title: "Основные направления экспертизы МЦЭ | ЕАП",
      description: "Ознакомьтесь с основными направлениями экспертных исследований МЦЭ при ЕАП — искусство, финансы, технические и юридические сферы."
    },
    authentication: {
      title: "Аутентификация произведений искусства | ЕАП",
      description: "Профессиональная аутентификация произведений искусства МЦЭ при ЕАП — установление оригинальности, авторства и провенанса для коллекционеров и музеев."
    },
    appraisal: {
      title: "Оценка стоимости произведений искусства | ЕАП",
      description: "Независимая оценка произведений искусства и определение их рыночной стоимости Международным центром экспертизы (МЦЭ) при ЕАП."
    },
    artPassport: {
      title: "Авторизация произведений искусства | ЕАП",
      description: "МЦЭ при ЕАП выдаёт официальные паспорта произведений искусства, удостоверяющие уникальные физические характеристики, авторство и провенанс."
    },
    gallery: {
      title: "Художественная галерея | ЕАП",
      description: "Изучайте аутентифицированные произведения искусства с экспертным анализом, документацией провенанса и подробными оценочными записями ЕАП."
    },
    benefits: {
      title: "5 причин оформить членство в ЕАП",
      description: "Аккредитация арбитра, карьерные возможности, повышение квалификации, обмен профессиональной информацией и международная видимость — узнайте о преимуществах членства."
    },
    join: {
      title: "Членство в ЕАП",
      description: "Узнайте, как стать ассоциированным членом Европейской Арбитражной Палаты — этапы вступления, требования и преимущества для арбитров и юристов."
    },
    conductCode: {
      title: "Кодекс корпоративной этики | ЕАП",
      description: "Кодекс корпоративной этики ЕАП устанавливает этические и профессиональные стандарты, обязательные для соблюдения всеми членами Европейской Арбитражной Палаты."
    },
    contacts: {
      title: "Связаться с нами | ЕАП",
      description: "Свяжитесь с Европейской Арбитражной Палатой по вопросам арбитража, медиации, экспертизы или членства — Брюссель, Бельгия. Ответ в течение двух рабочих дней."
    },
    about: {
      title: "О нас | ЕАП",
      description: "Узнайте о миссии, видении и ценностях Европейской Арбитражной Палаты — международной некоммерческой ассоциации, действующей с 2008 года."
    }
  },
  language: {
    english: "EN",
    french: "FR",
    russian: "RU"
  },
  menu: {
    eac: "ЕАП",
    about: "О нас",
    council: "Совет ЕАП",
    news: "Новости",
    events: "Календарь событий",
    arbitration: "Арбитраж",
    icac: "О МКАС при ЕАП",
    rules: "Регламент МКАС",
    fees: "Положения об арбитражных расходах МКАС",
    calculator: "Калькулятор сбора",
    clause: "Арбитражная оговорка",
    arbitrators: "Список арбитров",
    resources: "Юридические ресурсы",
    expertise: "Экспертиза",
    icje: "Об МЦЭ при ЕАП",
    expertiseFields: "Виды экспертиз",
    "art-expertise": "Арт-экспертиза",
    authentication: "Аутентификация предметов  искусства",
    appraisal: "Оценка предметов искусства",
    passport: "Паспорт предмета искусства",
    register: "Международный реестр произведений искусства",
    training: "Обучение",
    qualification: "Курс квалификации для арбитров",
    membership: "Членство",
    join: "Вступить в ассоциацию",
    benefits: "Преимущества членства в ЕАП",
    conductCode: "Кодекс этики",
    contacts: "Контакты",
    sections: "Меню",
    home: "Главная",
    gallery: "Галерея"
  },
  footer: {
    about: "Эффективное разрешение коммерческих споров.",
    quickLinks: "Быстрые ссылки",
    services: "Наши услуги",
    contactUs: "Связаться с нами",
    rights: "Все права защищены.",
    privacy: "Политика конфиденциальности",
    terms: "Условия предоставления услуг",
    cookies: "Политика использования файлов cookie"
  },
  home: {
    heroTitle: "Европейская Арбитражная Палата",
    heroDescription: "Эффективное разрешение коммерческих споров.",
    heroBtn: "Подробнее",
    quickLinks: {
      rulesTitle: "Арбитражный Регламент",
      rulesDescription: "Вся необходимая информация перед началом арбитражного разбирательства в МКАС.",
      rulesBtn: "Узнать больше",
      clauseTitle: "Типовая арбитражная оговорка",
      clauseDescription: "Арбитражная оговорка МКАС для включения в контракт.",
      clauseBtn: "Ознакомиться",
      calculatorTitle: "Калькулятор сбора",
      calculatorDescription: "Рассчитайте стоимость арбитража в зависимости от суммы спора.",
      calculatorBtn: "Рассчитать"
    },
    services: {
      sectionTitle: "Разрешение споров и экспертиза",
      arbitrationTitle: "АРБИТРАЖ",
      arbitrationDesc: "Гибкая арбитражная процедура, оптимальные сроки, фиксированный арбитражный сбор, окончательность и обязательность арбитражного решения МКАС.",
      expertiseTitle: "ЭКСПЕРТИЗА",
      expertiseDesc: "Комплексные экспертные исследования для разрешения сложных технических или специализированных споров.",
      artTitle: "АРТ-ЭКСПЕРТИЗА",
      artDesc: "Искусствоведческая экспертиза, аутентификация и оценка произведений искусства. Объективное экспертное мнение для коллекционеров, галерей и организаций.",
      membershipTitle: "ЧЛЕНСТВО",
      membershipDesc: "Европейская Арбитражная Палата объединяет арбитров, экспертов, адвокатов и представителей бизнеса со всего мира. Узнайте, как вступить в ЕАП."
    },
    latestNews: "Последние новости",
    viewAllNews: "Смотреть все новости",
    readMore: "Читать далее"
  },
  contacts: {
    title: "Связаться с нами",
    information: "Адрес и электронная почта",
    addressTitle: "Адрес",
    addressName: "Международная неприбыльная ассоциация «Европейская арбитражная палата»",
    address: "Бельгия, Брюссель, B-1050, авеню Луиз, 146",
    phone: "Телефон",
    email: "Электронная почта",
    emailPlaceholder: "Ваш email",
    sendMessage: "Форма обратной связи",
    name: "Имя",
    namePlaceholder: "Ваше имя",
    subject: "Тема",
    subjectPlaceholder: "Введите тему",
    message: "Сообщение",
    messagePlaceholder: "Введите сообщение",
    send: "Отправить",
    location: "Наше местоположение"
  },
  aboutEAC: {
    title: "О Европейской Арбитражной Палате (ЕАП)",
    intro: "Международная неприбыльная ассоциация «Европейская арбитражная палата» (ЕАП) была основана в Бельгии в 2008 году по инициативе профессионалов в сфере коммерческого арбитража и медиации из Бельгии, Франции и Украины.",
    missionText: "Миссия EAП – содействие развитию системы альтернативного разрешения споров, объединение профессионалов в этой сфере, а также эффективное и быстрое разрешение трансграничных споров, возникающих в коммерческой деятельности, посредством международного арбитража и экспертизы.",
    historyText: "EAП осуществляет свою деятельность в соответствии с Законом Королевства Бельгия о некоммерческих ассоциациях, международных некоммерческих ассоциациях и фондах от 27 июня 1921 года.",
    representativesText: "Сегодня ЕАП объединяет представителей 35 стран мира — арбитров, медиаторов, судебных экспертов, бизнесменов, общественных деятелей и студентов с целью развития коммерческого арбитража, медиации, судебной экспертизы и системы ADR в целом.",
    keyAreasTitle: "Ключевые Направления Деятельности",
    keyAreas: {
      commercial: "Коммерческий Арбитраж – разрешение трансграничных коммерческих споров с помощью международного арбитража.",
      judicial: "Судебная Экспертиза – проведение экспертных оценок для судебных и арбитражных разбирательств.",
      education: "Обучение и повышение квалификации – проведение квалификационных курсов и программ в сфере ADR, арбитража, экспертизы и медиации."
    }
  },
  council: {
    title: "Члены Совета ЕАП",
    members: {
      pampukha: {
        name: "Геннадий ПАМПУХА",
        position: "Президент ЕАП и член Совета ЕАП",
        description: "Президент ЕАП и член Совета ЕАП, вице-президент Международного Коммерческого Арбитражного Суда при Европейском Арбитражном Суде, международный арбитр, судебный эксперт, сертифицированный Министерством юстиции Украины, учредитель юридической группы «Независимый институт судебной экспертизы» (Украина), председатель совета Всеукраинской палаты экспертов, управляющий партнёр адвокатского объединения «Принцип» (Украина), член совета I.I.expertise (Эстония)."
      },
      moja: {
        name: "Андреа МОЯ",
        position: "Член Совета ЕАП",
        description: "Член Совета ЕАП, профессор европейского права и трастов в Университете Брешии, член научного комитета STEP Италия, старший партнёр юридической фирмы S.L.C. – Studio Legale Commerciale (Италия), более 25 лет опыта в области трастов, наследования, налогов, международных трансграничных сделок и крупных арбитражных споров. Международный арбитр Международного Коммерческого Арбитражного Суда."
      },
      marcinkowski: {
        name: "Ричард МАРЧИНКОВСКИ",
        position: "Член Совета ЕАП",
        description: "Член Совета ЕАП, старший партнёр юридической фирмы «Marcinkowski Marcinkowska Trzeciak», адвокат с более чем 32-летним опытом, заместитель декана коллегии адвокатов в Лодзи (Польша), международный арбитр Международного Коммерческого Арбитражного Суда. Преподаёт гражданское право, включая вопросы апелляционного судопроизводства."
      },
      billiet: {
        name: "Йохан БИЛЛИЕТ",
        position: "Президент Международного коммерческого арбитражного суда при Европейской арбитражной палате",
        description: "С 2011 года Йохан Биллиет является президентом МКАС, международный арбитр, медиатор, адвокат брюссельской коллегии, основатель фирмы Billiet & Co., автор нескольких книг, включая учебник по международному инвестиционному арбитражу для Свободного университета Брюсселя (VUB)."
      },
      laycock: {
        name: "Патрик ЛЕЙКОК",
        position: "Руководитель Международного центра судебной и альтернативной экспертизы при Европейской арбитражной палате",
        description: "Г-н Лейкок — искусствовед, научный консультант Брюссельской художественной лаборатории. Признан и поддерживается рядом уважаемых организаций, включая Европейскую Арбитражную Палату, Бельгийскую палату судебных экспертов, Палату арбитража и медиации технических и юридических экспертов, а также Суд первой инстанции Брюсселя. Член Сиамского общества под королевским патронажем (Бангкок) и президент Института высоких китайских исследований Бельгии при Королевском музее искусств и истории."
      }
    }
  },
  arbitration: {
    icac: {
      title: "О МКАС при ЕАП",
      intro: "Международный коммерческий арбитражный суд при Европейской Арбитражной Палате (далее - «МКАС при ЕАП») – независимый постоянно действующий арбитражный суд, который осуществляет свою деятельность в соответствии с Судебным кодексом Бельгии (ст.1676-1722), Уставом Европейской Арбитражной Палаты и собственным Регламентом.",
      secretariat: "Центральный секретариат МКАС при ЕАП расположен в Брюсселе, также имея свои представительства в Италии, Чехии, Польше, Армении, Грузии, Украине, ОАЭ.",
      competenceTitle: "В компетенцию МКАС входит рассмотрение споров, которые возникают при осуществлении внешнеторговых или иных видов внешнеэкономических отношений и касаются:",
      competenceList: {
        sale: "купли-продажи (поставки) товаров;",
        services: "выполнения работ, предоставления услуг;",
        exchange: "обмена товарами и/или услугами;",
        finance: "кредитно-расчетных операций;",
        insurance: "страхования и др."
      },
      featuresTitle: "Особенности МКАС при ЕАП:",
      features: {
        multinationalTitle: "Широкий международный список арбитров",
        multinationalDesc: "В арбитражную панель МКАС при ЕАП входят ведущие арбитры из 35 юрисдикций мира, которые специализируются в сфере международного права, инвестиционной деятельности, коммерческого и корпоративного права, интеллектуальной собственности, информационных технологий, внешнеэкономической деятельности и др. Споры в МКАС при ЕАП рассматриваются арбитрами, избираемыми сторонами или назначаемыми Председателем МКАС из панели арбитров МКАС, принявших соответствующую присягу и не имеющих конфликта интересов.",
        principlesTitle: "Принципы МКАС",
        principlesDesc: "МКАС при ЕАП рассматривает стандарты независимости, беспристрастности и добросовестности как первостепенные и решающие свойства для надлежащего функционирования МКАС.",
        flexibilityTitle: "Гибкая арбитражная процедура",
        flexibilityDesc: "Стороны имеют автономию относительно выбора материального и процессуального права, регулирующего спор, а также языка разбирательства, места проведения слушаний, кандидатур арбитров и их количества, формата арбитражного разбирательства (традиционный арбитраж, который включает арбитражные слушанья, или упрощенная онлайн-процедура).",
        techTitle: "Использование передовых технологий",
        techDesc: "Возможность рассмотрения споров в режиме «онлайн», что значительно экономит судебные издержки и временные затраты.",
        timingTitle: "Оптимальные сроки и стоимость",
        timingDesc: "Ускоренный процесс рассмотрения споров и фиксированный размер арбитражного сбора делают арбитражную процедуру в МКАС не только быстрой и эффективной с точки зрения затрат.",
        finalityTitle: "Окончательность и обязательность арбитражного решения",
        finalityDesc: "В соответствии с Регламентом МКАС финальное решение является окончательным и обязательным для сторон с даты его вынесения. Процедура рассмотрения споров в МКАС при ЕАП не предусматривает наличие апелляционного обжалования."
      }
    },
    rules: {
      title: "РЕГЛАМЕНТ МКАС ПРИ ЕАП",
      description: "11 ноября 2020 года вступила в силу новая редакция Арбитражного регламента МКАС, утвержденная Советом Международной неприбыльной ассоциации «Европейская арбитражная палата». Он применяется ко всем арбитражным разбирательствам, которые начались после 10 ноября 2020 года или будут начаты в будущем. Из всех языковых версий Арбитражного регламента МКАС превалирующей считается английская версия.",
      downloadLabel: "Вы можете скачать Арбитражный регламент МКАС здесь:",
      translationLabel: "Перевод:",
      englishBtn: "Арбитражный регламент МКАС на английском языке 2020 г.",
      russianBtn: "Арбитражный регламент МКАС на русском языке 2020 г."
    },
    fees: {
      title: "Положение о Сборах",
      description: "Новая редакция Положения о Сборах МКАС вступила в силу 11 ноября 2020 года. Эта версия была утверждена Советом Международной некоммерческой ассоциации «Европейская Арбитражная Палата». Она применяется ко всем производствам, начатым после 10 ноября 2020 года или в будущем. Приоритетной считается английская версия.",
      downloadLabel: "Вы можете скачать Положение о Сборах МКАС здесь:",
      translationLabel: "Перевод:",
      englishBtn: "Положение о Сборах МКАС от 11.11.2020 (английский)",
      russianBtn: "Положение о Сборах МКАС от 11.11.2020 (русский)"
    },
    calculator: {
      title: "Калькулятор Стоимости",
      description: "Арбитражный сбор оплачивается сторонами по каждому принятому к рассмотрению в Международном коммерческом арбитражном суде при МНА “Европейская арбитражная палата” (г. Брюссель, Бельгия) (далее – “МКАС при ЕАП”)  иску для покрытия расходов по организации и проведению арбитражного разбирательства. Сумма арбитражного сбора рассчитывается в соответствии с Положением об арбитражных сборах МКАС при ЕАП.",
      registrationFeeTitle: "Регистрационный сбор является фиксированным платежом, уплачиваемым истцом при предъявлении Запроса об арбитраже  в МКАС и  составляет:",
      registrationFee: {
        excludingVat: "1.000,00 евро (без НДС)",
        includingVat: "1.210,00 евро (включая 21% НДС, если применимо)."
      },
      currencyConversion: "Для установления размера арбитражного сбора по каждому делу цена иска (если она выражена не в евро) пересчитывается в евро по курсу Национального банка Бельгии, установленному на дату предъявления иска.",
      exchangeRateLink: "Курсы валют",
      exchangeRateUrl: "https://www.nbb.be/en/about-national-bank/eurosystem/exchange-rates",
      amount: "Сумма спора (EUR)",
      submitBtn: "Рассчитать",
      composition: "Состав арбитражного суда",
      oneArbitrator: "1 арбитр",
      threeArbitrators: "3 арбитра",
      costs: "Арбитражные расходы:",
      fee: "Арбитражный сбор:",
      vat: "НДС (21%):",
      total: "Общая сумма:",
      estimate: "* Окончательная сумма арбитражного сбора может варьироваться в зависимости от конкретных деталей дела.",
      inclVAT: "(включая НДС)",
      exclVAT: "(без НДС)"
    },
    clause: {
      title: "Типовая арбитражная оговорка МКАС при ЕАП",
      future: {
        title: "Будущие споры",
        description: "Сторонам, заключающим контракт и предусматривающим рассмотрение возможных будущих споров в Международном коммерческом арбитражном суде при МНА «Европейская арбитражная палата» (г. Брюссель, Бельгия) согласно его Регламента, рекомендуется включать в контракт следующую арбитражную оговорку (слова или пропуски в квадратных скобках должны быть соответственно убраны или заполнены):",
        clause1: `"Любой спор, возникающий по настоящему контракту или в связи с ним, в том числе любой вопрос в отношении существования, действительности или прекращения самого контракта, подлежит передаче на рассмотрение и окончательное разрешение в Международном коммерческом арбитражном суде при МНА «Европейская арбитражная палата» (г. Брюссель, Бельгия), согласно Регламента данного МКАС`,
        clause2: "Количество арбитров - [ один / три ].",
        clause3: "Место проведения арбитража- [ город и/или страна ].",
        clause4: "Язык арбитражного разбирательства - [___].",
        clause5: "Правом, регулирующим данный контракт, является материальное право [ страны ]»",
        note: `В случае, если вовлеченные стороны не являются физическими лицами бельгийского гражданства или юридическими лицами, имеющими зарегистрированный офис в Бельгии по смыслу статьи 1718 Судебного кодекса Бельгии, они также могут оговорить следующее: «Стороны прямо исключают любое заявление об отмене арбитражного решения».`
      },
      existing: {
        title: "Существующие споры",
        description: "Если между сторонами по контракту возник спор, и при этом между сторонами не существует соглашения о рассмотрении спора арбитражным судом, или если стороны желают изменить имеющуюся оговорку на случай разрешения конфликта с тем, чтобы она предусматривала разрешение спора в Международном коммерческом арбитражном суде при МНА «Европейская арбитражная палата» (г. Брюссель, Бельгия), этим сторонам рекомендуется следующая оговорка (слова или пропуски в квадратных скобках должны быть соответственно убраны или заполнены):",
        clause1: `«В связи со спором, возникшим между сторонами в отношении [___], стороны соглашаются, что данный спор будет передан на рассмотрение и окончательное разрешение в в Международный коммерческий арбитражный суд при МНА «Европейская арбитражная палата» (г. Брюссель, Бельгия) согласно Регламента данного МКАС.`,
        clause2: "Количество арбитров - [ один / три ].",
        clause3: "Место проведения арбитража - [ город и/или страна ].",
        clause4: "Язык арбитражного разбирательства - [___]",
        clause5: "Правом, регулирующим данный контракт, является материальное право [ страны ]».",
        note: `В случае, если вовлеченные стороны не являются физическими лицами бельгийского гражданства или юридическими лицами, имеющими зарегистрированный офис в Бельгии по смыслу статьи 1718 Судебного кодекса Бельгии, они также могут оговорить следующее: «Стороны прямо исключают любое заявление об отмене арбитражного решения».`
      }
    }
  },
  expertise: {
    icje: {
      title: "Экспертиза в МЦЭ",
      description1: "При Европейской Арбитражной Палате, как отдельный департамент, функционирует Международный центр экспертизы при Европейской Арбитражной Палате (МЦЭ при ЕАП), который осуществляет свою деятельность в соответствии с Уставом Европейской Арбитражной Палаты.",
      description2: {
        text: "МЦЭ проводит судебные экспертизы:",
        examinations: [
          "по постановлению международных арбитражных судов (без ограничений по юрисдикции);",
          "по определению государственных судов в рамках судебного производства;",
          "по запросу  адвокатов, юридических лиц и частных лиц."
        ],
        footer: "Наша команда аккредитованных экспертов, работающих по международным стандартам, гарантирует точность, надежность и соответствие всем требованиям законодательства. Мы готовы предоставить качественную судебную экспертизу для решения ваших задач."
      }
    },
    fields: {
      title: "ОСНОВНЫЕ НАПРАВЛЕНИЯ ЭКСПЕРТНЫХ ИССЛЕДОВАНИЙ МЦЭ",
      description1: "Международный центр экспертизы при Европейской Арбитражной Палате (МЦЭ при ЕАП) предоставляет широкий спектр экспертных исследований и экспертных услуг в различных отраслях, включая такие экспертизы, как:",
      areas: [
        "Строительно-техническая экспертиза;",
        "Земельно-техническая экспертиза;",
        "Электротехническая экспертиза;",
        "Транспортно-трасологическая экспертиза;",
        "Экономическая экспертиза;",
        "Экологическая экспертиза;",
        "Товароведческая экспертиза;",
        "Экспертиза интеллектуальной собственности;",
        "Экспертиза произведений искусства;",
        "Лингвистическая экспертиза;",
        "Почерковедческая экспертиза;",
        "Техническая экспертиза документов;",
        "Психологическая экспертиза и др."
      ],
      subtitle: "МЦЭ проводит судебные экспертизы:",
      description2: "МКСЭ проводит экспертизы:",
      providedFor: [
        "По запросу международных арбитражных судов (без ограничений по юрисдикции).",
        "По запросу государственных судов для судебного разбирательства.",
        "От имени юристов, юридических и физических лиц.",
        "В соответствии с другими юридическими и процессуальными нормами."
      ],
      finalNote: "Наша команда сертифицированных экспертов обеспечивает точность, достоверность и соответствие международным стандартам. Свяжитесь с нами для получения дополнительной информации или запроса экспертизы."
    }
  },
  artExpertise: {
    authentication: {
      title: "Аутентификация произведений искусства",
      p1: "Определение подлинности произведений искусства имеет решающее значение для коллекционеров, инвесторов, музеев и галерей. Международный центр экспертизы при Европейской Арбитражной Палате (МЦЭ при ЕАП) при Европейской Арбитражной Палате предоставляет профессиональные услуги по аутентификации произведений искусства для проверки их оригинальности, установления авторства и провенанса.",
      p2: "Аутентификация произведений искусства — это исследование, которое проводит эксперт с целью подтверждения или опровержения подлинности произведения искусства.",
      processTitle: "Этот процесс включает:",
      processList: [
        "Атрибуцию - подтверждение гипотезы авторства и оценка стилистических и технических характеристик.",
        "Исследование материалов - пигментов, холста, бумаги для проверки соответствия заявленной эпохе.",
        "Провенанс - изучение истории владения произведением и отслеживание его происхождения.",
        "Сравнительный анализ - сравнение произведения с документированными работами того же автора или/и предполагаемого периода создания предмета искусства."
      ],
      importanceTitle: "Почему аутентификация произведений искусства важна?",
      importanceList: [
        "защищает от подделок.",
        "увеличивает рыночную произведения искусства.",
        "обеспечивает юридическую и финансовую безопасность для сделок, страхования и наследственных дел.",
        "обеспечивает соответствие международным нормам для выставок, аукционов и оформления купли-продажи."
      ],
      certificateTitle: "Сертификация подлинности",
      certificateText: "После успешной проверки МЦЭ выдает Сертификат подлинности, который служит официальным документом, подтверждающим аутентичность объекта.",
      closingText: "Для получения дополнительной информации или запроса услуги аутентификации произведения искусства, свяжитесь с Секретариатом ЕАП."
    },
    appraisal: {
      title: "ОЦЕНКА СТОИМОСТИ ПРОИЗВЕДЕНИЙ ИСКУССТВА",
      intro1: "Для определения рыночной стоимости произведений искусства проводится всесторонняя экспертиза и оценка.",
      intro2: "Художественная экспертиза включает оценку подлинности и художественной ценности работы, тогда как оценка определяет её рыночную стоимость.",
      factorsTitle: "Профессиональная оценка включает следующие факторы:",
      evaluationFactors: [
        "Её характеристики и год создания",
        "Репутация и значимость автора",
        "Качество работы на основе социокультурных индексов",
        "История и происхождение произведения"
      ],
      summary: "Такой всесторонний анализ помогает установить общую стоимость произведения, предсказать его будущую цену и оценить возможные финансовые потери в случае утраты.",
      stagesTitle: "Этапы оценки произведения искусства",
      stagesList: [
        "Художественная экспертиза и атрибуция – Проверка подлинности и авторства",
        "Оценка рыночной стоимости – Определение финансовой ценности",
        "Авторизация и сертификация – Выдача уникального паспорта произведения"
      ],
      conclusion: "Такая структурированная оценка обеспечивает точную и достоверную стоимость, необходимую для коллекционеров, инвесторов, страховщиков и рынка искусства.",
      contactNote: "Для получения дополнительной информации или заказа услуги по атрибуции произведений искусства, свяжитесь с нами сегодня."
    },
    passport: {
      title: "АВТОРИЗАЦИЯ ПРОИЗВЕДЕНИЙ ИСКУССТВА",
      intro: "Эксперты Международного центра экспертизы при Европейской Арбитражной Палате (МЦЭ при ЕАП) оказывают услуги по авторизации и сертификации произведений искусства. Результатом этого процесса является выдача паспорта на произведение искусства, удостоверяющего его уникальные физические характеристики и особенности.",
      eligibleObjectsTitle: "Объекты, подлежащие авторизации и сертификации, включают:",
      eligibleObjects: [
        "Картины;",
        "Скульптура;",
        "Фотографические работы;",
        "Произведения прикладного искусства (декоративное ткачество, керамика, резьба, литье, художественное стекло, ювелирные изделия и т. д.);",
        "Иллюстрации, карты, рисунки, эскизы и пластические произведения;",
        "Литературные произведения, включая художественную литературу, публицистику, научные, технические и иные труды (книги, брошюры, статьи и т. д.);",
        "Музыкальные инструменты;",
        "Нумизматические предметы;",
        "Антиквариат и другие предметы коллекционирования."
      ],
      certificationTitle: "Что такое паспортизация предмета искусства?",
      certificationDesc: "По сути, это официальное удостоверение предварительно установленных характеристик объекта (произведения искусства), касающиеся его авторства, времени создания, наличия или отсутствия реставрационных работ, стоимости, а также истории бытования произведения искусства, его владельцев, источника происхождения, связи с историческими и культурными событиями и т.д.;",
      passportContentTitle: "Какую информацию содержит паспорт произведения искусства?",
      passportContentIntro: "Паспорт включает в себя следующие данные:",
      passportFields: [
        "Фотография произведения искусства;",
        "Название произведения искусства;",
        "Имя художника и год создания;",
        "Размеры;",
        "Техника и использованные материалы."
      ],
      whyImportantTitle: "Почему важны авторизация и паспортизация произведения искусства?",
      whyImportantIntro: "Паспорт произведения искусства дает возможность:",
      advantages: [
        "Представлять произведение искусства (живопись, скульптуру, керамику и т. д.) на международном арт-рынке;",
        "Экспонировать произведение искусства на международных выставках и экспозициях;",
        "Проверять его подлинность по возвращении с выставки;",
        "Упрощать процесс страхования и минимизировать страховые риски;",
        "Упрощать покупку и продажу произведения искусства без необходимости дополнительной аутентификации;"
      ],
      finalNote: "Эксклюзивный метод авторизации гарантирует, что конфиденциальные идентификационные данные о произведении искусства надежно хранятся в МЦЭ. При необходимости специалисты могут провести проверку подлинности обьекта и выдать соответствующий сертификат по запросу владельца.",
      consultation: "Для получения консультации и более подробной информации о проведении авторизации произведений искусства обращайтесь в Секретариате ЕАП."
    }
  },
  gallery: {
    title: "Художественная галерея",
    description: "Исследуйте аутентифицированные произведения искусства с экспертным анализом. Каждое произведение в нашей коллекции было тщательно проверено и задокументировано нашей командой специалистов.",
    searchPlaceholder: "Поиск по названию или художнику...",
    allYears: "Все годы",
    clearFilters: "Очистить фильтры",
    noImage: "Изображение недоступно",
    noResults: "Никаких произведений искусства не соответствует вашим критериям поиска.",
    noPaintings: "В настоящее время в галерее нет доступных произведений искусства.",
    backToGallery: "Назад к галерее",
    backToPainting: "Назад к картине",
    error: "Ошибка",
    paintingNotFound: "Картина не найдена или недоступна.",
    expertAccess: "Экспертный доступ",
    expertAccessDescription: "Это произведение искусства было профессионально аутентифицировано и задокументировано. Доступ к подробному техническому анализу и экспертным отчетам доступен через защищенные QR-коды.",
    qrCodeInfo: "Уполномоченный персонал может сканировать QR-коды для доступа к подробным отчетам об аутентификации, техническому анализу и документации о происхождении.",
    invalidToken: "Недействительный или просроченный токен доступа.",
    accessDenied: "Доступ запрещен",
    secureAccess: "Безопасный доступ предоставлен",
    technicalAnalysis: "Технический анализ",
    expertiseReport: "Экспертный отчет",
    certificates: "Сертификаты",
    documents: "Документы",
    certificate: "Сертификат",
    document: "Документ",
    viewDocument: "Просмотреть документ"
  },
  membership: {
    benefits: {
      title: "5 ПРИЧИН ОФОРМИТЬ ЧЛЕНСТВО В ЕАП:",
      reasons: [
        {
          title: "Аккредитация арбитра.",
          description: "Возможность пройти квалификационный курс для арбитров и по результату сдачи экзамена получить аккредитацию арбитра МКАС при ЕАП."
        },
        {
          title: "Карьерные возможноcти.",
          description: "Нетворкинг, организация профессиональных стажировок  для членов ЕАП и расширение клиентской базы благодаря сотрудничеству между членами ЕАП;"
        },
        {
          title: "Повышение профессиональной квалификации.",
          description: "Члены ЕАП могут участвовать на льготных условиях в семинарах, тренингах, мастер-классах, круглых столах, конгрессах, организованных ЕАП и ее партнерами;"
        },
        {
          title: "Обмен профессиональной информацией в сфере международного права и арбитража.",
          description: "электронный дайджест ЕАП, рассылка аналитических новостей, доступ к профессиональной литературе ЕАП и судебной практике МКАС при ЕАП;"
        },
        {
          title: "Рекламные возможности.",
          description: "Члены ЕАП имеют возможность публикации своего профессионального на сайте ЕАП, а также в периодических изданиях ЕАП."
        }
      ]
    },
    join: {
      title: "Членство в Европейской Арбитражной Палате",
      description: "Если вы хотите стать ассоциированным членом Европейской Арбитражной Палаты, выполните следующие действия:",
      steps: [
        {
          title: "Подайте заявку",
          description: "заполнив онлайн-форму заявления на оформления членства в ЕАП."
        },
        {
          title: "Процесс проверки",
          description: "Секретариат ЕАП рассмотрит вашу заявку и оценит ваше соответствие требованиям."
        },
        {
          title: "Оформите членство",
          description: "оплатив ежегодный взнос при условии верификации"
        }
      ],
      fee: "Ежегодный членский взнос составляет 301,29 евро (включая НДС).",
      formPrompt: "Чтобы подать заявку на членство, заполните форму здесь:",
      formLink: "https://docs.google.com/forms/d/e/1FAIpQLSdI-Ic0-JOrRDbQO3VQqMqipTM-qrhjKM9WQiBv02ytqKD8_A/viewform",
      followUp: "Секретариат ЕАП свяжется с вами для дальнейших инструкций."
    },
    code: {
      title: "Кодекс корпоративной этики",
      intro: "Европейская арбитражная палата утвердила настоящий Кодекс корпоративной этики для применения и строго соблюдения ее членами.",
      obligations: {
        title: "Обязательства",
        description: "Каждый член Европейской арбитражной палаты обязан:",
        list: [
          "Способствовать соблюдению норм, принципов и критериев международного права и национальных законодательств.",
          "Способствовать развитию альтернативных методов решения споров и международного арбитража в международной деловой практике.",
          "Способствовать развитию конструктивных отношений с органами власти и международными организациями для утверждения всеобщих принципов справедливости и верховенства права, а также благоприятного международного бизнес-климата.",
          "Сотрудничать с представителями Европейской арбитражной палаты, а также ее членами для достижения общих целей развития системы альтернативных методов разрешения споров и международного арбитража на национальном и международном уровнях.",
          "Активно принимать участие в официальных мероприятиях, которые организовываются под эгидой и\\или при участии Европейской арбитражной палаты.",
          "Способствовать распространению профессиональных знаний о системе альтернативных методов решения споров.",
          "Неукоснительно соблюдать требования и принципы, которые содержатся в учредительных документах Европейской арбитражной палаты."
        ]
      },
      responsibilities: {
        title: "Ответственность",
        description: "Каждый член Европейской арбитражной палаты несет персональную ответственность и должен:",
        list: [
          "Демонстрировать порядочность и человечность, а также соблюдать принципы Декларации ООН по правам человека, избегая любой дискриминационной практики, в том числе касающейся расы, пола, религии и политики.",
          "Учитывать интересы общества во время верного и честного исполнения политики ЕАП.",
          "Не вредить и не пытаться навредить профессиональной репутации других намеренно или по неосторожности, прямо или косвенно.",
          "Уважать право собственности, в том числе интеллектуальную собственность.",
          "Соблюдать конфиденциальность информации, поступающей к нему в связи с выполнением своих обязанностей.",
          "Принимать только ту работу, в компетенции исполнения которой он уверен."
        ]
      },
      sanctions: {
        title: "Санкции",
        description: "Несоблюдение Кодекса корпоративной этики, подтвержденное по мнению Европейской арбитражной палаты, будет являться основанием для немедленного отзыва членства."
      }
    }
  },
  common: {
    backToNews: "Назад к новостям",
    loading: "Загрузка...",
    login: "Вход",
    register: "Регистрация",
    email: "Электронная почта",
    password: "Пароль",
    fullName: "Полное имя",
    confirmPassword: "Подтвердите пароль",
    signingIn: "Вход...",
    creatingAccount: "Создание аккаунта...",
    passwordsDoNotMatch: "Пароли не совпадают",
    registrationSuccess: "Регистрация успешна! Проверьте почту для верификации.",
    galleryManagementPanel: "Доступ к панели управления галереей"
  }
};
const translations = {
  en,
  fr,
  ru
};
const LanguageContext = createContext({
  language: "en",
  setLanguage: () => {
  },
  t: (key) => key
});
const useLanguage = () => useContext(LanguageContext);
const LanguageProvider = ({
  children,
  initialLanguage = "en"
}) => {
  const [language, setLanguage] = useState(initialLanguage);
  const t2 = (key) => {
    const keys = key.split(".");
    let value = translations[language];
    for (const k of keys) {
      if (typeof value === "object" && value !== null && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    return value;
  };
  return /* @__PURE__ */ jsx(LanguageContext.Provider, { value: { language, setLanguage, t: t2 }, children });
};
const SUPPORTED_LANGS = ["en", "fr", "ru"];
const DEFAULT_LANG = "en";
const NON_LOCALIZED_PREFIXES = ["/auth", "/admin", "/gallery/manage"];
const isLocalizable = (path) => {
  if (!path.startsWith("/")) return false;
  return !NON_LOCALIZED_PREFIXES.some(
    (p) => path === p || path.startsWith(p + "/") || path.startsWith(p + "?")
  );
};
const isSupportedLang = (v) => typeof v === "string" && SUPPORTED_LANGS.includes(v);
const stripLangPrefix = (pathname) => {
  const m = pathname.match(/^\/(en|fr|ru)(\/.*)?$/);
  if (!m) return pathname;
  return m[2] || "";
};
const localizePath = (path, lang) => {
  if (!path.startsWith("/")) return path;
  if (!isLocalizable(path)) return path;
  if (/^\/(en|fr|ru)(\/|$|\?|#)/.test(path)) return path;
  if (path === "/") return `/${lang}`;
  return `/${lang}${path}`;
};
const langFromPath = (pathname) => {
  const m = pathname.match(/^\/(en|fr|ru)(\/|$)/);
  return (m == null ? void 0 : m[1]) || DEFAULT_LANG;
};
const useCurrentLang = () => {
  const params = useParams();
  const location = useLocation();
  if (params.lang && isSupportedLang(params.lang)) return params.lang;
  return langFromPath(location.pathname);
};
const localizeTo = (to, lang) => {
  if (typeof to === "string") return localizePath(to, lang);
  if (to && typeof to === "object" && typeof to.pathname === "string") {
    return { ...to, pathname: localizePath(to.pathname, lang) };
  }
  return to;
};
const Link = forwardRef(
  function LocalizedLink({ to, ...rest }, ref) {
    const lang = useCurrentLang();
    return /* @__PURE__ */ jsx(Link$1, { ref, to: localizeTo(to, lang), ...rest });
  }
);
forwardRef(
  function LocalizedNavLink({ to, ...rest }, ref) {
    const lang = useCurrentLang();
    return /* @__PURE__ */ jsx(NavLink, { ref, to: localizeTo(to, lang), ...rest });
  }
);
const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const lang = useCurrentLang();
  return useCallback(
    (to, opts) => {
      if (typeof to === "number") return navigate(to);
      return navigate(localizeTo(to, lang), opts);
    },
    [navigate, lang]
  );
};
function LanguageSwitcher({ mode = "full" }) {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const languages = [
    { code: "en", name: "EN" },
    { code: "fr", name: "FR" },
    { code: "ru", name: "RU" }
  ];
  const switchTo = (lang) => {
    setLanguage(lang);
    try {
      localStorage.setItem("eac-lang", lang);
    } catch {
    }
    const langRe = new RegExp(`^/(${SUPPORTED_LANGS.join("|")})(/|$)`);
    const newPath = langRe.test(location.pathname) ? location.pathname.replace(langRe, `/${lang}$2`) : `/${lang}${location.pathname}`;
    navigate(newPath + location.search + location.hash);
  };
  return /* @__PURE__ */ jsx("div", { className: `ml-3 flex items-center ${mode === "compact" ? "space-x-2" : "space-x-1"}`, children: languages.map((lang) => /* @__PURE__ */ jsx(
    Button,
    {
      variant: language === lang.code ? "default" : "ghost",
      size: "sm",
      className: `${language === lang.code ? "bg-eac-primary text-white" : "text-gray-600"} px-2 py-1 text-xs font-medium`,
      onClick: () => switchTo(lang.code),
      children: lang.name
    },
    lang.code
  )) });
}
const navItems = [
  {
    title: "EAC",
    translationKey: "menu.eac",
    href: "/eac",
    children: [
      { title: "About Us", translationKey: "menu.about", href: "/eac/about" },
      { title: "EAC Council", translationKey: "menu.council", href: "/eac/council" },
      { title: "News", translationKey: "menu.news", href: "/eac/news" }
      // { title: "Event Calendar", translationKey: "menu.events", href: "/eac/events" },
    ]
  },
  {
    title: "Arbitration",
    translationKey: "menu.arbitration",
    href: "/arbitration",
    children: [
      { title: "About the ICAC under the EAC", translationKey: "menu.icac", href: "/arbitration/icac" },
      { title: "ICAC Rules ", translationKey: "menu.rules", href: "/arbitration/rules" },
      { title: "ICAC Provisions on Arbitration Costs", translationKey: "menu.fees", href: "/arbitration/fees" },
      { title: "Cost Calculator", translationKey: "menu.calculator", href: "/arbitration/calculator" },
      { title: "Arbitration Clause", translationKey: "menu.clause", href: "/arbitration/clause" }
      // { title: "List of Arbitrators", translationKey: "menu.arbitrators", href: "/arbitration/arbitrators" },
      // { title: "Legal Resources", translationKey: "menu.resources", href: "/arbitration/resources" },
    ]
  },
  {
    title: "expertise",
    translationKey: "menu.expertise",
    href: "/expertise",
    children: [
      { title: "About ICJE at EAC", translationKey: "menu.icje", href: "/expertise/icje" },
      { title: "expertiseFields", translationKey: "menu.expertiseFields", href: "/expertise/expertiseFields" }
    ]
  },
  {
    title: "Art expertise",
    translationKey: "menu.art-expertise",
    href: "/art-expertise",
    children: [
      { title: "Art Authentication", translationKey: "menu.authentication", href: "/art-expertise/authentication" },
      { title: "Art Appraisal", translationKey: "menu.appraisal", href: "/art-expertise/appraisal" },
      { title: "Art Passport", translationKey: "menu.passport", href: "/art-expertise/passport" },
      {
        title: "Gallery",
        translationKey: "menu.gallery",
        href: "/gallery"
      }
      // { title: "International Register of Artworks", translationKey: "menu.register", href: "/art-expertise/register" },
    ]
  },
  // {
  //   title: "Training",
  //   translationKey: "menu.training",
  //   href: "/training",
  //   children: [
  //     { title: "Qualification Course for Arbitrators", translationKey: "menu.qualification", href: "/training/qualification" },
  //   ],
  // },
  {
    title: "Membership",
    translationKey: "menu.membership",
    href: "/membership",
    children: [
      { title: "Membership Benefits", translationKey: "menu.benefits", href: "/membership/benefits" },
      { title: "How To Join", translationKey: "menu.join", href: "/membership/join" },
      { title: "Code of Conduct", translationKey: "menu.conductCode", href: "/membership/conductCode" }
    ]
  },
  {
    title: "Contacts",
    translationKey: "menu.contacts",
    href: "/contacts"
  }
];
const prefetchers = {
  "/eac/about": () => import("./assets/About-CeJ2eQGD.js"),
  "/eac/council": () => import("./assets/Council-gZfEno6V.js"),
  "/eac/news": () => import("./assets/News-CcfsXPjQ.js"),
  "/arbitration/icac": () => import("./assets/ICAC-C_Ocay9g.js"),
  "/arbitration/rules": () => import("./assets/Rules-KJFIognG.js"),
  "/arbitration/fees": () => import("./assets/FeeRegulations-VOS_twKc.js"),
  "/arbitration/calculator": () => import("./assets/CostCalculator-B2Fk45g4.js"),
  "/arbitration/clause": () => import("./assets/ArbitrationClause-B2Ll5dw9.js"),
  "/expertise/icje": () => import("./assets/ICJE-BaIu05-0.js"),
  "/expertise/expertiseFields": () => import("./assets/ExpertiseFields-hdUTRf2h.js"),
  "/art-expertise/authentication": () => import("./assets/ArtAuthentication-8J3IA4jU.js"),
  "/art-expertise/appraisal": () => import("./assets/ArtAppraisal-BG4icxkg.js"),
  "/art-expertise/passport": () => import("./assets/ArtPassport-Bx4DZ0ex.js"),
  "/gallery": () => import("./assets/Gallery-Drzc_Ycf.js"),
  "/membership/benefits": () => import("./assets/MembershipBenefits-CBMxUEIQ.js"),
  "/membership/join": () => import("./assets/HowToJoin-CJk2SjM2.js"),
  "/membership/conductCode": () => import("./assets/CodeOfConduct-g_Neer1a.js"),
  "/contacts": () => import("./assets/Contacts-C-TJK98D.js"),
  "/privacy-policy": () => import("./assets/PrivacyPolicy-BSBrcmkm.js"),
  "/cookies-policy": () => import("./assets/CookiesPolicy-DZtNg_em.js"),
  "/terms-of-service": () => import("./assets/TermsOfService-DMmcnV-r.js"),
  "/landing": () => import("./assets/Landing-DGerPTU0.js")
};
const prefetched = /* @__PURE__ */ new Set();
const prefetchRoute = (path) => {
  if (prefetched.has(path)) return;
  const fn = prefetchers[path];
  if (!fn) return;
  prefetched.add(path);
  fn().catch(() => {
    prefetched.delete(path);
  });
};
function NavDropdown({
  item,
  isActive,
  onToggle,
  closeMobileMenu,
  isMobile = false
}) {
  const { t: t2 } = useLanguage();
  const location = useLocation();
  const currentPath = stripLangPrefix(location.pathname) || "/";
  const isCurrentPath = (href) => href === "/" ? currentPath === "/" : currentPath.startsWith(href);
  if (!item.children) {
    const current = isCurrentPath(item.href);
    return /* @__PURE__ */ jsx("div", { className: isMobile ? "relative" : "relative group", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: item.href,
        "aria-current": current ? "page" : void 0,
        className: cn(
          "flex items-center gap-1 px-3 py-2 text-eac-dark hover:text-eac-primary",
          current && "text-eac-primary font-medium",
          isMobile && "w-full block"
        ),
        onClick: closeMobileMenu,
        onMouseEnter: () => prefetchRoute(item.href),
        onFocus: () => prefetchRoute(item.href),
        onTouchStart: () => prefetchRoute(item.href),
        children: t2(item.translationKey) || item.title
      }
    ) });
  }
  const sectionActive = item.children.some((child) => isCurrentPath(child.href));
  return /* @__PURE__ */ jsxs("div", { className: isMobile ? "relative" : "relative group", children: [
    /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        "aria-expanded": isMobile ? isActive : void 0,
        "aria-haspopup": "menu",
        className: cn(
          "flex items-center gap-1 px-3 text-eac-dark hover:text-eac-primary",
          (isActive || sectionActive) && "text-eac-primary",
          isMobile && "w-full justify-between"
        ),
        onClick: () => onToggle(item.title),
        onMouseEnter: () => {
          var _a2;
          return (_a2 = item.children) == null ? void 0 : _a2.forEach((c) => prefetchRoute(c.href));
        },
        onFocus: () => {
          var _a2;
          return (_a2 = item.children) == null ? void 0 : _a2.forEach((c) => prefetchRoute(c.href));
        },
        children: [
          t2(item.translationKey) || item.title,
          item.children && /* @__PURE__ */ jsx(ChevronDown, { size: 16, "aria-hidden": "true" })
        ]
      }
    ),
    item.children && (isMobile ? isActive : true) && /* @__PURE__ */ jsx(
      "div",
      {
        role: "menu",
        className: cn(
          isMobile ? "pl-4 space-y-1 mt-1" : "absolute top-full left-0 hidden group-hover:block bg-white shadow-lg rounded-md overflow-hidden w-64 z-50"
        ),
        children: /* @__PURE__ */ jsx("div", { className: isMobile ? "" : "py-2", children: item.children.map((child) => {
          const current = isCurrentPath(child.href);
          return /* @__PURE__ */ jsx(
            Link,
            {
              to: child.href,
              role: "menuitem",
              "aria-current": current ? "page" : void 0,
              className: cn(
                isMobile ? "block py-2 text-sm text-gray-700 hover:text-eac-primary" : "block px-4 py-2 text-sm text-gray-700 hover:bg-eac-light hover:text-eac-primary",
                current && "text-eac-primary font-medium"
              ),
              onClick: closeMobileMenu,
              onMouseEnter: () => prefetchRoute(child.href),
              onFocus: () => prefetchRoute(child.href),
              onTouchStart: () => prefetchRoute(child.href),
              children: t2(child.translationKey) || child.title
            },
            child.title
          );
        }) })
      }
    )
  ] });
}
function DesktopNav({
  navItems: navItems2,
  activeDropdown,
  toggleDropdown
}) {
  return /* @__PURE__ */ jsxs("nav", { "aria-label": "Main navigation", className: "hidden xl:flex space-x-1", children: [
    navItems2.map((item) => /* @__PURE__ */ jsx(
      NavDropdown,
      {
        item,
        isActive: activeDropdown === item.title,
        onToggle: toggleDropdown
      },
      item.title
    )),
    /* @__PURE__ */ jsx("div", { className: "ml-2 flex items-center", children: /* @__PURE__ */ jsx(LanguageSwitcher, {}) })
  ] });
}
function MobileNav({
  navItems: navItems2,
  activeDropdown,
  toggleDropdown,
  mobileMenuOpen,
  setMobileMenuOpen
}) {
  const closeMobileMenu = () => setMobileMenuOpen(false);
  if (!mobileMenuOpen) return null;
  return /* @__PURE__ */ jsx("div", { id: "mobile-navigation", className: "xl:hidden bg-white shadow-lg", children: /* @__PURE__ */ jsx("nav", { "aria-label": "Mobile navigation", className: "container mx-auto px-4 py-4 space-y-1", children: navItems2.map((item) => /* @__PURE__ */ jsx(
    NavDropdown,
    {
      item,
      isActive: activeDropdown === item.title,
      onToggle: toggleDropdown,
      closeMobileMenu,
      isMobile: true
    },
    item.title
  )) }) });
}
function Logo() {
  return /* @__PURE__ */ jsx(Link, { to: "/", className: "flex items-center flex-shrink-0", children: /* @__PURE__ */ jsx(
    "img",
    {
      src: `${"/"}logo.png`,
      alt: "European Arbitration Chamber Logo",
      className: "h-12 w-auto",
      style: { maxWidth: "100%" }
    }
  ) });
}
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  useLanguage();
  const toggleDropdown = (title) => {
    if (activeDropdown === title) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(title);
    }
  };
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 w-full bg-white shadow-md z-50", children: [
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-4", children: [
      /* @__PURE__ */ jsx(Logo, {}),
      /* @__PURE__ */ jsx(
        DesktopNav,
        {
          navItems,
          activeDropdown,
          toggleDropdown
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "xl:hidden flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(LanguageSwitcher, { mode: "compact" }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            "aria-label": mobileMenuOpen ? "Close menu" : "Open menu",
            "aria-expanded": mobileMenuOpen,
            "aria-controls": "mobile-navigation",
            onClick: () => setMobileMenuOpen(!mobileMenuOpen),
            children: mobileMenuOpen ? /* @__PURE__ */ jsx(X, { size: 24, "aria-hidden": "true" }) : /* @__PURE__ */ jsx(Menu, { size: 24, "aria-hidden": "true" })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      MobileNav,
      {
        navItems,
        activeDropdown,
        toggleDropdown,
        mobileMenuOpen,
        setMobileMenuOpen
      }
    )
  ] });
}
function Footer() {
  const { t: t2 } = useLanguage();
  const quickLinks = [
    { to: "/eac/about", label: t2("menu.about") },
    { to: "/arbitration/rules", label: t2("menu.rules") },
    { to: "/arbitration/clause", label: t2("menu.clause") },
    { to: "/arbitration/calculator", label: t2("menu.calculator") },
    { to: "/membership/join", label: t2("menu.join") },
    { to: "/eac/news", label: t2("home.latestNews") }
  ];
  const services = [
    { to: "/arbitration/icac", label: t2("menu.arbitration") },
    { to: "/expertise/icje", label: t2("menu.expertise") },
    { to: "/art-expertise/authentication", label: t2("menu.authentication") },
    { to: "/art-expertise/appraisal", label: t2("menu.appraisal") }
    // { to: "/training", label: "Arbitrator Training" },
  ];
  const bottomLinks = [
    { to: "/privacy-policy", label: "Privacy Policy" },
    { to: "/terms-of-service", label: "Terms of Service" },
    { to: "/cookies-policy", label: "Cookies Policy" }
  ];
  return /* @__PURE__ */ jsx("footer", { className: "bg-gray-100 border-t border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto py-12 px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Link, { to: "/", className: "mb-4 inline-block", children: /* @__PURE__ */ jsxs("picture", { children: [
          /* @__PURE__ */ jsx("source", { srcSet: `${"/"}logo.webp`, type: "image/webp" }),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: `${"/"}logo.png`,
              alt: "European Arbitration Chamber Logo",
              className: "h-12 mb-3"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-4", children: t2("footer.about") }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-3.5 ml-3", children: [
          {
            href: "https://www.linkedin.com/company/european-arbitration-chamber/",
            label: "LinkedIn",
            svgPath: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"
          },
          {
            href: "https://www.facebook.com/EuropeanArbitrationChamber",
            label: "Facebook",
            svgPath: "M22.675 0h-21.35C.595 0 0 .594 0 1.326v21.348C0 23.405.595 24 1.325 24h11.494v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116C23.405 24 24 23.405 24 22.674V1.326C24 .594 23.405 0 22.675 0z"
          },
          {
            href: "https://www.instagram.com/eu_arbitrage/",
            label: "Instagram",
            svgPath: "M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.75a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0z"
          }
        ].map(({ href, label, svgPath }) => /* @__PURE__ */ jsxs(
          "a",
          {
            href,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-gray-600 hover:text-eac-primary",
            children: [
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: label }),
              /* @__PURE__ */ jsx(
                "svg",
                {
                  className: "h-6 w-6",
                  fill: "currentColor",
                  viewBox: "0 0 24 24",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsx("path", { d: svgPath })
                }
              )
            ]
          },
          label
        )) }),
        /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(LanguageSwitcher, {}) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-4 text-eac-dark", children: t2("footer.quickLinks") }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-sm", children: quickLinks.map(({ to, label }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to, className: "text-gray-600 hover:text-eac-primary", children: label }) }, to)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-4 text-eac-dark", children: t2("footer.services") }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-sm", children: services.map(({ to, label }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to, className: "text-gray-600 hover:text-eac-primary", children: label }) }, to)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-4 text-eac-dark", children: t2("footer.contactUs") }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5 mr-3 text-eac-primary flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("span", { className: "text-gray-600", children: [
              t2("contacts.addressName"),
              " ",
              /* @__PURE__ */ jsx("br", {}),
              t2("contacts.address")
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5 mr-3 text-eac-primary flex-shrink-0" }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "+32 2 808 77 54" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(Mail, { className: "h-5 w-5 mr-3 text-eac-primary flex-shrink-0" }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "mailto:secretary@chea-taic.be",
                className: "text-gray-600 hover:text-eac-primary",
                children: "secretary@chea-taic.be"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-200 mt-8 pt-6", children: [
      /* @__PURE__ */ jsx("div", { className: "text-sm text-center text-gray-500 mb-2", children: /* @__PURE__ */ jsx("ul", { className: "space-x-2 text-sm flex justify-center", children: bottomLinks.map(({ to, label }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to, className: "text-gray-600 hover:text-eac-primary", children: label }) }, to)) }) }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-center text-gray-500", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " European Arbitration Chamber. ",
        t2("footer.rights")
      ] })
    ] })
  ] }) });
}
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h3",
  {
    ref,
    className: cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
function SectionNav({ sectionKey }) {
  const { t: t2 } = useLanguage();
  const location = useLocation();
  const currentPath = location.pathname;
  const [showMainMenu, setShowMainMenu] = useState(false);
  const currentSection = navItems.find((item) => item.href.includes(sectionKey));
  if (showMainMenu) {
    return /* @__PURE__ */ jsxs(Card, { className: "p-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-medium text-lg mb-3", children: t2("menu.sections") || "Sections" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/",
            className: "flex items-center gap-2 block py-2 px-3 text-sm rounded-md transition-colors text-gray-600 hover:bg-gray-100",
            onClick: () => setShowMainMenu(false),
            children: [
              /* @__PURE__ */ jsx(Home, { className: "h-4 w-4" }),
              t2("menu.home") || "Home"
            ]
          }
        ),
        navItems.filter((item) => item.children && item.children.length > 0).map((section) => {
          var _a2, _b2;
          return /* @__PURE__ */ jsx(
            Link,
            {
              to: ((_b2 = (_a2 = section.children) == null ? void 0 : _a2[0]) == null ? void 0 : _b2.href) || section.href,
              className: cn(
                "block py-2 px-3 text-sm rounded-md transition-colors",
                // Fix: Only highlight if the current path starts with this section's path
                currentPath.startsWith(section.href) ? "bg-eac-primary text-white font-medium" : "text-gray-600 hover:bg-gray-100"
              ),
              onClick: () => setShowMainMenu(false),
              children: t2(section.translationKey) || section.title
            },
            section.href
          );
        })
      ] })
    ] });
  }
  if (!currentSection || !currentSection.children || currentSection.children.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Card, { className: "p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-3", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "p-1",
          onClick: () => setShowMainMenu(true),
          "aria-label": "Back to main menu",
          children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsx("h3", { className: "font-medium text-lg ml-2", children: t2(currentSection.translationKey) || currentSection.title })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-2", children: currentSection.children.map((child) => /* @__PURE__ */ jsx(
      Link,
      {
        to: child.href,
        className: cn(
          "block py-2 px-3 text-sm rounded-md transition-colors",
          currentPath === child.href ? "bg-eac-primary text-white font-medium" : "text-gray-600 hover:bg-gray-100"
        ),
        children: t2(child.translationKey) || child.title
      },
      child.href
    )) })
  ] });
}
const PUBLIC_BASE_URL_KEY = "gallery_public_base_url";
const getPublicBaseUrl = () => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const stored = localStorage.getItem(PUBLIC_BASE_URL_KEY);
    if (stored) return stored;
  }
  return "https://chea-taic.be";
};
const setPublicBaseUrl = (url) => {
  const normalizedUrl = url.replace(/\/$/, "");
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    localStorage.setItem(PUBLIC_BASE_URL_KEY, normalizedUrl);
  }
};
const isLovableOrLocalhost = (url) => {
  return url.includes("lovable") || url.includes("localhost");
};
const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return getPublicBaseUrl();
};
const Seo = ({
  title = "The European Arbitration Chamber (EAC)",
  description = "The European Arbitration Chamber (EAC) is an international non-profit association founded in Belgium in 2008.",
  image = "eap-banner-1200x630.png",
  lang = "en",
  imageWidth = 1200,
  imageHeight = 630,
  robots = "index, follow",
  structuredData,
  ogType = "website"
}) => {
  const location = useLocation();
  const baseUrl = getBaseUrl();
  const cleanRest = stripLangPrefix(location.pathname).replace(/\/+$/, "");
  const pathLang = location.pathname.split("/")[1];
  const currentLang = SUPPORTED_LANGS.includes(pathLang) ? pathLang : SUPPORTED_LANGS.includes(lang) ? lang : "en";
  const buildUrl = (l) => `${baseUrl}/${l}${cleanRest}`;
  const canonicalUrl = buildUrl(currentLang);
  const fullImageUrl = image.startsWith("http") ? image : `${baseUrl}/${image}`;
  const imageAlt = `${title} - European Arbitration Chamber`;
  const ogLocale = currentLang === "en" ? "en_US" : currentLang === "ru" ? "ru_RU" : "fr_FR";
  return /* @__PURE__ */ jsxs(Helmet, { htmlAttributes: { lang: currentLang }, children: [
    /* @__PURE__ */ jsx("title", { children: title }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
    /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
    /* @__PURE__ */ jsx("meta", { name: "robots", content: robots }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: canonicalUrl }),
    /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "en", href: buildUrl("en") }),
    /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "fr", href: buildUrl("fr") }),
    /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "ru", href: buildUrl("ru") }),
    /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "x-default", href: buildUrl("en") }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: title }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: fullImageUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:alt", content: imageAlt }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: imageWidth.toString() }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: imageHeight.toString() }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: canonicalUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: ogType }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: "European Arbitration Chamber (EAC)" }),
    /* @__PURE__ */ jsx("meta", { property: "og:locale", content: ogLocale }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:site", content: "@EAC_Arbitration" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: title }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: fullImageUrl }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image:alt", content: imageAlt }),
    structuredData && /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(structuredData) })
  ] });
};
const t = (en2, fr2, ru2) => ({ en: en2, fr: fr2, ru: ru2 });
const fallbackDescription = t(
  "The European Arbitration Chamber (EAC) is an international non-profit association founded in Belgium in 2008 by professionals in commercial arbitration and mediation.",
  "La Chambre d'Arbitrage Européenne (EAC) est une association internationale à but non lucratif fondée en Belgique en 2008 par des professionnels de l'arbitrage commercial et de la médiation.",
  "Европейская арбитражная палата (EAC) — международная некоммерческая ассоциация, основанная в Бельгии в 2008 году профессионалами коммерческого арбитража и медиации."
);
const ROUTE_META = {
  "": {
    title: t(
      "European Arbitration Chamber (EAC) | Resolving Disputes",
      "Chambre d'Arbitrage Européenne (EAC) | Résolution des litiges",
      "Европейская арбитражная палата (EAC) | Разрешение споров"
    ),
    description: fallbackDescription,
    h1: t(
      "European Arbitration Chamber (EAC) — Resolving Disputes, Advancing Arbitration",
      "Chambre d'Arbitrage Européenne (EAC) — Résolution des litiges, promotion de l'arbitrage",
      "Европейская арбитражная палата (EAC) — Разрешение споров, развитие арбитража"
    )
  },
  "/eac/about": {
    title: t(
      "About EAC | European Arbitration Chamber",
      "À propos de l'EAC | Chambre d'Arbitrage Européenne",
      "О EAC | Европейская арбитражная палата"
    ),
    description: t(
      "Learn about the European Arbitration Chamber: history, mission, governance and international activities since 2008.",
      "Découvrez la Chambre d'Arbitrage Européenne : historique, mission, gouvernance et activités internationales depuis 2008.",
      "Узнайте о Европейской арбитражной палате: история, миссия, управление и международная деятельность с 2008 года."
    ),
    h1: t("About the European Arbitration Chamber", "À propos de la Chambre d'Arbitrage Européenne", "О Европейской арбитражной палате")
  },
  "/eac/council": {
    title: t(
      "Council & Members | European Arbitration Chamber",
      "Conseil et Membres | Chambre d'Arbitrage Européenne",
      "Совет и члены | Европейская арбитражная палата"
    ),
    description: t(
      "Meet the Council of the European Arbitration Chamber and its international members.",
      "Découvrez le Conseil de la Chambre d'Arbitrage Européenne et ses membres internationaux.",
      "Состав Совета Европейской арбитражной палаты и её международные члены."
    ),
    h1: t("EAC Council", "Conseil de l'EAC", "Совет EAC")
  },
  "/eac/news": {
    title: t(
      "News & Events | European Arbitration Chamber",
      "Actualités et Événements | Chambre d'Arbitrage Européenne",
      "Новости и события | Европейская арбитражная палата"
    ),
    description: t(
      "Latest news, announcements and events of the European Arbitration Chamber.",
      "Dernières actualités, annonces et événements de la Chambre d'Arbitrage Européenne.",
      "Последние новости, объявления и события Европейской арбитражной палаты."
    ),
    h1: t("News & Events", "Actualités et Événements", "Новости и события")
  },
  "/arbitration/icac": {
    title: t(
      "International Court of Arbitration (ICAC) | EAC",
      "Cour Internationale d'Arbitrage Commercial (ICAC) | EAC",
      "Международный коммерческий арбитражный суд (ICAC) | EAC"
    ),
    description: t(
      "The International Court of Arbitration for Commercial Disputes (ICAC) of the European Arbitration Chamber.",
      "La Cour Internationale d'Arbitrage Commercial (ICAC) de la Chambre d'Arbitrage Européenne.",
      "Международный коммерческий арбитражный суд (ICAC) Европейской арбитражной палаты."
    ),
    h1: t("ICAC", "ICAC", "ICAC")
  },
  "/arbitration/rules": {
    title: t(
      "Arbitration Rules | European Arbitration Chamber",
      "Règlement d'Arbitrage | Chambre d'Arbitrage Européenne",
      "Регламент арбитража | Европейская арбитражная палата"
    ),
    description: t(
      "Official arbitration rules of the European Arbitration Chamber's ICAC.",
      "Règlement officiel d'arbitrage de l'ICAC de la Chambre d'Arbitrage Européenne.",
      "Официальный регламент арбитража ICAC Европейской арбитражной палаты."
    ),
    h1: t("Arbitration Rules", "Règlement d'Arbitrage", "Регламент арбитража")
  },
  "/arbitration/fees": {
    title: t(
      "Fee Regulations | European Arbitration Chamber",
      "Règlement des Frais | Chambre d'Arbitrage Européenne",
      "Регламент сборов | Европейская арбитражная палата"
    ),
    description: t(
      "Schedule of arbitration fees and cost regulations of the EAC's ICAC.",
      "Barème des frais d'arbitrage et règlement des coûts de l'ICAC de l'EAC.",
      "Шкала арбитражных сборов и регламент расходов ICAC EAC."
    ),
    h1: t("Fee Regulations", "Règlement des Frais", "Регламент сборов")
  },
  "/arbitration/calculator": {
    title: t(
      "Arbitration Cost Calculator | EAC",
      "Calculateur des Frais d'Arbitrage | EAC",
      "Калькулятор арбитражных расходов | EAC"
    ),
    description: t(
      "Estimate the cost of arbitration proceedings under the EAC's ICAC fee regulations.",
      "Estimez le coût d'une procédure d'arbitrage selon le règlement des frais de l'ICAC de l'EAC.",
      "Оцените стоимость арбитражного разбирательства согласно регламенту сборов ICAC EAC."
    ),
    h1: t("Arbitration Cost Calculator", "Calculateur des Frais d'Arbitrage", "Калькулятор арбитражных расходов")
  },
  "/arbitration/clause": {
    title: t(
      "Model Arbitration Clause | EAC",
      "Clause d'Arbitrage Type | EAC",
      "Типовая арбитражная оговорка | EAC"
    ),
    description: t(
      "Recommended model arbitration clause for inclusion in commercial contracts.",
      "Clause d'arbitrage type recommandée pour insertion dans les contrats commerciaux.",
      "Рекомендованная типовая арбитражная оговорка для коммерческих договоров."
    ),
    h1: t("Model Arbitration Clause", "Clause d'Arbitrage Type", "Типовая арбитражная оговорка")
  },
  "/expertise/icje": {
    title: t(
      "ICJE — Independent Council of Judicial Experts | EAC",
      "ICJE — Conseil Indépendant des Experts Judiciaires | EAC",
      "ICJE — Независимый совет судебных экспертов | EAC"
    ),
    description: t(
      "Independent Council of Judicial Experts (ICJE) of the European Arbitration Chamber.",
      "Conseil Indépendant des Experts Judiciaires (ICJE) de la Chambre d'Arbitrage Européenne.",
      "Независимый совет судебных экспертов (ICJE) Европейской арбитражной палаты."
    ),
    h1: t("ICJE", "ICJE", "ICJE")
  },
  "/expertise/expertiseFields": {
    title: t(
      "Fields of Expertise | EAC",
      "Domaines d'Expertise | EAC",
      "Области экспертизы | EAC"
    ),
    description: t(
      "Fields of judicial expertise covered by the EAC's ICJE.",
      "Domaines d'expertise judiciaire couverts par l'ICJE de l'EAC.",
      "Области судебной экспертизы, охватываемые ICJE EAC."
    ),
    h1: t("Fields of Expertise", "Domaines d'Expertise", "Области экспертизы")
  },
  "/art-expertise/authentication": {
    title: t(
      "Art Authentication | EAC",
      "Authentification d'Œuvres d'Art | EAC",
      "Аутентификация произведений искусства | EAC"
    ),
    description: t(
      "Independent art authentication services by the European Arbitration Chamber's experts.",
      "Services indépendants d'authentification d'œuvres d'art par les experts de la Chambre d'Arbitrage Européenne.",
      "Независимая аутентификация произведений искусства экспертами Европейской арбитражной палаты."
    ),
    h1: t("Art Authentication", "Authentification d'Œuvres d'Art", "Аутентификация произведений искусства")
  },
  "/art-expertise/appraisal": {
    title: t(
      "Art Appraisal | EAC",
      "Estimation d'Œuvres d'Art | EAC",
      "Оценка произведений искусства | EAC"
    ),
    description: t(
      "Professional art appraisal and valuation services.",
      "Services professionnels d'estimation et d'évaluation d'œuvres d'art.",
      "Профессиональная оценка и экспертиза произведений искусства."
    ),
    h1: t("Art Appraisal", "Estimation d'Œuvres d'Art", "Оценка произведений искусства")
  },
  "/art-expertise/passport": {
    title: t(
      "Art Passport | EAC",
      "Passeport d'Œuvre d'Art | EAC",
      "Паспорт произведения искусства | EAC"
    ),
    description: t(
      "Issuance of internationally recognised art passports for authenticated artworks.",
      "Délivrance de passeports d'œuvres d'art internationalement reconnus pour les œuvres authentifiées.",
      "Выпуск международно признанных паспортов для аутентифицированных произведений искусства."
    ),
    h1: t("Art Passport", "Passeport d'Œuvre d'Art", "Паспорт произведения искусства")
  },
  "/gallery": {
    title: t(
      "Art Gallery | European Arbitration Chamber",
      "Galerie d'Art | Chambre d'Arbitrage Européenne",
      "Галерея | Европейская арбитражная палата"
    ),
    description: t(
      "Authenticated art collection of the European Arbitration Chamber.",
      "Collection d'art authentifiée de la Chambre d'Arbitrage Européenne.",
      "Аутентифицированная коллекция произведений искусства Европейской арбитражной палаты."
    ),
    h1: t("Art Gallery", "Galerie d'Art", "Галерея")
  },
  "/membership/benefits": {
    title: t(
      "Membership Benefits | EAC",
      "Avantages d'Adhésion | EAC",
      "Преимущества членства | EAC"
    ),
    description: t(
      "Benefits of becoming a member of the European Arbitration Chamber.",
      "Avantages de devenir membre de la Chambre d'Arbitrage Européenne.",
      "Преимущества членства в Европейской арбитражной палате."
    ),
    h1: t("Membership Benefits", "Avantages d'Adhésion", "Преимущества членства")
  },
  "/membership/join": {
    title: t(
      "How to Join | European Arbitration Chamber",
      "Comment Adhérer | Chambre d'Arbitrage Européenne",
      "Как вступить | Европейская арбитражная палата"
    ),
    description: t(
      "Application procedure to join the European Arbitration Chamber.",
      "Procédure de candidature pour adhérer à la Chambre d'Arbitrage Européenne.",
      "Порядок вступления в Европейскую арбитражную палату."
    ),
    h1: t("How to Join", "Comment Adhérer", "Как вступить")
  },
  "/membership/conductCode": {
    title: t(
      "Code of Conduct | EAC",
      "Code de Conduite | EAC",
      "Кодекс поведения | EAC"
    ),
    description: t(
      "Code of conduct for members of the European Arbitration Chamber.",
      "Code de conduite des membres de la Chambre d'Arbitrage Européenne.",
      "Кодекс поведения членов Европейской арбитражной палаты."
    ),
    h1: t("Code of Conduct", "Code de Conduite", "Кодекс поведения")
  },
  "/contacts": {
    title: t(
      "Contacts | European Arbitration Chamber",
      "Contacts | Chambre d'Arbitrage Européenne",
      "Контакты | Европейская арбитражная палата"
    ),
    description: t(
      "Contact the European Arbitration Chamber: addresses, phone numbers and online form.",
      "Contactez la Chambre d'Arbitrage Européenne : adresses, téléphones et formulaire en ligne.",
      "Свяжитесь с Европейской арбитражной палатой: адреса, телефоны и онлайн-форма."
    ),
    h1: t("Contacts", "Contacts", "Контакты")
  },
  "/privacy-policy": {
    title: t("Privacy Policy | EAC", "Politique de Confidentialité | EAC", "Политика конфиденциальности | EAC"),
    description: t(
      "Privacy policy of the European Arbitration Chamber's website.",
      "Politique de confidentialité du site de la Chambre d'Arbitrage Européenne.",
      "Политика конфиденциальности сайта Европейской арбитражной палаты."
    ),
    h1: t("Privacy Policy", "Politique de Confidentialité", "Политика конфиденциальности")
  },
  "/cookies-policy": {
    title: t("Cookies Policy | EAC", "Politique des Cookies | EAC", "Политика cookies | EAC"),
    description: t(
      "Cookies policy of the European Arbitration Chamber's website.",
      "Politique des cookies du site de la Chambre d'Arbitrage Européenne.",
      "Политика использования cookies на сайте Европейской арбитражной палаты."
    ),
    h1: t("Cookies Policy", "Politique des Cookies", "Политика cookies")
  },
  "/terms-of-service": {
    title: t("Terms of Service | EAC", "Conditions d'Utilisation | EAC", "Условия использования | EAC"),
    description: t(
      "Terms of service of the European Arbitration Chamber's website.",
      "Conditions d'utilisation du site de la Chambre d'Arbitrage Européenne.",
      "Условия использования сайта Европейской арбитражной палаты."
    ),
    h1: t("Terms of Service", "Conditions d'Utilisation", "Условия использования")
  }
};
function getRouteMeta(pathWithoutLang) {
  if (ROUTE_META[pathWithoutLang]) return ROUTE_META[pathWithoutLang];
  if (/^\/eac\/news\/[^/]+$/.test(pathWithoutLang)) {
    return {
      title: t(
        "News | European Arbitration Chamber",
        "Actualité | Chambre d'Arbitrage Européenne",
        "Новость | Европейская арбитражная палата"
      ),
      description: ROUTE_META["/eac/news"].description,
      h1: t("News", "Actualité", "Новость")
    };
  }
  if (/^\/gallery\/[^/]+/.test(pathWithoutLang)) {
    return ROUTE_META["/gallery"];
  }
  return ROUTE_META[""];
}
const RouteSeo = () => {
  const location = useLocation();
  const lang = langFromPath(location.pathname);
  const cleanRest = stripLangPrefix(location.pathname).replace(/\/+$/, "");
  const meta = getRouteMeta(cleanRest);
  const title = meta.title[lang] ?? meta.title.en;
  const description = meta.description[lang] ?? meta.description.en;
  return /* @__PURE__ */ jsx(Seo, { title, description, lang });
};
function Layout({ children }) {
  const location = useLocation();
  const path = stripLangPrefix(location.pathname) || "/";
  const isHomePage = path === "/";
  const isContactsPage = path === "/contacts";
  const getSectionKey = () => {
    if (path.startsWith("/eac/")) return "eac";
    if (path.startsWith("/arbitration/")) return "arbitration";
    if (path.startsWith("/expertise/")) return "expertise";
    if (path.startsWith("/art-expertise/")) return "art-expertise";
    if (path.startsWith("/training/")) return "training";
    if (path.startsWith("/membership/")) return "membership";
    if (path === "/contacts") return "contacts";
    return "";
  };
  const sectionKey = getSectionKey();
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-screen", children: [
    /* @__PURE__ */ jsx(RouteSeo, {}),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { id: "main-content", tabIndex: -1, className: "flex-grow focus:outline-none", children: isHomePage || isContactsPage ? (
      // Full-width layout for home and contacts pages
      /* @__PURE__ */ jsx("div", { className: "w-full max-w-full", children })
    ) : (
      // Regular layout with sidebar for other pages
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-8", children: [
        /* @__PURE__ */ jsx("div", { className: "col-span-1 lg:col-span-3 text-justify", children }),
        sectionKey && sectionKey !== "contacts" && /* @__PURE__ */ jsx("div", { className: "col-span-1", children: /* @__PURE__ */ jsx(SectionNav, { sectionKey }) })
      ] }) })
    ) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function Hero() {
  const { t: t2 } = useLanguage();
  const [loaded, setLoaded] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("picture", { children: [
        /* @__PURE__ */ jsx("source", { srcSet: "/images/IMG_3070.webp", type: "image/webp" }),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "/images/IMG_3070.JPG",
            alt: "European Arbitration Chamber headquarters building",
            loading: "eager",
            ...{ fetchpriority: "high" },
            decoding: "async",
            onLoad: () => setLoaded(true),
            className: `w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/60 z-10" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative container mx-auto px-4 py-32 sm:px-6 lg:px-8 lg:py-48 z-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-white sm:text-5xl md:text-6xl", children: t2("home.heroTitle") }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 text-xl text-white", children: t2("home.heroDescription") }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 flex flex-wrap gap-4", children: /* @__PURE__ */ jsx(
        Button,
        {
          asChild: true,
          variant: "outline",
          className: "border-white text-eac-primary rounded-full hover:bg-eac-primary hover:text-white",
          children: /* @__PURE__ */ jsx(Link, { to: "/eac/about", children: t2("home.heroBtn") })
        }
      ) })
    ] }) })
  ] });
}
const announcement = {
  id: "20260",
  date: "Mar 17 2026",
  title: {
    en: "GENERAL MEETING OF THE EUROPEAN ARBITRATION CHAMBER IN BRUSSELS",
    fr: "ASSEMBLÉE GÉNÉRALE DE LA CHAMBRE EUROPÉENNE D'ARBITRAGE À BRUXELLES",
    ru: "ОБЩЕЕ СОБРАНИЕ ЕВРОПЕЙСКОЙ АРБИТРАЖНОЙ ПАЛАТЫ В БРЮССЕЛЕ"
  },
  excerpt: {
    en: "European Arbitration Chamber announces that the General Meeting of the Members and the Council will take place on 7 April 2026 at 11:00–12:00 at Avenue Louise 146, Brussels.",
    fr: "La Chambre européenne d'arbitrage annonce que l'Assemblée générale des membres et du Conseil se tiendra le 7 avril 2026 de 11h00 à 12h00 à l'Avenue Louise 146, Bruxelles.",
    ru: "Европейская арбитражная палата сообщает, что Общее собрание членов и Совета ЕАП состоится 7 апреля 2026 года с 11:00 до 12:00 по адресу: Avenue Louise 146, Брюссель."
  },
  description: {
    en: "European Arbitration Chamber announces that the General Meeting of the Members and the Council will take place on 7 April 2026 at 11:00–12:00.\n\nVenue: Avenue Louise 146, Brussels.\n\nThe meeting will bring together members of the Chamber to discuss current activities and developments in the field of arbitration.\n\nFormer members and interested professionals may express their interest in attending as guests.\n\nFor inquiries and participation requests: secretary@chea-taic.be",
    fr: "La Chambre européenne d'arbitrage annonce que l'Assemblée générale des membres et du Conseil se tiendra le 7 avril 2026 de 11h00 à 12h00.\n\nLieu : Avenue Louise 146, Bruxelles.\n\nLa réunion rassemblera les membres de la Chambre afin de discuter des activités en cours et des développements dans le domaine de l'arbitrage.\n\nLes anciens membres et les professionnels intéressés peuvent manifester leur intérêt pour participer en tant qu'invités.\n\nPour toute demande d'information et de participation : secretary@chea-taic.be",
    ru: "Европейская арбитражная палата сообщает, что Общее собрание членов и Совета ЕАП состоится 7 апреля 2026 года с 11:00 до 12:00.\n\nМесто проведения: Avenue Louise 146, Брюссель.\n\nСобрание объединит членов Палаты для обсуждения текущей деятельности ЕАП и ее дальнейшего развития в сфере коммерческого арбитража.\n\nДля регистрации участия обращайтесь по электронной почте: secretary@chea-taic.be"
  },
  mainImageJpg: "/images/news/eac-2026-announcement.jpg",
  mainImageWebp: "/images/news/eac-2026-announcement.webp"
};
const news2026 = [
  {
    id: "20261",
    date: "Apr 07 2026",
    title: {
      en: "GENERAL MEETING OF THE EUROPEAN ARBITRATION CHAMBER HELD IN BRUSSELS",
      fr: "ASSEMBLÉE GÉNÉRALE DE LA CHAMBRE EUROPÉENNE D'ARBITRAGE À BRUXELLES",
      ru: "В БРЮССЕЛЕ СОСТОЯЛОСЬ ОБЩЕЕ СОБРАНИЕ ЕВРОПЕЙСКОЙ АРБИТРАЖНОЙ ПАЛАТЫ"
    },
    excerpt: {
      en: "On April 7, 2026, the General Meeting of the members of the European Arbitration Chamber (EAC) was held in Brussels, bringing together international arbitrators and experts from Belgium, Germany, Italy, Ukraine, the Czech Republic, Lithuania, Azerbaijan, and Turkey.",
      fr: "Le 7 avril 2026, l'Assemblée générale des membres de la Chambre Européenne d'Arbitrage (CEA) s'est tenue à Bruxelles, réunissant des arbitres internationaux et des experts de Belgique, d'Allemagne, d'Italie, d'Ukraine, de la République Tchèque, de Lituanie, d'Azerbaïdjan et de Turquie.",
      ru: "7 апреля 2026 года в Брюсселе состоялось Общее собрание членов Европейской Арбитражной Палаты (ЕАП), объединившее представителей профессионального сообщества международных арбитров и экспертов из Бельгии, Германии, Италии, Украины, Чехии, Литвы, Азербайджана и Турции."
    },
    description: {
      en: "On April 7, 2026, the General Meeting of the members of the European Arbitration Chamber (EAC) was held in Brussels, bringing together representatives of the professional community of international arbitrators and experts from Belgium, Germany, Italy, Ukraine, the Czech Republic, Lithuania, Azerbaijan, and Turkey.\n\nThe meeting was opened by the President of the EAC, Mr. Hennadii Pampukha, who presented a report on the activities of the EAC for 2023–2026 and outlined the key directions for its further development. During the meeting, participants considered a wide range of issues related to the institutional development of the Chamber, the improvement of arbitration procedures, and the expansion of the EAC's global presence.\n\nAs part of the agenda, decisions were also made to admit new members to the EAC and to include new arbitrators in the ICAC Panel of Arbitrators.\n\nWithin the strategic agenda, Mr. Andrea Moja presented initiatives aimed at developing educational programs for arbitrators, including advanced training courses and certification programs, as well as proposals for modernizing the ICAC Arbitration Rules.\n\nA separate segment of the meeting was devoted to expanding the geographical presence of the EAC worldwide. Projects for opening official representative offices in the Republic of Turkey and Uzbekistan were presented. The participants of the General Meeting reviewed the regulations governing EAC representative offices and considered candidates for leadership positions.\n\nConcluding the meeting, participants summarized the outcomes and approved the key objectives and development strategy of the EAC for the upcoming year, reaffirming their commitment to strengthening international cooperation and advancing arbitration practice.\n\nWithin the framework of the meeting, the development of art expertise as a promising area of the EAC's activities was discussed.\n\nOn the second day of the visit, at the invitation of Mr. Patrick Laycock, members of the delegation visited the Waterloo Asian Museum.\n\nOfficially opened on October 6, 2025, in the presence of Her Royal Highness Princess Léa of Belgium, Ms Florence Reuter, Mayor of Waterloo, and Her Excellency Ms Kanchana Patarachoke, Ambassador of Thailand, the museum presents a unique collection of art and cultural heritage from Asian countries, including Thailand, Laos, Cambodia, Vietnam, Malaysia, Indonesia, the Philippines, and others.\n\nDuring a guided tour, Mr. Laycock engagingly presented the exhibition and spoke about the collection, which he has been building for over 45 years. The museum visit became a vivid and memorable conclusion to the meeting program.\n\nIn addition, an agreement was reached that the address of the International Center for Expertise under the European Arbitration Chamber will be placed at the Waterloo Asian Museum for all inquiries related to art expertise.\n\nOn behalf of the European Arbitration Chamber, we express our gratitude to all participants for their active involvement in the General Meeting, constructive dialogue, and contribution to the discussion of the Chamber's key development directions.",
      fr: "Le 7 avril 2026, l'Assemblée générale des membres de la Chambre Européenne d'Arbitrage (CEA) s'est tenue à Bruxelles, réunissant des représentants de la communauté professionnelle des arbitres internationaux et des experts de Belgique, d'Allemagne, d'Italie, d'Ukraine, de la République Tchèque, de Lituanie, d'Azerbaïdjan et de Turquie.\n\nLa séance a été ouverte par le Président de la CEA, M. Hennadii Pampukha, qui a présenté un rapport sur les activités de la CEA pour la période 2023–2026 et a exposé les principales orientations de son développement futur. Au cours de la réunion, les participants ont examiné un large éventail de questions relatives au développement institutionnel de la Chambre, à l'amélioration des procédures arbitrales et à l'élargissement de la présence internationale de la CEA.\n\nDans le cadre de l'ordre du jour, des décisions ont également été prises concernant l'admission de nouveaux membres à la CEA ainsi que l'intégration de nouveaux arbitres au sein du Panel d'arbitres du TAIC.\n\nDans le cadre de l'agenda stratégique, M. Andrea Moia a présenté des initiatives visant à développer des programmes éducatifs pour les arbitres, y compris des formations avancées et des programmes de certification, ainsi que des propositions de modernisation du Règlement d'arbitrage du TAIC.\n\nUn volet distinct de la réunion a été consacré à l'expansion de la présence géographique de la CEA dans le monde. Des projets d'ouverture de représentations officielles en République de Turquie et en Ouzbékistan ont été présentés. Les participants à l'Assemblée générale ont examiné le règlement relatif aux représentations de la CEA et étudié les candidatures aux postes de direction.\n\nEn conclusion de la réunion, les participants ont fait le bilan des travaux et ont approuvé les objectifs clés ainsi que la stratégie de développement de la CEA pour l'année à venir, réaffirmant leur engagement en faveur du renforcement de la coopération internationale et du développement de la pratique arbitrale.\n\nDans le cadre de la réunion, le développement de l'expertise en art en tant que domaine prometteur des activités de la CEA a également été discuté.\n\nLe deuxième jour de la visite, la délégation de la CEA a visité le Waterloo Asian Museum à l'invitation spéciale de M. Patrick Laycock, conservateur et fondateur du musée.\n\nOfficiellement inauguré le 6 octobre 2025 en présence de Son Altesse Royale la Princesse Léa de Belgique, de Mme Florence Reuter, Bourgmestre de Waterloo, et de Son Excellence Mme Kanchana Patarachoke, Ambassadrice de Thaïlande, le musée présente une collection unique d'art et de patrimoine culturel des pays d'Asie, notamment la Thaïlande, le Laos, le Cambodge, le Vietnam, la Malaisie, l'Indonésie, les Philippines et d'autres.\n\nLors d'une visite guidée, M. Laycock a présenté l'exposition de manière captivante et a évoqué la collection qu'il constitue depuis plus de 45 ans. La visite du musée a constitué une conclusion vivante et mémorable du programme de la réunion.\n\nEn outre, il a été convenu que l'adresse du Centre international d'expertise auprès de la Chambre Européenne d'Arbitrage sera indiquée au Waterloo Asian Museum pour toutes les demandes relatives à l'expertise en art.\n\nAu nom de la Chambre Européenne d'Arbitrage, nous exprimons notre gratitude à tous les participants pour leur participation active à l'Assemblée générale, leur dialogue constructif et leur contribution à la discussion des orientations clés du développement de la Chambre.",
      ru: "7 апреля 2026 года в Брюсселе состоялось Общее собрание членов Европейской Арбитражной Палаты (ЕАП), объединившее представителей профессионального сообщества международных арбитров и экспертов из Бельгии, Германии, Италии, Украины, Чехии, Литвы, Азербайджана и Турции.\n\nЗаседание открыл президент ЕАП Геннадий Пампуха, который представил отчет о деятельности ЕАП за 2023–2026 годы и обозначил ключевые направления дальнейшего развития. В ходе встречи участники рассмотрели широкий круг вопросов, касающихся институционального развития Палаты, совершенствования арбитражной процедуры и расширения географии представительств ЕАП в мире.\n\nТакже в рамках повестки было принято решение о включении новых членов ЕАП, а также включении новых арбитров в Арбитражную панель МКАС.\n\nВ рамках стратегической повестки Андреа Мойа представил инициативы по развитию образовательных программ для арбитров, включая курсы повышения квалификации и сертификационные программы, а также предложения по модернизации Арбитражного регламента МКАС.\n\nОтдельным блоком обсуждалось расширение географии присутствия ЕАП в мире. Были презентованы проекты открытия официальных представительств в Турецкой Республике и Узбекистане. Участники Общего собрания рассмотрели положение о представительстве ЕАП и кандидатуры на руководящие должности.\n\nЗавершая заседание, участники подвели итоги и утвердили ключевые цели и стратегию развития ЕАП на предстоящий год, подтвердив курс на укрепление международного сотрудничества и развития арбитражной практики.\n\nОтдельно стоит отметить, что в рамках собрания также обсуждалось развитие такого направления, как искусствоведческая экспертиза, как перспективного сегмента деятельности ЕАП.\n\nНа второй день визита участники делегации по приглашению г-на Патрика Лейкока посетили Waterloo Asian Museum. Музей, официально открытый 6 октября 2025 года при участии Ее Королевского Высочества Принцессы Леи Бельгийской, представляет уникальную коллекцию искусства и культурного наследия стран Азии, включая Таиланд, Лаос, Камбоджу, Вьетнам, Малайзию, Индонезию, Филиппины, Мьянму, Японию, Непал, Тибет, Монголию, Китай, Пакистан, Афганистан, Индию и др.\n\nВ рамках авторской экскурсии г-н Лейкок увлекательно представил экспозицию и рассказал о коллекции, формировавшейся им на протяжении более 40 лет. Посещение музея стало ярким и запоминающимся завершением программы встречи.\n\nКроме того, была достигнута договорённость о том, что адрес Международного центра экспертизы при Европейской Арбитражной Палаты будет размещён в Waterloo Asian Museum для всех обращений по вопросам искусствоведческой экспертизы.\n\nОт имени Европейской Арбитражной Палаты выражаем благодарность всем участникам за активное участие в работе Общего собрания, конструктивный диалог и вклад в обсуждение ключевых направлений развития Палаты."
    },
    mainImageJpg: "/images/news/eac-2026-meeting-1.jpg",
    mainImageWebp: "/images/news/eac-2026-meeting-1.webp",
    images: [
      "/images/news/eac-2026-meeting-2.jpg",
      "/images/news/eac-2026-meeting-3.jpg",
      "/images/news/eac-2026-meeting-4.jpg",
      "/images/news/eac-2026-meeting-5.jpg",
      "/images/news/eac-2026-meeting-6.jpg",
      "/images/news/eac-2026-meeting-7.jpg",
      "/images/news/eac-2026-meeting-8.jpg",
      "/images/news/eac-2026-meeting-9.jpg"
    ]
  },
  announcement
];
const news2024 = [
  {
    id: "20241",
    title: "Alexandre Maciel joined the ICAC Panel",
    date: "Aug 02 2024",
    excerpt: "We are pleased to announce that Alexandre Maciel has joined the Arbitral Panel of the ICAC under the European Arbitration Chamber.",
    description: "We are pleased to announce that Alexandre Maciel has joined the Arbitral Panel of the ICAC under the European Arbitration Chamber.\n\nMr. Maciel, a Portuguese national, is an arbitrator and lawyer with extensive experience in both domestic and international arbitration. He specializes in a diverse range of fields, including the sale of goods, construction, civil engineering, industrial facilities, environment, energy, mining, insurance, securities, intellectual property, labor, and real estate.\n\nHe is a Fellow (FCIArb) of the Chartered Institute of Arbitrators (CIARB) and serves as an arbitrator for numerous prestigious institutions such as CAAD, CAL, CAPI (ESAI), CNA (AICCOPN), CNIACC, ARBITRARE, TRIAVE, CIMPAS, CONCÓRDIA, CACM (Mozambique), WTC Macau (Arbitration Centre), CIAB, CICAP, HKIAC (Hong Kong International Arbitration Center), HIAC (Hainan International Arbitration Court), AIAC (Asian International Arbitration Centre), CI-MAC (Cayman International Mediation and Arbitration Centre), SIAC (Singapore International Arbitration Centre), MIAC (Maldives International Arbitration Centre), ACICA (Australian Centre for International Commercial Arbitration), Abu Dhabi International Arbitration Centre (arbitrateAD), AIFC (Court and International Arbitration Centre), BVI IAC (British Virgin Islands International Arbitration Centre), and the lists of arbitrators from TCASul, TRGuimarães, TRCoimbra, TRPorto, and TRLisboa.\n\nMr. Maciel is also a member of several esteemed organizations, including the Portuguese Arbitration Association (APA), Spanish Arbitration Club (CEA), Boston International Arbitration Council (BIAC), Lusophone Association of Arbitration and Mediation (ALAM), SCC Arbitration Institute (Sweden), and Vienna International Arbitral Centre (VIAC), among others.\n\nHe holds a degree in Law from the University of Minho School of Law and has completed numerous advanced courses and training in arbitration, including the Higher Arbitration Course (VIII Edition) at CIAMEN/CIarb, the Advanced Course in Lusophone International Arbitration at Almedina, and the Diploma in International Arbitration from the University of Basel.\n\nWe are confident that Mr. Maciel's vast expertise and dedication will significantly enhance arbitration proceedings and uphold the high standards of the ICAC. We warmly welcome him and look forward to his valuable contributions to the field of arbitration in Belgium. ",
    mainImageJpg: "/images/news/maciel.jpg",
    mainImageWebp: "/images/news/maciel.webp"
  }
];
const news2023 = [
  {
    id: "20231",
    title: "The EAC celebrates 15th anniversary!",
    date: "Dec 12 2023",
    excerpt: "Today, December 12, marks the 15th anniversary of the European Arbitration Chamber (Brussels, Belgium)",
    description: "Today, December 12, marks the 15th anniversary of the European Arbitration Chamber (Brussels, Belgium)!\n\nThe EAС was established in Belgium in 2008 through the collaborative effort of professionals from Belgium, France, and Ukraine. Its primary objective was the advancement and promotion of commercial arbitration, mediation, and expertise as effective alternative mechanisms for resolving commercial disputes.\n\nAt present, the European Arbitration Chamber unites arbitrators, mediators, experts, lawyers, attorneys, and business representatives from 33 jurisdictions worldwide.\n\nOperated under the EAС, the International Commercial Arbitration Court and the International Center for Judicial and ADR Expertise actively provide businesses with effective tools to settle commercial disputes.\n\nThe EAC's scope of activities extends to educational initiatives. Notably, comprehensive qualification training programs have been designed for lawyers aspiring to become arbitrators, enhancing their professionalism and contributing to the growth of the alternative dispute resolution industry.\n\nThese fifteen years have been marked by significant professional achievements and widespread recognition! On behalf of the EAC Board, we extend our sincere gratitude to all our members, colleagues, and partners for the engaging and productive cooperation, which has been and continues to be a pivotal factor in our success! We are confident that new projects, achievements, and ongoing growth await us in the future.",
    mainImageJpg: "/images/news/15anniversary.jpg",
    mainImageWebp: "/images/news/15anniversary.webp"
  },
  {
    id: "20232",
    title: "International Arbitration Conference in Brussels",
    date: "Oct 05 2023",
    excerpt: "The EAC hosted an international conference focusing on the latest developments in commercial arbitration.",
    description: "The EAC hosted an international conference focusing on the latest developments in commercial arbitration.\n\nThe event brought together over 150 legal professionals from 25 countries to discuss emerging trends and challenges in international dispute resolution. Key topics included:\n- Digitalization of arbitration proceedings\n- Cross-border enforcement challenges\n- Industry-specific arbitration approaches\n- The impact of AI on dispute resolution\n\nDistinguished speakers included leading arbitrators, corporate counsel, and academics from Europe, Asia, and North America. The conference provided valuable networking opportunities and fostered the exchange of knowledge and best practices among participants.",
    mainImageJpg: "/images/news/Brusselsmeeting.jpg",
    mainImageWebp: "/images/news/Brusselsmeeting.webp"
  },
  {
    id: "20233",
    title: "Istanbul Arbitration Week 2023",
    date: "Sep 20 2023",
    excerpt: "We're thrilled to announce that the European Arbitration Chamber is Supporting organization for the Istanbul Arbitration Week (ISTAW)!",
    description: "We're thrilled to announce that the European Arbitration Chamber is Supporting organization for the Istanbul Arbitration Week (ISTAW)!\n\nIstanbul Arbitration Week is an international arbitration event hosted by the Energy Disputes Arbitration Center (EDAC) and consists of a series of events related to international investment, trade, and arbitration. The event aims to bring together arbitrators, lawyers, academics, and arbitration experts from all over the world.\n\nISTAW 2023’s panels will follow a dynamic format and foster an open discussion forum regarding the future of international arbitration. They will shed light on new arbitration techniques, focus on developments and evolving interpretations and views, and discuss the best practices for international arbitration in the new virtual reality.\n\nVisit the official website of ISTAW for more details: https://istaw.com/",
    mainImageJpg: "/images/news/Istanbul.jpg",
    mainImageWebp: "/images/news/Istanbul.webp"
  },
  {
    id: "20234",
    title: "Beware Fraud",
    date: "Sep 13 2024",
    excerpt: "We are pleased to announce that Alexandre Maciel has joined the Arbitral Panel of the ICAC under the European Arbitration Chamber.",
    description: "The Secretariat of the European Arbitration Chamber (EAC) has been made aware of fraudulent letters and documents falsely stating to be issued by or associated with the EAC or/and International Commercial Arbitration Court under the EAC (ICAC).\nThese scams, which may attempt to obtain money and/or personal details from recipients, are fraudulent.\nThe Secretariat of the EAC warns the public about these fraudulent activities and urges vigilance against various fraud schemes misusing name of the EAC.\nWe strongly advise recipients of such fraudulent communications to exercise extreme caution. Transferring money or personal information to scammers can result in financial loss or identity theft.\nIn the event of receiving suspicious letters containing statements about the existence of arbitration proceedings and allegedly coming from the EAC or the ICAC, we recommend that you immediately contact the EAC Secretariat to verify the authenticity of the information.\nThe European Arbitration Chamber has reported these fraudulent activities to the relevant law enforcement authorities, including the criminal police.",
    mainImageJpg: "/images/news/fraud.jpg",
    mainImageWebp: "/images/news/fraud.jpg"
  },
  {
    id: "20235",
    title: "Meeting between the EAC and the Istanbul Chamber of Commerce Arbitration and Mediation Center",
    date: "Aug 01 2023",
    excerpt: "A meeting took place between the leadership of the European Arbitration Chamber (EAC) and the Istanbul Chamber of Commerce Arbitration and Mediation Center (ITOTAM), during which participants discussed prospects for cooperation.",
    description: "A meeting took place between the leadership of the European Arbitration Chamber (EAC) and the Istanbul Chamber of Commerce Arbitration and Mediation Center (ITOTAM), during which participants discussed prospects for cooperation.\n\nThe meeting was attended by President of the EAC, Mr. Hennadii Pampukha, EAC representative in Turkey, Mr. Avni Demirci, member of the Qualification Commission and international arbitrator of the International Commercial Arbitration Court under the EAC, Mr. Rasim Orucov and the representatives from the Istanbul Chamber of Commerce Arbitration and Mediation Center (ITOTAM) – the Secretary General, Mrs. Senem Bahçekapili Vincenzi, Mr. Alper Yeşiltaş, and attorney M. M. Bugrahan Helvaci.\n\nAs a result of the meeting, the decision was made to formalize the collaboration by signing a Memorandum of Cooperation between the two organizations.\n\nFurthermore, discussions encompassed various aspects of cooperation within the domain of alternative dispute resolution. Particular emphasis was placed on the significance of nurturing international commercial arbitration and expertise to enable effective dispute resolution in Turkey.\n\nAmong the main agreements was the commitment to exchange professional experience between the EAC and the ITOTAM. The parties reached mutual consensus on the exchange of arbitrators and the potential participation of ITOTAM representatives in the certification course for arbitrators, facilitated by the European Arbitration Chamber.\n\nAn additional crucial topic under discussion involved partnering to support the Istanbul Arbitration Week 2023 forum. This event, organized by the Energy Disputes Arbitration Center  (Ankara) and supported by the Istanbul Chamber of Commerce, garnered considerable attention from both parties.\n\nIn addition, both parties outlined their collaboration plans in the field of forensic examination, including the assessment of art objects. Specifically, as per the accord reached, experts from the International Center for Judicial and ADR Expertise under the European Arbitration Chamber may be appointed as a experts in ITOTAM's arbitration processes.\n\nBoth organizations expressed a shared conviction that this collaboration will contribute to the advancement of commercial arbitration and expertise. This, in turn, will substantively contribute to more effective resolutions of international commercial disputes.",
    mainImageJpg: "/images/news/OSM_9816.jpg",
    mainImageWebp: "/images/news/OSM_9816.webp"
  },
  {
    id: "20236",
    title: "New Partnership with Asian Arbitration Association",
    date: "Jul 22 2023",
    excerpt: "The EAC is pleased to announce a new cooperation agreement with the Asian Arbitration Association (AAA).",
    description: "The EAC is pleased to announce a new cooperation agreement with the Asian Arbitration Association (AAA).\n\nThis strategic partnership aims to enhance arbitration services for businesses operating across Europe and Asia. The agreement includes:\n- Joint training programs for arbitrators and mediators\n- Exchange of expertise and best practices\n- Coordinated approach to complex cross-regional disputes\n- Promotion of alternative dispute resolution methods\n\nThe partnership responds to increasing trade and investment flows between the regions and the growing need for efficient dispute resolution mechanisms that bridge different legal traditions.",
    mainImageJpg: "/images/news/turkey-istanbul.jpg",
    mainImageWebp: "/images/news/turkey-istanbul.webp"
  },
  {
    id: "20237",
    title: "EAC General Meeting took place in Brussels",
    date: "Mar 10 2023",
    excerpt: "The General Meeting of the founders and members of the International non-profit association 'European Arbitration Chamber' took place on March 2nd, 2023, in Brussels. Representatives from Belgium, Germany, Italy, Poland, Ukraine, Turkey, Azerbaijan, India, and the United Arab Emirates attended the meeting.",
    description: "The General Meeting of the founders and members of the International non-profit association 'European Arbitration Chamber' took place on March 2nd, 2023, in Brussels. Representatives from Belgium, Germany, Italy, Poland, Ukraine, Turkey, Azerbaijan, India, and the United Arab Emirates attended the meeting.\n\nThe participants reviewed the EAC's activities from 2020 to 2022 and approved the Association's long-term development plan for 2023. The meeting also addressed the re-election of the President and the Board of the EAC, the Head of the International Commercial Arbitration Court under the EAC (ICAC), and the Head of the International Center for Judicial and ADR Expertise under the EAC (ICJE).\n\nAfter the voting, Hennadii Pampukha was re-elected as the President of the EAC, and the EAC Council members - Hennadii Pampukha, Ryszard Marcinkowsky, Andrea Moja, and the President of the ICAC, Johan Billiet, were also re-elected for the next term. Additionally, Patrick Laycock was elected to the position of the ICJE under the EAC. The meeting also approved new members of the EAC and arbitrators of the ICAC.\n\nThe participants also decided to make amendments to the ICAC Rules. It was unanimously decided to continue cooperation with arbitration and expert institutions of other countries.\n\nThe European Arbitration Chamber is an international organization that works in the field of commercial arbitration, expertise, and mediation. The EAC hosts various events and conferences on alternative dispute resolution and establishes links between arbitration centers and arbitrators in different countries. The association's purpose is to promote effective alternative dispute resolution in the business community and encourage the use of the most advanced methods and procedures in this area.",
    mainImageJpg: "/images/news/eac-meeting-1.jpeg",
    mainImageWebp: "/images/news/eac-meeting-1.webp"
  }
];
const news2021 = [
  {
    id: "20211",
    title: "EAC welcomes new ICAC arbitrator and member from India",
    date: "Sep 09 2021",
    excerpt: "We are pleased to announce that Mr. Srikant Parthasarathy (India), Ph.D. Finance and Arbitrator, Maritime Expert, Common Law & Evidentiary Expert in High Court India, has become a member of the European Arbitration Chamber.",
    description: "We are pleased to announce that Mr. Srikant Parthasarathy (India), Ph.D. Finance and Arbitrator, Maritime Expert, Common Law & Evidentiary Expert in High Court India, has become a member of the European Arbitration Chamber.\n\nDr. Parthasarathy has completed EAC qualification course for arbitrators and, by the result of exam and according to the decision of the ICAC certification commission, he has been certified as an arbitrator of the International Commercial Arbitration Court under the EAC.\n\nHe is an Arbitrator (Commercial and ISDS disputes), Maritime Expert, Common Law & Evidentiary Expert in High Court India, a fellow of the Chartered Institute of Arbitrators (UK).\n\nDr. Parthasarathy specializes in Islamic law, energy, maritime shipping, intellectual property, corporate law, taxation, real estate, finance, contract law, commercial law, investment dispute law, and has led the family office for cross-border mergers for over 12 years and acquisitions (M&A), international taxation, corporate finance, treasury, fundraising, structuring transactions, IPO readiness for small and medium businesses.",
    mainImageJpg: "/images/news/Srikant.jpg",
    mainImageWebp: "/images/news/Srikant.webp"
  },
  {
    id: "20212",
    title: "Memorandum on cooperation between EAC and EDAC",
    date: "Sep 08 2021",
    excerpt: "The European Arbitration Chamber is pleased to announce the signing of a cooperation and partnership memorandum with Energy Disputes Arbitration Centre (Turkey).",
    description: "The European Arbitration Chamber is pleased to announce the signing of a cooperation and partnership memorandum with Energy Disputes Arbitration Centre (Turkey). The parties agreed on joint activities aimed at developing commercial arbitration, mediation and expertise, as well as conducting of joint events in the field of alternative dispute resolution, in particular, in the energy sector.",
    mainImageJpg: "/images/news/eac-edac.jpg",
    mainImageWebp: "/images/news/eac-edac.webp"
  }
];
const news2020 = [
  {
    id: "20201",
    title: "General Meeting of EAC members took place in Brussels",
    date: "Feb 10 2020",
    excerpt: "On January 31, 2020, the General Meeting of the European Arbitration Chamber was held in Brussels. The event was attended by representatives of the EAC: arbitrators, experts, lawyers from 7 countries.",
    description: "On January 31, 2020, the General Meeting of the European Arbitration Chamber was held in Brussels. The event was attended by representatives of the EAC: arbitrators, experts, lawyers from 7 countries.\n\nDuring the Meeting, the participants summarized the work done for 2018-2019, discussed a number of issues related to the daily activities of the European Arbitration Chamber, International Commercial Arbitration Court (ICAC) and International Center of Judicial and ADR Expertise (ICJE), which operate under the EAC.\n\nSpeeches were made by the President of the EAC Hennadii Pampukha, President of ICAC Johan Billiet, Head of ICJE under EAC Sergey Zakharov, member of the EAC and ICAC new arbitrator in the field of art-disputes Natalia Gnatiuk, members of the EAC and arbitrators of ICAC Andrea Moja, Rasim Orujov and others. In particular, the EAC Meeting decided to approve the new edition of the Rules of ICAC, the Provisions on the accreditation of experts of ICJE and the certification of arbitrators of ICAC. During the Meeting, presentation of the project on the resolution of art disputes, expertise, authorization and authentication of art objects took place. The EAC meeting decided to establish a separate ICAC chamber for consideration of art and intellectual property disputes.\n\nIn addition, the priority area of the EAC for next years will be the expansion of its network of representative offices in the world. In particular, by decision of the Meeting, the EAC will work on opening of its official representative offices in Turkey, Azerbaijan and Uzbekistan. Meanwhile, a dialogue and cooperation in the field of commercial arbitration with the Gulf countries has a been established.\n\nThe EAC Meeting approved the new members of the Chamber, ICAC arbitrators and the ICJE experts; certificates were solemnly presented to them.\n\nOn behalf of the European Arbitration Chamber, we express our gratitude to all participants for the productive work and cooperation!",
    mainImageJpg: "/images/news/81546795_2810508622369338_3855292361491873792_n.jpg",
    mainImageWebp: "/images/news/81546795_2810508622369338_3855292361491873792_n.webp"
  },
  {
    id: "20202",
    title: 'Webinar: "Commercial Arbitration: Flexibility of Procedure - Enforceability"',
    date: "Sep 07 2020",
    excerpt: 'On behalf of the European Arbitration Chamber we are delighted to  invite you to take part in the webinar "Commercial Arbitration: Flexibility of Procedure - Enforceability", which will take place on September 17, 2020 at 3 p.m. CET (16:00 Kyiv time).',
    description: `On behalf of the European Arbitration Chamber we are delighted to  invite you to take part in the webinar "Commercial Arbitration: Flexibility of Procedure - Enforceability", which will take place on September 17, 2020 at 3 p.m. CET (16:00 Kyiv time).

WHAT ARE WE GOING TO TALK ABOUT?

Modern foreign trade turnover of goods and services requires from its participants, first of all, efficiency, an important condition for which is the protection of the rights and interests of business entities and investors. For example, for an investor who first encounters the legal system of the counterparty's country, an important condition for the deal is the transparency of the mechanism of legal regulation of disputes and the confidence that a potential dispute will be considered objectively, efficiently, quickly, inexpensively and with the maximum guarantee of the enforcement of the court’s decision or arbitral award.

These are the advantages of international commercial arbitration. We will talk about its features, preparation for the arbitration process, arbitration procedure and enforcement of arbitral awards in the framework of webinar with opinion leaders:

- Hennadii Pampukha, President of the European Arbitration Chamber (Brussels, Belgium);
- Sergey Zakharov, Head of the International Center of Judicial and ADR Expertise under the European Arbitration Chamber (Prague, Czech Republic);
- Rasim Orujov, international arbitrator, attorney (Dusseldorf, Germany);
- Ryszard Marcinkowski, international arbitrator, attorney (Lodz, Poland).

WEBINAR PROGRAM:

1. Why arbitration?

Commercial Arbitration Vs. Litigation in state courts: key features and advantages for the parties;
Where does arbitration begin: an arbitration clause or an arbitration agreement?
Initiation of arbitration: calculation of potential costs;
Flexibility of the arbitration procedure and the time frame of the arbitration;
Recommendations on parties’ choice of substantive law, language of the dispute, place of arbitration hearings;
Institutional arbitration or arbitration “ad hoc”?
The finality of the arbitral award and its enforceability in various jurisdictions. 
 2. Why ICAC under to the European Arbitration Chamber?

Features  of Belgian procedural law.
Arbitration Fee: fix rate or hourly fee? Comparative characteristics of the rates of arbitration fees in the key arbitrations of the world;
Consideration of international arbitration disputes during the pandemic: online procedure as a guarantee  not only of the personal safety of the parties, but also saving time & costs;
Assessment of issues, the explanation of which requires special knowledge, by arbitrators with special knowledge. DRB/DAB panels of experts to resolve disputes on FIDIC and ICC recommendations.
 3. Investment arbitration:

Applicable law to consideration of an investment dispute;
Enforcement of investment arbitration awards.
4. How to become an arbitrator?

Legal status of an arbitrator in international commercial arbitration;
Professional training and reputation of the arbitrator;
Certification of an arbitrator of International Commercial Arbitration Court under the European Arbitration Chamber;
Certification and accreditation of a judicial expert of the International Center of Judicial and ADR Expertise under the European Arbitration Chamber.
The webinar will be of interest not only to practicing lawyers, but also to business representatives.

Date: September 17th 2020
TIme: 15:00 Brussels / 16:00 Kyiv
Please register by pressing button below via the Facebook Messenger application.
If you do not have Facebook Messenger, you can apply for participation by e-mail secretary@chea-taic.be`,
    mainImageJpg: "/images/news/engbannerlast.jpg",
    mainImageWebp: "/images/news/engbannerlast.webp"
  }
];
const news2019 = [
  {
    id: "20191",
    title: "The 17th Annual International Conference “Construction and Real Estate: Expertise and Appraisal” was held in Prague",
    date: "Dec 02 2019",
    excerpt: "The 17th annual international conference “Construction and Real Estate: Expertise and Appraisal” was held in Prague.",
    description: "The 17th annual international conference “Construction and Real Estate: Expertise and Appraisal” was held in Prague.\n\nHennadii Pampukha, President of the European Arbitration Chamber, made a report on the features of the expertise of the causes of fire and its rapid development on the example of international complex commission expertise of children's camp in Odessa (Ukraine).\n\nIn his report, Hennadii Pampukha also focused on the need to optimize and unify the methods of conducting forensic examinations in the framework of court and arbitration proceedings in the EU countries.\n\nThis Conference is held since 2003 annually in Prague, Czech Republic. Today this Conference is the only one international experts meeting in the world, devoted to expertise in construction and mostly judicial expertise in construction, which is held on regular basis. During past conference meetings the Conference welcomed the participants from more than 50 countries. \n\nThe organizers are ASN Expert Group, Chamber of  Judicial Experts of the Czech Republic with the support of the European Arbitration Chamber and the European Federation of European Associations EuroExpert.",
    mainImageJpg: "/images/news/prague-2019.jpg",
    mainImageWebp: "/images/news/prague-2019.webp"
  },
  {
    id: "201914",
    title: "EAC Board meeting took place in Brussels",
    date: "Oct 03 2019",
    excerpt: "The European Arbitration Chamber and the International Commercial Arbitration Court under the EAC expand their scope of activities.",
    description: "The European Arbitration Chamber and the International Commercial Arbitration Court under the EAC expand their scope of activities. In particular, among the new priority areas is the consideration of commercial disputes related to objects of art / antiques / collectibles and intellectual property.\n\nIn this regard, in Brussels, the board of the European Arbitration Chamber held an official meeting with forensic experts specializing in conducting an art expertise regarding establishment of authenticity, date of creation and determination of the market value of art objects. The discussion was attended by EAC President Hennadii Pampukha, ICAC President Johan Billiet, EAC Executive Secretary Katarina Avramova and Director of Brussels Art Laboratory Patrick Laycock.\n\nThere was also a dialogue between the EAC board and the Belgian Association of Experts ABEX, which was attended by ABEX President Alain Coppe and Executive Secretary, Forensic Expert Pierre Fabeck.\n\nFollowing the meeting, an agreement was reached on cooperation in the field of forensic expertise in the framework of arbitration proceedings.",
    mainImageJpg: "/images/news/2019-10-08.jpg",
    mainImageWebp: "/images/news/2019-10-08.webp"
  },
  {
    id: "20192",
    title: "EAC supported the EWEA Award",
    date: "May 29 2019",
    excerpt: "The European Arbitration Chamber as the General Partner supported European Women Expert Awards!",
    description: `The European Arbitration Chamber as the General Partner supported European Women Expert Awards!

The award ceremony was held on May 22 2019 in the luxurious hotel complex Chalet Equides (Kyiv).

The main goal of the European Women Expert Awards (EWEA'2019) is to note successful, motivated and active women who, through their work and actions, not only change the world for the better, but also make a social contribution to a wide variety of areas - from business and law to medicine and culture.

Over the course of several fruitful and busy months of preparing the project, the EWEA'2019 Organizing Committee received more than 100 profiles from women who told their unique story of becoming, about their path to success, difficulties and overcoming them, about the projects and social activities that they implemented, about real achievements. The stories of the nominees showed that these women are real professionals in their field, but the world still knows very little about them. To tell the general public about them, to show their professionalism is what the organizers of EWEA’2019 set themselves.

The jury of the award determined the winner and nominees as follows. Tatyana Korol and Marianna Abramova got into the nomination "Culture and Art", while Lyudmila Bushinskaya won. The laureate Daria Mustafina and the nominees Margarita Sichkar and Julia Savostina were noted by nomination “Social Activities”. Tatyana Verbitskaya received an award in the nomination “Business and Management”, Daria Leshchenko and Tatyana Semenchenko got into the nomination with her. In the nomination "Medicine and Health" Oksana Dmitrieva was recognized the best, Anna Dyakiv and Elena Mosiychuk were nominated. In the nomination “Jurisprudence and expertise" Alexandra Sasina became the laureate, Natalia Kovalko and Victoria Ptashnik got the nomination. And finally, Tatyana Tkachenko was recognized as the best in the nomination “Tourism Activities”, and Anna Romanova and Yulia Alekseeva were nominated.

After the official ceremony, all the guests of the evening took part in festive buffet reception accompanied with an virtuoso instrumental quartet.`,
    mainImageJpg: "/images/news/womenaward.jpg",
    mainImageWebp: "/images/news/womenaward.webp"
  },
  {
    id: "20193",
    title: "2nd Annual GAR Live Zürich",
    date: "Jan 28 2019",
    excerpt: "European Arbitration Chamber is honored to be a partner of 2ND ANNUAL GAR LIVE ZURICH, which will be hosted by Global Arbitration Review on March 7th 2019 in Zurich.",
    description: "European Arbitration Chamber is honored to be a partner of 2ND ANNUAL GAR LIVE ZURICH, which will be hosted by Global Arbitration Review on March 7th 2019 in Zurich.\n\nThe full-day conference will consist of four sessions in which panellists are expected to cover arbitration through several different lenses: money laundering; sanctions; and human rights.\n\nThese sessions will provide the audience with a unique insight into the arbitral process specifically related to these topics, and our GAR symposium will offer the audience an exclusive opportunity to present questions to our panel of leading experts. The conference is expected to bring in audience members from Switzerland and internationally, allowing delegates to connect with and learn from like-minded individuals.\n\n10 % discount off the current rate is provided to the members of European Arbitration Chamber at the time of purchase.\n\nFor more information and EAC preferential rate code please contact EAC by e-mail: secretary@chea-taic.be or the Organizer here: http://gar.live/zurich2019",
    mainImageJpg: "/images/news/gar-live-zurich.png",
    mainImageWebp: "/images/news/gar-live-zurich.webp"
  }
];
const news2018 = [
  {
    id: "20181",
    title: "A tribute to Olha Pampukha...",
    date: "Oct 24 2018",
    excerpt: "We are deeply saddened to announce that on October 21, 2018 at the age of 48 year of life Olha Pampukha, the Financial Commissioner of the European Arbitration Chamber (Brussels, Belgium), President of the International Women Expert Law Union (France), Managing Partner of the Independent Institute of Legal Expertise (Kyiv, Ukraine) has passed away.",
    description: `We are deeply saddened to announce that on October 21, 2018 at the age of 48 year of life Olha Pampukha, the Financial Commissioner of the European Arbitration Chamber (Brussels, Belgium), President of the International Women Expert Law Union (France), Managing Partner of the Independent Institute of Legal Expertise (Kyiv, Ukraine) has passed away.

Olha Pampukha was a bright, talented, kind and generous person, a role model for all of us.

She was an optimist, a true professional of her business, being full of ideas she was an author and soul of numerous projects in the field of jurisprudence, expertise, commercial arbitration, marketing and PR, she also has founded the international award for women - European Women Expert Awards.

Olga worked a lot with lawyers, experts, arbitrators and students in various educational projects, workshops, round tables and seminars. The project, which she was especially proud of, is the annual International Competition on Commercial Arbitration, thanks to which many students had the opportunity to complete internships at leading European law firms. Olha Pampukha paid a lot of attention to charity and corporate social responsibility, she took care of the children's center “In children’s arms”.

This beautiful, fragile, but strong-willed woman, the mother of three sons, did not spare either strength, energy, or time for the sake of all of her plans, and she certainly achieved success. She believed that you should always move, learn something new, grow spiritually and develop yourself as a personality. She was burning with ideas and  desire to do something meaningful that would allow at least a little to change the world. She was so inspired  with the project based on her initiative - the international award for women “European Women Expert Awards”.

Having traveled the world a lot, she nevertheless was infinitely in love with her city of childhood - Genichesk, in her native Sea of Azov. When she returned from a short stay at home, she certainly, happily smiled and told us about her parents, about her beloved sea, about her native land, and we understood that our Olha once again received a charge of cheerfulness, love of life, belief that her main achievements were still ahead.

She was extremely attentive to the team of the European Arbitration Chamber, she was always ready to help and cheer in a difficult moment. Every phone call, meeting with her was always a charge of energy!

We will never forget her smile, her ringing young laughter, her kind motherly warm instructions, her daily care for each of the employees - she was always ready to give her reliable shoulder, to cheer up in a difficult moment, to suggest how the best to solve a difficult situation.

Olha is an example of a woman of our time! A worthy woman, with a big heart, very kind and sympathetic, with a fine mental organization.

Olha had a lot of plans, but her life flight was tragically, suddenly and prematurely cut short - Olga died in the prime of life, at the very peak of her noble activity aimed at serving people and society. Bitter autumn flowers will fall at the head of her grave, and the cool air of October will be warmed with farewell words of love, appreciation, gratitude.

We will always remember Olha, to remember warmly and very kindly this wonderful woman - our colleague, our friend, our OLHA.

Eternal memory to you, Olga Leonidovna! We will never forget you!

We express sincere words of condolences to relatives and friends...

The memorial service for Olha Pampukha will take place on October 26, 2018 at 15:30 in the Temple of Nikolai Pritysk (Ukraine, Kyiv, 5-a Horyva strert).

The funeral dinner will be held in the restaurant "Scorpion" at 17:00 (Ukraine, Kyiv, Geroev Stalingrad str., 12-e).`,
    mainImageJpg: "/images/news/401_4.jpg",
    mainImageWebp: "/images/news/401_4.webp"
  },
  {
    id: "20182",
    title: 'The delegation of the EAC took part in the forum "Innovative City 2018" in Nice',
    date: "Aug 01 2018",
    excerpt: 'The delegation of the European Arbitration Chamber took part in the international forum "Innovative City 2018", which was held in Nice (France).',
    description: `The delegation of the European Arbitration Chamber took part in the international forum "Innovative City 2018", which was held in Nice (France).

During two intensive days we have conducted meeting with Regional Council of Provence-Alpes-Côte d'Azur  Mr. Christian ESTROSI and French entrepreneurs, signed agreements and discussed projects, aimed at developing of commercial arbitration in the region  Provence-Alpes-Côte d'Azur.

In particular, within the framework of the forum, memorandum of cooperation was signed between the EAC's partner - the International Women's Expert Law Union and French organizations and companies.`,
    mainImageJpg: "/images/news/36281499_2085121971502648_3298629918069358592_n.jpg",
    mainImageWebp: "/images/news/36281499_2085121971502648_3298629918069358592_n.webp"
  },
  {
    id: "20183",
    title: "The delegation of the European Arbitration Chamber visited Istanbul",
    date: "Apr 08 2018",
    excerpt: "The delegation of the European Arbitration Chamber at a special invitation of Mr. Yusuf Kuleč visited Istanbul during the official visit to Turkey",
    description: "The delegation of the European Arbitration Chamber at a special invitation of Mr. Yusuf Kuleč visited Istanbul during the official visit to Turkey. The purpose of the visit is establishment of international cooperation in the field of commercial arbitration, educational projects for lawyers, as well as promotion  the system of alternative dispute resolution (ADR) of commercial disputes in Turkey.\n\nIn the framework of the visit the European Arbitration Chamber held seminar for Turkish lawyers. The EAC President Hennadii Pampukha presented lecture, which was devoted to the main activities of the EAC and its division - International Commercial Arbitration Court. The participants of the seminar discussed the procedure of settlement of commercial disputes in accordance with the Belgian procedural law and the Rules of the ICAC under the EAC. The seminar was held with the support of Mr. Yusuf Kuleč and  Yildiz Law Office. The President of the EAC solemnly member’s certificates to the participants of the seminar, who have formalized membership in the EAC.\n\nThe leadership of the European Arbitration Chamber expresses gratitude to the Turkish colleagues for an interesting program of the visit and hospitality.  ",
    mainImageJpg: "/images/news/turkey-istanbul.jpg",
    mainImageWebp: "/images/news/turkey-istanbul.webp"
  },
  {
    id: "20184",
    title: "THE WINNER OF THE INTERNATIONAL COMPETITION FOR COMMERCIAL ARBITRATION",
    date: "Mar 23 2018",
    excerpt: "The delegation of the European Arbitration Chamber at a special invitation of Mr. Yusuf Kuleč visited Istanbul during the official visit to Turkey",
    description: `On March 23, 2018  the Final and the solemn ceremony of awarding the participants of the V International Competition on Commercial Arbitration  was held. The organizer of the moot court competition is the European Arbitration Chamber (Brussels, Belgium).

The general partner of the competition was Ukrinikorglegiya, Independent Institute of Legal Expertise, International Educational Center "George & Company" and law firm "Kinstellar".

In the final round of the contest the teams of the Kyiv University of Law of the National Academy of Sciences of Ukraine, the Kiev National Trade and Economic University and the National University "Odessa Law Academy" competed for the championship.

The participants presented their arbitration awards in an improvised dispute, which was considered at the International Commercial Arbitration Court under the European Arbitration Chamber.

Among the jury members were:

- Hennadii Pampukha, President of the European Arbitration Chamber
- Nikolai Pavlov, President of the Ukrainian Foreign Law Collegium. 
- Mariana Antonovich, associate lawyer of Kinstellar
- Tatyana Lezhukh, partner of the law firm "Lezhuh and partners"
- Olga Poiedynok, chairman of the Committee on Legal Education Policy of the Bar Association of Ukraine
- Anastasia Nesterenko, lawyer of the MIF "Integrites".
- The event was held with the participation of EAC President Hennadii Pampukha, the founder of the International Women's Expert-Legal Union Olha Pampukha, the EAC Executive Secretary Catherine Avramova.

A specially invited guest - a Ukrainian politician, a member of the Permanent Delegation of the Verkhovna Rada of Ukraine to the Parliamentary Assembly of the Council of Europe Anatoly Rakhansky welcomed the participants of the event. 

Judges and honorary guests of the competition emphasized the importance and urgency of this educational project for students, and also noted an interesting contest task.

The jury were pleasantly surprised by the level of preparation and oratorical abilities of the teams, but nevertheless they expressed certain remarks, instructions and wishes to future young specialists.

The team of the Kyiv University of Law of the National Academy of Sciences, consisting of Victoria Poltoratskaya, Daria Malenko, Daria Tretyakova and coaches Elena Polivanova and Tamara Kortukova, won the highest score.

The second place was taken by the team of the Odessa Law Academy, consisting of Georgy Kravtsunenko, Yuri Podchenko, Music Solomii and coach Vyacheslav Lubashenko.

An honorable third place in the competition was won by the team consisting of Anastasia Boychenko, Natalia Ivonyak, Olga Pakon, Elena Karpocheva, Sandra Titova and coach Elena Goncharenko.

The main prize - internship at the European Arbitration Chamber in Brussels and its partner AIA Belgium - was presented to Vadym Yudovych, a student of the National Ostroh Academy, whose competitive essay in the individual competition was the best.

The participants of the competition were also awarded with certificates for internship in the best legal companies of Ukraine, namely: in Law Firm "Lezhukh and Partners", Law Firm "Kinstellar", Law Firm "Dmitrieva and Partners", EJC "Eterna Law", Expert-Legal Group "Independent Institute of Forensic Expertise", Public Association "The Studio of Modern Law" and the International Women's Expert-Legal Union.

The European Arbitration Chamber and the Organizing Committee of the Competition congratulate the winners and all participants of the V International Competition on Commercial Arbitration! There are no defeated, because only the best have competed!

The Organizing Committee of the contest expresses sincere gratitude to all the teams and their coaches`,
    mainImageJpg: "/images/news/21.jpg",
    mainImageWebp: "/images/news/21.webp"
  },
  {
    id: "20185",
    title: "The EAC presented International Arbitration Committee\n",
    date: "Feb 08 2018",
    excerpt: `The European Arbitration Chamber took part in the event of the Ukrainian Advocates' Association "Fair of Projects", which took place on February 7, 2018 in Kyiv.`,
    description: `The European Arbitration Chamber took part in the event of the Ukrainian Advocates' Association "Fair of Projects", which took place on February 7, 2018 in Kyiv.

The EAC’s President Hennadii Pampukha, who heads International Arbitration Committee of the Ukrainian Advocates' Association, presented the program of the committee for 2018 and outlined the main directions of its activity.

On behalf of the European Arbitration Chamber, we are happy to invite lawyers, advocates, practicing arbitrators and professionals specializing in international private law and commercial arbitration to join the committee. The application can be submitted by e-mail: secretary@chea-taic.be`,
    mainImageJpg: "/images/news/27752465_1764574550253959_2823128997247396433_n.jpg",
    mainImageWebp: "/images/news/27752465_1764574550253959_2823128997247396433_n.webp"
  }
];
const news2017 = [
  {
    id: "20171",
    title: "OFFICIAL MEETINGS OF THE EAC WITH BUSINESS REPRESENTATIVES TOOK PLACE IN ATHENS",
    date: "Jul 03 2017",
    excerpt: "The President of the European Arbitration Chamber Hennadii Pampukha undertook  working visit to Greece on June 29-30th 2017.",
    description: "The President of the European Arbitration Chamber Hennadii Pampukha undertook  working visit to Greece on June 29-30th 2017.\n\nProtection of business through arbitration, development of international economic cooperation,  establishment of a dialogue between business and jurisprudence - these and many others issues  were  discussed by Hennadii Pampukha during his working visit to Athens and meetings with the leadership of the bilateral chambers of commerce and industry of Greece and the EU countries. In particular, negotiations were held with business representatives from 9 countries of the world who are actively working with Greek entrepreneurs.\n\nAs a result of the meetings, the international chambers of commerce and business associations expressed their willingness to cooperate with the European Arbitration Chamber in matters of protecting the interests of Greek entrepreneurs and their international business partners, and promotion  of international commercial arbitration, mediation and expertise as effective alternative dispute resolution tools, as in the pre-trial stage, and in arbitration as well.\nBy the way, the EAC launched Communication Center, which facilitates the establishment of a dialogue between representatives of business and jurisprudence. This goal was achieved by Hennadii in the process of bilateral meetings.",
    mainImageJpg: "/images/news/2017-07-03-152016.jpg",
    mainImageWebp: "/images/news/2017-07-03-152016.webp"
  },
  {
    id: "20172",
    title: "Cooperation with Polish-Finnish Chamber",
    date: "Jun 09 2017",
    excerpt: "The official meeting of the leadership of the European Arbitration Chamber Hennadii and Olha Pampukha and the president of the Polish-Finnish Chamber of Commerce Tomasz Orlowicz was held.",
    description: "The official meeting of the leadership of the European Arbitration Chamber Hennadii and Olha Pampukha and the president of the Polish-Finnish Chamber of Commerce Tomasz Orlowicz was held.\n\nParticipants of the meeting discussed the directions of cooperation between the two chambers in the sphere of alternative dispute resolution. In particular, a joint action plan aimed at development of international economic relations was discussed.",
    mainImageJpg: "/images/news/1267.jpg",
    mainImageWebp: "/images/news/1267.webp"
  },
  {
    id: "20173",
    title: "The EAC signed memorandum on cooperation with Polish-Ukrainian Chamber of Commerce",
    date: "May 04 2017",
    excerpt: "The official meeting of the leadership of the European Arbitration Chamber Hennadii and Olha Pampukha and the president of the Polish-Finnish Chamber of Commerce Tomasz Orlowicz was held.",
    description: "The official meeting between the President of the European Arbitration Chamber Hennadii Pampukha and the President of the Polish-Ukrainian Chamber of Commerce Jacek Pekhota took place in Warsaw.\n\nAs a result of the meeting, a memorandum on cooperation between the two chambers was signed. The main goal of this is the development of bilateral partnerships in the field of international arbitration and economic relations between Belgium, Poland and Ukraine.",
    mainImageJpg: "/images/news/18198692_1625155160832667_3645374319103162198_n1.jpg",
    mainImageWebp: "/images/news/18198692_1625155160832667_3645374319103162198_n1.webp"
  }
];
const news2016 = [
  {
    id: "20161",
    title: "Round table in the Verkhovna Rada of Ukraine",
    date: "Dec 22 2016",
    excerpt: 'European Arbitration Chamber  co-organized a round table in the Verkhovna Rada of Ukraine devoted to the theme "Modern perspectives of cooperation between Ukraine and Poland in the sphere of international politics',
    description: 'European Arbitration Chamber  co-organized a round table in the Verkhovna Rada of Ukraine devoted to the theme "Modern perspectives of cooperation between Ukraine and Poland in the sphere of international politics"\n\nThe event was attended by representatives of the International Fund for support of Ukraine from Warsaw, the International Education Center «George and Company», European Arbitration Chamber, the Office of the Prime Minister of the Republic of Poland, deputies of Ukraine, representatives of the Ukrainian Government, politicians and public figures, other international partners of Ukraine, Poland and the EU.\n\nPresident Hennadii Pampukha EAC made a presentation on the migration situation in Ukraine and Poland, the creation and implementation of the "road map" of the citizen of Ukraine in the Republic of Poland, who come to Poland for work,  and creation of the union, which will defend rights of migrants from Ukraine.\n\nWithin the framework of the round table were raised issues of higher education in Ukraine on the path to European integration and the participation of Ukraine in the European Higher Education Area.',
    mainImageJpg: "/images/news/POL_7696.jpg",
    mainImageWebp: "/images/news/POL_7696.webp"
  },
  {
    id: "20162",
    title: "Presentation of the IV International Competition on Commercial Arbitration",
    date: "Dec 08 2016",
    excerpt: "The presentation of the IV International Competition on Commercial Arbitration, which holds the European Arbitration Chamber, will take place in Kyiv on December 15th 2016.",
    description: "The presentation of the IV International Competition on Commercial Arbitration, which holds the European Arbitration Chamber, will take place in Kyiv on December 15th 2016.\n\nA mission of this educational project is to increase the level of qualification and professionalism of participants in the legal services market, and promote the development of students’ practical skills in the field of international commercial law, arbitration, mediation, economics, international relations, and so on.The contest is based on the model in consideration of international arbitration (The Rules of the International Commercial Arbitration Court at the European Arbitration Chamber) and is in English.\n\nThe competition will take place in two phases, which include remote participation (drafting memoranda) and face-to-face debate (team debate). The competition will be held from December 2016 to March 2017.\n\nPresentation of the competition, delivery of tasks, and the drawing procedure will take place on December 15, 2016 in Kyiv.\nVenue: Ukraine, Kyiv, Melnikova street, 36/1.\nTime: 11:00\nAdditional information by e-mail: secretary@chea-taic.be\n\nor by phone: +38 044 581 30 80, +38 067 222 5555",
    mainImageJpg: "/images/news/IMG_20161007_163419.jpg",
    mainImageWebp: "/images/news/IMG_20161007_163419.webp"
  },
  {
    id: "20163",
    title: "Annual General Meeting of members of the European Arbitration Chamber took place in Brussels",
    date: "Nov 17 2016",
    excerpt: "The Annual General Meeting of members of the European Arbitration Chamber took place in Brussels on November 10th.",
    description: "The Annual General Meeting of members of the European Arbitration Chamber took place in Brussels on November 10th.\n\nThe participants summed up the work of the Chamber over the past year and identified its priorities for 2017.\n\n2015-2016 years of the European Arbitration Chamber have become highly productive and effective. Most of our tasks and goals were achieved and implemented.\n\nNew activities of the EAC have been established and developed such as:\n\nThe development and operation of the International Commercial Arbitration Court (ICAC) under the EAC.\nThe development of the International Centre of ADR and Judicial Expertise under the EAC.\nParticipation in the grant programs of the European Commission.\nОrganization and carrying out of scientific and educational events for lawyers, attorneys, arbitrators, experts, mediators, students in the field of commercial arbitration and expertise. In particular, over the past year, the EAC organized and supported more than 20 national and international events, including conferences, workshops, press conferences and round tables.\nOrganization of the IV International Competition on Commercial Arbitration among  students.\nParticipation in the project for the protection of migrant workers. In particular, the EAC became  co-founder of the International Fund of Ukraine support.\nThe development of the EAC offices network in the world.\nDue to the fact that the International Commercial Arbitration Court under the EAC significantly increased its work, the Meeting has been raised such an important issue as the accreditation of arbitrators of the ICAC under the EAC. In addition, the agenda of the Meeting included issue of approval of the Regulations on the International Center of Judicial and ADR Expertise under the EAC.\n\nThe participants of the Meeting, summarizing the work of the Chamber for the last year and determining its priorities for 2017, one of the main tasks of the European Arbitration Chamber identified the introduction and development of modern educational programs in the field of international arbitration, expertise and mediation. The participants of the meeting decided to resume the Annual International Competition on Commercial Arbitration among students and begin active preparations for this event. Furthermore, it was decided to organize and conduct qualification courses and intensives for the EAC arbitrators and experts.\n\nThe European Arbitration Chamber expressed its gratitude to all members of the EAC, who participated in the Annual Meeting, for their efficient work and fruitful cooperation.",
    mainImageJpg: "/images/news/IMG_20161122_130900_1479812973057111.jpg",
    mainImageWebp: "/images/news/IMG_20161122_130900_1479812973057111.webp"
  }
];
const news2014 = [
  {
    id: "20141",
    title: 'QUALIFYING COURSE "INTERNATIONAL COMMERCIAL ARBITRATION" TOOK PLACE',
    date: "Jun 19 2014",
    excerpt: 'On June 19st 2014 European Arbitration Chamber held one-day qualifying course "International Commercial Arbitration", which was attended by members of the EAC from different countries.  Among the lecturers were high-experiences specialist from Belgium: the President of the European Arbitration Chamber Hennadii Pampukha, Chairman of the International Commercial Arbitration Court under the EAC Johan Billiet, lawyer of ILG "AstapovLawyers" Anna Kombikova.',
    description: 'On June 19st 2014 European Arbitration Chamber held one-day qualifying course "International Commercial Arbitration", which was attended by members of the EAC from different countries.\n\nAmong the lecturers were high-experiences specialist from Belgium: the President of the European Arbitration Chamber Hennadii Pampukha, Chairman of the International Commercial Arbitration Court under the EAC Johan Billiet, lawyer of ILG "AstapovLawyers" Anna Kombikova.\nParticipants of the first section of the course got acquainted with the peculiarities of international commercial arbitration and its difference from national courts. Anna Kombikova paid attention to the review of the activities of well-known arbitration institutions. She also spoke about international standards of arbitration, differences between institutional arbitration and arbitration ad hoc, features of arbitration procedure.\nJohan Billiet described such an important aspects of the arbitration process as preparation of the statement of claim, formation of the tribunal, arbitration costs, conflicts of interest. In addition, J. Billiet revealed the essence of the alternative dispute resolution method, namely mediation.\nThe participants of the second section of the course focused on the features of settlement of commercial dispute in the International Commercial Arbitration Court under the European Arbitration Chamber. EAC’s President Gennady Pampukha, the speaker of this section, presented the activity of the ICAC under the EAC, as well as its advantages over other European arbitration institutions. "The flexibility and speed of arbitration proceedings, competitive rates of the arbitration fee and the availability of specialists of various fields from more than 30 countries around the world - these are the main advantages of the ICAC under the EAC," - said Mr. Pampukha. The participants got acquainted with the details of Rules the ICAC under the EAC, Provision of arbitration fees and cost of the ICAC under the EAC.',
    mainImageJpg: "/images/news/20130621_0932331.jpg",
    mainImageWebp: "/images/news/20130621_0932331.webp"
  },
  {
    id: "20142",
    title: "Round table “Employment of graduates and benefits for employers”",
    date: "Feb 28 2014",
    excerpt: "Round table “Employment of graduates and benefits for employers”",
    description: 'Round table “Employment of graduates and benefits for employers”\n\nOn February 28th, 2014 the European Arbitration Chamber held Round table, which was devoted to the problem of employment of young specialists and the development of the draft law "Employment of graduates and benefits for employers". It aroused great interest among business community, public authorities, universities and students. During the meeting experts from the business sector, science and culture, government representatives discussed problems in the labor market. Based on the discussion of urgent problems Coordinating Council was formed, which is now engaged in the organization of the working groups for the implementation of further initiatives of the EAC social project "International Exchange of Legal Internship"',
    mainImageJpg: "/images/news/DSC_0046.jpg",
    mainImageWebp: "/images/news/DSC_0046.webp"
  }
];
const newsItems = [
  ...news2026,
  ...news2024,
  ...news2023,
  ...news2021,
  ...news2020,
  ...news2019,
  ...news2018,
  ...news2017,
  ...news2016,
  ...news2014
];
const pickText = (value, lang) => {
  if (typeof value === "string") return value;
  return value[lang] || value.en;
};
const NewsItem = ({
  id,
  title: titleRaw,
  date,
  description: descriptionRaw,
  mainImageJpg,
  mainImageWebp,
  useCardWrapper = false,
  useInlineLayout = false
}) => {
  const { t: t2, language } = useLanguage();
  const title = pickText(titleRaw, language);
  const description = pickText(descriptionRaw, language);
  const firstParagraph = description.split("\n\n")[0];
  const linkTo = `/eac/news/${id}`;
  const RenderDate = () => /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-muted-foreground", children: [
    /* @__PURE__ */ jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }),
    date
  ] });
  if (useInlineLayout) {
    return /* @__PURE__ */ jsx(Link, { to: linkTo, className: "block group", children: /* @__PURE__ */ jsx(Card, { className: "overflow-hidden hover:shadow-md transition-shadow", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row", children: [
      /* @__PURE__ */ jsx("div", { className: "md:w-1/3 lg:w-1/4", children: (mainImageJpg || mainImageWebp) && /* @__PURE__ */ jsxs("picture", { children: [
        mainImageWebp && /* @__PURE__ */ jsx("source", { srcSet: mainImageWebp, type: "image/webp" }),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: mainImageJpg,
            alt: title,
            loading: "lazy",
            decoding: "async",
            className: "w-full h-auto object-cover"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 p-6", children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "text-xl mb-2 group-hover:text-eac-primary/80 transition-colors", children: title }),
        /* @__PURE__ */ jsx(RenderDate, {}),
        /* @__PURE__ */ jsx(CardDescription, { className: "text-muted-foreground mt-3 line-clamp-3", children: firstParagraph }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 text-eac-primary font-medium group-hover:text-eac-primary/80", children: t2("home.readMore") })
      ] })
    ] }) }) });
  }
  const Wrapper = useCardWrapper ? Card : "div";
  const cardClass = useCardWrapper ? "flex flex-col cursor-pointer hover:shadow-md transition-shadow h-full" : "flex flex-col h-full cursor-pointer rounded-lg border border-border hover:shadow-md transition-shadow bg-card";
  return /* @__PURE__ */ jsx(Link, { to: linkTo, className: "block no-underline text-inherit group h-full", children: /* @__PURE__ */ jsxs(Wrapper, { className: cardClass, children: [
    (mainImageJpg || mainImageWebp) && /* @__PURE__ */ jsxs("picture", { children: [
      mainImageWebp && /* @__PURE__ */ jsx("source", { srcSet: mainImageWebp, type: "image/webp" }),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: mainImageJpg,
          alt: title,
          loading: "lazy",
          decoding: "async",
          className: "w-full object-cover group-hover:opacity-90 transition-opacity"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(CardHeader, { className: `${mainImageJpg || mainImageWebp ? "pt-4" : "pt-6"} pb-2`, children: [
      /* @__PURE__ */ jsx(RenderDate, {}),
      /* @__PURE__ */ jsx(CardTitle, { className: "text-lg mt-2 text-center group-hover:text-eac-primary/80 transition-colors", children: title })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { className: "flex flex-col flex-1", children: [
      /* @__PURE__ */ jsx(CardDescription, { className: "text-muted-foreground mb-4", children: firstParagraph }),
      /* @__PURE__ */ jsx("div", { className: "mt-auto text-eac-primary font-medium group-hover:text-eac-primary/80", children: t2("home.readMore") })
    ] })
  ] }) });
};
function NewsPreview() {
  const { t: t2 } = useLanguage();
  const latestNewsItems = [...newsItems].slice(0, 3);
  return /* @__PURE__ */ jsx("div", { className: "py-16 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-10", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-eac-dark", children: t2("home.latestNews") }),
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", className: "text-eac-primary hover:text-eac-primary hover:bg-eac-light", children: /* @__PURE__ */ jsx(Link, { to: "/eac/news", children: t2("home.viewAllNews") }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: latestNewsItems.map((item) => /* @__PURE__ */ jsx(
      NewsItem,
      {
        id: item.id,
        title: item.title,
        date: item.date,
        description: item.description,
        mainImageJpg: item.mainImageJpg,
        mainImageWebp: item.mainImageWebp,
        images: item.images,
        useCardWrapper: true
      },
      item.id
    )) })
  ] }) });
}
function Services() {
  const { t: t2 } = useLanguage();
  const services = [
    {
      icon: /* @__PURE__ */ jsx(Gavel, { className: "h-6 w-6 text-white" }),
      titleKey: "home.services.arbitrationTitle",
      descriptionKey: "home.services.arbitrationDesc",
      link: "/arbitration/icac",
      button: t2("menu.icac")
    },
    {
      icon: /* @__PURE__ */ jsx(Lightbulb, { className: "h-6 w-6 text-white" }),
      titleKey: "home.services.expertiseTitle",
      descriptionKey: "home.services.expertiseDesc",
      link: "/expertise/icje",
      button: t2("menu.icje")
    },
    {
      icon: /* @__PURE__ */ jsx(Palette, { className: "h-6 w-6 text-white" }),
      titleKey: "home.services.artTitle",
      descriptionKey: "home.services.artDesc",
      link: "/art-expertise/authentication",
      button: t2("menu.authentication")
    },
    {
      icon: /* @__PURE__ */ jsx(BookOpen, { className: "h-6 w-6 text-white" }),
      titleKey: "home.services.membershipTitle",
      descriptionKey: "home.services.membershipDesc",
      link: "/membership/benefits",
      button: t2("menu.membership")
    }
  ];
  return /* @__PURE__ */ jsx("div", { className: "py-16 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsx("div", { className: "text-center mb-12", children: /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-eac-dark mb-2", children: t2("home.services.sectionTitle") }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: services.map(({ icon, titleKey, descriptionKey, link, button }) => /* @__PURE__ */ jsx(
      Link,
      {
        to: link,
        className: "no-underline hover:no-underline",
        children: /* @__PURE__ */ jsxs(
          Card,
          {
            className: "h-full flex flex-col border border-gray-200 rounded-3xl overflow-hidden hover:shadow-md transition cursor-pointer",
            children: [
              /* @__PURE__ */ jsxs(CardHeader, { className: "bg-eac-light/50 pb-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-eac-primary rounded-full flex items-center justify-center mb-4", children: icon }),
                /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl text-eac-dark", children: t2(titleKey) })
              ] }),
              /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
                /* @__PURE__ */ jsx(CardDescription, { className: "text-gray-600 text-base mb-6", children: t2(descriptionKey) }),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "rounded-full border-eac-primary text-eac-primary hover:bg-eac-primary hover:text-white",
                    children: button
                  }
                )
              ] })
            ]
          }
        )
      },
      titleKey
    )) })
  ] }) });
}
const quickLinksData = [
  {
    icon: /* @__PURE__ */ jsx(Scale, { className: "h-10 w-10 text-white mr-4" }),
    titleKey: "home.quickLinks.rulesTitle",
    descriptionKey: "home.quickLinks.rulesDescription",
    buttonKey: "home.quickLinks.rulesBtn",
    link: "/arbitration/rules"
  },
  {
    icon: /* @__PURE__ */ jsx(FileText, { className: "h-10 w-10 text-white mr-4" }),
    titleKey: "home.quickLinks.clauseTitle",
    descriptionKey: "home.quickLinks.clauseDescription",
    buttonKey: "home.quickLinks.clauseBtn",
    link: "/arbitration/clause"
  },
  {
    icon: /* @__PURE__ */ jsx(Calculator, { className: "h-10 w-10 text-white mr-4" }),
    titleKey: "home.quickLinks.calculatorTitle",
    descriptionKey: "home.quickLinks.calculatorDescription",
    buttonKey: "home.quickLinks.calculatorBtn",
    link: "/arbitration/calculator"
  }
];
function QuickLinks() {
  const { t: t2 } = useLanguage();
  return /* @__PURE__ */ jsx("div", { className: "py-12 bg-quickLinks-secondary", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch", children: quickLinksData.map(({ icon, titleKey, descriptionKey, buttonKey, link }) => /* @__PURE__ */ jsx(
    Link,
    {
      to: link,
      className: "no-underline hover:no-underline",
      children: /* @__PURE__ */ jsx(Card, { className: "bg-white/10 border-none rounded-3xl overflow-hidden hover:bg-white/15 transition cursor-pointer h-full", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6 flex items-center h-full", children: [
        /* @__PURE__ */ jsx("div", { className: "w-15 h-15 flex items-center justify-center mr-4", children: icon }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between items-start h-full", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-white text-lg mb-1", children: t2(titleKey) }),
            /* @__PURE__ */ jsx("p", { className: "text-white/80 text-sm mb-3", children: t2(descriptionKey) })
          ] }),
          /* @__PURE__ */ jsx(Button, { variant: "link", className: "p-0 text-white hover:text-white/80", children: t2(buttonKey) })
        ] })
      ] }) })
    },
    titleKey
  )) }) }) });
}
const Index = () => {
  const { language, t: t2 } = useLanguage();
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://chea-taic.be/#organization",
        "name": "European Arbitration Chamber (EAC)",
        "url": "https://chea-taic.be",
        "logo": {
          "@type": "ImageObject",
          "url": "https://chea-taic.be/logo.png"
        },
        "sameAs": [
          "https://www.linkedin.com/company/european-arbitration-chamber"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://chea-taic.be/#website",
        "url": "https://chea-taic.be",
        "name": "European Arbitration Chamber (EAC)",
        "description": "The European Arbitration Chamber (EAC) is an international non-profit association founded in Belgium in 2008.",
        "publisher": {
          "@id": "https://chea-taic.be/#organization"
        },
        "inLanguage": ["en", "fr", "ru"]
      }
    ]
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: t2("seo.home.title"),
        description: t2("seo.home.description"),
        lang: language,
        structuredData: organizationStructuredData
      }
    ),
    /* @__PURE__ */ jsxs(Layout, { children: [
      /* @__PURE__ */ jsx(Hero, {}),
      /* @__PURE__ */ jsx(QuickLinks, {}),
      /* @__PURE__ */ jsx(Services, {}),
      /* @__PURE__ */ jsx(NewsPreview, {})
    ] })
  ] });
};
const supabaseUrl = "https://fwwpidktaanowpaihgzy.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3d3BpZGt0YWFub3dwYWloZ3p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxMDIyOTcsImV4cCI6MjA2MDY3ODI5N30.qvUw8w0DAQ8nnqyevugAp0V22fAUAVx9-TSD_gIqRQ0";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const AuthContext = createContext({
  user: null,
  session: null,
  loading: true,
  signUp: async () => ({ error: null }),
  signIn: async () => ({ error: null }),
  signOut: async () => {
  }
});
const useAuth = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session2) => {
        setSession(session2);
        setUser((session2 == null ? void 0 : session2.user) ?? null);
        setLoading(false);
      }
    );
    supabase.auth.getSession().then(({ data: { session: session2 } }) => {
      setSession(session2);
      setUser((session2 == null ? void 0 : session2.user) ?? null);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);
  const signUp = async (email, password, fullName) => {
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName || ""
        }
      }
    });
    return { error };
  };
  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { error };
  };
  const signOut = async () => {
    await supabase.auth.signOut();
  };
  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut
  };
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value, children });
};
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin" }) });
  }
  if (!user) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/auth", replace: true });
  }
  return /* @__PURE__ */ jsx(Fragment, { children });
};
const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkUserRole = async () => {
      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }
      try {
        const { data: isAdmin, error: adminError } = await supabase.rpc("current_user_is_admin");
        if (adminError) throw adminError;
        if (isAdmin) {
          setRole("admin");
        } else {
          const { data: ownerships, error: ownershipsError } = await supabase.from("painting_owners").select("id").eq("owner_id", user.id).limit(1);
          if (ownershipsError) throw ownershipsError;
          setRole(ownerships && ownerships.length > 0 ? "owner" : "user");
        }
      } catch (error) {
        console.error("Error checking user role:", error);
        setRole("user");
      } finally {
        setLoading(false);
      }
    };
    checkUserRole();
  }, [user]);
  return { role, loading, isAdmin: role === "admin", isOwner: role === "owner" };
};
const AdminRoute = ({ children }) => {
  const { role, loading } = useUserRole();
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin" }) });
  }
  if (role !== "admin") {
    return /* @__PURE__ */ jsx(Navigate, { to: "/gallery/manage", replace: true });
  }
  return /* @__PURE__ */ jsx(Fragment, { children });
};
class ErrorBoundary extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "state", {
      hasError: false,
      error: null
    });
    __publicField(this, "handleReload", () => {
      window.location.reload();
    });
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-background p-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md w-full text-center space-y-6", children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "h-8 w-8 text-destructive" }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold text-foreground", children: "Something went wrong" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "An unexpected error occurred. Please try reloading the page." }),
          false
        ] }),
        /* @__PURE__ */ jsx(Button, { onClick: this.handleReload, size: "lg", children: "Reload page" })
      ] }) });
    }
    return this.props.children;
  }
}
const PageLoader = () => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-screen", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-grow flex items-center justify-center py-24", children: /* @__PURE__ */ jsx(
      Loader2,
      {
        className: "h-8 w-8 animate-spin text-primary",
        "aria-label": "Loading"
      }
    ) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 4e3;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t2) => t2.id === action.toast.id ? { ...t2, ...action.toast } : t2
        )
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t2) => t2.id === toastId || toastId === void 0 ? {
            ...t2,
            open: false
          } : t2
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t2) => t2.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("text-sm font-semibold", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Description,
  {
    ref,
    className: cn("text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
function Toaster() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
const Sheet = SheetPrimitive.Root;
const SheetPortal = SheetPrimitive.Portal;
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxs(
    SheetPrimitive.Content,
    {
      ref,
      className: cn(sheetVariants({ side }), className),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
SheetContent.displayName = SheetPrimitive.Content.displayName;
const SheetHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    ),
    ...props
  }
);
SheetHeader.displayName = "SheetHeader";
const SheetFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
SheetFooter.displayName = "SheetFooter";
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  useEffect(() => {
    const hasConsented = localStorage.getItem("cookieConsent");
    if (!hasConsented) {
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1e3);
      return () => clearTimeout(timer);
    }
  }, []);
  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowConsent(false);
  };
  if (!showConsent) return null;
  return /* @__PURE__ */ jsx(Sheet, { open: showConsent, onOpenChange: setShowConsent, children: /* @__PURE__ */ jsxs(SheetContent, { side: "bottom", className: "max-w-lg mx-auto rounded-t-lg", children: [
    /* @__PURE__ */ jsxs(SheetHeader, { className: "flex-row items-center gap-4", children: [
      /* @__PURE__ */ jsx(Cookie, { className: "h-6 w-6 text-eac-dark" }),
      /* @__PURE__ */ jsx(SheetTitle, { children: "Cookie Consent" })
    ] }),
    /* @__PURE__ */ jsx(SheetDescription, { className: "py-4", children: "This website uses cookies to ensure you get the best experience on our website. By continuing to use this site, you consent to our use of cookies." }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 py-2", children: [
      /* @__PURE__ */ jsx(Info, { className: "h-4 w-4 text-eac-dark" }),
      /* @__PURE__ */ jsxs("span", { className: "text-sm", children: [
        "Learn more in our",
        " ",
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/cookies-policy",
            className: "text-blue-600 hover:underline font-medium",
            onClick: () => setShowConsent(false),
            children: "Cookies Policy"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(SheetFooter, { className: "mt-4 sm:justify-start gap-4", children: /* @__PURE__ */ jsx(Button, { onClick: acceptCookies, className: "bg-blue-400 text-white hover:bg-blue-800", children: "Accept All Cookies" }) })
  ] }) });
};
const NewsDetail = () => {
  var _a2;
  const { id } = useParams();
  const navigate = useLocalizedNavigate();
  const { language, t: t2 } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);
  const newsItem = newsItems.find((item) => item.id === id);
  useEffect(() => {
    if (!newsItem) {
      navigate("/eac/news", { replace: true });
    }
  }, [newsItem, navigate]);
  if (!newsItem) return null;
  const title = pickText(newsItem.title, language);
  const description = pickText(newsItem.description, language);
  const trimmedTitle = title.length > 50 ? `${title.slice(0, 49).trimEnd()}…` : title;
  const seoTitle = `${trimmedTitle} | EAC News`;
  const plainDescription = description.replace(/<[^>]*>/g, "").replace(/\n+/g, " ").trim();
  const seoDescription = plainDescription.length > 160 ? `${plainDescription.substring(0, 157)}...` : plainDescription;
  const isoDate = (() => {
    const d = new Date(newsItem.date);
    return isNaN(d.getTime()) ? newsItem.date : d.toISOString().split("T")[0];
  })();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": title,
    "datePublished": isoDate,
    "dateModified": isoDate,
    "description": seoDescription,
    "image": newsItem.mainImageJpg || newsItem.mainImageWebp,
    "author": {
      "@type": "Organization",
      "name": "European Arbitration Chamber"
    },
    "publisher": {
      "@type": "Organization",
      "name": "European Arbitration Chamber",
      "url": "https://chea-taic.be",
      "logo": {
        "@type": "ImageObject",
        "url": "https://chea-taic.be/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": typeof window !== "undefined" ? window.location.href : ""
    }
  };
  const formatDescription = (html) => {
    const transformed = html.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br/>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>");
    if (typeof window === "undefined") {
      return { __html: transformed };
    }
    return {
      __html: DOMPurify.sanitize(transformed, {
        ALLOWED_TAGS: ["p", "br", "strong", "em", "b", "i", "ul", "ol", "li", "h1", "h2", "h3", "h4", "a"],
        ALLOWED_ATTR: ["href", "target", "rel"]
      })
    };
  };
  const handleImageClick = (src) => setSelectedImage(src);
  const closeImagePopup = () => setSelectedImage(null);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: seoTitle,
        description: seoDescription,
        image: newsItem.mainImageJpg || newsItem.mainImageWebp,
        lang: language,
        ogType: "article",
        structuredData
      }
    ),
    /* @__PURE__ */ jsxs(Layout, { children: [
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "mb-6", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/eac/news", children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
          t2("common.backToNews")
        ] }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-4", children: title }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-muted-foreground mb-6", children: [
          /* @__PURE__ */ jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }),
          newsItem.date
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-6 mb-8", children: [
          (newsItem.mainImageWebp || newsItem.mainImageJpg) && /* @__PURE__ */ jsx("div", { className: "md:w-[300px] flex-shrink-0", children: /* @__PURE__ */ jsxs("picture", { children: [
            newsItem.mainImageWebp && /* @__PURE__ */ jsx("source", { srcSet: newsItem.mainImageWebp, type: "image/webp" }),
            /* @__PURE__ */ jsx(
              "img",
              {
                src: newsItem.mainImageJpg,
                alt: title,
                className: "w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity",
                onClick: () => handleImageClick(newsItem.mainImageJpg || newsItem.mainImageWebp)
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "flex-grow prose prose-lg max-w-none", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "news-content",
              dangerouslySetInnerHTML: formatDescription(description)
            }
          ) })
        ] }),
        ((_a2 = newsItem.images) == null ? void 0 : _a2.length) > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: t2("common.gallery") || "Gallery" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: newsItem.images.map((image, index) => /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: image,
              alt: `${title} - image ${index + 1}`,
              className: "w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity",
              onClick: () => handleImageClick(image)
            }
          ) }, index)) })
        ] }),
        (() => {
          const idx = newsItems.findIndex((n) => n.id === id);
          const prev = idx > 0 ? newsItems[idx - 1] : null;
          const next = idx >= 0 && idx < newsItems.length - 1 ? newsItems[idx + 1] : null;
          const related = newsItems.filter((n) => n.id !== id).slice(Math.max(0, idx - 3), Math.max(0, idx - 3) + 6).filter((n) => n.id !== id).slice(0, 6);
          return /* @__PURE__ */ jsxs("nav", { "aria-label": "More news", className: "mt-12 border-t pt-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between gap-4 mb-8", children: [
              prev ? /* @__PURE__ */ jsxs(Link, { to: `/eac/news/${prev.id}`, className: "group flex-1 text-left", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-xs uppercase text-muted-foreground", children: [
                  "← ",
                  t2("common.previous") || "Previous"
                ] }),
                /* @__PURE__ */ jsx("div", { className: "font-medium group-hover:underline", children: pickText(prev.title, language) })
              ] }) : /* @__PURE__ */ jsx("div", { className: "flex-1" }),
              next ? /* @__PURE__ */ jsxs(Link, { to: `/eac/news/${next.id}`, className: "group flex-1 text-right", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-xs uppercase text-muted-foreground", children: [
                  t2("common.next") || "Next",
                  " →"
                ] }),
                /* @__PURE__ */ jsx("div", { className: "font-medium group-hover:underline", children: pickText(next.title, language) })
              ] }) : /* @__PURE__ */ jsx("div", { className: "flex-1" })
            ] }),
            related.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: t2("common.relatedNews") || "Related news" }),
              /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: related.map((n) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: `/eac/news/${n.id}`, className: "block p-3 rounded border hover:bg-muted transition-colors", children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: n.date }),
                /* @__PURE__ */ jsx("div", { className: "font-medium", children: pickText(n.title, language) })
              ] }) }, n.id)) })
            ] })
          ] });
        })()
      ] }) }),
      selectedImage && /* @__PURE__ */ jsx(
        "div",
        {
          className: "fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4",
          onClick: closeImagePopup,
          children: /* @__PURE__ */ jsxs("div", { className: "relative max-w-4xl max-h-[90vh] w-full", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full z-10",
                onClick: (e) => {
                  e.stopPropagation();
                  closeImagePopup();
                },
                children: /* @__PURE__ */ jsx(X, { className: "h-6 w-6" })
              }
            ),
            /* @__PURE__ */ jsx(
              "img",
              {
                src: selectedImage,
                alt: "Enlarged view",
                className: "max-h-[90vh] max-w-full mx-auto object-contain"
              }
            )
          ] })
        }
      )
    ] })
  ] });
};
const Gallery = lazy(() => import("./assets/Gallery-Drzc_Ycf.js"));
const PaintingDetail = lazy(() => import("./assets/PaintingDetail-CkJlJ8xY.js"));
const PaintingForm = lazy(() => import("./assets/PaintingForm-D-GQIqcN.js"));
const GalleryManage = lazy(() => import("./assets/GalleryManage-C9G8m3Fo.js"));
const QrCodeGenerator = lazy(() => import("./assets/QrCodeGenerator-Dh7uf08Q.js"));
const TokenManagement = lazy(() => import("./assets/TokenManagement-CTgqB0or.js"));
const Auth = lazy(() => import("./assets/Auth-B7qnMNVf.js"));
const Contacts = lazy(() => import("./assets/Contacts-C-TJK98D.js"));
const NotFound = lazy(() => import("./assets/NotFound-DTdV_9hR.js"));
const AdminDashboard = lazy(() => import("./assets/AdminDashboard-BKVlScQF.js"));
const Landing = lazy(() => import("./assets/Landing-DGerPTU0.js"));
const EACAbout = lazy(() => import("./assets/About-CeJ2eQGD.js"));
const Council = lazy(() => import("./assets/Council-gZfEno6V.js"));
const News = lazy(() => import("./assets/News-CcfsXPjQ.js"));
const ICAC = lazy(() => import("./assets/ICAC-C_Ocay9g.js"));
const Rules = lazy(() => import("./assets/Rules-KJFIognG.js"));
const FeeRegulations = lazy(() => import("./assets/FeeRegulations-VOS_twKc.js"));
const CostCalculator = lazy(() => import("./assets/CostCalculator-B2Fk45g4.js"));
const ArbitrationClause = lazy(() => import("./assets/ArbitrationClause-B2Ll5dw9.js"));
const ICJE = lazy(() => import("./assets/ICJE-BaIu05-0.js"));
const ExpertiseFields = lazy(() => import("./assets/ExpertiseFields-hdUTRf2h.js"));
const ArtAuthentication = lazy(() => import("./assets/ArtAuthentication-8J3IA4jU.js"));
const ArtAppraisal = lazy(() => import("./assets/ArtAppraisal-BG4icxkg.js"));
const ArtPassport = lazy(() => import("./assets/ArtPassport-Bx4DZ0ex.js"));
const MembershipBenefits = lazy(() => import("./assets/MembershipBenefits-CBMxUEIQ.js"));
const HowToJoin = lazy(() => import("./assets/HowToJoin-CJk2SjM2.js"));
const CodeOfConduct = lazy(() => import("./assets/CodeOfConduct-g_Neer1a.js"));
const PrivacyPolicy = lazy(() => import("./assets/PrivacyPolicy-BSBrcmkm.js"));
const CookiesPolicy = lazy(() => import("./assets/CookiesPolicy-DZtNg_em.js"));
const TermsOfService = lazy(() => import("./assets/TermsOfService-DMmcnV-r.js"));
const queryClient = new QueryClient();
const RootLayout = () => /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(HelmetProvider, { children: /* @__PURE__ */ jsxs(AuthProvider, { children: [
  /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(PageLoader, {}), children: /* @__PURE__ */ jsx(Outlet, {}) }) }),
  /* @__PURE__ */ jsx(ScrollToTop, {}),
  /* @__PURE__ */ jsx(Toaster, {}),
  /* @__PURE__ */ jsx(CookieConsent, {})
] }) }) });
const LangLayout = ({ lang }) => /* @__PURE__ */ jsx(LanguageProvider, { initialLanguage: lang, children: /* @__PURE__ */ jsx(Outlet, {}) });
const RootRedirect = () => {
  if (typeof window === "undefined") {
    return null;
  }
  let stored = null;
  try {
    stored = localStorage.getItem("eac-lang");
  } catch {
  }
  let target = DEFAULT_LANG;
  if (isSupportedLang(stored)) {
    target = stored;
  } else if (typeof navigator !== "undefined") {
    for (const c of [...navigator.languages || [], navigator.language || ""]) {
      const code = c.slice(0, 2).toLowerCase();
      if (isSupportedLang(code)) {
        target = code;
        break;
      }
    }
  }
  return /* @__PURE__ */ jsx(Navigate, { to: `/${target}`, replace: true });
};
const LegacyPathRedirect = () => {
  const location = useLocation();
  if (typeof window === "undefined") return null;
  let stored = null;
  try {
    stored = localStorage.getItem("eac-lang");
  } catch {
  }
  const target = isSupportedLang(stored) ? stored : DEFAULT_LANG;
  return /* @__PURE__ */ jsx(
    Navigate,
    {
      to: `/${target}${location.pathname}${location.search}${location.hash}`,
      replace: true
    }
  );
};
const localisedChildren = () => [
  { index: true, Component: Index },
  { path: "landing", Component: Landing },
  // EAC
  { path: "eac", element: /* @__PURE__ */ jsx(Navigate, { to: "about", replace: true }) },
  { path: "eac/about", Component: EACAbout },
  { path: "eac/council", Component: Council },
  { path: "eac/news", Component: News },
  {
    path: "eac/news/:id",
    Component: NewsDetail
  },
  // Arbitration
  { path: "arbitration", element: /* @__PURE__ */ jsx(Navigate, { to: "icac", replace: true }) },
  { path: "arbitration/icac", Component: ICAC },
  { path: "arbitration/rules", Component: Rules },
  { path: "arbitration/fees", Component: FeeRegulations },
  { path: "arbitration/calculator", Component: CostCalculator },
  { path: "arbitration/clause", Component: ArbitrationClause },
  // Expertise
  { path: "expertise", element: /* @__PURE__ */ jsx(Navigate, { to: "icje", replace: true }) },
  { path: "expertise/icje", Component: ICJE },
  { path: "expertise/expertiseFields", Component: ExpertiseFields },
  // Art expertise
  { path: "art-expertise", element: /* @__PURE__ */ jsx(Navigate, { to: "authentication", replace: true }) },
  { path: "art-expertise/authentication", Component: ArtAuthentication },
  { path: "art-expertise/appraisal", Component: ArtAppraisal },
  { path: "art-expertise/passport", Component: ArtPassport },
  // Gallery (public, runtime data → SPA-only, no SSG)
  { path: "gallery", Component: Gallery },
  { path: "gallery/:id", Component: PaintingDetail },
  { path: "gallery/:id/access/:token", Component: PaintingDetail },
  // Membership
  { path: "membership", element: /* @__PURE__ */ jsx(Navigate, { to: "benefits", replace: true }) },
  { path: "membership/benefits", Component: MembershipBenefits },
  { path: "membership/join", Component: HowToJoin },
  { path: "membership/conductCode", Component: CodeOfConduct },
  { path: "contacts", Component: Contacts },
  { path: "privacy-policy", Component: PrivacyPolicy },
  { path: "cookies-policy", Component: CookiesPolicy },
  { path: "cookies", element: /* @__PURE__ */ jsx(Navigate, { to: "../cookies-policy", replace: true }) },
  { path: "terms-of-service", Component: TermsOfService },
  { path: "about", element: /* @__PURE__ */ jsx(Navigate, { to: "../eac/about", replace: true }) },
  { path: "*", Component: NotFound }
];
const withStaticNewsPaths = (lang) => localisedChildren().map((route) => {
  if (route.path === "eac/news/:id") {
    return {
      ...route,
      getStaticPaths: () => newsItems.map((n) => `eac/news/${n.id}`)
    };
  }
  return route;
});
const langSubtree = (lang) => ({
  path: lang,
  element: /* @__PURE__ */ jsx(LangLayout, { lang }),
  children: withStaticNewsPaths()
});
const routes = [
  {
    path: "/",
    element: /* @__PURE__ */ jsx(RootLayout, {}),
    children: [
      { index: true, Component: RootRedirect },
      // Non-localised utility routes (SPA-only — not pre-rendered).
      { path: "auth", Component: Auth },
      {
        path: "admin/dashboard",
        element: /* @__PURE__ */ jsx(AdminRoute, { children: /* @__PURE__ */ jsx(AdminDashboard, {}) })
      },
      {
        path: "gallery/manage",
        element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(GalleryManage, {}) })
      },
      {
        path: "gallery/manage/add",
        element: /* @__PURE__ */ jsx(AdminRoute, { children: /* @__PURE__ */ jsx(PaintingForm, {}) })
      },
      {
        path: "gallery/manage/edit/:id",
        element: /* @__PURE__ */ jsx(AdminRoute, { children: /* @__PURE__ */ jsx(PaintingForm, {}) })
      },
      {
        path: "gallery/manage/tokens/:id",
        element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(TokenManagement, {}) })
      },
      {
        path: "gallery/manage/qr/:id",
        element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(QrCodeGenerator, {}) })
      },
      // Per-language subtrees — pre-rendered.
      ...SUPPORTED_LANGS.map((lang) => langSubtree(lang)),
      // Legacy non-prefixed paths → client-side redirect on hydration.
      { path: "*", Component: LegacyPathRedirect }
    ]
  }
];
const createRoot = ViteReactSSG({
  routes,
  basename: "/"
});
export {
  Button as B,
  Card as C,
  Layout as L,
  NewsItem as N,
  Seo as S,
  useAuth as a,
  useUserRole as b,
  cn as c,
  createRoot,
  Link as d,
  CardHeader as e,
  CardTitle as f,
  CardContent as g,
  CardDescription as h,
  useLocalizedNavigate as i,
  useToast as j,
  buttonVariants as k,
  getPublicBaseUrl as l,
  isLovableOrLocalhost as m,
  setPublicBaseUrl as n,
  newsItems as o,
  supabase as s,
  useLanguage as u
};
