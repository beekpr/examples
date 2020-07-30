# Home Screen Example Widget

This is a guided example on how to develop a home screen widget.
In this example we provide a working widget that uses the Beekeeper Javascript SDK to fetch 50 user profiles and display
them in a grid layout.

![Drag Racing](../photos/profiles_widget.png)


For a more in depth overview on how the home screen is built and on how to set up the development environment
please visit our [developer portal](https://developers.beekeeper.io/v2/welcome/home-screen)  

## Limitations

* The home screen only supports widgets developed using the Vue.js framework. To find out more about Vue.js click [here](https://vuejs.org/v2/guide/)

## Required Steps
 
1. [Define Widget Id](https://github.com/beekpr/examples/blob/40f4f6c66c4d2d8f64796ca0932eaa31648a810c/home-screen-widget/profiles/components/Widget.vue#L19)
2. [Register Widget Component](https://github.com/beekpr/examples/blob/40f4f6c66c4d2d8f64796ca0932eaa31648a810c/home-screen-widget/profiles/main.js#L9)
3. [Add widgetInstanceId Prop](https://github.com/beekpr/examples/blob/40f4f6c66c4d2d8f64796ca0932eaa31648a810c/home-screen-widget/profiles/components/Widget.vue#L38)
4. [Register Widget Store Module](https://github.com/beekpr/examples/blob/ef4531a96d1424bf449a631ba5f2f6abc09e6a23/home-screen-widget/profiles/components/Widget.vue#L84)
6. [Trigger LOADED Event](https://github.com/beekpr/examples/blob/40f4f6c66c4d2d8f64796ca0932eaa31648a810c/home-screen-widget/profiles/components/Widget.vue#L71)
