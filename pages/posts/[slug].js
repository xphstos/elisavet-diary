import { useRouter } from "next/router"
import ErrorPage from "next/error"
// import Container from "../../components/container"
// import PostBody from "../../components/post-body"
// import Header from "../../components/header"
// import PostHeader from "../../components/post-header"
// import Layout from "../../components/layout"
// import PostTitle from "../../components/post-title"
import { getPostBySlug, getAllPosts } from "../../lib/api"
import Head from "next/head"
import { CMS_NAME } from "../../lib/constants"
import markdownToHtml from "../../lib/markdownToHtml"
import { Layout } from "../../styles/layout"

export default function Post({ post, morePosts, preview }) {
	const router = useRouter()

	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />
	}

	return (
		<Layout>{post.title}</Layout>
		// <Layout preview={preview}>
		// 	<Container>
		// 		<Header />
		// 		{router.isFallback ? (
		// 			<PostTitle>Loading...</PostTitle>
		// 		) : (
		// 			<>
		// 				<article className="mb-32">
		// 					<Head>
		// 						<title>
		// 							{post.title} | Next.js Blog Example with {CMS_NAME}
		// 						</title>
		// 						<meta property="og:image" content={post.ogImage.url} />
		// 					</Head>
		// 					<PostHeader
		// 						title={post.title}
		// 						coverImage={post.coverImage}
		// 						date={post.date}
		// 						author={post.author}
		// 					/>
		// 					<PostBody content={post.content} />
		// 				</article>
		// 			</>
		// 		)}
		// 	</Container>
		// </Layout>
	)
}

export async function getStaticProps({ params }) {
	const post = getPostBySlug(params.slug, [
		"title",
		"slug",
		"images",
		"tags",
		"author",
		"content",
		"meta"
	])
	const content = await markdownToHtml(post.content || "")
	// console.log({ post })
	return {
		props: {
			post: {
				...post,
				content
			}
		}
	}
}

export async function getStaticPaths() {
	const posts = getAllPosts(["slug"])

	return {
		paths: posts.map((post) => {
			return {
				params: {
					slug: post.slug
				}
			}
		}),
		fallback: false
	}
}
