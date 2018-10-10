module.exports = {
  type: "react-component",
  npm: {
    esModules: true,
    umd: {
      global: "ReactSelectOperator",
      externals: {
        react: "React",
        classnames: "classNames",
        emotion: "emotion",
        "styled-components": "StyledComponents",
        "prop-types": "PropTypes",
        "react-dom": "ReactDOM",
        "react-input-autosize": "AutosizeInput",
        "react-select": "ReactSelect"
      }
    }
  }
};
