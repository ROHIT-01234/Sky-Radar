import { Link } from 'react-router-dom'
import CitySearch from './city_search';

const Header = () => {
    return (
        <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60'>
            
            <div className='container mx-auto flex h-16 items-center justify-between px-4'>
                {/* Logo */}
                <Link to={"/"}>
                    <img src="/logo2.png" alt='skyradar logo' className='size-26' />
                </Link>

                {/* search bar */}
                <CitySearch />
            </div>
        </header>
    )
}

export default Header
