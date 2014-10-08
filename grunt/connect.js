//
// Static HTTP server, useful while developing
//

module.exports = {
	server: {
		options: {
			keepalive: true,
			port: 1337,
			base: ["./", "example"]
		}
	},
	docs: {
		options: {
			keepalive: true,
			port: 1337,
			base: "./docs"
		}
	}
}