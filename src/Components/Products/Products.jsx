import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import Loading from '../Shared/Loading/Loading';
import SectionTitle from '../Shared/SectionTitle/SectionTitle';
import useAllProducts from '../../Hooks/useAllProducts';
import useGetMyCarts from '../../Hooks/useGetMyCarts';

export default function Products() {

    // all product load 
    const [products, isLoading, refetchProduct] = useAllProducts();
    const { myCartRefetch } = useGetMyCarts()

    const [sortBy, setSortBy] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');


    // Function to filter products by category
    const filterProduct = (product, category) => {
        if (category === 'all') {
            return product;
        }
        return product.filter(products => products.category.toLowerCase() === category.toLowerCase());
    }

    // Function to sort products by the specified criterion
    const sortProduct = (product, criterion) => {
        if (criterion === 'all') {
            return product;
        }
        return [...product].sort((a, b) => {
            if (criterion === 'price') {
                return b.price - a.price;
            }
            return 0;
        });
    }

    // Filter and sort Product based on the selected criterion and category
    const filteredProduct = filterProduct(products, filterCategory);
    const sortedProduct = sortProduct(filteredProduct, sortBy);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loading />
            </div>
        );
    }

    return (
        <div>
            <SectionTitle heading={"Featured Products"} />

            {/* Filtering and Sorting controls */}
            <div className="my-4 flex flex-col md:flex-row justify-between items-center mx-auto poppins-semibold gap-4 fonts-nornmal lg:px-2 md:px-1 px-0 ">
                <div className="md:flex flex-col sm:flex-row items-center ">
                    <label htmlFor="sort" className="mr-2 text-gray-300 mx-auto lg:text-xl  ">Sort by :</label>
                    <select
                        id="sort"
                        name="sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-40 p-2 border border-gray-500 rounded bg-gray-700 text-gray-200"
                    >
                        <option value="all">All Products</option>

                        <option value="price">Price</option>
                    </select>
                </div>

                <div className="md:flex flex-col sm:flex-row items-center ">
                    <label htmlFor="category" className="mr-2 text-gray-300 lg:text-xl text-center   block md:inline">Filter by :</label>
                    <select
                        id="category"
                        name="category"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="lg:w-[300px]  w-[280px] p-2 border border-gray-500 rounded bg-gray-700 text-gray-200"
                    >
                        <option value="all">All Categories</option>
                        <option value="Entree et accompagnement">Entree et accompagnement</option>
                        <option value="Plat thai">Plat thai</option>
                        <option value="signature rolls(x8)">signature rolls(x8)</option>
                        <option value="Menu sushi">Menu sushi</option>
                        <option value="Frit rolls(x8)">Frit rolls(x8)</option>
                        <option value="Avocado rolls(x8)">Avocado rolls(x8)</option>
                        <option value="Brochettes yakitori(x2)">Brochettes yakitori(x2)</option>
                        <option value="California rolls(x6)">California rolls(x6)</option>
                        <option value="Saumon rolls(x6)">Saumon rolls(x6)</option>
                        <option value="Crispy california rolls(x6)">Crispy california rolls(x6)</option>
                        <option value="Spring rolls(x6)">Spring rolls(x6)</option>
                        <option value="Makis(x6)">Makis(x6)</option>
                        <option value="Flocon rolls(x6)">Flocon rolls(x6)</option>
                        <option value="Sushis">Sushis</option>
                        <option value="Best Poké bowl">Best Poké bowl</option>
                        <option value="Chirashi">Chirashi</option>
                        <option value="Sashimi saumon">Sashimi saumon</option>
                        <option value="Boissons">Boissons</option>
                        <option value="Desserts">Desserts</option>
                        <option value="Sauce">Sauce</option>
                        <option value="Formule by sayu">Formule by sayu</option>
                    </select>
                </div>
            </div>


            {/* Data pass */}
            <div className=' grid  grid-cols-1 mt-3 md:grid-cols-2 2xl:grid-cols-4 lg:grid-cols-3 lg:gap-3 gap-2'>
                {sortedProduct?.length > 0 ? (
                    sortedProduct?.map((product) => <ProductCard key={product._id} product={product} myCartRefetch={myCartRefetch} />)
                ) : (
                    <div className="text-center text-gray-300 w-full col-span-full min-h-20 ">
                        No products available.
                    </div>
                )}
            </div>
        </div>
    )
}
