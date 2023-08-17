const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.tsx',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        // General
        page: {
          from_bg: colors.slate[100],
          to_bg: colors.slate[200],
        },
        titles: colors.yellow[400],
        links: {
          txt: colors.yellow[400],
          hover_txt: colors.yellow[600],
        },
        loading_spinner: colors.yellow[500],
        popups: {
          bg: colors.stone[700],
          txt: colors.slate[50],
          internal_border: colors.slate[200],
        },
        warning: {
          txt: colors.slate[800],
          bg: colors.yellow[400],
          border: colors.yellow[500],
        },
        error: {
          txt: colors.red[500],
          bg: colors.red[50],
          border: colors.red[200],
        },

        // Inputs
        btn: {
          txt: colors.slate[800],
          bg: colors.white,
          border: colors.slate[200],
          hover_txt: colors.slate[800],
          hover_bg: colors.slate[100],
          hover_border: colors.slate[200],
        },
        btn_primary: {
          txt: colors.slate[800],
          bg: colors.yellow[400],
          border: colors.yellow[500],
          hover_txt: colors.slate[800],
          hover_bg: colors.yellow[300],
          hover_border: colors.yellow[400],
        },
        btn_error: {
          txt: colors.white,
          bg: colors.red[500],
          border: colors.red[500],
          hover_txt: colors.white,
          hover_bg: colors.red[600],
          hover_border: colors.red[600],
        },
        label: colors.yellow[400],
        txt_input: {
          txt: colors.indigo[600],
          bg: colors.white,
          border: colors.slate[200],
          focus_txt: colors.indigo[600],
          focus_bg: colors.slate[50],
          focus_border: colors.indigo[300],
          placeholder_txt: colors.indigo[600],
        },
        
        // Whitelist proof widget
        wl_message: {
          txt: colors.slate[800],
          bg: colors.indigo[100],
        },

        // Mint widget
        token_preview: colors.stone[700],
      },
    },
  },
  variants: {},
  plugins: [],
};
