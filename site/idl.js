
$(function () {
  var CONFIGURATION =
  { bottomMargin: 40
  , rowHeight: 24
  };

  var api = $("#api");

  var boxParts = $.map("margin border padding".split(/\s+/), function (n) {
    return n + "-top " + n + "-bottom";
  }).join(" ").split(/\s+/);
  var extra = 0, topExtra = 0;
  for (var i  = 0; i < boxParts.length; i++) {
    var value = api.css(boxParts[i]);
    var match = /^(\d+)px$/.exec(value);
    if (match) {
      extra += parseInt(match[1], 10);
      if (/-top$/.test(boxParts[i])) {
        topExtra += parseInt(match[1], 10);
      }
    }
  }
  var api = $("#api"),
      scrollHeight = api.height();
  function assignLast() {
    var last,
        heightWithLast = 0,
        difference = (scrollHeight + extra + CONFIGURATION.bottomMargin) - $(window).height(),
        height  = scrollHeight - difference;
    api.find(".last").removeClass("last");
    api.children().each(function () {
      var position = $(this).position()
      if (position.top < height) {
        last = this;
        heightWithLast = position.top + ($(this).outerHeight(true) / 2);
      } else {
        return false;
      } 
    });
    $(last).addClass("last");
    return heightWithLast;
  }

  function sizeTableOfContents() {
    if (api.height() + extra + CONFIGURATION.bottomMargin > $(window).height()) {
      heightWithLast = assignLast();
      api.css(
      { "overflow": "hidden"
      , "height": heightWithLast + "px"
      , "border-bottom": "2px dotted black"
      });
    }
  }
  var scrolling;
  api.bind("_mousemove", function (event) {
    var offset = api.offset();
    var y =  event.pageY - offset.top;
    if (y < 20) {
      scrolling = setInterval(function () {
        api.scrollTop(api.scrollTop() - 1);
      }, 1000);
    } else if (y > api.height() - 20) {
      if (!scrolling) {
        scrolling = setInterval(function () {
          api.scrollTop(api.scrollTop() + 1);
          if (api.scrollTop() + api.height() == scrollHeight) {
            clearInterval(scrolling);
            alert("Done!");
          }
        }, 1000);
      }
    } else if (scrolling) {
      clearInterval(scrolling);
    }
  });
  var lastScroll = 0,
      nextScroll;
  $(".last").live("mouseover", function (event) {
    if (nextScroll) {
      clearTimeout(nextScroll);
      nextScroll = null;
    }
    console.log(Date.now() - lastScroll);
    if (Date.now() - lastScroll < 250) {
      nextScroll = setTimeout(function () {
        scrollDown(event);
      }, 1000);
    } else {
      scrollDown(event);
    }
  });
  api.bind("mouseout", function () {
    if (nextScroll) {
      clearTimeout(nextScroll);
      nextScroll = null;
    }
  });
  function scrollDown(event) {
    var self = $(event.target),
        next = self.next(),
        api = $("#api");
    self.removeClass("last");
    if (next.size() == 0) {
      api.animate({ scrollTop: scrollHeight - api.height() }, 500, setFirst);
      api.css("border-bottom", "none");
    } else {
      nextNext = next.next();
      if (nextNext.size() == 0) {
        api.css("border-bottom", "none");
      } else {
        offset = api.height() - (api.scrollTop() + nextNext.position().top + 10); // nextNext.outerHeight(true) / 2);
        nextNext.addClass("last");
      }
      api.animate({ scrollTop: - offset }, 500, setFirst);
    }
  }
  function setFirst() {
    api.css("border-top", "2px dotted black");
    api.find(".first").removeClass("first");
    api.children().each(function () {
      self = $(this);
      if (self.position().top + self.height() > 0) {
        self.addClass("first");    
        return false;
      }
    });
    lastScroll = Date.now();
    nextScroll = null;
  }
  $(".first").live("mouseover", function (event) {
    console.log("first");
    waitForScrol(scrollUp, event);
  });
  function waitForScrol(scroll, event) {
    if (nextScroll) {
      clearTimeout(nextScroll);
      nextScroll = null;
    }
    console.log(Date.now() - lastScroll);
    if (Date.now() - lastScroll < 250) {
      nextScroll = setTimeout(function () {
        scroll(event);
      }, 1000);
    } else {
      scroll(event);
    }
  }
  function scrollUp (event) {
    var self = $(event.target),
        prev = self.prev(),
        api = $("#api");
    self.removeClass("first");
    if (prev.size() == 0) {
      api.animate({ scrollTop: 0 }, 500, assignLast);
      api.css({ "border-top": "none", "border-bottom": "2px dotted black" });
    } else {
      api.css("border-bottom", "2px dotted black");
      api.animate({ scrollTop: prev.position().top + api.scrollTop() + (prev.outerHeight(true) / 2) }, 500, assignLast);
      prev.addClass("first");
    }
    lastScroll = Date.now();
    nextScroll = null;
  }

  sizeTableOfContents();
});
