Shine 
========
**experimental**

A modern client JavaScript application framework. 

## Installation
This is not published to bower as it's experimental. To get the source
clone it.

```bash
$ git clone https://github.com/shockwork/shine.git
$ cd shine && npm install && grunt bower
```

## Docs
The documentation is written with YUIDOC syntax. 

**Compile documentation and serve it at [localhost:1337](http://localhost:1337/)**

```bash
$ grunt docs
```

**Output the documentation in docs/.**

```bash
$ grunt yuidoc
```

## Tests
Tests are written with QUnit and Karma as the runner.

```bash
$ grunt test
```