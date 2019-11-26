# TLD CHECKER

Made by @sanderdms<br>
Made for educational purpose [@becodeorg](https://github.com/becodeorg)

Original exercise files: [_becode_copy](https://github.com/sanderdms/tld-checker/blob/master/_becode_copy)


Purpose is to find what domain TLDS are available and for what price on any exact given name.

## Development 
### Setup API proxy
An API proxy is required to run this application.

    $ cd server
    $ npm install

Create  an account at https://name.com/account/settings/api to get your own API credentials.
Now add your API credentials in the .env file in the `/server` directory using the `.env.sample` template. Replace the placeholders by your KEY and USERNAME and save the `.env` file.

### Run the API server and the interface:
Run the following commands from the root directory of this repository:

    $ npm install

    $ npm run dev

## Production
API proxy deployed using Zeit Now. Front-end hosted on Github Pages.

## Todo
- [ ] Get  renewal prices
- [ ] Add caching middleware into proxy API
- [ ] Remember lookups
- [ ] Add datasrouces for checking more TLD's
- [ ] Style / UX
- [ ] Error handling when offline
- [ ] Add webpack
- [ ] add support for lookups using specific tld (allow searching with .tld)

