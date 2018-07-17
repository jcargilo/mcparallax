
function loadMcParallaxPlugin($) {

    var isInViewport = function(el) {
        var elementBottom = $(el).offset().top + $(el).outerHeight();
        var viewportBottom = $(window).scrollTop() + window.innerHeight;
        var isInViewport = elementBottom > $(window).scrollTop() && $(el).offset().top < viewportBottom;
        //console.log(`${elementBottom} - ${$(window).scrollTop()} - ${$(el).offset().top} - ${viewportBottom}`);

        return isInViewport;
    };

    var createMcParallax = function(el) {
        if ($(el).data('image-src')) {
            $(el).parent().css('position', 'relative');
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
                var backImgHeight = $(el).outerHeight() * (1 + (getSpeed(el) / 3));
                /*
                 * The background image needs to full screen width so it checks if the scaled width
                 * of the image is less than the screen width and in this case it rescale the image height
                 * with a new scale obtained from the width.
                 */
                var scale = backImgHeight / this.height;
                if (this.width * scale < window.innerWidth) {
                    scale = window.innerWidth / this.width;
                    backImgHeight = this.height * scale;
                }
                $(el).css('background-size', 'auto ' + backImgHeight + 'px');
                parallaxMove(el);
            };
            img.src = $(el).data('image-src');
        }
    };

    var getSpeed = function(el) {
        var moveSpeed = parseInt($(el).data('speed')) || 2;
        if (moveSpeed > 10) {
            moveSpeed = 10;
        } else if (moveSpeed < 2) {
            moveSpeed = 2;
        }

        return moveSpeed;
    };

    var parallaxMove = function(el) {
        var imgPos;
        if (isInViewport(el)) {
            var elementTop = $(el).offset().top;
            var viewportBottom = $(window).scrollTop() + window.innerHeight;
            imgPos = viewportBottom - elementTop;
            var scale = (window.innerHeight * 2) / ($(el).outerHeight() * (getSpeed(el) / 3));
            imgPos = imgPos / scale;
        } else {
            imgPos = 0;
        }

        var xPosition = 'auto';
        if ($(el).data('position-x') != undefined)
        {
            var offset = parseInt($(el).data('position-x'));
            if (offset > 0)
                xPosition = offset + '%';
        }
        $(el).css('background-position', xPosition + ' -' + imgPos + 'px');
    };

    $.fn.mcParallax = function() {
        return this.each(function() {
            var el = this;
            createMcParallax(el);

            $(window).resize(function() {
                createMcParallax(el);
            });

            $(window).scroll(function() {
                parallaxMove(el);
            });
        });
    };

    $(document).ready(function() {
        $('.mcparallax').mcParallax();
    });
}

/**
 * Function to wait until jQuery is loaded. There is a max number
 * attemps to prevent infinite execution of this Function
 * if jQuery is not included in the page.
 */
function waitUntiljQueryLoad(i) {
    var nAttempts = i || 0;
    if (nAttempts < 200) {
        nAttempts += 1;
        if (typeof jQuery === 'undefined') {
            setTimeout(function() {
                waitUntiljQueryLoad(nAttempts);
            }, 50);
        } else {
            loadMcParallaxPlugin(jQuery);
        }
    }
}

waitUntiljQueryLoad();