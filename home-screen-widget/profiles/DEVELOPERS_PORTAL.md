# Home
Home is a feature that surfaces relevant information by displaying a list of widgets in a new main tab on the mobile clients. 
This gives people effortless access to tools and information that are contextually relevant to their work. 

## Contents

1. [Architecture](#1-architecture)
2. [Home screen widget development](#2-home-screen-widget-development)
3. [Configuring the home screen for a tenant](#3-configuring-the-home-screen-for-a-tenant)


## 1. Architecture

Home or the home screen (as we call it in the code) consists of a hybrid app which is displayed in a web view on the native clients (Android, iOS).
From an architecture perspective the home screen can be split into 4 logical components: 

1. **Home screen**: a hybrid app that is in charge of fetching the home screen configuration for the tenant and dynamically displaying the widgets.
2. **Widgets**: Vue.js components that are loaded dynamically by the home screen and rendered. If you are not familiar with Vue.js, we recommend checking out their [guide](https://vuejs.org/v2/guide/).
3. **Configurations**: Tenant admins can not only configure which widgets are shown on the home screen but also specify input parameters to the widgets themselves. Configurations are also loaded by the home screen on start up.  
4. **HomeScreenSDK**: an SDK that glues everything together by allowing widgets to: 
    * Register themselves onto the home screen
    * Access the [Beekeeper Javascript SDK](https://developers.beekeeper.io/v2/welcome/javascript-sdk)
    * Access the mobile bridge
    * Send events from the widgets to the home screen

### HomeScreenSDK

#### Installation

To install the HomeScreenSDK simply add it as a dependency to your `package.json` file. 

```json
{
  "dependencies": {
    "@beekeeper/home-screen-sdk": "^0.5.3"
  }
}
```

#### Registering a widget

When you register a widget you make the widget component known to the home screen. The widget component is the Vue.js component and the `widgetTypeId` is a unique identifier for the widget (e.g. the Streams widget has id `streams`).

```javascript
registerWidget(widgetTypeId: string, widgetComponent: Component): void;
```

##### example: 

```javascript
import BeekeeperHomeScreen from '@beekeeper/home-screen-sdk';

import component, { WIDGET_ID } from '~/profiles/components/Widget.vue';
BeekeeperHomeScreen.registerWidget(WIDGET_ID, component) // highlight-line
```


#### Sending events to the home screen 

Widgets can communicate with the home screen by triggering events. 

```javascript 
  triggerEvent(
    eventName: EventType,
    widgetInstanceId: string,
    payload?: WidgetEventPayload
  ): void;

```
 

For example this is how you trigger the `LOADED` event in the [example widget](https://github.com/beekpr/examples/tree/master/home-screen-widget/profiles).
```javascript
  import BeekeeperHomeScreen, { EventType } from '@beekeeper/home-screen-sdk';
  BeekeeperHomeScreen.triggerEvent(EventType.LOADED, this.widgetInstanceId); // highlight-line
```

#### Calling Beekeeper SDK

The [Javascript SDK API](https://developers.beekeeper.io/v2/welcome/javascript-sdk) gives access to tenant data such as messages, profiles or streams. 

Example from the [profiles widget](https://github.com/beekpr/examples/tree/master/home-screen-widget/profiles):

```javascript
  import BeekeeperHomeScreen from '@beekeeper/home-screen-sdk';
  ...
  BeekeeperHomeScreen.sdk.Profiles.list({ limit: 50 }); // highlight-line
```

#### Accessing the mobile bridge
 
The mobile bridge enables the interaction of a hybrid feature with the native host application (i.e., the Android or iOS app) via the Beekeeper Bridge.
Through the bridge your widget gets access among others to the tenant object, the user object and the authentication token.

Example from the [profiles widget](https://github.com/beekpr/examples/tree/master/home-screen-widget/profiles):

```javascript
  import BeekeeperHomeScreen from '@beekeeper/home-screen-sdk';
  ...
  const BeekeeperMobileBridge = BeekeeperHomeScreen.bridge; // highlight-line
```
Here we fetch the device locale in order to initialize the translation library. 

## 2. Home screen widget development

### 1. Set up local development environment 
TODO

### 2. Develop a new widget

In order to ease the development of third-party widgets we created an example widget. 
The widget uses the Beekeeper SDK accessible through the HomeScreenSDK to fetch and display user profiles. 

Make sure to follow the instruction steps in the code to find the essential bits and pieces. 

The code can be found [here](https://github.com/beekpr/examples/tree/FUL-21524/home-screen-widget/profiles).


### 3. Publish your widget

TODO


## 3. Configuring the home screen for a tenant
The home screen and the widgets can be configured.\
Configuring a tenant's home screen means adding and removing widgets for the home screen. \
Configuring a widget means specifying possible input parameter that the widget might have and modifying access permission to the widget so that it's just visible to a subset of users. 


To configure the home screen you have three main entities: 
**widget type**, **widget configuration** and **home screen configuration**. 

#### Widget Type
Every new widget developed by Beekeeper or by third party developers must be defined and registered as a widget type. 

A widget type is defined by: 
* `type`: The unique name of the widget type, e.g. (`streams` for the Streams widget)
* `propertiesSchema`: a dictionary of input properties that can be configured and which represents the customizable input data for the widget
* `url`: The relative url path to fetch the widget
* `featureFlags`: The necessary feature flags that the user has to have in order for the widget to be displayed


E.g.

```json
{
  "type": "shortcuts",
  "url": "/home-screen-core-widgets/js/streams.js",
  "featureFlags": ["streams"],
  "propertiesSchema": {
    "pinnedStreams": {
      "$id": "#/propertiesSchema/pinnedStreams",
      "default": [],
      "description": "Indicates which streams are pinned",
      "examples": [
        [
          654321,
          123456
        ]
      ],
      "items": {
        "$id": "#/propertiesSchema/pinnedStreams/items",
        "default": -1,
        "description": "Refers to pinned stream id",
        "examples": [
          654321,
          123456
        ],
        "title": "Pinned stream id",
        "type": "integer"
      },
      "title": "Pinned streams schema",
      "type": "array"
    }
  },
  "_mimeType": "application/vnd.io.beekeeper.home-screen.configuration.widget-type.v1+json",
  "_self": {
    "href": "/api/2/home-screen/widget-types/shortcuts",
    "method": "GET"
  },
}

```

#### Widgets Configuration
A widget configuration determines how a widget type is configured for a specific tenant. For every widget type there can be multiple widget configurations for various tenants. Also a tenant can have multiple configurations for the same widget but with different access control settings, e.g. the same widget differently configured for two different groups.

For instance a simple widget configuration: 

```json
{
    "typeName": "streams",
    "properties": {
        "pinnedStreams": [876543, 321, 345678]
    },
    "acl":{}
}
```

#### Home screen configuration
The home screen can be configured on a tenant basis. Configuring the home screen means specifying which widgets will appear in the home screen and in which order for a specific tenant.


For instance a widget configuration containing the configured streams and the shortcuts widgets could look like this: 


```json
{
  "widgets": [
    {
      "_mimeType": "application/vnd.io.beekeeper.home-screen.configuration.widget.v1+json",
      "_operations": {...},
      "_relations": {...},
      "_self": {},
      "id": "b5575b50-0fb9-44fd-a635-85622f0061d1",
      "properties": {},
      "typeName": "shortcuts",
      "url": "/home-screen-core-widgets/js/shortcuts.js"
    },
    {
      "_mimeType": "application/vnd.io.beekeeper.home-screen.configuration.widget.v1+json",
      "_operations": {...},
      "_relations": {...},
      "_self": {...},
      "id": "39261cdd-0d40-4649-bc96-7c8cd251ea0b",
      "properties": {},
      "typeName": "streams",
      "url": "/home-screen-core-widgets/js/streams.js"
    }
  ],
  "_mimeType": "application/vnd.io.beekeeper.home-screen.configuration.v1+json",
  "_operations": {...},
  "_self": {...}
}

```


### Access management (ACL)
Access to widgets can be modified in order to limit the visibility of a widget to a subset of users.

#### Fetching the acl
Every entity has an acl associated to it. These can be accessed by following the acl url in `rels` in order to get them.

#### Updating the acl 
Entity access can be updated by following the acl url in `rels`.

## Operations

### Fetching all widget types
``` 
GET /home-screen/widget-types
Host: <your_subdomain>.beekeeper.io
Authorization: Token b1edcre4-d128-4g1a-br5v-a495d00e0j41
Content-Type: application/json
```
which returns: 
``` json
{
    "_self": {
        "href": "/api/2/home-screen/widget-types",
        "method": "GET"
    },
    "widgetTypes": [
        {
            "_self": {
                "href": "/api/2/home-screen/widget-types/shortcuts",
                "method": "GET"
            },
            "_mimeType": "application/vnd.io.beekeeper.home-screen.configuration.widget-type.v1+json",
            "url": "/home-screen-core-widgets/js/shortcuts.js",
            "propertiesSchema": "{}",
            "type": "shortcuts",
            "featureFlags": []
        },
        {
            "_self": {
                "href": "/api/2/home-screen/widget-types/streams",
                "method": "GET"
            },
            "_mimeType": "application/vnd.io.beekeeper.home-screen.configuration.widget-type.v1+json",
            "url": "/home-screen-core-widgets/js/streams.js",
            "propertiesSchema": "{}",
            "type": "streams",
            "featureFlags": []
        }
    ],
    "_mimeType": "application/vnd.io.beekeeper.home-screen.configuration.widget-types.v1+json"
}
```

### Fetching a tenant home screen configuration
``` 
GET home-screen/configuration
Host: <your_subdomain>.beekeeper.io
Authorization: Token b1edcre4-d128-4g1a-br5v-a495d00e0j41
Content-Type: application/json
```

which returns: 


```json
{
  "widgets": [
    {
      "_mimeType": "application/vnd.io.beekeeper.home-screen.configuration.widget.v1+json",
      "_operations": {...},
      "_relations": {...},
      "_self": {},
      "id": "b5575b50-0fb9-44fd-a635-85622f0061d1",
      "properties": {},
      "typeName": "shortcuts",
      "url": "/home-screen-core-widgets/js/shortcuts.js"
    },
    {
      "_mimeType": "application/vnd.io.beekeeper.home-screen.configuration.widget.v1+json",
      "_operations": {...},
      "_relations": {...},
      "_self": {...},
      "id": "39261cdd-0d40-4649-bc96-7c8cd251ea0b",
      "properties": {},
      "typeName": "streams",
      "url": "/home-screen-core-widgets/js/streams.js"
    }
  ],
  "_mimeType": "application/vnd.io.beekeeper.home-screen.configuration.v1+json",
  "_operations": {...},
  "_self": {...}
}

```

### Adding widgets to a home screen configuration
``` 
POST home-screen/configuration/widgets
Host: <your_subdomain>.beekeeper.io
Authorization: Token <<your_api_token>>
Content-Type: application/json
```
with a body of, for example:
``` json
{
    "typeName": "streams",
    "properties": {}
}
```



### Deleting widgets from home screen configuration
``` 
DELETE /home-screen/configuration/widgets/<widget_id>
Host: <your_subdomain>.beekeeper.io
Authorization: Token b1edcre4-d128-4g1a-br5v-a495d00e0j41
Content-Type: application/json
```

### Updating widget order

``` 
PUT /home-screen/configuration
Host: <your_subdomain>.beekeeper.io
Authorization: Token b1edcre4-d128-4g1a-br5v-a495d00e0j41
Content-Type: application/json
```
with a body containing the, for example
```json
{
    "widgets": [
        {
            "id": "<first_widget_id>"
        },
        {
            "id": "<second_widget_id>"
        }
    ]
}
```

### Granting access to tenants, locations and groups members o admin
``` 
PUT /home-screen/configuration/widgets/<widget_id>
Host: <your_subdomain>.beekeeper.io
Authorization: Token b1edcre4-d128-4g1a-br5v-a495d00e0j41
Content-Type: application/json
```
with body: 
```json
{
    "resourceType": "home_screen_widget",
    "resourceId": "<widget_id>",
    "granted": [
        {
            "role": "home_screen.widget.view",
            "resource_type": "home_screen_widget",
            "actor": {
                "role": "group_member",
                "resource_type": "<resource_type>",
                "actor": null,
                "resource_id": "<group_id/org_unit_id/tenant_id>"
            },
            "resource_id": "<widget_id>"
        }
    ]
}
```

* `resource_type` can be `group`, `org_unit`, `tenant`
* `role` can be `group_member`, `group_admin`, `tenant.member`, `org_unit.member`, `org_unit.admin`
