# JStoCSS

A transpiler for converting JavaScript Objects to CSS. Built for Web Apps on the browser.

Comes with an `jstocss.js` and `jstocss-min.js` file containing the functions. The **jstocss-min.js** file is a minified version of index.js and is recommended for usage accross all browsers.

## Usage

To use the transpiler in your application, just download the [file](https://raw.githubusercontent.com/deve-sh/JStoCSS/master/jstocss-min.js) include the jstocss-min.js file in your file like the following :

```html
<script src='jstocss-min.js'></script>
```

Then use the **jscss_setup** function and pass the name of the file to transpile (Should have JSON. [See Usage](#file-examples)), or the string to convert to CSS or just a plain JavaScript Object like the following examples and the function should take care of the rest.

**The return value of the jscss_setup function is the CSS Output**

## Examples

**All JS Objects must have only one level of nesting.**

Consider a JS Object as follows : 

```javascript
const styles = {
	"*" : {
		"box-sizing":"border-box"
	},
	"body" : {
		"color": "#ffffff",
		"background": "#000000"
	},
	"h1" : {
		"color":"#ffffff",
		"font-size":"3rem"
	},
	".span" : `
		color: #efefef;
		font-size: 1rem;
	`,
	".element" : ["color : #efefef","box-shadow : none"]
}
```

Then passing the object **styles** to the function **jscss_setup** function will yeild the follwing output : 

```css
* {
	box-sizing : border-box;
}

body {
	color : #ffffff;
	background : #000000;
}

h1 {
	color : #ffffff;
	font-size : 3rem;
}

.span {
	color: #efefef;
	font-size: 1rem;	
}

.element {
	color : #efefef;
	box-shadow : none;
}
```

### File Examples

The script can also be used to transpile the JSON content inside another file.

The script uses an XMLHttpRequest in order to fetch the contents. So it will be a good idea to set the headers and run the scripts on a web server beforehand to avoid CORS errors.

**Example** : Consider a styles.json file containing all the JSON. The jscss_setup function takes the arguments in the following pattern :

```javascript
jscss_setup(source, isUrl);
```

Just pass the file path in the source, and set the **second argument to true** in order to run the XMLHttpRequest.

## Contribution

For further development and contribution, clone the repository and edit the source code to your liking. Start a pull request, and I shall accept them as per the appropriateness of the changes.

For any further contact, feel free to [email me](mailto:devesh2027@gmail.com).

## Disclaimer

Just so everyone knows, I never knew something like JSS existed until I was halfway through the project, so please forgive the fact that this seems like an exact copy of JSS 🤷‍♂️😛. Peace ✌ .
