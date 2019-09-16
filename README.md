# reactjs-webapp-sample

## Preface
This sample project uses [React.js](https://reactjs.org/) and [Semantic UI](https://semantic-ui.com/). It provides only Web UI. So, I recommend using the [springboot-webapp-sample](https://github.com/ybkuroki/springboot-webapp-sample) project as Back End Application.

## Install
Perform the following steps:
1. Download and install [Node.js](https://nodejs.org/en/).
1. Download and install [Visual Studio Code(VS Code)](https://code.visualstudio.com/).
1. Clone this repository.
1. Download and install npm packages.
    ```bash
    npm install
    ```

## Starting Server
Perform the following steps:
1. Start  [springboot-webapp-sample](https://github.com/ybkuroki/springboot-webapp-sample) project.
1. Start the development server.
    ```bash
    npm run start
    ```
1. When startup is complete, the console shows the following message:
    ```
    i ｢wdm｣: Compiled successfully.
    ```
1. Access the follwing URL in the Chrome.  
    [http://localhost:3000](http://localhost:3000)

## Creating a Production Build
Perform the following command:
```bash
npm run build
```

## Project Map
The follwing figure is the map of this sample project.

```
- reactjs-webapp-sample
  + public          … Contains resouces of this project.
  - src
    + components    … Contains components of React.
    + lib           … Implement the common library for Ajax.
    + model         … Define View Models.
    + router        … Define React Router.
    + store         … Define Flux.
    + views         … Define views of this project.
    - app.js       … Define a base view of this project.
    - main.js       … Entry point.
  - babel.config    … Babel Configuration.
  - package.json    … Define npm packages.
  - webpack.config.js   … Webpack Configuration.
```

## Views
There are the following views in this sample.

|View Name|File Name|Description|
|:---|:---|:---|
|Login View|``login.js``|The view for session authentication with username and password.|
|Top View|``top.js``|The view showing search results.|
|Regist View(Modal)|``regist.js``|The view to register a new book data.|
|Edit View(Modal)|``edit.js``|The view to edit a book data.|
|Detail View(Modal)|``detail.js``|The view for showing a book data.|

## Components
There are the following components in this sample.

|Component Name|File Name|Description|
|:---|:---|:---|
|Button|``commandbutton.js``|The component that shows a button|
|Input|``inputbox.js``|The component that shows a item name and input box.|
|Label|``labelgroup.js``|The component that shows a item name and data.|
|Message|``message.js``|The component that shows messages.|
|Modal|``modal.js``|The component that shows a modal dialog.|
|Navigation Bar|``navbar.js``|The component that shows a navigation bar.|
|Pagenation|``paginate.js``|The component that shows a pagenation.|
|Select Box|``selectbox.js``|The component that shows a select box.|

The pagination component refer to [this project](https://github.com/toshi0383/ts-react-pager).

## Libraries
This sample uses the following library.

|Library Name|Version|
|:---|:---:|
|React.js|16.8.1|
|React Router|4.3.1|
|Flux|3.1.3|
|superagent|4.1.0|
|semantic-ui-css|2.4.1|

## License
The License of this sample is *MIT License*.

