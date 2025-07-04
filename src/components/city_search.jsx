import { useState } from 'react'
import { Button } from './ui/button'
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command'
import { Clock, Loader2, Search, XCircle } from 'lucide-react';
import { useLocationQuery } from '@/hooks/use_weather';
import { CommandSeparator } from 'cmdk';
import { useNavigate } from 'react-router-dom';
import { useSearchHistory } from '@/hooks/use_search_history';
import { format } from 'date-fns';

const CitySearch = () => {

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const { data: locations, isLoading } = useLocationQuery(query);
    const { history, clearHistory, addToHistory } = useSearchHistory();

    const handleSelect = (cityData) => {
        const [lat, lon, name, country] = cityData.split("|");

        // Add to search history
        addToHistory.mutate({
            query,
            name,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            country,
        });

        setOpen(false);
        navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
    };

    return (
        <>
            <Button
                variant="outline"
                className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-200"
                onClick={() => setOpen(true)}
            >
                <Search className="mr-2 h-4 w-4 " />
                Search cities...
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <Command>
                    <CommandInput
                        placeholder="Search cities..."
                        value={query}
                        onValueChange={setQuery}
                    />
                    <CommandList>
                        {query.length > 2 && !isLoading && (
                            <CommandEmpty>No cities found.</CommandEmpty>
                        )}

                        {/* Search History Section */}
                        {history.length > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <div className="flex items-center justify-between px-2 my-2">
                                        <p className="text-xs text-muted-foreground">
                                            Recent Searches
                                        </p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => clearHistory.mutate()}
                                        >
                                            <XCircle className="h-4 w-4" />
                                            Clear
                                        </Button>
                                    </div>
                                    {history.map((item) => (
                                        <CommandItem
                                            key={item.id}
                                            value={`${item.lat}|${item.lon}|${item.name}|${item.country}`}
                                            onSelect={handleSelect}
                                        >
                                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                            <span>{item.name}</span>
                                            {item.state && (
                                                <span className="text-sm text-muted-foreground">
                                                    , {item.state}
                                                </span>
                                            )}
                                            <span className="text-sm text-muted-foreground">
                                                , {item.country}
                                            </span>
                                            <span className="ml-auto text-xs text-muted-foreground">
                                                {format(item.searchedAt, "MMM d, h:mm a")}
                                            </span>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </>
                        )}

                        {/* Search Results */}
                        <CommandSeparator />
                        {locations && locations.length > 0 && (
                            <CommandGroup heading="Suggestions">
                                {isLoading && (
                                    <div className="flex items-center justify-center p-4">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    </div>
                                )}
                                {locations?.map((location) => (
                                    <CommandItem
                                        key={`${location.lat}-${location.lon}-${location.name}`}
                                        value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                        onSelect={handleSelect}
                                    >
                                        <Search className="mr-2 h-4 w-4" />
                                        <span>{location.name}</span>
                                        {location.state && (
                                            <span className="text-sm text-muted-foreground">
                                                , {location.state}
                                            </span>
                                        )}
                                        <span className="text-sm text-muted-foreground">
                                            , {location.country}
                                        </span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </CommandDialog>
        </>
    );
}

export default CitySearch;
