Purpose is to find what domain TLDS are available on an exact given name. And for what price.

This is not a domain transfer or WHOIS service !!

## Setup API proxy
An API proxy is required to run this application in devmode.
Create account https://name.com/account/settings/api
Create a new .env file using the .env.sample template. Enter API username, key and endpoint in the .env file...
Run the API server:

    $ cd server

    $npm run dev


# Todo
- [ ] Get  renewal prices
- [ ] Add caching middleware into proxy API
- [ ] Store previous successful queries in localstorage (only the query not perse results)
- [ ] Add datasrouces for checking more TLD's
- [ ] Style / UX

