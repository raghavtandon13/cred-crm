'use client';
import { useEffect, useState, useCallback } from 'react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import BarLoader from 'react-spinners/BarLoader';
import { Button } from './ui/button';
import { RefreshCw } from 'lucide-react';

const Dashboard = ({ dates }: any) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(
        async (forceRefresh = false) => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:3000/api/v1/crm/stats', {
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

    const getStatus = (key: any) => {
        if (data?.data?.active && key in data.data.active) {
            return data.data.active[key] ? <span className="text-green-500">ON</span> : <span className="text-gray-300">OFF</span>;
        }
        return null;
    };

    if (loading) {
        return (
            <div className="flex w-full flex-col items-center justify-center py-2 sm:py-8">
                <BarLoader loading={loading} aria-label="Loading Spinner" />
                <p className="pt-2">aggregating... please wait</p>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>No data available</div>;
    }

    return (
        <div className="gap-2">
            <Table>
                <TableBody>
                    {Object.entries(data.data)
                        .filter(([key]) => key !== 'active')
                        .map(
                            ([key, value]: any) =>
                                value && (
                                    <TableRow key={key}>
                                        <TableCell className="w-[40px]">{getStatus(key)}</TableCell>
                                        <TableCell className="font-medium">{key}Leads</TableCell>
                                        <TableCell className="text-right">{value.toString()}</TableCell>
                                    </TableRow>
                                ),
                        )}
                </TableBody>
            </Table>

            <div className="flex items-center justify-start">
                {data.lastAggregatedAt && (
                    <p className="text-sm text-gray-500">
                        Last aggregated at:
                        {data.cached ? new Date(data.lastAggregatedAt).toLocaleString() : 'Right Now'}
                    </p>
                )}
                <Button size={'icon'} className="ml-1" variant={'ghost'} onClick={handleRefresh}>
                    <RefreshCw size={16} />
                </Button>
            </div>
        </div>
    );
};

export default Dashboard;
