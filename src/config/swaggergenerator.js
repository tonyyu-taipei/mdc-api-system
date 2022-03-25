module.exports['swagger-generator'] = {
    disabled: false,
    swaggerJsonPath: './swagger/swagger.json',
    swagger: {
        openapi: '3.0.0',
        info: {
            title: 'MDC API System',
            description: 'This is a generated swagger json for MDC-API-sails project',
            termsOfService: 'https://mdcstudio.tw',
            contact: {name: 'Tony Yu', url: 'https://tonyyu.taipei', email: 'shinningyu55688@gmail.com'},
            license: {name: 'Apache 2.0', url: 'http://www.apache.org/licenses/LICENSE-2.0.html'},
            version: '1.0.0'
        },
        servers: [
            { url: 'https://api.mdcstudio.tw' }
        ],
        externalDocs: {url: 'https://github.com/aaronkao88/mdc-api-system'}
    },
    defaults: {
        responses: {
            '200': { description: 'The requested resource' },
            '400': { description: "data specified error" },
            '404': { description: 'Resource not found' },
            '500': { description: 'Internal server error' }
        }
    },
    excludeDeprecatedPutBlueprintRoutes: true,
    includeRoute: function(routeInfo) { return true; },
};