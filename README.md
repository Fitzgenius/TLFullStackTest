Take-home task
===

My notes & thoughts
---

This was a very interesting challenge and I have thoroughly enjoyed it. Getting things working on Windows was a pain, but... managed to get there in the end.

The code and implementation is by no means perfect. I think I captured the essence of what was required in the brief with some room for imagination of how I would progress things further. This workflow process is not alien to me but was a challenge having to revert back to different ways of doing things.. for example - not having onClick ready to fire events to update state and it magically update the UI or.. not having hot reload when making any change to the frontend.


After inspecting the code initially and getting things setup, it was fairly simple to understand. Installing packages with composer in the Docker container and breaking one thing to fix another. Not too distant from an `npm install` command.

AI Hand Holding
---

I used ChatGPT to help me with:
- twig templating & it's nuances
- the booking controller template (not the data structure in $this->bookings - that's all mine)
- caved in trying to make a responsive table using a table tag with correct semantic layout only to be forced to use CSS grid (I am more of a flexbox guy)
- some vanilla JS with the dropdown toggle and updating the list (I confused myself mostly and have been spoilt with using libraries such as React)

Assumptions
---

- MySQL or PostgreSQL for data
- JWT tokens or DB auth
- Rate limiter
- Redis cache
- Some sort of vanilla js set of tools 

Limitations
---

- No hot reload
- Icons in the figma design were not all proper svgs (I know it wasn't required to copy it 100% but I wanted to impress, so you have the foundation in the code to add later)
- Sometimes slow load times and/or caching problems
- Not sure about including images/css/js files in app.js - seems a bit messy (encore specific though)
- Sometimes felt like was repeating code to show in an endpoint and also show in a twig template (I would rather code one endpoint and have a React app pick it up with the JSON)

Things to improve
---

- Finish it
- I included Bootstrap and didn't even use it, probably just use the grid system
- Better logic for the dropdown display when clicking a button - you can open multiple at once (needs a global click event on the body)
- Add mobile menu toggler (currently hides the nav when screen under 992px)
- Find a better way to have the navbar links included or loaded from somewhere else and not in the include
- Make use of web components to enable better DOM manipulation (Live Components) or Symfony UX React 
- Mobile version of status change button doesn't make sense (doesn't exist) with wording and would require a re-think.. It should open a modal
- Market filter logic needs to be consolodated (it's nearly there)
- Some of the font sizes and spacing between elements from the design needs to be looked into again as it feels a bit clunky with regards the visual hierarchy 

Getting it running
---
Repeat OG instuctions and then run

`npm install` in the root folder (not in Docker)

`npm run build` to generate assets in the public folder


Introduction
---

Here are a few guidance notes. Hope they help!

To save you time, this repo is provided for you to fork and use. You are free to customize it as 
needed, but please make sure to include clear instructions on how to run it.

We  offer some start scripts that work in Linux and Macs via Bash. We've found our scripts also
work in Windows, but only under WSL. Git Bash doesn't seem to like the volume switch, and we'd
assume PowerShell and the Windows Command Prompt would not work either.

Getting started
---

Pull this repo to your usual development folder:

    git clone git@github.com:travellocal/full-stack-take-home-task.git
    cd full-stack-take-home-task

Build the image:

    ./docker-bin/build.sh

Start the container in detached mode:

    ./docker-bin/start.sh

Get a shell into the image:

    ./docker-bin/shell.sh

Finally, inside the container prompt, install the dependencies:

    composer install

A demo screen will be available in your browser at http://localhost:8090. Of course, you
can change the port number if you have a clash.

If you ever need to start the container but it already exists, you can destroy the old
one:

    docker rm symfony-sandbox-container

Routing and templates
---

There is a little random-number generator at http://localhost:8090/lucky/number. The routing
is configured in `config/routes.yaml`. There is a simple layout at `templates/base.html.twig`,
and a template demo at `templates/lucky/number.html.twig`. You will likely want to create
your own routes and templates, and then edit the layout.

For JS and CSS assets, you're welcome to use build tools for minification or tree-shaking
etc., but if you want to pull them from a CDN in the interests of time, that's fine too. We
are moving to Bootstrap 5, but any modern CSS framework is fine for this demo.
