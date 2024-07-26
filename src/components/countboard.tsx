'use client';
import { useEffect, useState, useCallback } from 'react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import BarLoader from 'react-spinners/BarLoader';
import { Button } from './ui/button';
import { RefreshCw } from 'lucide-react';

const Countboard = ({ dates }: any) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(
        async (forceRefresh = false) => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:3000/api/v1/crm/better_stats', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ dates, forceRefresh }),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err: any) {
                setError(`Failed to fetch data: ${err.message}`);
            } finally {
                setLoading(false);
            }
        },
        [dates],
    );

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleRefresh = () => fetchData(true);

    if (loading) {
        return (
            <div className="flex w-full flex-col items-center justify-center py-2 sm:py-8">
                <BarLoader loading={loading} aria-label="Loading Spinner" />
                <p className="pt-2">aggregating... please wait</p>
            </div>
        );
    }

    if (error) {
        return <div>Error:{error}</div>;
    }

    if (!data) {
        return (
            <div className="flex w-full flex-col items-center justify-center py-2 sm:py-8">
                <BarLoader loading={loading} aria-label="Loading Spinner" />
                <p className="pt-2">aggregating... please wait</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-0 sm:p-4">
            <Table>
                <TableRow>
                    <TableCell className="font-semibold">Name</TableCell>
                    <TableCell className="font-semibold">Total</TableCell>
                    <TableCell className="font-semibold">Accepted</TableCell>
                    <TableCell className="font-semibold">Rejected</TableCell>
                    <TableCell className="min-w-[120px] font-semibold">First Lead</TableCell>
                    <TableCell className="min-w-[120px] font-semibold">Last Lead</TableCell>
                </TableRow>
                <TableBody>
                    {Object.entries(data.data)
                        .filter(([key]) => key !== 'null')
                        .map(([key, value]: any) => (
                            <TableRow key={key}>
                                <TableCell className="font-semibold">{key}</TableCell>
                                <TableCell>{value.Total}</TableCell>
                                <TableCell>{value.Accepted}</TableCell>
                                <TableCell>{value.Rejected}</TableCell>
                                <TableCell>{value.First}</TableCell>
                                <TableCell>{value.Last}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            <div className="flex items-center justify-start">
                {data.lastAggregatedAt && (
                    <p className="text-sm text-gray-500">Last aggregated at: {new Date(data.lastAggregatedAt).toLocaleString()}</p>
                )}
                <Button size={'icon'} className="ml-1" variant={'ghost'} onClick={handleRefresh}>
                    <RefreshCw size={16} />
                </Button>
            </div>
        </div>
    );
};

export default Countboard;
