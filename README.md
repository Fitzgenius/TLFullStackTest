Take-home task
===

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
