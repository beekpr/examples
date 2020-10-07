# Home Screen Example Widget - Profiles

A project showcasing home screen widget development by example. The widget uses the Beekeeper JS SDK to fetch 50 user profiles and display them in a grid layout. Please see below image.

![Profiles Widget in App](docs/assets/profiles_widget.png)

For more information regarding the setup and architecture of the home screen, please also see the [developer portal](https://developers.beekeeper.io/v2/welcome/home-screen). 

## Requirements

For widget development, the following dependencies are required:

* [NodeJS](http://nodejs.org/)(>v12)
* [Yarn](https://yarnpkg.com/)

## Get Started 

First, let's install all dependencies by running: 

```sh
yarn
```

Now, we can start the development server with: 

```sh
yarn serve
```

## Required Steps
 
1. [Define Widget ID](src/components/Widget.vue#L19)
    ```javascript:title=home-screen-widget/profiles/src/components/Widget.vue
    export const WIDGET_ID = 'profiles';
    ```
2. [Register Widget Component](src/main.js#L9)
    ```javascript:title=home-screen-widget/profiles/src/main.js
    BeekeeperHomeScreen.registerWidget(WIDGET_ID, component)
    ```
3. [Add widgetInstanceId Prop](src/components/Widget.vue#L38)
    ```javascript:title=home-screen-widget/profiles/src/components/Widget.vue
    props: {
    widgetInstanceId: {
        type: String,
        required: true,
    },
    ```
4. [Trigger LOADED Event](src/components/Widget.vue#L71)
    ```javascript:title=home-screen-widget/profiles/src/components/Widget.vue
    import BeekeeperHomeScreen, { EventType } from '@beekeeper/home-screen-sdk';
    BeekeeperHomeScreen.triggerEvent(EventType.LOADED, this.widgetInstanceId);
    ```

## Limitations

The home screen only supports widgets developed using [Vue 2](https://vuejs.org/) and [Vuex 3](https://vuex.vuejs.org/). 
If you are new to Vue, please check visit the [official guide](https://vuejs.org/v2/guide/).
