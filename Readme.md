
1) Install NodeJS (windows)
```
 https://phoenixnap.com/kb/install-node-js-npm-on-windows

```

2)  Install Express,body parser and cors

 ```npm install express --save

 npm i body-parser

 npm i body-cors
 ```

### Create a folder with your project name and create src folder inside your project folder

### src should contain client folder and server folder

### Client folder should contain js folder,styles folder,views folder as well as index.js file

### App.js file should go inside the js file,css file should go inside styles and index.html file into views
### After doing the basic functionalities in all these files ,install webpack - npm i webpack webpack-cli
	 -add config file:webpack.config
	-Add mecessary require statements and module.exports to config file
	```Const path = require('path')
	-Const webpack = require('webpack')
    -module.exports = {
		}```
	-Add a new webpack npm script to your package.json
	```	"build":webpack"```
	-Try running webpack - will show error
	```	npm run build ```

###  Add an index.js file in to the client directory
   - Add the entry point attribute to webpack config
       ``` './src/client/index.js'  ```

9)Build webpack
10)Add babel to your repo - npm -i @babel/core @babel/preset-env babel-loader
11)create a .babelrc file and fill it with these settings
	{'presets':['@babel/preset-env']}
12)Add a loader to our webpack config	
	module: {
    		rules: [
       	 	{
           		 	test: '/\.js$/',
            			exclude: /node_modules/,
            			loader: "babel-loader"
        		}
    		]
		}
13 Add export statements to javascript files
14)Add import statements for your javascript files in the index.js
	import {functionName } from './js/fileName'
15)Install html webpack plugin
npm  i -D html-webpack-plugin
16)Require the plugin at the top of your webpack config
const HtmlWebpackPlugin = require('html-webpack-plugin')
17)Add plugins list to webpack config and instatntiate the plugin
plugins: [
	new HtmlWebpackPlugin({
		template :'/src/client/views/index.html",
		filename:'/index.html',
	})
]
18)Run webapck and observe the new dist output
19)Update the server file to look for asset files in the dist 
app.use(express.static('dist'))

Seting up development and production environments
***********************************************

1)Install webapack dev server
	npm i -D webpack-dev-sever
2)Edit the build-dev npm script to use webpack-dev-server
	webpack-dev-server --config webpack.dev.js --open

Sass Loader set up
*****************

1)npm i -D style-loader node-sass css-loader sass-loader
2)Then add this test case to the rules array in your dev webpack config.
{
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
}
3)Update import './styles/resets.scss' in client/index.js

Setting up Workbox plugin

Install the plugin: npm install workbox-webpack-plugin --save-dev
Require the plugin in prod: const WorkboxPlugin = require('workbox-webpack-plugin');
Add the plugin: new WorkboxPlugin.GenerateSW()

Add this code to the bottom of your html file, just above the closing body tag.

<script>
    // Check that service workers are supported
    if ('serviceWorker' in navigator) {
        // Use the window load event to keep the page load performant
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js');
        });
    }
</script>
Adding functionalities

Make sure server is running on the given port.

In app.js,write the aynch function to fetch the latitude and longitude of the city entered by user and siplay that in the home page(from geonames api).
Secondly,another async function to fetch datas(weather details) based on the flongitude and latitude and date entered by user(from weatherbit api).
Next,one more async function to fetch the image of the city from pixabay api and display in home page.
Finally a function to calculate the total trip days between trip -start date adn trip-end date.

Jest has been installed fot testing purposes
install npm i jest
Add the following section to your package.json:

{
  "scripts": {
    "test": "jest"
  }
}

Then, create a file named test.js. This will contain our actual test

Finally npm run test 

