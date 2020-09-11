import React, { useState, useEffect } from 'react';

import Card from './components/Card';
import Search from './components/Search';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
      .then(res => res.json())
      .then(data => {
        setImages(data.hits);
        setIsLoading(false);
      }, [term])
      .catch(err => console.log(err))
  })
  return (
    <div className="container mx-auto">
      <Search searchText={(text) => setTerm(text)} />
      { !isLoading && images.length === 0 && <h3 className="text-5xl text-center mx-auto mt-32">No Images Found</h3>}
     {isLoading ? <h3 className="text-6xl text-center mx-auto mt-32">Loading..</h3> : <div className="grid grid-cols-3 gap-4">
        {images.map(image => (
          <Card ley={image.id} image={image} />
        ))}
      </div>}
    </div>
  );
}

export default App;
