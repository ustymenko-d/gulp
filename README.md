# Gulp Starter Pack

This is a pre-configured Gulp setup for web projects. It includes automation tools for compiling Pug, SCSS, optimizing images, live browser reloading, and more.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/ustymenko-d/gulp.git
    cd gulp
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

## Usage

Project Structure:

```bash
gulp
│── gulp/            # Gulp configuration files
│── src/             # Source files (Pug, SCSS, JS, images, etc.)
│── dist/            # Compiled output for production
│── gulpfile.js      # Main Gulp configuration file
│── package.json     # Project dependencies and scripts
│── README.md        # Project documentation
```

### Start Development

To start the Gulp tasks, run:

```bash
gulp
```

This command will launch a local server, watch for file changes, and automatically reload the browser. To generate the final production build and package it into a .zip archive, use:

```bash
npm run zip
```
