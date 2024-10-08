var ParallaxScroll = {
    showLogs: !1,
    round: 1e3,
    init: function() {
        if (this._log("init"), this._inited) return this._log("Already Inited"), void(this._inited = !0);
        this._requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a, e) {
            window.setTimeout(a, 1e3 / 60)
        }, this._onScroll(!0)
    },
    _inited: !1,
    _properties: ["x", "y", "z", "rotateX", "rotateY", "rotateZ", "scaleX", "scaleY", "scaleZ", "scale"],
    _requestAnimationFrame: null,
    _log: function(a) {
        this.showLogs && console.log("Parallax Scroll / " + a)
    },
    _onScroll: function(a) {
        var e = jQuery(document).scrollTop(),
            t = jQuery(window).height();
        this._log("onScroll " + e), jQuery("[data-parallax]").each(jQuery.proxy(function(r, i) {
            var o = jQuery(i),
                s = [],
                n = !1,
                l = o.data("style");
            void 0 == l && (l = o.attr("style") || "", o.data("style", l));
            var d, c = [o.data("parallax")];
            for (d = 2; o.data("parallax" + d); d++) c.push(o.data("parallax-" + d));
            var u = c.length;
            for (d = 0; d < u; d++) {
                var v = c[d],
                    m = v["from-scroll"];
                void 0 == m && (m = Math.max(0, jQuery(i).offset().top - t)), m |= 0;
                var h = v.distance,
                    y = v["to-scroll"];
                void 0 == h && void 0 == y && (h = t), h = Math.max(0 | h, 1);
                var p = v.easing,
                    w = v["easing-return"];
                if (void 0 != p && jQuery.easing && jQuery.easing[p] || (p = null), void 0 != w && jQuery.easing && jQuery.easing[w] || (w = p), p) {
                    var g = v.duration;
                    void 0 == g && (g = h), g = Math.max(0 | g, 1);
                    var x = v["duration-return"];
                    void 0 == x && (x = g), h = 1;
                    var f = o.data("current-time");
                    void 0 == f && (f = 0)
                }
                void 0 == y && (y = m + h), y |= 0;
                var _ = v.smoothness;
                void 0 == _ && (_ = 30), _ |= 0, (a || 0 == _) && (_ = 1), _ |= 0;
                var j = e;
                j = Math.max(j, m), j = Math.min(j, y), p && (void 0 == o.data("sens") && o.data("sens", "back"), j > m && ("back" == o.data("sens") ? (f = 1, o.data("sens", "go")) : f++), j < y && ("go" == o.data("sens") ? (f = 1, o.data("sens", "back")) : f++), a && (f = g), o.data("current-time", f)), this._properties.map(jQuery.proxy(function(a) {
                    var e = 0,
                        t = v[a];
                    if (void 0 != t) {
                        "scale" == a || "scaleX" == a || "scaleY" == a || "scaleZ" == a ? e = 1 : t |= 0;
                        var r = o.data("_" + a);
                        void 0 == r && (r = e);
                        var i = (j - m) / (y - m) * (t - e) + e,
                            l = r + (i - r) / _;
                        if (p && f > 0 && f <= g) {
                            var d = e;
                            "back" == o.data("sens") && (d = t, t = -t, p = w, g = x), l = jQuery.easing[p](null, f, d, t, g)
                        }(l = Math.ceil(l * this.round) / this.round) == r && i == t && (l = t), s[a] || (s[a] = 0), s[a] += l, r != s[a] && (o.data("_" + a, s[a]), n = !0)
                    }
                }, this))
            }
            if (n) {
                if (void 0 != s.z) {
                    var Q = v.perspective;
                    void 0 == Q && (Q = 800);
                    var A = o.parent();
                    A.data("style") || A.data("style", A.attr("style") || ""), A.attr("style", "perspective:" + Q + "px; -webkit-perspective:" + Q + "px; " + A.data("style"))
                }
                void 0 == s.scaleX && (s.scaleX = 1), void 0 == s.scaleY && (s.scaleY = 1), void 0 == s.scaleZ && (s.scaleZ = 1), void 0 != s.scale && (s.scaleX *= s.scale, s.scaleY *= s.scale, s.scaleZ *= s.scale);
                var X = "translate3d(" + (s.x ? s.x : 0) + "px, " + (s.y ? s.y : 0) + "px, " + (s.z ? s.z : 0) + "px)" + " " + ("rotateX(" + (s.rotateX ? s.rotateX : 0) + "deg) rotateY(" + (s.rotateY ? s.rotateY : 0) + "deg) rotateZ(" + (s.rotateZ ? s.rotateZ : 0) + "deg)") + " " + ("scaleX(" + s.scaleX + ") scaleY(" + s.scaleY + ") scaleZ(" + s.scaleZ + ")") + ";";
                this._log(X), o.attr("style", "transform:" + X + " -webkit-transform:" + X + " " + l)
            }
        }, this)), window.requestAnimationFrame ? window.requestAnimationFrame(jQuery.proxy(this._onScroll, this, !1)) : this._requestAnimationFrame(jQuery.proxy(this._onScroll, this, !1))
    }
};