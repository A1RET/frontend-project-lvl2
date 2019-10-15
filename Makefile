install:
	npm install

start:
	npx babel-node src/bin/gendiff.js

build:
	npm run build

buildW:
	npm run buildW

publish:
	npm publish --dry-run

lint:
	npx eslint .
