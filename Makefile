.PHONY: all run js clean pathSpriteSheet

LIB := ./node_modules
BIN := $(LIB)/.bin

all: node_modules js 

run: 
	$(BIN)/http-server ./dist -p 3000
	open http://localhost:3000/index.html

js: node_modules/ dist/assets/
	$(BIN)/webpack src/main.js dist/main.js
	cp ./src/index.html dist/index.html
	cp ./node_modules/phaser/dist/phaser.min.js dist/phaser.js
	cp ./node_modules/jquery/dist/jquery.min.js dist/jquery.js
	cp -R ./assets/* dist/assets/

clean:
	npm cache clean
	-rm -R node_modules/
	-rm server.PID

node_modules/: package.json
	npm install

dist/assets/:
	mkdir -p dist/assets

pathSpriteSheet:
	convert +append assets/paths/path-*.png assets/paths/pathSpriteSheet.png
