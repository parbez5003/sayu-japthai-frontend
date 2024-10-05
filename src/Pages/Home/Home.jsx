import React from 'react'
import Banner from '../../Components/Banner/Banner'
import NewsLatter from '../NewsLatter/NewsLatter'
import Products from '../../Components/Products/Products'


export default function Home() {

  
  return (
    <div className=" w-full" style={{ width: '100%' }}>
      <Banner />

      <NewsLatter />

      <Products />

    </div>
  )
}
