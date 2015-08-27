.PHONY: all run js clean

LIB := ./node_modules
BIN := $(LIB)/.bin

all: node_modules js 

run: node_modules/ 
	$(BIN)/http-server ./dist -p 3000
	open http://localhost:3000/index.html

js: node_modules/
	$(BIN)/webpack src/main.js dist/main.js
	cp ./src/index.html dist/index.html
	cp ./node_modules/phaser/dist/phaser.min.js dist/phaser.js
	cp ./assets/* dist/assets/

clean:
	npm cache clean
	-rm -R node_modules/

node_modules/: package.json
	npm install
