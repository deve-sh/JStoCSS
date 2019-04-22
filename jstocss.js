/*
	JavaScript Object to CSS Transpiler.

	Author : Devesh Kumar

	For documentation visit : https://github.com/deve-sh/JStoCSS
*/

function jscss_transpile(object){
	// Function to transpile/compile the provided JS Object to CSS.

	let transpiled = "";	// Variable to store the transpiled CSS

	if(Object.keys(object).length>0 && typeof object === 'object' && !Array.isArray(object)){	
		// A little bit of checking to ensure no one called the transpile function directly without going throw the setup function.
		// If the object passed to the transpile function is valid and non-empty and not an array.

		for(let element in object){
			if(object.hasOwnProperty(element)){
				// Transpiling property by property.

				transpiled += `${element} `;

				transpiled += "{\n";

				// Adding properties of element, this part is especially long, so no comments fellas.

				if(Array.isArray(object[element])){
					
					// If the properties are an array.

					for(let i in object[element]){
						transpiled += (object[element][i].toString().endsWith(';'))?`\t${object[element][i]}\n`:`\t${object[element][i]};\n`;
					}
				}
				else if(typeof object[element] === 'string'){
					transpiled += `\t${object[element]}\n`;
				}
				else if(typeof object[element] === 'object'){
					// Iterating over the properties.

					for(let props in object[element]){
						if(object[element].hasOwnProperty(props)){
							transpiled += `\t${props} : `;

							transpiled += (object[element][props].toString().endsWith(';'))?`${object[element][props]}\n`:`${object[element][props]};\n`;
						}
					}
				}

				// Do nothing if it is none of the above. After all, you wouldn't want a function inside a CSS File.
				
				transpiled += "}\n\n";
			}
		}
	}
	else{
		throw new Error("Invalid source object.");
	}

	// If no error occurred till now, that means that the CSS has been transpiled.

	return transpiled;
}

function jscss_setup(source, isUrl){
	// Function to take the source of the code and call the transpile function accordingly.
	// Minimises the number of errors that might spring up at any point in the execution of transpilation process.
	
	source = source || "";	// Validate the source received.
	isUrl = isUrl || false;

	if(source){
		// If source is valid;

		if(typeof source === 'string'){
		
		// If the source is a string, then check if it can be parsed as JSON, or is a link to a file.

			if(isUrl === true){
				// If the source isn't valid JSON and a link to a JSON File to be parsed.
				// Running an XMLHttpRequest to get the JSON from the file.

				let xhr = new XMLHttpRequest();

				xhr.open('GET',encodeURIComponent(source),true);	// encodeURIComponent to avoid any injections.

				xhr.send();

				xhr.onload = function(){
					// If the request was successful.
					
					let receivedJSON = null;

					if(JSON.parse(xhr.responseText)){	// If no error was returned.
						receivedJSON = JSON.parse(xhr.responseText);
					}
					else{	
						// If the JSON in the file is invalid. However, this code will never be reached in case the JSON isn't parsable as JSON.parse throws an error before this.
						throw new Error("Invalid JSON.");	
					}

					return jscss_transpile(receivedJSON);	// Call the transpile function to parse the object and convert to CSS.
				}
			}
			else{
				// If the string is the JSON.

				if(JSON.parse(source)){
					// If the string was successfully parsed as JSON, then send the object to transpile.

					return jscss_transpile(JSON.parse(source));
				}
			}
		}
		else if(typeof source === 'object'){
			// Checking for correct format of the source.

			if(Array.isArray(source)){	// Checking if the source is an array, as array has type object.
				throw new Error("Only pure JavaScript objects are permitted as sources for transpilation.");
			}
			else{	// If the source is a pure object.
				if(Object.keys(source).length>0){
					return jscss_transpile(source);	// Call the transpile function.
				}
				else{
					throw new Error("Source Object cannot be empty.");
				}
			}
		}
		else{
			throw new Error("Undefined format entered for transpilation.");
		}
	}

	// Do nothing if the source is not valid. Hence, end of the setup function.
}