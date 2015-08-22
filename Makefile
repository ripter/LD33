.PHONY: build run stop test clean lint js node_modules 

LIB := ./node_modules
BIN := $(LIB)/.bin

all: build

build: node_modules dist/main.js dist/index.html 

run: build server.PID
	open http://localhost:3000/index.html

js: dist/main.js
	cp ./node_modules/phaser/dist/phaser.min.js dist/phaser.js
	cp assets/* dist/assets/

clean:
	npm cache clean
	-rm -R node_modules/
	-rm server.PID

lint:
	$(BIN)/eslint --ext .js src/

node_modules: package.json
	npm install

dist/:
	-mkdir dist

dist/index.html: dist/ src/index.html
	cp src/index.html dist/index.html

dist/main.js: node_modules dist/
	$(BIN)/webpack src/main.js dist/main.js

test:
	$(BIN)/mocha -R nyan --compilers js:babel/register

server.PID:
	$(BIN)/http-server ./dist -p 3000 --silent & echo $$! > $@
	#if you are having issues, try this one
	#$(BIN)/http-server ./dist -p 3000

stop: server.PID
	-kill `cat server.PID`
	-rm server.PID
