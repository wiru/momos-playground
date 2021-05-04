module.exports = {
	lintOnSave: false,
	devServer: {
	  proxy: {
		"/graphql": {
		  target: "http://localhost:8080",
		  secure: false,
		},
	  },
	},
  };