#!/usr/bin/env sh
set -e

npm run build

cd dist
rm -rf .git

touch .nojekyll
echo "corpus.linguistics.ntu.edu.tw" > CNAME

git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/liao961120/formcorp.git master:gh-pages


cd -
