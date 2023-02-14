import React from 'react'
import { useRouter } from 'next/router';
function Home({ post }) {
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Data is loading</h1>;
  }
  return (
    <>
      {
        <div className="max-w-lg rounded overflow-hidden shadow-lg">
          <img className="w-full" src={post.imageUrl} alt="Mountain" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{post.id}</div>
            <p className="text-gray-700 text-base">
              {post.description}
            </p>
          </div>
        </div>
      }
    </>
  )
}
export async function getStaticPaths() {
  const res = await fetch('http://localhost:5000/data')
  const posts = await res.json()
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))
  return {
    paths,
    fallback: false
  }
}
export async function getStaticProps(context) {
  console.log("context", context);
  const id = context.params.id
  const res = await fetch(`http://localhost:5000/data/${id}`)
  const post = await res.json()
  console.log(post)
  return { props: { post } }
}
export default Home