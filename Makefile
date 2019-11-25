install:
	npm install

start:
	npx babel-node src/bin/gendiff.js

btest:
	npx babel-node src/bin/gendiff.js __tests__/__fixtures__/before.json __tests__/__fixtures__/after.json

build:
	npm run build

buildW:
	npm run buildW

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npx jest

test-coverage:
	npx jest --coverage