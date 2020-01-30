# wc-prerender
My master thesis project regarding pre-rendering of Web Components

## Abstract
Web Components are getting more popular and the community came across some disadvantages like first load performance. Server-side rendering (SSR) could improve this. The idea of server-side rendering is nothing new but it has been said that Web Components can not be rendered on the server due to the lack of a declarative shadow root representation.
This project evaluates a solution to pre-render Web Components and compares its performance to other possible implementations.

## Goal

The key intention, which might be obsolete these days, is that functionality should be usable without JavaScript. As of today, about 95% of all websites use JavaScript which makes the fallback for non-JavaScript websites less important. Nonetheless, this means that Web Components should work without JavaScript to some extent. Although, the definition of "work" here should be narrowed down to the content representation only which is hidden when a Web Component is used while JavaScript is disabled. Another aspect is to minimize the time until the First Contentful Paint(FCP) happens in the browser. This means reducing the workload a browser has to do upfront. Which includes interpreting and displaying a component. The time needed to show a custom component will always be greater compared to a vanilla HTML element, due to their nature and how they are being parsed by the browser.

Therefore, the goal is to pre-render Web Components to provide a vanilla HTML alternative until the actual component is ready to display and exchange it afterwards.


### Appendix
Stencil Approach
https://github.com/ionic-team/stencil/blob/143e07ea58a67c9bc16209c1c2a5d32a13f50b60/src/mock-doc/serialize-node.ts
