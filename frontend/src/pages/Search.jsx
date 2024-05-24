import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";

export default function Search() {
    const [sidebardata, setSidebardata] = useState({
        searchTerm: "",
        parking: false,
        furnished: false,
        sort: "created_at",
        order: "desc",
    });
    const navigate = useNavigate();

    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    // console.log(listings);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get("searchTerm");
        const parkingFromUrl = urlParams.get("parking");
        const furnishedFromUrl = urlParams.get("furnished");
        const sortFromUrl = urlParams.get("sort");
        const orderFromUrl = urlParams.get("order");

        if (
            searchTermFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ) {
            setSidebardata({
                searchTerm: searchTermFromUrl || "",
                parking: parkingFromUrl === "true" ? true : false,
                furnished: furnishedFromUrl === "true" ? true : false,
                sort: sortFromUrl || "created_at",
                order: orderFromUrl || "desc",
            });
        }

        const fetchListings = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/v1/property/get?${searchQuery}`);
            const data = await res.json();
            // console.log(data);
            setListings(data);
            setLoading(false);
        };

        fetchListings();
    }, [location.search]);

    console.log(listings);

    const handleChange = (e) => {
        if (e.target.id === "searchTerm") {
            setSidebardata({ ...sidebardata, searchTerm: e.target.value });
        }

        if (e.target.id === "parking" || e.target.id === "furnished") {
            setSidebardata({
                ...sidebardata,
                [e.target.id]:
                    e.target.checked || e.target.checked === "true" ? true : false,
            });
        }

        if (e.target.id === "sort_order") {
            const sort = e.target.value.split("_")[0] || "created_at";

            const order = e.target.value.split("_")[1] || "desc";

            setSidebardata({ ...sidebardata, sort, order });
        }
    };

    console.log(sidebardata);

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set("searchTerm", sidebardata.searchTerm);
        urlParams.set("parking", sidebardata.parking);
        urlParams.set("furnished", sidebardata.furnished);
        urlParams.set("sort", sidebardata.sort);
        urlParams.set("order", sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const selectPageHandler = (selectedPage) => {
        if (selectedPage >= 1 && selectedPage <= Math.ceil( listings.length / 6) && selectedPage !== page) {
            setPage(selectedPage)
        }
    }



    return (
        <div className="flex flex-col md:flex-row">
            <div className="p-7  border-b-2 md:border-r-2 md:min-h-screen">
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">
                            Search Term:
                        </label>
                        <input
                            type="text"
                            id="searchTerm"
                            placeholder="Search..."
                            className="border rounded-lg p-3 w-full"
                            value={sidebardata.searchTerm}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex gap-2 flex-wrap items-center">
                        <label className="font-semibold">Amenities:</label>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="parking"
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebardata.parking}
                            />
                            <span>Parking</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="furnished"
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebardata.furnished}
                            />
                            <span>Furnished</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Sort:</label>
                        <select
                            onChange={handleChange}
                            defaultValue={"created_at_desc"}
                            id="sort_order"
                            className="border rounded-lg p-3"
                        >
                            <option value="price_desc">Price high to low</option>
                            <option value="price_asc">Price low to hight</option>
                            <option value="createdAt_desc">Latest</option>
                            <option value="createdAt_asc">Oldest</option>
                        </select>
                    </div>
                    <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90">
                        Search
                    </button>
                </form>
            </div>
            <div className="">
                <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
                    Listings:
                </h1>
                <div className="p-7 flex flex-wrap gap-4">
                    {!loading && listings.length === 0 && (
                        <p className="text-xl text-slate-700">No listing found!</p>
                    )}
                    {loading && (
                        <p className="text-xl text-slate-700 text-center w-full">
                            Loading...
                        </p>
                    )}

                    {!loading &&
                        listings &&
                        listings.slice(page*6-6, page*6).map((listing) => (
                            <PropertyCard key={listing._id} listing={listing} />
                        ))}
                </div>

                {listings.length > 0 && <div className="p-3 mx-4 flex justify-center  items-center">
                        <span onClick={() => selectPageHandler(page - 1)} className={page > 1 ? "" : "opacity-0"}>◀</span>

                        {[...Array(Math.ceil(listings.length / 6))].map((_, i) => {
                            return <span key={i}                     className={`mx-1 px-3 py-1 border border-gray-300 rounded cursor-pointer ${page === i+1 ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
                            onClick={() => selectPageHandler(i + 1)}>{i + 1}</span>
                        })}

                        <span onClick={() => selectPageHandler(page + 1)} className={page < Math.ceil(listings.length / 6 )? "" : "opacity-0"}>▶</span>
                    </div>}
            </div>
        </div>
    );
}
