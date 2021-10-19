import appInfoType from '../../types/app-info';
import appConfig from '../../config/app';

const appInfo: appInfoType = {
  "name": "Flickr",
  "key": "flickr",
  "iconUrl": `${appConfig.baseUrl}/apps/flickr/assets/favicon.svg`,
  "docUrl": "https://automatisch.io/docs/flickr",
  "primaryColor": "000000",
  "fields": [
    {
      "key": "oAuthRedirectUrl",
      "label": "OAuth Redirect URL",
      "type": "string",
      "required": true,
      "readOnly": true,
      "value": "http://localhost:3001/app/flickr/connections/add",
      "placeholder": null,
      "description": "When asked to input an OAuth callback or redirect URL in Flickr OAuth, enter the URL above.",
      "docUrl": "https://automatisch.io/docs/flickr#oauth-redirect-url",
      "clickToCopy": true
    },
    {
      "key": "consumerKey",
      "label": "Consumer Key",
      "type": "string",
      "required": true,
      "readOnly": false,
      "value": null,
      "placeholder": null,
      "description": null,
      "docUrl": "https://automatisch.io/docs/flickr#consumer-key",
      "clickToCopy": false
    },
    {
      "key": "consumerSecret",
      "label": "Consumer Secret",
      "type": "string",
      "required": true,
      "readOnly": false,
      "value": null,
      "placeholder": null,
      "description": null,
      "docUrl": "https://automatisch.io/docs/flickr#consumer-secret",
      "clickToCopy": false
    }
  ],
  "authenticationSteps": [
    {
      "step": 1,
      "type": "mutation",
      "name": "createConnection",
      "fields": [
        {
          "name": "key",
          "value": "{key}"
        },
        {
          "name": "data",
          "value": null,
          "fields": [
            {
              "name": "consumerKey",
              "value": "{fields.consumerKey}"
            },
            {
              "name": "consumerSecret",
              "value": "{fields.consumerSecret}"
            }
          ]
        }
      ]
    },
    {
      "step": 2,
      "type": "mutation",
      "name": "createAuthLink",
      "fields": [
        {
          "name": "id",
          "value": "{createConnection.id}"
        }
      ]
    },
    {
      "step": 3,
      "type": "openWithPopup",
      "name": "openAuthPopup",
      "fields": [
        {
          "name": "url",
          "value": "{createAuthLink.url}"
        }
      ]
    },
    {
      "step": 4,
      "type": "mutation",
      "name": "updateConnection",
      "fields": [
        {
          "name": "id",
          "value": "{createConnection.id}"
        },
        {
          "name": "data",
          "value": null,
          "fields": [
            {
              "name": "oauthVerifier",
              "value": "{openAuthPopup.oauth_verifier}"
            }
          ]
        }
      ]
    }
  ]
}

export default appInfo;