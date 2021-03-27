import React, { useEffect, useState } from "react"

const url = `https://cors-anywhere.herokuapp.com/https://www.instagram.com/graphql/query/?query_hash=003056d32c2554def87228bc3fd9668a&variables={"id":"278781573","first":12}`

const cache = {
	lastFetch: 0,
	posts: []
}

function useInstagram() {
	const [posts, setPosts] = useState([])

	useEffect(() => {
		const timeSinceLastFetch = Date.now() - cache.lastFetch
		if (timeSinceLastFetch <= 1800000) {
			return cache.posts
		}

		const data = fetch(url)
			.then((res) => res.json())
			.catch((err) => console.log(err))
			.then((p) => setPosts(p))
		cache.lastFetch = Date.now()
		cache.posts = data
	}, [])

	return posts
}

export default useInstagram
