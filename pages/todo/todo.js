import styles from '@/styles/Home.module.css'
import React, { useState } from 'react'
import Link from 'next/link'
function Todo({ posts }) {
  return (
    <div className="p-10">
      {
        posts.map((item, index) => {
          const url = item.id
          return (
            <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg">
              <img className="w-full" src={item.imageUrl} alt="Mountain" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{item.id}</div>
                <p className="text-gray-700 text-base">
                  {item.description}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"><Link href={`/todo/${url}`}><button className='bg-blue-600 text-white pt-3 pb-3 pl-2 pr-2 rounded'>Show More Detail</button></Link></span>
              </div>
            </div>
          )

        })
      }

    </div>
  )
}
export async function getStaticProps() {
  const res = await fetch('http://localhost:5000/data')
  const posts = await res.json()
  return {
    props: {
      posts: posts,
    },
    //  revalidate: 2,
  }
}
export default Todo