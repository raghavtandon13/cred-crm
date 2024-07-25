'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Date({ dates }: any) {
    const initialStartDate = dates.start === '1970-01-01' ? '' : dates.start;
    const initialEndDate = dates.end === '2030-01-01' ? '' : dates.end;

    const [startDate, setStartDate] = useState(initialStartDate);
    const [endDate, setEndDate] = useState(initialEndDate);

    const handleSubmit = (e: any) => {
        e.preventDefault();
	console.log("ok")
        console.log(window.location.href);
	console.log("ok")

        window.location.href = `?start=${startDate}&end=${endDate}`;
    };

    return (
        <form className="w-full items-center justify-center" onSubmit={handleSubmit}>
            <div className="flex flex-col justify-between gap-2 sm:flex-row">
                <div className="flex flex-[6] flex-col gap-2 sm:flex-row">
                    <input
                        type="date"
                        className="rounded px-2 outline outline-[1px] outline-gray-300"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        name="start"
                    />
                    <input
                        type="date"
                        className="rounded px-2 outline outline-[1px] outline-gray-300"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        name="end"
                    />
                </div>
                <Button className="flex-[1]" variant="secondary">
                    Search
                </Button>
            </div>
        </form>
    );
}
