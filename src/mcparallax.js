
function loadMcParallaxPlugin($) {

    var isInViewport = function(el) {
        var elementBottom = $(el).offset().top + $(el).outerHeight();
        var viewportBottom = $(window).scrollTop() + window.innerHeight;
        var isInViewport = elementBottom > $(window).scrollTop() && $(el).offset().top < viewportBottom;

        return isInViewport;
    }

    var createMcParallax = function(el) {
        if ($(el).data('image-src')) {
            $(el).css('position', 'absolute');
            $(el).css('height', '100%');
            $(el).css('width', '100%');
            $(el).css('z-index', '-99');
            $(el).css('background-image', 'url("' + $(el).data('image-src') + '")');
            $(el).css('background-repeat', 'no-repeat');
            $(el).css('background-position', '0 0');

            if (!$(el).height()) {
                window.requestAnimationFrame(function() {
                    createMcParallax(el);
                });
                return;
            }

            var img = new Image;
            img.onload = function() {
                var backImgHeight = $(el).height() + window.innerHeight * 2;
                $(el).css('background-size', 'auto ' + backImgHeight + 'px');
                parallaxMove(el);
            };
            img.src = $(el).data('image-src');
        }
    };

    var parallaxMove = function(el) {
        var imgPos;
        if (isInViewport(el)) {
            var elementTop = $(el).offset().top;
            var viewportBottom = $(window).scrollTop() + window.innerHeight;
            imgPos = viewportBottom - elementTop;
        } else {
            imgPos = 0;
        }
        $(el).css('background-position', '0 -' + imgPos + 'px');
    };

    $.fn.mcParallax = function() {
        return this.each(function() {
            var el = this;
            $(window).on('load', function() {
                createMcParallax(el);
            });

            $(window).resize(function() {
                createMcParallax(el);
            });

            $(window).scroll(function() {
                parallaxMove(el);
            });
        });
    };

}

/**
 * Function to wait until jQuery is loaded. There is a max number
 * attemps to prevent infinite execution of this Function
 * if jQuery is not included in the page.
 */
function waitUntiljQueryLoad(i) {
    var nAttempts = i || 0;
    if (nAttempts < 100) {
        nAttempts += 1;
        if (typeof jQuery === 'undefined') {
            setTimeout(function() {
                waitUntiljQueryLoad(nAttempts);
            }, 100);
        } else {
            loadMcParallaxPlugin(jQuery);
            $(document).ready(function() {
                $('.mcparallax').mcParallax();
            });
        }
    }
}

waitUntiljQueryLoad();
