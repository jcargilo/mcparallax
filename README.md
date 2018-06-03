
# jQuery parallax scrolling effect plugin. Works fine on mobile devices.

McParallax is a jQuery plugin to take parallax scrolling effects run in a website.

## Getting Started

Download and insert `mcparallax.min.js`

```html
<section>
    <div class="mcparallax" data-image-src="/assets/images/image-par-03.jpg" data-speed="2">
    </div>

    <div class="container container-below-navbar text-white">
        <h1 class="display-3 text-center font-title font-bold pb-2">Text title</h1>
        <h3 class="text-center font-title font-light">Text description</h3>
        <h2 class="display-4 text-center font-title font-bold pb-2">Text subtitle</h2>
    </div>
</section>
```

## Features

### Speed
Use `data-speed` attribute to set the speed of a `.mcparallax` element. The values of this parameter vary between 2 and 10 with a default value of `2`.
