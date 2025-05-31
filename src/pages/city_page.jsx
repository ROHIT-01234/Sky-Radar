import CurrentWeather from "@/components/current_weather";
import HourlyTemperature from "@/components/hourly_temperature";
import WeatherSkeleton from "@/components/loading_skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import WeatherForecast from "@/components/weather_forecast";
import { useForecastQuery, useWeatherQuery } from "@/hooks/use_weather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";

const CityPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const long = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, long };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Failed to load weather data. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityname) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {params.cityname}, {weatherQuery.data.sys.country}
        </h1>
      </div>

      <div className="grid gap-6">
        <CurrentWeather data={weatherQuery.data} />
        <HourlyTemperature data={forecastQuery.data} />
        <WeatherForecast data={forecastQuery.data} />
      </div>
    </div>
  );
}

export default CityPage;
