
curl -Hcurl -H "Accept: application/vnd.github.mercy-preview+json" \
    -o results.json \
	--user "USERNAME:PASSWORD" https://api.github.com/search/repositories?q=CS3012

python -m SimpleHTTPServer