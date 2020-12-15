const webpack = require('webpack');
  
module.exports = {
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    "externals": {
        "jquery": "https://code.jquery.com/jquery-3.3.1.min.js"
    }

//other config vars
};