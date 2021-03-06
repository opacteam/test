// Native JavaScript for Bootstrap 3 Polyfill
!(function() {
  var e = document,
    t = this.Document || this.HTMLDocument,
    n = window,
    s = this.constructor || this.Window || Window,
    i = Element,
    a = "prototype";
  if (
    (n.HTMLElement || (n.HTMLElement = n[i]),
    Array[a].indexOf ||
      (Array[a].indexOf = function(e) {
        if (void 0 === this || null === this)
          throw new TypeError(this + " is not an object");
        var t = this instanceof String ? this.split("") : this,
          n = Math.max(Math.min(t.length, 9007199254740991), 0) || 0,
          s = Number(arguments[1]) || 0;
        for (s = (s < 0 ? Math.max(n + s, 0) : s) - 1; ++s < n; )
          if (s in t && t[s] === e) return s;
        return -1;
      }),
    !("classList" in i[a]))
  ) {
    var r = function(e) {
      var t =
        (e.getAttribute("class") || "")
          .replace(/^\s+|\s+$/g, "")
          .split(/\s+/) || [];
      (hasClass = this.contains = function(e) {
        return t.indexOf(e) > -1;
      }),
        (addClass = this.add = function(n) {
          hasClass(n) || (t.push(n), e.setAttribute("class", t.join(" ")));
        }),
        (removeClass = this.remove = function(n) {
          hasClass(n) &&
            (t.splice(t.indexOf(n), 1), e.setAttribute("class", t.join(" ")));
        }),
        (toggleClass = this.toggle = function(e) {
          hasClass(e) ? removeClass(e) : addClass(e);
        });
    };
    Object.defineProperty(i[a], "classList", {
      get: function() {
        return new r(this);
      }
    });
  }
  (n.Event && s[a].Event) ||
    (n.Event = s[a].Event = t[a].Event = i[a].Event = function(t, n) {
      if (!t) throw new Error("Not enough arguments");
      var s,
        i = !(!n || void 0 === n.bubbles) && n.bubbles,
        a = !(!n || void 0 === n.cancelable) && n.cancelable;
      return (
        "createEvent" in e
          ? (s = e.createEvent("Event")).initEvent(t, i, a)
          : (((s = e.createEventObject()).type = t),
            (s.bubbles = i),
            (s.cancelable = a)),
        s
      );
    }),
    ("CustomEvent" in n && "CustomEvent" in s[a]) ||
      (n.CustomEvent = s[a].CustomEvent = t[a].CustomEvent = Element[
        a
      ].CustomEvent = function(e, t) {
        if (!e)
          throw Error("CustomEvent TypeError: An event name must be provided.");
        var n = new Event(e, t);
        return (n.detail = (t && t.detail) || null), n;
      }),
    (n.addEventListener && s[a].addEventListener) ||
      ((n.addEventListener = s[a].addEventListener = t[a].addEventListener = i[
        a
      ].addEventListener = function() {
        var t = this,
          n = arguments[0],
          s = arguments[1];
        t._events || (t._events = {}),
          t._events[n] ||
            ((t._events[n] = function(n) {
              var s,
                i = t._events[n.type].list,
                a = i.slice(),
                r = -1,
                o = a.length;
              for (
                n.preventDefault = function() {
                  !1 !== n.cancelable && (n.returnValue = !1);
                },
                  n.stopPropagation = function() {
                    n.cancelBubble = !0;
                  },
                  n.stopImmediatePropagation = function() {
                    (n.cancelBubble = !0), (n.cancelImmediate = !0);
                  },
                  n.currentTarget = t,
                  n.relatedTarget = n.relatedTarget || n.fromElement || null,
                  n.target = n.target || n.srcElement || t,
                  n.timeStamp = new Date().getTime(),
                  n.clientX &&
                    ((n.pageX = n.clientX + e.documentElement.scrollLeft),
                    (n.pageY = n.clientY + e.documentElement.scrollTop));
                ++r < o && !n.cancelImmediate;

              )
                r in a &&
                  ((s = a[r]),
                  -1 !== i.indexOf(s) &&
                    "function" == typeof s &&
                    s.call(t, n));
            }),
            (t._events[n].list = []),
            t.attachEvent && t.attachEvent("on" + n, t._events[n])),
          t._events[n].list.push(s);
      }),
      (n.removeEventListener = s[a].removeEventListener = t[
        a
      ].removeEventListener = i[a].removeEventListener = function() {
        var e,
          t = this,
          n = arguments[0],
          s = arguments[1];
        t._events &&
          t._events[n] &&
          t._events[n].list &&
          -1 !== (e = t._events[n].list.indexOf(s)) &&
          (t._events[n].list.splice(e, 1),
          t._events[n].list.length ||
            (t.detachEvent && t.detachEvent("on" + n, t._events[n]),
            delete t._events[n]));
      })),
    (n.dispatchEvent &&
      s[a].dispatchEvent &&
      t[a].dispatchEvent &&
      i[a].dispatchEvent) ||
      (n.dispatchEvent = s[a].dispatchEvent = t[a].dispatchEvent = i[
        a
      ].dispatchEvent = function(e) {
        if (!arguments.length) throw new Error("Not enough arguments");
        if (!e || "string" != typeof e.type)
          throw new Error("DOM Events Exception 0");
        var t = this,
          s = e.type;
        try {
          if (!e.bubbles) {
            e.cancelBubble = !0;
            var i = function(e) {
              (e.cancelBubble = !0), (t || n).detachEvent("on" + s, i);
            };
            this.attachEvent("on" + s, i);
          }
          this.fireEvent("on" + s, e);
        } catch (n) {
          e.target = t;
          do {
            (e.currentTarget = t),
              "_events" in t &&
                "function" == typeof t._events[s] &&
                t._events[s].call(t, e),
              "function" == typeof t["on" + s] && t["on" + s].call(t, e),
              (t = 9 === t.nodeType ? t.parentWindow : t.parentNode);
          } while (t && !e.cancelBubble);
        }
        return !0;
      });
})(); // Native Javascript for Bootstrap 4 v2.0.27 | © dnp_theme | MIT-License
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD support:
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    // CommonJS-like:
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    var bsn = factory();
    root.Dropdown = bsn.Dropdown;
  }
})(this, function() {
  /* Native Javascript for Bootstrap 4 | Internal Utility Functions
  ----------------------------------------------------------------*/
  "use strict";

  // globals
  var globalObject = typeof global !== "undefined" ? global : this || window,
    DOC = document,
    HTML = DOC.documentElement,
    body = "body", // allow the library to be used in <head>
    // Native Javascript for Bootstrap Global Object
    BSN = (globalObject.BSN = {}),
    supports = (BSN.supports = []),
    // function toggle attributes
    dataToggle = "data-toggle",
    dataDismiss = "data-dismiss",
    dataSpy = "data-spy",
    dataRide = "data-ride",
    // components
    stringAlert = "Alert",
    stringButton = "Button",
    stringCarousel = "Carousel",
    stringCollapse = "Collapse",
    stringDropdown = "Dropdown",
    stringModal = "Modal",
    stringPopover = "Popover",
    stringScrollSpy = "ScrollSpy",
    stringTab = "Tab",
    stringTooltip = "Tooltip",
    stringToast = "Toast",
    // options DATA API
    dataAutohide = "data-autohide",
    databackdrop = "data-backdrop",
    dataKeyboard = "data-keyboard",
    dataTarget = "data-target",
    dataInterval = "data-interval",
    dataHeight = "data-height",
    dataPause = "data-pause",
    dataTitle = "data-title",
    dataOriginalTitle = "data-original-title",
    dataDismissible = "data-dismissible",
    dataTrigger = "data-trigger",
    dataAnimation = "data-animation",
    dataContainer = "data-container",
    dataPlacement = "data-placement",
    dataDelay = "data-delay",
    // option keys
    backdrop = "backdrop",
    keyboard = "keyboard",
    delay = "delay",
    content = "content",
    target = "target",
    currentTarget = "currentTarget",
    interval = "interval",
    pause = "pause",
    animation = "animation",
    placement = "placement",
    container = "container",
    // box model
    offsetTop = "offsetTop",
    offsetBottom = "offsetBottom",
    offsetLeft = "offsetLeft",
    scrollTop = "scrollTop",
    scrollLeft = "scrollLeft",
    clientWidth = "clientWidth",
    clientHeight = "clientHeight",
    offsetWidth = "offsetWidth",
    offsetHeight = "offsetHeight",
    innerWidth = "innerWidth",
    innerHeight = "innerHeight",
    scrollHeight = "scrollHeight",
    scrollWidth = "scrollWidth",
    height = "height",
    // aria
    ariaExpanded = "aria-expanded",
    ariaHidden = "aria-hidden",
    ariaSelected = "aria-selected",
    // event names
    clickEvent = "click",
    focusEvent = "focus",
    hoverEvent = "hover",
    keydownEvent = "keydown",
    keyupEvent = "keyup",
    resizeEvent = "resize", // passive
    scrollEvent = "scroll", // passive
    mouseHover =
      "onmouseleave" in DOC
        ? ["mouseenter", "mouseleave"]
        : ["mouseover", "mouseout"],
    // touch since 2.0.26
    touchEvents = { start: "touchstart", end: "touchend", move: "touchmove" }, // passive
    // originalEvents
    showEvent = "show",
    shownEvent = "shown",
    hideEvent = "hide",
    hiddenEvent = "hidden",
    closeEvent = "close",
    closedEvent = "closed",
    slidEvent = "slid",
    slideEvent = "slide",
    changeEvent = "change",
    // other
    getAttribute = "getAttribute",
    setAttribute = "setAttribute",
    hasAttribute = "hasAttribute",
    createElement = "createElement",
    appendChild = "appendChild",
    innerHTML = "innerHTML",
    getElementsByTagName = "getElementsByTagName",
    preventDefault = "preventDefault",
    getBoundingClientRect = "getBoundingClientRect",
    querySelectorAll = "querySelectorAll",
    getElementsByCLASSNAME = "getElementsByClassName",
    getComputedStyle = "getComputedStyle",
    indexOf = "indexOf",
    parentNode = "parentNode",
    length = "length",
    toLowerCase = "toLowerCase",
    Transition = "Transition",
    Duration = "Duration",
    Webkit = "Webkit",
    style = "style",
    push = "push",
    tabindex = "tabindex",
    contains = "contains",
    active = "active",
    showClass = "show",
    collapsing = "collapsing",
    disabled = "disabled",
    loading = "loading",
    left = "left",
    right = "right",
    top = "top",
    bottom = "bottom",
    // tooltip / popover
    tipPositions = /\b(top|bottom|left|right)+/,
    // modal
    modalOverlay = 0,
    fixedTop = "fixed-top",
    fixedBottom = "fixed-bottom",
    // transitionEnd since 2.0.4
    supportTransitions =
      Webkit + Transition in HTML[style] ||
      Transition[toLowerCase]() in HTML[style],
    transitionEndEvent =
      Webkit + Transition in HTML[style]
        ? Webkit[toLowerCase]() + Transition + "End"
        : Transition[toLowerCase]() + "end",
    transitionDuration =
      Webkit + Duration in HTML[style]
        ? Webkit[toLowerCase]() + Transition + Duration
        : Transition[toLowerCase]() + Duration,
    // set new focus element since 2.0.3
    setFocus = function(element) {
      element.focus ? element.focus() : element.setActive();
    },
    // class manipulation, since 2.0.0 requires polyfill.js
    addClass = function(element, classNAME) {
      element.classList.add(classNAME);
    },
    removeClass = function(element, classNAME) {
      element.classList.remove(classNAME);
    },
    hasClass = function(element, classNAME) {
      // since 2.0.0
      return element.classList[contains](classNAME);
    },
    // selection methods
    getElementsByClassName = function(element, classNAME) {
      // returns Array
      return [].slice.call(element[getElementsByCLASSNAME](classNAME));
    },
    queryElement = function(selector, parent) {
      var lookUp = parent ? parent : DOC;
      return typeof selector === "object"
        ? selector
        : lookUp.querySelector(selector);
    },
    getClosest = function(element, selector) {
      //element is the element and selector is for the closest parent element to find
      // source http://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
      var firstChar = selector.charAt(0),
        selectorSubstring = selector.substr(1);
      if (firstChar === ".") {
        // If selector is a class
        for (; element && element !== DOC; element = element[parentNode]) {
          // Get closest match
          if (
            queryElement(selector, element[parentNode]) !== null &&
            hasClass(element, selectorSubstring)
          ) {
            return element;
          }
        }
      } else if (firstChar === "#") {
        // If selector is an ID
        for (; element && element !== DOC; element = element[parentNode]) {
          // Get closest match
          if (element.id === selectorSubstring) {
            return element;
          }
        }
      }
      return false;
    },
    // event attach jQuery style / trigger  since 1.2.0
    on = function(element, event, handler, options) {
      options = options || false;
      element.addEventListener(event, handler, options);
    },
    off = function(element, event, handler, options) {
      options = options || false;
      element.removeEventListener(event, handler, options);
    },
    one = function(element, event, handler, options) {
      // one since 2.0.4
      on(
        element,
        event,
        function handlerWrapper(e) {
          handler(e);
          off(element, event, handlerWrapper, options);
        },
        options
      );
    },
    // determine support for passive events
    supportPassive = (function() {
      // Test via a getter in the options object to see if the passive property is accessed
      var result = false;
      try {
        var opts = Object.defineProperty({}, "passive", {
          get: function() {
            result = true;
          }
        });
        one(globalObject, "testPassive", null, opts);
      } catch (e) {}

      return result;
    })(),
    // event options
    // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
    passiveHandler = supportPassive ? { passive: true } : false,
    // transitions
    getTransitionDurationFromElement = function(element) {
      var duration = supportTransitions
        ? globalObject[getComputedStyle](element)[transitionDuration]
        : 0;
      duration = parseFloat(duration);
      duration =
        typeof duration === "number" && !isNaN(duration) ? duration * 1000 : 0;
      return duration; // we take a short offset to make sure we fire on the next frame after animation
    },
    emulateTransitionEnd = function(element, handler) {
      // emulateTransitionEnd since 2.0.4
      var called = 0,
        duration = getTransitionDurationFromElement(element);
      duration
        ? one(element, transitionEndEvent, function(e) {
            !called && handler(e), (called = 1);
          })
        : setTimeout(function() {
            !called && handler(), (called = 1);
          }, 17);
    },
    bootstrapCustomEvent = function(eventName, componentName, related) {
      var OriginalCustomEvent = new CustomEvent(
        eventName + ".bs." + componentName
      );
      OriginalCustomEvent.relatedTarget = related;
      this.dispatchEvent(OriginalCustomEvent);
    },
    // tooltip / popover stuff
    getScroll = function() {
      // also Affix and ScrollSpy uses it
      return {
        y: globalObject.pageYOffset || HTML[scrollTop],
        x: globalObject.pageXOffset || HTML[scrollLeft]
      };
    },
    styleTip = function(link, element, position, parent) {
      // both popovers and tooltips (target,tooltip,placement,elementToAppendTo)
      var elementDimensions = {
          w: element[offsetWidth],
          h: element[offsetHeight]
        },
        windowWidth = HTML[clientWidth] || DOC[body][clientWidth],
        windowHeight = HTML[clientHeight] || DOC[body][clientHeight],
        rect = link[getBoundingClientRect](),
        scroll =
          parent === DOC[body]
            ? getScroll()
            : {
                x: parent[offsetLeft] + parent[scrollLeft],
                y: parent[offsetTop] + parent[scrollTop]
              },
        linkDimensions = {
          w: rect[right] - rect[left],
          h: rect[bottom] - rect[top]
        },
        isPopover = hasClass(element, "popover"),
        topPosition,
        leftPosition,
        arrow = queryElement(".arrow", element),
        arrowTop,
        arrowLeft,
        arrowWidth,
        arrowHeight,
        halfTopExceed =
          rect[top] + linkDimensions.h / 2 - elementDimensions.h / 2 < 0,
        halfLeftExceed =
          rect[left] + linkDimensions.w / 2 - elementDimensions.w / 2 < 0,
        halfRightExceed =
          rect[left] + elementDimensions.w / 2 + linkDimensions.w / 2 >=
          windowWidth,
        halfBottomExceed =
          rect[top] + elementDimensions.h / 2 + linkDimensions.h / 2 >=
          windowHeight,
        topExceed = rect[top] - elementDimensions.h < 0,
        leftExceed = rect[left] - elementDimensions.w < 0,
        bottomExceed =
          rect[top] + elementDimensions.h + linkDimensions.h >= windowHeight,
        rightExceed =
          rect[left] + elementDimensions.w + linkDimensions.w >= windowWidth;

      // recompute position
      position =
        (position === left || position === right) && leftExceed && rightExceed
          ? top
          : position; // first, when both left and right limits are exceeded, we fall back to top|bottom
      position = position === top && topExceed ? bottom : position;
      position = position === bottom && bottomExceed ? top : position;
      position = position === left && leftExceed ? right : position;
      position = position === right && rightExceed ? left : position;

      // update tooltip/popover class
      element.className[indexOf](position) === -1 &&
        (element.className = element.className.replace(tipPositions, position));

      // we check the computed width & height and update here
      arrowWidth = arrow[offsetWidth];
      arrowHeight = arrow[offsetHeight];

      // apply styling to tooltip or popover
      if (position === left || position === right) {
        // secondary|side positions
        if (position === left) {
          // LEFT
          leftPosition =
            rect[left] +
            scroll.x -
            elementDimensions.w -
            (isPopover ? arrowWidth : 0);
        } else {
          // RIGHT
          leftPosition = rect[left] + scroll.x + linkDimensions.w;
        }

        // adjust top and arrow
        if (halfTopExceed) {
          topPosition = rect[top] + scroll.y;
          arrowTop = linkDimensions.h / 2 - arrowWidth;
        } else if (halfBottomExceed) {
          topPosition =
            rect[top] + scroll.y - elementDimensions.h + linkDimensions.h;
          arrowTop = elementDimensions.h - linkDimensions.h / 2 - arrowWidth;
        } else {
          topPosition =
            rect[top] +
            scroll.y -
            elementDimensions.h / 2 +
            linkDimensions.h / 2;
          arrowTop =
            elementDimensions.h / 2 -
            (isPopover ? arrowHeight * 0.9 : arrowHeight / 2);
        }
      } else if (position === top || position === bottom) {
        // primary|vertical positions
        if (position === top) {
          // TOP
          topPosition =
            rect[top] +
            scroll.y -
            elementDimensions.h -
            (isPopover ? arrowHeight : 0);
        } else {
          // BOTTOM
          topPosition = rect[top] + scroll.y + linkDimensions.h;
        }
        // adjust left | right and also the arrow
        if (halfLeftExceed) {
          leftPosition = 0;
          arrowLeft = rect[left] + linkDimensions.w / 2 - arrowWidth;
        } else if (halfRightExceed) {
          leftPosition = windowWidth - elementDimensions.w * 1.01;
          arrowLeft =
            elementDimensions.w -
            (windowWidth - rect[left]) +
            linkDimensions.w / 2 -
            arrowWidth / 2;
        } else {
          leftPosition =
            rect[left] +
            scroll.x -
            elementDimensions.w / 2 +
            linkDimensions.w / 2;
          arrowLeft =
            elementDimensions.w / 2 - (isPopover ? arrowWidth : arrowWidth / 2);
        }
      }

      // apply style to tooltip/popover and its arrow
      element[style][top] = topPosition + "px";
      element[style][left] = leftPosition + "px";

      arrowTop && (arrow[style][top] = arrowTop + "px");
      arrowLeft && (arrow[style][left] = arrowLeft + "px");
    };

  BSN.version = "2.0.27";

  /* Native Javascript for Bootstrap 4 | Dropdown
  ----------------------------------------------*/

  // DROPDOWN DEFINITION
  // ===================
  var Dropdown = function(element, option) {
    // initialization element
    element = queryElement(element);

    // set option
    this.persist =
      option === true ||
      element[getAttribute]("data-persist") === "true" ||
      false;

    // constants, event targets, strings
    var self = this,
      children = "children",
      parent = element[parentNode],
      component = "dropdown",
      open = "open",
      relatedTarget = null,
      menu = queryElement(".dropdown-menu", parent),
      menuItems = (function() {
        var set = menu[children],
          newSet = [];
        for (var i = 0; i < set[length]; i++) {
          set[i][children][length] &&
            set[i][children][0].tagName === "A" &&
              newSet[push](set[i][children][0]);
          set[i].tagName === "A" && newSet[push](set[i]);
        }
        return newSet;
      })(),
      // preventDefault on empty anchor links
      preventEmptyAnchor = function(anchor) {
        ((anchor.href && anchor.href.slice(-1) === "#") ||
          (anchor[parentNode] &&
            anchor[parentNode].href &&
            anchor[parentNode].href.slice(-1) === "#")) &&
          this[preventDefault]();
      },
      // toggle dismissible events
      toggleDismiss = function() {
        var type = element[open] ? on : off;
        type(DOC, clickEvent, dismissHandler);
        type(DOC, keydownEvent, preventScroll);
        type(DOC, keyupEvent, keyHandler);
        type(DOC, focusEvent, dismissHandler, true);
      },
      // handlers
      dismissHandler = function(e) {
        var eventTarget = e[target],
          hasData =
            eventTarget &&
            (eventTarget[getAttribute](dataToggle) ||
              (eventTarget[parentNode] &&
                getAttribute in eventTarget[parentNode] &&
                eventTarget[parentNode][getAttribute](dataToggle)));
        if (
          e.type === focusEvent &&
          (eventTarget === element ||
            eventTarget === menu ||
            menu[contains](eventTarget))
        ) {
          return;
        }
        if (
          (eventTarget === menu || menu[contains](eventTarget)) &&
          (self.persist || hasData)
        ) {
          return;
        } else {
          relatedTarget =
            eventTarget === element || element[contains](eventTarget)
              ? element
              : null;
          hide();
        }
        preventEmptyAnchor.call(e, eventTarget);
      },
      clickHandler = function(e) {
        relatedTarget = element;
        show();
        preventEmptyAnchor.call(e, e[target]);
      },
      preventScroll = function(e) {
        var key = e.which || e.keyCode;
        if (key === 38 || key === 40) {
          e[preventDefault]();
        }
      },
      keyHandler = function(e) {
        var key = e.which || e.keyCode,
          activeItem = DOC.activeElement,
          idx = menuItems[indexOf](activeItem),
          isSameElement = activeItem === element,
          isInsideMenu = menu[contains](activeItem),
          isMenuItem =
            activeItem[parentNode] === menu ||
            activeItem[parentNode][parentNode] === menu;

        if (isMenuItem) {
          // navigate up | down
          idx = isSameElement
            ? 0
            : key === 38
            ? idx > 1
              ? idx - 1
              : 0
            : key === 40
            ? idx < menuItems[length] - 1
              ? idx + 1
              : idx
            : idx;
          menuItems[idx] && setFocus(menuItems[idx]);
        }
        if (
          ((menuItems[length] && isMenuItem) || // menu has items
          (!menuItems[length] && (isInsideMenu || isSameElement)) || // menu might be a form
            !isInsideMenu) && // or the focused element is not in the menu at all
          element[open] &&
          key === 27 // menu must be open
        ) {
          self.toggle();
          relatedTarget = null;
        }
      },
      // private methods
      show = function() {
        bootstrapCustomEvent.call(parent, showEvent, component, relatedTarget);
        addClass(menu, showClass);
        addClass(parent, showClass);
        element[setAttribute](ariaExpanded, true);
        bootstrapCustomEvent.call(parent, shownEvent, component, relatedTarget);
        element[open] = true;
        off(element, clickEvent, clickHandler);
        setTimeout(function() {
          setFocus(menu[getElementsByTagName]("INPUT")[0] || element); // focus the first input item | element
          toggleDismiss();
        }, 1);
      },
      hide = function() {
        bootstrapCustomEvent.call(parent, hideEvent, component, relatedTarget);
        removeClass(menu, showClass);
        removeClass(parent, showClass);
        element[setAttribute](ariaExpanded, false);
        bootstrapCustomEvent.call(
          parent,
          hiddenEvent,
          component,
          relatedTarget
        );
        element[open] = false;
        toggleDismiss();
        setFocus(element);
        setTimeout(function() {
          on(element, clickEvent, clickHandler);
        }, 1);
      };

    // set initial state to closed
    element[open] = false;

    // public methods
    this.toggle = function() {
      if (hasClass(parent, showClass) && element[open]) {
        hide();
      } else {
        show();
      }
    };

    // init
    if (!(stringDropdown in element)) {
      // prevent adding event handlers twice
      !tabindex in menu && menu[setAttribute](tabindex, "0"); // Fix onblur on Chrome | Safari
      on(element, clickEvent, clickHandler);
    }

    element[stringDropdown] = self;
  };

  // DROPDOWN DATA API
  // =================
  supports[push]([stringDropdown, Dropdown, "[" + dataToggle + '="dropdown"]']);

  /* Native Javascript for Bootstrap | Initialize Data API
  --------------------------------------------------------*/
  var initializeDataAPI = function(constructor, collection) {
      for (var i = 0, l = collection[length]; i < l; i++) {
        new constructor(collection[i]);
      }
    },
    initCallback = (BSN.initCallback = function(lookUp) {
      lookUp = lookUp || DOC;
      for (var i = 0, l = supports[length]; i < l; i++) {
        initializeDataAPI(
          supports[i][1],
          lookUp[querySelectorAll](supports[i][2])
        );
      }
    });

  // bulk initialize all components
  DOC[body]
    ? initCallback()
    : on(DOC, "DOMContentLoaded", function() {
        initCallback();
      });

  return {
    Dropdown: Dropdown
  };
});
