'use client';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

const Dashboard = ({ dates }: any) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ dates }),
                });
                const result = await response.json();
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
        return <div>Loading...</div>;
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
