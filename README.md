Purpose is to find what domain TLDS are available on an exact given name. And for what price.

This is not a domain transfer or WHOIS service !!

## Setup API server
An API proxy is required to run this application.

    $ cd server
    $ npm install

Create  an account at https://name.com/account/settings/api to get your own API credentials.
Now add your API credentials in the .env file in the `/server` directory using the `.env.sample` template. Replace the placeholders by your KEY and USERNAME and save the `.env` file.

## Run the API server and the interface:
Run the following commands from the root directory of this repository:

    $ npm install

    $ npm run dev


# Todo
- [ ] Get  renewal prices
- [ ] Add caching middleware into proxy API
- [ ] Store previous successful queries in localstorage (only the query not perse results)
- [ ] Add datasrouces for checking more TLD's
- [ ] Style / UX

