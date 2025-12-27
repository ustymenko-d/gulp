# Gulp build setup

This is a pre-configured Gulp setup for web projects. It includes automation tools for compiling
HTML, Pug, CSS, SCSS, optimizing images, live browser reloading, and more.

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
│── gulp/              # Gulp configuration files
│── src/               # Source files (Pug, SCSS, JS, images, etc.)
│── dist/              # Compiled output for production
│── gulpfile.js        # Main Gulp configuration file
│── package.json       # Project dependencies and scripts
│── README.md          # Project documentation
│── webpack.config.js  # Webpack config for JS compilation
```

Note: The setup automatically detects the presence of SCSS. Ensure there is only one main index
stylesheet file — either .scss or .css.

### Start Development

To start the Gulp tasks, run:

```bash
npm run dev
```

This command will launch a local server, watch for file changes, and automatically reload the
browser. To generate the final production build and package it into a .zip archive, use:

```bash
npm run build
```
