import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-stretch p-20 px-40">
            <div className="flex h-20 w-full items-end justify-between">
                <h1 className="text-2xl font-bold">DATABASE</h1>
                <Image src="/cred.svg" alt="Credmantra Logo" width={150} height={36} priority />
            </div>

            <div className="w-full items-center justify-center pt-5">
                <Input type="number" placeholder="Phone Number" />
            </div>

            <div className="items-center justify-center">
                <h1 className="py-10">Personal Details</h1>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">Phone</TableCell>
                            <TableCell className="text-right">9600474850</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Name</TableCell>
                            <TableCell className="text-right">Arun Kumar</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Pincode</TableCell>
                            <TableCell className="text-right">110009</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Phone</TableCell>
                            <TableCell className="text-right">9600474850</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">PAN</TableCell>
                            <TableCell className="text-right">BUSRT2323L</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <h1 className="py-10">Account Details</h1>

            <div className="items-center justify-center">
                <h1 className="text-l w-full text-center font-bold">FIBE</h1>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">Status</TableCell>
                            <TableCell className="text-right">Account created successfully</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Sanctioned Ammount</TableCell>
                            <TableCell className="text-right">50,000</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Link</TableCell>
                            <TableCell className="text-right">
                                <a href="google.com">estri.com/e.....</a>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <div className="items-center justify-center">
                <h1 className="text-l w-full text-center font-bold">Upwards</h1>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">Status</TableCell>
                            <TableCell className="text-right">Account created successfully</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Sanctioned Ammount</TableCell>
                            <TableCell className="text-right">50,000</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Link</TableCell>
                            <TableCell className="text-right">
                                <a href="google.com">estri.com/e.....</a>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </main>
    );
}
