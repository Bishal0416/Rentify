import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Home() {

  const [properties, SetProperties] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    // Fetch property data from an API
    const fetchProperties = async () => {
      try {
        const response = await fetch('/api/v1/property/get');
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        const data = await response.json();
        SetProperties(data);
      } catch (error) {
        console.error(error);
      }
    };
    // Call the fetchProperties function
    fetchProperties();
  }, []);
  const featuredProperties = properties.slice(0, 6);


  return (
    <div className="bg-gray-900 py-20">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl lg:text-6xl text-white font-bold mb-6">Find Your Perfect property <br></br>
        with ease</h1>
        <p className="text-lg lg:text-xl text-gray-400 mb-8">Discover a curated selection of rental properties tailored for students and young professionals.</p>
          <form onSubmit={handleSubmit} >
          <input onChange={(e)=>setSearchTerm(e.target.value)} type="text" placeholder="Enter name of the property" className="px-6 py-4 w-full max-w-lg rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900" />
          <button  
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-r-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900">Search</button>
          </form>

      </div>
    </div>



    <div className="bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-100 text-center mb-6">Featured Properties</h2>
        <Link to ="/search">
          <p className='text-gray-100 font-semibold mb-6'> Get mores...</p>
        </Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map(property => (
            <div key={property._id} className="bg-white rounded-lg overflow-hidden shadow-md">
              <Link to={`/property-listing/${property._id}`}>
              <img src={property.imageUrls[0]} alt={property.title} className="w-full h-48 object-cover object-center" />
              <div className="p-6 bg-gray-300">
                <h3 className="text-xl font-semibold mb-2">{property.name}</h3>
 
                <p className="text-gray-800 font-medium">Rs. {property.price}</p>
                <div className='text-slate-800 flex gap-4'>
                    <div className=''>
                            {property.bedrooms > 1
                                ? `${property.bedrooms} beds `
                                : `${property.bedrooms} bed `}
                    </div>
                    <div className=''>
                            {property.bathrooms > 1
                                ? `${property.bathrooms} baths `
                                : `${property.bathrooms} bath `}
                    </div>
                </div>
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>


    <div className="bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-100 text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-400 rounded-lg p-6 flex flex-col justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 mb-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 0a2 2 0 00-2 2v4.5a.5.5 0 001 0V2a1 1 0 112 0v4.5a.5.5 0 001 0V2a2 2 0 00-2-2zM2 6.5a.5.5 0 00.5.5h4.29a1 1 0 01.707.293l8.96 8.95a.5.5 0 01-.707.707l-8.95-8.96a1 1 0 00-.293-.707H2.5a.5.5 0 00-.5.5v7a.5.5 0 001 0V7.91a1 1 0 01.293-.707l8.95-8.95a.5.5 0 01.707.707l-8.95 8.95a1 1 0 00-.707.293V18.5a.5.5 0 001 0v-7a.5.5 0 00-.5-.5H1.5a.5.5 0 00-.5.5v7a1 1 0 001 1h7a.5.5 0 000-1H2V6.5z" clipRule="evenodd" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Easy Search</h3>
              <p className="text-gray-700 text-center">Find your ideal property with our easy-to-use search functionality.</p>
            </div>
            {/* Feature 2 */}
            <div className="bg-gray-400 rounded-lg p-6 flex flex-col justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 mb-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14 3a1 1 0 011 1v4h-4a1 1 0 010-2h3V4a1 1 0 011-1zm-3.707-.293a1 1 0 010 1.414L8.414 7H12a1 1 0 010 2H8.414l2.293 2.293a1 1 0 11-1.414 1.414L6.586 8.707a1 1 0 010-1.414l3.293-3.293a1 1 0 011.414 0z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M14 13a1 1 0 00-1 1v4H7a1 1 0 100 2h6a1 1 0 001-1v-4a1 1 0 00-1-1zm-3.707.293a1 1 0 000 1.414L8.414 17H12a1 1 0 100-2H8.414l2.293-2.293a1 1 0 10-1.414-1.414L6.586 15.707a1 1 0 000 1.414l3.293 3.293a1 1 0 001.414 0z" clipRule="evenodd" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">User Friendly</h3>
              <p className="text-gray-700 text-center">User friendly web easily accesable</p>
            </div>
            {/* Feature 3 */}
            <div className="bg-gray-400 rounded-lg p-6 flex flex-col justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 mb-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.707 8.293a1 1 0 011.414 0L10 10.586l2.879-2.879a1 1 0 111.414 1.414l-3.5 3.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 010-1.414zM6 6a1 1 0 00-1 1v7a1 1 0 102 0V7a1 1 0 00-1-1zm8-1a1 1 0 10-2 0v6.586l-2.293-2.293a1 1 0 10-1.414 1.414l3.5 3.5a1 1 0 001.414 0l3.5-3.5a1 1 0 00-1.414-1.414L12 11.586V6z" clipRule="evenodd" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-700 text-center">Our dedicated support team is available around the clock to assist you.</p>
            </div>
          </div>
        </div>
      </div>
    </div>




  </div>







  )
}

export default Home
