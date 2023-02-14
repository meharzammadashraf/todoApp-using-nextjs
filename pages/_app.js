import React, { useState } from 'react';
import '@/styles/globals.css'
import Link from 'next/link'
export default function App({ Component, pageProps }) {
  const [showModal, setShowModal] = useState();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const AddTodo = (e) => {
    e.preventDefault()
    let a;
    try {
      a = new URL(imageUrl)
      setImageUrlError("")
    } catch (error) {
      setImageUrlError("Please enter a valid URL!")
    }
    title.length < 4 ? setTitleError("Please enter minimum 3 chracter title!") : setTitleError("")
    price < 1 ? setPriceError("Please enter your product price") : setPriceError("")
    description.length < 15 ? setDescriptionError("Please enter minimum 15 characters") : setDescriptionError("")
    Ali()
  }
  const Ali = () => {
    fetch('http://localhost:5000/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          "id": title,
          price,
          imageUrl,
          description
        }
      )
    })
      .then(res => res.json())
      .then(data => {
        setDescription("")
        setPrice("")
        setImageUrl("")
        setTitle("")
        setShowModal(false)
      })
      .catch(error => {
      })
  }
  return (
    <>
      <nav>
        <div className='bg-blue-200'>
          <ul className='flex px-10 py-6 text-lg font-medium'>
            <li className='mr-8'><Link href='/'>TODO</Link></li>
            <li className='mr-8 cursor-pointer' onClick={() => setShowModal(true)}>ADD TODO</li>
          </ul>
        </div>
      </nav>
      {
        showModal ?
          <form onSubmit={AddTodo}>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      New Todo
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className=" h-4 w-4 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto">
                    {/* <form> */}
                    <label>Title: <span>{titleError}</span> <input className='border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight' type='text' value={title} onChange={e => setTitle(e.target.value)} /><span id='fname' className="hidden p-2 text-xs text-red-600">You hover me!</span><br /><br /></label>
                    <label>Price: <span>{priceError}</span><input className='border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight' type='number' value={price} onChange={e => setPrice(e.target.value)} /><span id='lname' className="hidden p-2 text-xs text-red-600">You hover me!</span></label><br /><br />
                    <label>Image URL: <span>{imageUrlError}</span><input className='border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight' type='text' value={imageUrl} onChange={e => setImageUrl(e.target.value)} /><span id='fathername' className="hidden p-2 text-xs text-red-600">You hover me!</span></label><br /><br />
                    <label>Description: <span>{descriptionError}</span><input className='border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight' type='text' value={description} onChange={e => setDescription(e.target.value)} /><span id='fathername' className="hidden p-2 text-xs text-red-600">You hover me!</span></label>
                    {/* </form> */}
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">

                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => { setShowModal(false) }}
                    >
                      Close
                    </button>
                    <input
                      className="bg-blue-400 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      value="ADD"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </form>
          : ""
      }
      <Component {...pageProps} />
    </>
  )
}
