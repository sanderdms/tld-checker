# TLD CHECKER

Made by @sanderdms<br>
Made for educational purpose [@becodeorg](https://github.com/becodeorg)

Original exercise files: [_becode_copy](https://github.com/sanderdms/tld-checker/blob/master/_becode_copy)


Purpose is to find what domain TLDS are available and for what price on any exact given name.

## API's used
- https://www.name.com/api_about
- https://forismatic.com/en/api/

## Development 
### Setup API proxy
An API proxy is required to run this application.

    $ cd server
    $ npm install

Create  an account at https://name.com/account/settings/api to get your own API credentials.
Now add your API credentials in the .env file in the `/server` directory using the `.env.sample` template. Replace the placeholders by your KEY and USERNAME and save the `.env` file.

Alternatively you could use the [Now local development mode](https://zeit.co/blog/now-dev) by running `now dev` from the `/server` directory. (after running `npm install` ) To add the required environment variables run following commands first:

    $ now secrets add api-token [NAME.COM API KEY]
    $ now secrets add api-user [NAME.COM USERNAME]
    $ now dev

You might also havo to manually change the fetch function url in `js/app.js` file.

### Run the API server and the interface:
Run the following commands from the root directory of this repository:

    $ npm install
    $ npm run dev

## Production
API proxy deployed using Zeit Now. Front-end hosted on Github Pages.

## Todo
- [ ] Fix README
- [ ] Get  renewal prices
- [ ] Add caching middleware into proxy API
- [ ] Remember lookups
- [ ] Add datasrouces for checking more TLD's
- [ ] Style / UX (empathise TLD label and registrar provider)
- [ ] Error handling when offline
- [ ] Add webpack and dev/staging/production pipeline
- [ ] add support for lookups using specific tld (allow searching with .tld)

