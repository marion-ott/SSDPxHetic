const Subscription = {
	visit: {
		subscribe(parent, args, {pubsub}, info) {
			return pubsub.asyncIterator('visit')
		}
	}
}

export default Subscription
