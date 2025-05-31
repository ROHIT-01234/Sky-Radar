import CurrentWeather from '@/components/current_weather';
import HourlyTemperature from '@/components/hourly_temperature';
import WeatherSkeleton from '@/components/loading_skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button'
import WeatherForecast from '@/components/weather_forecast';
import { useGeoLocation } from '@/hooks/use-geolocation';
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/use_weather';
import { AlertCircle, MapPin, RefreshCw, Terminal,  } from 'lucide-react'

const WeatherDashboard = () => {
    const { coordinates, error, getLocation, isLoading } = useGeoLocation();

    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);
    const locationQuery = useReverseGeocodeQuery(coordinates);
    console.log(locationQuery); 

    const handeleRefresh = () => {
        getLocation()
        if (coordinates) {
            // reload weather data
            weatherQuery.refetch();
            forecastQuery.refetch();
            locationQuery.refetch();

        }
    }

    if (isLoading) {
        return <WeatherSkeleton />
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertTitle>Location Error</AlertTitle>
                <AlertDescription className='flex flex-col gap-4'>
                   <p>{error}</p>
                   <Button onClick={getLocation} variant={"outline"} className='w-fit'>
                    <MapPin className='mr-2 size-4' />
                        Enable Location
                   </Button>
                </AlertDescription>
            </Alert>
        )
    }

    if (!coordinates) {
        return (
            <Alert variant="destructive">
                <Terminal className="size-4" />
                <AlertTitle>Location Required</AlertTitle>
                <AlertDescription className='flex flex-col gap-4'>
                   <p>Please enable location access.</p>
                   <Button onClick={getLocation} variant={"outline"} className='w-fit'>
                    <MapPin className='mr-2 size-4' />
                        Enable Location
                   </Button>
                </AlertDescription>
            </Alert>
        )
    }



    const locationName = locationQuery.data?.[0];

    if(weatherQuery.error || forecastQuery.error) {
        return(
            <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className='flex flex-col gap-4'>
                   <p>Failed to fetch weather data. Please try again.</p>
                   <Button onClick={handeleRefresh} variant={"outline"} className='w-fit'>
                    <RefreshCw className='mr-2 size-4' />
                        Retry
                   </Button>
                </AlertDescription>
            </Alert>
        )
    }

    // if weather data or forecast data still loading
    if ( !weatherQuery.data || !forecastQuery.data) {
        return <WeatherSkeleton />
    }

    return (
        <div className='space-y-4'>
            {/* Header */}
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-bold tracking-tight'>My Location</h1>
                <Button
                    variant={'outline'}
                    size={'icon'}
                    onClick={handeleRefresh}
                disabled = {weatherQuery.isFetching || forecastQuery.isFetching}

                >
                    <RefreshCw className= {`size-4 ${weatherQuery.isFetching || forecastQuery.isFetching ? 'animate-spin' : ''}`} />
                </Button>
            </div>

            {/* Current Weather */}
            <div className='grid gap-6'>
                <div className='flex flex-col lg:flex-row gap-4'>
                    {/* Current Weather */}
                    <CurrentWeather data={weatherQuery.data} locationName = {locationName}/>
                    {/* hourly temperature */}
                    <HourlyTemperature data={forecastQuery.data} />

                </div>
                <div>
                    {/* forecast */}
                    <WeatherForecast data={forecastQuery.data} />
                    
                </div>
            </div>
        </div>
    )
}

export default WeatherDashboard
