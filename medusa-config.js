const dotenv = require("dotenv")

let ENV_FILE_NAME = ""
switch (process.env.NODE_ENV) {
	case "production":
		ENV_FILE_NAME = ".env.production"
		break
	case "staging":
		ENV_FILE_NAME = ".env.staging"
		break
	case "test":
		ENV_FILE_NAME = ".env.test"
		break
	case "development":
	default:
		ENV_FILE_NAME = ".env"
		break
}

try {
	dotenv.config({
		path: process.cwd() + "/" + ENV_FILE_NAME
	})
} catch (e) {}

const JWT_SECRET = process.env.JWT_SECRET

const COOKIE_SECRET = process.env.COOKIE_SECRET

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS

// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS

// Database URL
const DATABASE_URL = process.env.DATABASE_URL

// Medusa uses Redis, so this needs configuration as well
// redis[s]://[[username][:password]@][host][:port][/db-number]
const REDIS_URL = process.env.REDIS_URL

// Stripe keys
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || ""
const STRIPE_WEBHOOK_SECRET =
	process.env.STRIPE_WEBHOOK_SECRET || ""

// This is the place to include plugins. See API documentation for a thorough guide on plugins.
const plugins = [
	`medusa-fulfillment-manual`,
	`medusa-payment-manual`
	// Uncomment to add Stripe support.
	// You can create a Stripe account via: https://stripe.com
	// {
	//   resolve: `medusa-payment-stripe`,
	//   options: {
	//     api_key: STRIPE_API_KEY,
	//     webhook_secret: STRIPE_WEBHOOK_SECRET,
	//   },
	// },
]

module.exports = {
	projectConfig: {
		jwt_secret: JWT_SECRET,
		cookie_secret: COOKIE_SECRET,
		store_cors: STORE_CORS,
		admin_cors: ADMIN_CORS,
		database_url: DATABASE_URL,
		database_type: "postgres",
		redis_url: REDIS_URL
	},
	plugins
}
