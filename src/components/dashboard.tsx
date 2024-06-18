'use client';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import BarLoader from 'react-spinners/BarLoader';

const Dashboard = ({ dates }: any) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://credmantra.com/api/v1/crm/stats', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ dates }),
                });
                const result = await response.json();
                setLoading(false);
                setData(result);

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
            <div className="flex w-full items-center justify-center py-2 sm:py-8">
                <BarLoader loading={loading} aria-label="Loading Spinner" />
            </div>
        );
    }

    return (
        <div className="gap-2">
            <Table>
                <TableBody>
                    {Object.entries(data.data).map(
                        ([key, value]: any) =>
                            value && (
                                <TableRow key={key}>
                                    <TableCell className="font-medium">{key}</TableCell>
                                    <TableCell className="text-right">{value.toString()}</TableCell>
                                </TableRow>
                            ),
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default Dashboard;
