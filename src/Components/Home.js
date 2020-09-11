import React from 'react';
import '../style/Home.css';
import Product from './Product';

function Home() {
  return (
    <div className='home'>
      <div className='home__container'>
        <img
          className='home__image'
          src='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_2x._CB432458382_.jpg'
          alt='background-img'
        />
        <div className='home__row'>
          <Product
            id='1'
            title='Plus 3D Edge Full Glue Front Body Cover Tempered Glass Screen Protector for Samsung Galaxy Watch Active 2 (44mm) - Black'
            price={30.99}
            rating={3}
            image='https://m.media-amazon.com/images/I/514AEmamkqL._AC_UL640_FMwebp_QL65_.jpg'
          />
          <Product
            id='2'
            title='The Lean Startup: How Constant Innovation Creates Radically Successful Businesses'
            price={19.99}
            rating={2}
            image='https://m.media-amazon.com/images/I/81jgCiNJPUL._AC_UY436_FMwebp_QL65_.jpg'
          />
        </div>
        <div className='home__row'>
          <Product
            id='3'
            title='Echo Dot (3rd Gen) – New and improved smart speaker with Alexa (Black)'
            price={19.99}
            rating={3}
            image='https://m.media-amazon.com/images/I/61EXU8BuGZL._AC_UY436_FMwebp_QL65_.jpg'
          />
          <Product
            id='4'
            title='Sunley Day Night Cricket Leather Ball'
            price={19.99}
            rating={1}
            image='https://m.media-amazon.com/images/I/71DFunmhctL._AC_UL640_FMwebp_QL65_.jpg'
          />
          <Product
            id='5'
            title='GolfBasic Fit39 EX Golf Gloves (Large, Black/Red)'
            price={10.0}
            rating={3}
            image='https://m.media-amazon.com/images/I/81CKgSHWB5L._AC_SX360_SY240_QL70_.jpg'
          />
        </div>
        <div className='home__row'>
          <Product
            id='6'
            title='Amazon Brand - Solimo Premium High-Carbon Stainless Steel Kitchen Knife Set, 4-Pieces (with Sharpener), Silver'
            price={20}
            rating={11}
            image='https://m.media-amazon.com/images/I/51j-624ZxML._AC_UL640_FMwebp_QL65_.jpg'
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
