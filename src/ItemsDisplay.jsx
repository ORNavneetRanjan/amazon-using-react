import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';
import { getProductList } from './app';
import Loading from './Loading';
import NotFound from './NotFound';


function ItemsDisplay(){
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('default')
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(function(){
    const xyz = getProductList();
    xyz.then(function(response){
      setProductList(response);
      setLoading(true);
    }).catch(function(){
      setLoading(true);
    })
    
  },[]);

  let data = productList.filter(function(pro){
    return pro.description.toLowerCase().indexOf(query.toLowerCase()) != -1;
  })

  if(sort === 'low'){
    data.sort(function (x, y){
      return x.price - y.price;
    })
  }else if(sort === 'high'){
    data.sort(function (x, y){
      return y.price - x.price;
    })
  }else if(sort == 'name'){
    data.sort(function (x, y){
      return x.description < y.description ? -1 : 1;
    })
  }
  
  function handleQueryChange(event){
    setQuery(event.target.value);
  }

  function handleSortChange(event){
    setSort(event.target.value);
  }

  if(!loading){
    return <Loading />
  }
   
  if(!productList){
    return <NotFound />
  }
  return (
    <>
      <div className="bg-gray-200 px-10 py-8 lg:px-44 w-screen min-h-screen">
        <div className="bg-white flex flex-wrap justify-center gap-10 p-10 max-w-screen-lg m-auto">
          <div className='flex flex-col lg:flex-row justify-between gap-5 w-full'>
          <input className="rounded-md border-2 border-solid px-10 py-2 shadow-xl" 
            placeholder="Search" type="text" value={query} onChange={handleQueryChange}/>  
            
          <select className="rounded-md border-2 border-solid px-8 py-2 shadow-xl " id="settings" name="menu" 
            onChange={handleSortChange} value={sort}>
              <option value="default">Default</option>
              <option value="name">Sort by title </option>
              <option value="low">Sort by price: low to high</option>
              <option value="high">Sort by price: high to low</option>
          </select>
          </div>
          {data.length > 0 && <ProductList data={data}/>}
          {data.length == 0 && 
            <div className="text-xl lg:text-4xl">
                No product found 
            </div>
          }
        </div>

        <div className="bg-white flex max-w-screen-lg m-auto p-5 gap-1">
            <a className="p-2 border-solid border-2 border-orange-500 rounded-md bg-orange-500 text-white" href="">1</a>
            <a className="p-2 border-solid border-2 border-orange-500 rounded-md text-orange-500" href="">2</a>
            <a className="p-2 border-solid border-2 border-orange-500 rounded-md text-2xl text-orange-500" href="">&#8594;</a>
        </div>
      </div>
      
    </>
  );
}

export default ItemsDisplay;