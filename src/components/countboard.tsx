'use client';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import BarLoader from 'react-spinners/BarLoader';

const Countboard = ({ dates }: any) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://credmantra.com/api/v1/crm/better_stats', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ dates }),
                });
                const result = await response.json();
                setLoading(false);
                setData(result.data);

                console.log('data:', data);
            } catch (err) {
                setError('Failed to fetch data');
            }
        };

        fetchData();
    }, [dates]);

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
                    {Object.entries(data)
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
        </div>
    );
};

export default Countboard;
