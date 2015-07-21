# Shush.it

A tool to share/install Tweetbot mute filters built by two awesome dudes (Joe Torraca and Henri Watson).

## Getting Started

The following tools are required to compile/run the shush.it codebase:

* Node (v0.11+)
* Grunt
* MySQL Database

## Local Installation

1. Duplicate the `config.example.json` file calling it `config.json` and enter your Twitter authentication credentials and MySQL credentials
2. Ensure your MySQL server is running
1. Install the npm packages with `npm install`
1. Install grunt-contrib-compass `gem update --system && gem install compass sass`
2. Install bower and grunt-cli globally with `npm install -g grunt-cli bower`
2. Run Grunt/start Grunt watcher by running `grunt` in the main directory
3. Install Bower dependencies with `bower install`
3. Start the node server with `npm start`
4. Profit

## How to contribute

* File an issue in the repository, using the bug tracker, describing the contribution you'd like to make. This will help us to get you started on the right foot.
* Fork the project in your account and create a new branch: your-great-feature.
* Commit your changes in that branch.
* Open a pull request, and reference the initial issue in the pull request message.

## Code Style Guide

* All code **must** use two spaces for indenting. Tabs **must not** be used for indenting.
* All JavaScript **must**:
  * Be written using the [One True Brace](https://en.wikipedia.org/wiki/Indent_style#Variant:_1TBS) style.
  * Use single quotes for strings.
  * Use [camelCase](https://en.wikipedia.org/wiki/CamelCase) for variable and function names.
* All HTML **must**:
  * Use double quotes for strings.
